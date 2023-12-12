import { v1 } from "uuid";
import { TasksStateType } from "../App";

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK';
	taskId: string;
	todolistId: string;
};

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST';
	title: string;
};

export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE';
	id: string;
	title: string;
};

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER';
	id: string;
	filter: string;
};

type ActionsType = RemoveTaskActionType | 
AddTodolistActionType |
ChangeTodolistTitleActionType |
ChangeTodolistFilterActionType;

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE-TASK':
			const newState = state[action.todolistId].filter(task => task.id !== action.taskId);
			return {...state, [action.todolistId]: newState};
		// case 'ADD-TODOLIST':
		// 	const todolistId = v1();
		// 	return [...state, { id: todolistId, title: action.title, filter: "all" }];
		// case 'CHANGE-TODOLIST-TITLE':
		// 	const newTitle = state.map(el => el.id === action.id ? { ...el, title: action.title } : el);
		// 	return [...newTitle];
		// case 'CHANGE-TODOLIST-FILTER':
		// 	const newFilter = state.map(el => el.id === action.id && el.filter !== action.filter ? { ...el, filter: action.filter } : el);
		// 	return [...newFilter];
		default:
			throw new Error('I don\'t understand this type');
	};
};

​export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId };
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title};
};

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title };
};

export const ChangeTodolistFilterAC = (todolistId: string, filter: string): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter };
};