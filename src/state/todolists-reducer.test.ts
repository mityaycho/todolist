​import { TasksStateType } from '../App';
import { TodolistType } from '../Components/Todolist';
import { tasksReducer } from './tasks-reducer';
import { AddTodolistAC, RemoveTodolistAC, todolistsReducer } from './todolists-reducer';
import { v1 } from 'uuid';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

​test('correct todolist should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startState: Array<TodolistType> = [
			{id: todolistId1, title: 'What to learn', filter: 'all'},
			{id: todolistId2, title: 'What to buy', filter: 'all'}
	]

	const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodolistTitle)
})

​test('correct todolist should change its name', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startState: Array<TodolistType> = [
			{id: todolistId1, title: 'What to learn', filter: 'all'},
			{id: todolistId2, title: 'What to buy', filter: 'all'}
	]

	const action = {
			type: 'CHANGE-TODOLIST-TITLE' as const,
			id: todolistId2,
			title: newTodolistTitle
	}

	const endState = todolistsReducer(startState, action)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

​test('correct filter of todolist should be changed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newFilter: string = 'completed'

	const startState: Array<TodolistType> = [
			{id: todolistId1, title: 'What to learn', filter: 'all'},
			{id: todolistId2, title: 'What to buy', filter: 'all'}
	]

	const action = {
			type: 'CHANGE-TODOLIST-FILTER' as const,
			id: todolistId2,
			filter: newFilter
	}

	const endState = todolistsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})

​test('new array should be added when new todolist is added', () => {
	const startState: TasksStateType = {
			'todolistId1': [
					{id: '1', title: 'CSS', isDone: false},
					{id: '2', title: 'JS', isDone: true},
					{id: '3', title: 'React', isDone: false}
			],
			'todolistId2': [
					{id: '1', title: 'bread', isDone: false},
					{id: '2', title: 'milk', isDone: true},
					{id: '3', title: 'tea', isDone: false}
			]
	}

	const action = AddTodolistAC('new todolist')

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
	if (!newKey) {
			throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})
