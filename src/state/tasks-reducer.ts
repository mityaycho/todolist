import { v1 } from "uuid";
import { TasksStateType } from "../App";

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK';
	taskId: string;
	todolistId: string;
};

export type AddTaskActionType = {
	type: 'ADD-TASK';
	title: string;
	id: string
};

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS';
	id: string;
	isDone: boolean;
	todolistId: string;
};

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE';
	id: string;
	title: string;
	todolistId: string;
};

type ActionsType = RemoveTaskActionType | 
AddTaskActionType |
ChangeTaskStatusActionType |
ChangeTaskTitleActionType;

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE-TASK':
			const newState = state[action.todolistId].filter(task => task.id !== action.taskId);
			return {...state, [action.todolistId]: newState};
		case 'ADD-TASK':
		const task = { id: v1(), title: action.title.trim(), isDone: false };
			return {...state, [action.id]: [task, ...state[action.id]]};
		case 'CHANGE-TASK-STATUS':
			const changeTask = state[action.todolistId].map(el => el.id === action.id ? { ...el, isDone: action.isDone } : el);
			return {...state, [action.todolistId]: changeTask};
		case 'CHANGE-TASK-TITLE':
			const changeTitle = state[action.todolistId].map(el => el.id === action.id && el.title !== action.title ? { ...el, title: action.title } : el);
			return {...state, [action.todolistId]: changeTitle};
		default:
			throw new Error('I don\'t understand this type');
	};
};

​export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId };
};

export const addTaskAC = (title: string, id: string): AddTaskActionType => {
	return { type: 'ADD-TASK', title: title, id: id};
};

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-TASK-STATUS', id: id, isDone: isDone, todolistId: todolistId };
};

export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', id: id, todolistId: todolistId, title: title };
};