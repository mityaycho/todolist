import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
	title: 'API'
}

const todolistId = 'a1b26d27-7456-4300-a3ac-c7cf5ff67544';

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		// здесь мы будем делать запрос и ответ закидывать в стейт.
		// который в виде строки будем отображать в div-ке
		todolistAPI.getTodolists()
			.then((res) => {
				setState(res.data);
			})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.createTodolist('newTitle')
			.then((res) => {
				setState(res.data);
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.deleteTodolist(todolistId)
			.then((res) => {
				setState(res.data);
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.updateTodolist(todolistId, 'nw')
		.then((res) => setState(res.data));
	}, [])

	return <div>{JSON.stringify(state)}</div>
}