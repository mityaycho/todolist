import { useEffect, useState } from "react"
import { TasksApi } from "../api/tasks-api";



export default {
	title: 'API-tasks'
};

const todolistId = '4172880d-cf05-4ff3-b3f4-e0bd22a21d0f';

export const GetTasks = () => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		TasksApi.getTasks(todolistId)
		.then((res) => {
			setState(res.data);
		});
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		TasksApi.createTask(todolistId, 'New Title')
		.then((res) => {
			setState(res.data);
		});
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};