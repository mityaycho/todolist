import { TasksStateType } from '../App';
import { TodolistType } from '../Components/Todolist';
import { addTodolistAC, todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';
import { v1 } from 'uuid';

test('new property with new array should be added when new todolist is added', () => {
	const startTasksState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	};

	const todolistId1 = v1();
	const todolistId2 = v1();
	const startTodolistsState: Array<TodolistType> = [
		{id: todolistId1, title: 'What to learn', filter: 'all'},
		{id: todolistId2, title: 'What to buy', filter: 'all'}
];

	const action = addTodolistAC('new todolist');
	const endTasksState = tasksReducer(startTasksState, action);
	const endTodolistsState = todolistsReducer(startTodolistsState, action);

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	
});

// ​test('ids should be equals', () => {
// 	const startTasksState: TasksStateType = {}
// 	const startTodolistsState: Array<TodolistType> = []

// 	const action = addTodolistAC('new todolist')

// 	const endTasksState = tasksReducer(startTasksState, action)
// 	const endTodolistsState = todolistsReducer(startTodolistsState, action)

// 	const keys = Object.keys(endTasksState)
// 	const idFromTasks = keys[0]
// 	const idFromTodolists = endTodolistsState[0].id

// 	expect(idFromTasks).toBe(action.todolistId)
// 	expect(idFromTodolists).toBe(action.todolistId)
// })​
