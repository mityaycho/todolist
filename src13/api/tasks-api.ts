import axios from "axios"



const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	withCredentials: true,
	headers: {
		'API-KEY': '5ac078f7-4935-4223-bad6-63f58b80cd23'
	}
})

export const TasksApi = {
	getTasks(todolistId: string) {
		const promise = instance.get(`/todo-lists/${todolistId}/tasks`);
		return promise;
	},
	createTask(todolistId: string, title: string) {
		const promise = instance.post(`/todo-lists/${todolistId}/tasks`, { title });
		return promise;
	}
};