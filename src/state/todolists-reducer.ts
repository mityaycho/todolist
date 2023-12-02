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
		default:
			throw new Error('I don\'t understand this type');
	};
};