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

	function addTask(title: string) {
		const task = { id: v1(), title: title.trim(), isDone: false };
		const newTasks = [task, ...tasks];
		title.trim() !== "" ? setTasks(newTasks) : setError("Title is required");
	};

	const removeTask = (taskId: string) => {
		const nextState: Array<TaskType> = [];

		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].id !== taskId) {
				nextState.push(tasks[i]);
			};
			setTasks(nextState);
		};
	};

	const changeTaskStatus = (id: string, isDone: boolean) => {
		const tasksCopy = tasks;
		tasksCopy.map(el => el.id === id && (el.isDone = isDone));
		setTasks([...tasksCopy]);
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
					let tasksForTodoList = tasks;

					if (todolist.filter === "Active") {
						tasksForTodoList = tasks.filter(t => !t.isDone);
					};

					if (todolist.filter === "Completed") {
						tasksForTodoList = tasks.filter(t => t.isDone);
					};
					return <Todolist
						key={todolist.id}
						id={todolist.id}
						title={todolist.title}
						filter={todolist.filter}
						error={error}
						setError={changeSetError}
						tasks={tasksForTodoList}
						delTasks={removeTask}
						filterTasks={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
					/>
				})}

		</div>
	);
};

export default App;