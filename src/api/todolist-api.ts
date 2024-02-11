import axios from 'axios'

const settings = {
	withCredentials: true,
	headers: {
		// Не забываем заменить API-KEY на собственный
		'API-KEY': '5ac078f7-4935-4223-bad6-63f58b80cd23'
	},
}

export const todolistAPI = {
	getTodolists() {
		const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
		return promise;
	},
	createTodolist(title: string) {
		const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
		{ title: title },
		settings
	)
	return promise;
	},
	deleteTodolist(todolistId: string) {
		const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
		return promise;
	},
	updateTodolist(todolistId: string, title: string) {
		const promise = axios.put(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
			{ title: title },
			settings
		)
		return promise;
	},
	
}
