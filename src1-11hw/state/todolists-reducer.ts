import { v1 } from "uuid";
import { TodolistType } from "../Components/Todolist";

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST';
	id: string;
};

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST';
	title: string;
	todolistId: string;
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

type ActionsType = RemoveTodolistActionType | 
AddTodolistActionType |
ChangeTodolistTitleActionType |
ChangeTodolistFilterActionType;

const initialState: Array<TodolistType> = [];

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			const newState = state.filter(todolist => todolist.id !== action.id);
			return [...newState];

		case 'ADD-TODOLIST':
			return [...state, { id: action.todolistId, title: action.title, filter: "all" }];

		case 'CHANGE-TODOLIST-TITLE':
			const newTitle = state.map(el => el.id === action.id ? { ...el, title: action.title } : el);
			return [...newTitle];

		case 'CHANGE-TODOLIST-FILTER':
			const newFilter = state.map(el => el.id === action.id && el.filter !== action.filter ? { ...el, filter: action.filter } : el);
			return [...newFilter];
			
		default:
			return state;
	};
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title , todolistId: v1()};
};

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title };
};

export const changeTodolistFilterAC = (todolistId: string, filter: string): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter };
};