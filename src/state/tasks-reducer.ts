import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK';
	taskId: string;
	todolistId: string;
};

export type AddTaskActionType = {
	type: 'ADD-TASK';
	title: string;
	todolistId: string;
};

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS';
	taskId: string;
	isDone: boolean;
	todolistId: string;
};

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE';
	taskId: string;
	title: string;
	todolistId: string;
};

type ActionsType = RemoveTaskActionType |
	AddTaskActionType |
	ChangeTaskStatusActionType |
	ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TasksStateType = {};

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			const newState = state[action.todolistId].filter(task => task.id !== action.taskId);
			return { ...state, [action.todolistId]: newState };

		case 'ADD-TASK':
			const task = { id: v1(), title: action.title.trim(), isDone: false };
			return { ...state, [action.todolistId]: [task, ...state[action.todolistId]] };

		case 'CHANGE-TASK-STATUS':
			let todolistTasks = state[action.todolistId];
			const taskStatus = todolistTasks.find(task => task.id === action.taskId);

			if (taskStatus) {
				taskStatus.isDone = action.isDone;
			};
			state[action.todolistId] = [...todolistTasks];
			return { ...state };

		case 'CHANGE-TASK-TITLE':
			const changeTitle = state[action.todolistId].map(el => el.id === action.taskId && el.title !== action.title ? { ...el, title: action.title } : el);
			return { ...state, [action.todolistId]: changeTitle };

		case 'ADD-TODOLIST':
			return { ...state, [action.todolistId]: [] };

		case 'REMOVE-TODOLIST':
			const stateCopy = { ...state };
			delete stateCopy[action.id];
			return stateCopy;

		default:
			return state;
	};
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', taskId, todolistId };
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return { type: 'ADD-TASK', title, todolistId };
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId };
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', taskId, todolistId, title };
};