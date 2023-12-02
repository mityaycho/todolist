import { v1 } from "uuid";
import { TodolistType } from "../Components/Todolist";

type ActionType = {
	type: string;
	[key: string]: any;
};

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			const newState = state.filter(todolist => todolist.id !== action.id);
			return [...newState];
		case 'ADD-TODOLIST':
			const todolistId = v1();
			return [...state, { id: todolistId, title: action.title, filter: "all" }];
		case 'CHANGE-TODOLIST-TITLE':
			const newTitle = state.map(el => el.id === action.id ? {...el, title: action.title} : el);
			return [...newTitle];
		default:
			throw new Error('I don\'t understand this type');
	};
};