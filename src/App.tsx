import { useState } from 'react';
import { TaskType, Todolist, TodolistsType } from './Components/Todolist';
import './App.css';
import { v1 } from 'uuid';


function App() {

	const [tasks, setTasks] = useState([
		{ id: v1(), title: "HTML&CSS", isDone: true },
		{ id: v1(), title: "JS", isDone: true },
		{ id: v1(), title: "ReactJS", isDone: false },
		{ id: v1(), title: "Rest API", isDone: false },
		{ id: v1(), title: "GraphQL", isDone: false }
	]);

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

	const [todolists, setTodolists] = useState<Array<TodolistsType>>(
		[
			{ id: v1(), title: 'What to learn', filter: 'All' },
			{ id: v1(), title: 'What to buy', filter: 'All' },
		]
	);

	let tasksForTodoList = tasks;

	const [filter, setFilter] = useState("All");

	todolists.map(todolist => {
		todolist.filter === "Active" && (tasksForTodoList = tasks.filter(task => !task.isDone));

		todolist.filter === "Completed" && (tasksForTodoList = tasks.filter(task => task.isDone));
	});

	const filterTasks = (id: string, value: string) => setFilter(value);


	return (
		<div className="App">
			{
				todolists.map(todolist =>
					<Todolist
						key={todolist.id}
						id={todolist.id}
						title={todolist.title}
						filter={todolist.filter}
						error={error}
						setError={changeSetError}
						tasks={tasksForTodoList}
						delTasks={removeTask}
						filterTasks={filterTasks}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
					/>
				)}

		</div>
	);
};

export default App;