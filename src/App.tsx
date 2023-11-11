import { useState } from 'react';
import { TaskType, Todolist, TodolistsType } from './Components/Todolist';
import './App.css';
import { v1 } from 'uuid';


function App() {

	// const [tasks, setTasks] = useState([
	// 	{ id: v1(), title: "HTML&CSS", isDone: true },
	// 	{ id: v1(), title: "JS", isDone: true },
	// 	{ id: v1(), title: "ReactJS", isDone: false },
	// 	{ id: v1(), title: "Rest API", isDone: false },
	// 	{ id: v1(), title: "GraphQL", isDone: false }
	// ]);

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistsType>>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },

		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		]
	})


	const [error, setError] = useState<string | null | undefined>(null);

	const changeSetError = () => {
		setError(null);
	};

	function addTask(title: string, todolistId: string) {
		const task = { id: v1(), title: title.trim(), isDone: false };
		const todolistTasks = tasks[todolistId];
		tasks[todolistId] = [task, ...todolistTasks];
		title.trim() !== "" ? setTasks({ ...tasks }) : setError("Title is required");
	};

	const removeTask = (taskId: string, todolistId: string) => {
		let todolistTasks = tasks[todolistId];

		tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId);
		setTasks({ ...tasks });
	};

	const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
		let todolistTasks = tasks[todolistId];
		const task = todolistTasks.find(task => task.id === id);

		if (task) {
			task.isDone = isDone;
			setTasks({...tasks});
		}
	};

	// const [todolists, setTodolists] = useState<Array<TodolistsType>>(

	// 	[
	// 		{ id: v1(), title: 'What to learn', filter: 'All' },
	// 		{ id: v1(), title: 'What to buy', filter: 'All' },
	// 	]
	// );


	const changeFilter = (id: string, value: string) => {
		let todolist = todolists.find(tl => tl.id === id);

		if (todolist) {
			todolist.filter = value;
			setTodolists([...todolists]);
		}
	};


	return (
		<div className="App">
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
					return <Todolist
						key={todolist.id}
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
					/>
				})}

		</div>
	);
};

export default App;