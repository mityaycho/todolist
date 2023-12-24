import { useReducer, useState } from 'react';
import { TaskType, Todolist, TodolistType } from './Components/Todolist';
import './App.css';
import { v1 } from 'uuid';
import AddItemForm from './Components/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import { addTodolistAC, todolistsReducer, changeTodolistFilterAC, removeTodolistAC } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';

export type TasksStateType = {
	[key: string]: Array<TaskType>;
};


function AppWithRedux () {

	let todolistID1 = v1();
	let todolistID2 = v1();

	// let [todolists, dispatch] = useReducer(todolistsReducer, [
	// 	{ id: todolistID1, title: 'What to learn', filter: 'all' },
	// 	{ id: todolistID2, title: 'What to buy', filter: 'all' },
	// ]);
	const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

	// let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
	// 	[todolistID1]: [
	// 		{ id: v1(), title: 'HTML&CSS', isDone: true },
	// 		{ id: v1(), title: 'JS', isDone: true },
	// 		{ id: v1(), title: 'ReactJS', isDone: false },

	// 	],
	// 	[todolistID2]: [
	// 		{ id: v1(), title: 'Rest API', isDone: true },
	// 		{ id: v1(), title: 'GraphQL', isDone: false },
	// 	]
	// });
	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

	const dispatch = useDispatch();

	const [error, setError] = useState<string | null>(null);

	const changeSetError = () => {
		error !== null && setError(null);
	};

	function addTask(title: string, todolistId: string) {
		// const task = { id: v1(), title: title.trim(), isDone: false };
		// const todolistTasks = tasks[todolistId];

		// tasks[todolistId] = [task, ...todolistTasks];
		// title.trim() !== "" ? dispatchToTasks({ ...tasks }) : setError("Title is required");
		const action = addTaskAC(title, todolistId);
		dispatch(action);
	};

	const removeTask = (taskId: string, todolistId: string) => {
		// let todolistTasks = tasks[todolistId];

		// tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId);
		// dispatchToTasks({ ...tasks });
		const action = removeTaskAC(taskId, todolistId);
		dispatch(action);
	};

	const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
		// let todolistTasks = tasks[todolistId];
		// const task = todolistTasks.find(task => task.id === id);

		// if (task) {
		// 	task.isDone = isDone;
		// 	dispatchToTasks({ ...tasks });
		// };
		const action = changeTaskStatusAC(id, isDone, todolistId);
		dispatch(action);
	};

	const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
		// let todolistTasks = tasks[todolistId];
		// const task = todolistTasks.find(task => task.id === id);

		// if (task) {
		// 	task.title = newTitle;
		// 	dispatchToTasks({ ...tasks });
		// };
		const action = changeTaskTitleAC(id, newTitle, todolistId);
		dispatch(action);
	};

	const changeTodolistTitle = (todolistId: string, newTitle: string) => {
		// const todolist = todolists.find(tl => tl.id === todolistId);
		// if (todolist) {
		// 	todolist.title = newTitle;
		// 	dispatch([...todolists]);
		// };
		const action = changeTodolistFilterAC(todolistId, newTitle);
		dispatch(action);
	};

	const changeFilter = (id: string, value: string) => {
		// let todolist = todolists.find(tl => tl.id === id);

		// if (todolist) {
		// 	todolist.filter = value;
		// 	dispatch([...todolists]);
		// };
		const action = changeTodolistFilterAC(id, value);
		dispatch(action);
	};

	const removeTodoList = (id: string) => {
		// dispatch(todolists.filter(todolist => todolist.id !== id));
		// delete tasks[id];
		// dispatchToTasks({ ...tasks });
		const action = removeTodolistAC(id);
		dispatch(action);
	};

	const addTodolist = (title: string) => {
		// const newTodolistId = v1();
		// const newTodolist: TodolistType = { id: newTodolistId, title: title, filter: "All" };

		// dispatch([newTodolist, ...todolists]);
		// dispatchToTasks({ ...tasks, [newTodolistId]: [] });
		const action = addTodolistAC(title);
		dispatch(action);
		dispatch(action);
	};

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu open={false} />
					</IconButton>
					<Typography variant="h6">
						Todolist
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>

			<Container fixed>
				<Grid container style={{ padding: "20px" }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{
						todolists.map(todolist => {
							let allTodolistTasks = tasks[todolist.id];
							let tasksForTodoList = allTodolistTasks;

							if (todolist.filter === "Active") {
								tasksForTodoList = allTodolistTasks.filter(t => !t.isDone);
							};

							if (todolist.filter === "Completed") {
								tasksForTodoList = allTodolistTasks.filter(t => t.isDone);
							};
							return <Grid key={todolist.id} item>
								<Paper style={{ padding: "10px" }}>
									<Todolist
										id={todolist.id}
										title={todolist.title}
										filter={todolist.filter}
										error={error}
										setError={changeSetError}
										tasks={tasksForTodoList}
										removeTask={removeTask}
										filterTasks={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										changeTaskTitle={changeTaskTitle}
										changeTodolistTitle={changeTodolistTitle}
										removeTodoList={removeTodoList}
									/>
								</Paper>
							</Grid>
						})}
				</Grid>
			</Container>

		</div>
	);
};

export default AppWithRedux ;