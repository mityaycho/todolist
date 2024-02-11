import axios from 'axios';
import { CreateTodolist } from './../stories/todolists-api.stories';

type TodolistType = {
	id: string;
	title: string;
	addedDate: string;
	order: string;
};

type CreateTodolistType = {
	data: {
		item: TodolistType
	};
	messages: Array<string>;
	fieldsErrors: string[];
	resultCode: number;
};

type DeleteTodolistType = {
	data: {};
	messages: string[];
	fieldsErrors: string[];
	resultCode: number;
};

type UpdateTodolistType = {
	data: {};
	messages: string[];
	fieldsErrors: string[];
	resultCode: number;
};

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		// Не забываем заменить API-KEY на собственный
		'API-KEY': '5ac078f7-4935-4223-bad6-63f58b80cd23'
	},
});

export const todolistAPI = {
	getTodolists() {
		const promise = instance.get<TodolistType[]>('todo-lists');
		return promise;
	},
	createTodolist(title: string) {
		const promise = instance.post<CreateTodolistType>('todo-lists', { title });
	return promise;
	},
	deleteTodolist(todolistId: string) {
		const promise = instance.delete<DeleteTodolistType>(`todo-lists/${todolistId}`)
		return promise;
	},
	updateTodolist(todolistId: string, title: string) {
		const promise = instance.put<UpdateTodolistType>(`todo-lists/${todolistId}`, { title });
		return promise;
	}
};