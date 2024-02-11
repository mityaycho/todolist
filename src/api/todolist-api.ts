import axios from 'axios';

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
		const promise = instance.get('todo-lists');
		return promise;
	},
	createTodolist(title: string) {
		const promise = instance.post('todo-lists', { title });
	return promise;
	},
	deleteTodolist(todolistId: string) {
		const promise = axios.delete(`todo-lists/${todolistId}`)
		return promise;
	},
	updateTodolist(todolistId: string, title: string) {
		const promise = instance.put(`todo-lists/${todolistId}`, { title });
		return promise;
	}
};