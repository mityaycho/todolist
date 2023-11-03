import React, { useState } from 'react';
import { PropsType, TaskType, Todolist } from './Components/Todolist';
import { TestFilter } from './TestFilter';
import './App.css';
import { v1 } from 'uuid';



// const topCars = [
//   {manufacturer:'BMW', model:'m5cs'},
//   {manufacturer:'Mercedes', model:'e63s'},
//   {manufacturer:'Audi', model:'rs6'}
// ];

// topCars.map((el, i) => console.log(`car: ${el.manufacturer}, model: ${el.model}`));

function App() {

	const [tasks, setTasks] = useState ([
		{ id: v1(), title: "CSS", isDone: true },
		{ id: v1(), title: "JS", isDone: true },
		{ id: v1(), title: "React", isDone: false }
	]);

	const [error, setError] = useState<string | null | undefined>(null);

	const changeSetError = () => {
		setError(null);
	};
	
	// let [tasks2, delTask2] = useState ([
	// 	{ id: 1, title: "Terminator", isDone: true },
	// 	{ id: 2, title: "XXX", isDone: false },
	// 	{ id: 3, title: "Jentlments of fortune", isDone: true }
	// ]);

	function addTask(title: string) {
		const task = { id: v1(), title: title.trim(), isDone: false };
		const newTasks = [task, ...tasks];
		title.trim() !== "" ? setTasks(newTasks) : setError("Title is required");
	};

	const removeTask = (taskId: string) => {
		const nextState:Array<TaskType> = [];

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

	let tasksForTodoList = tasks;

	const [filter, setFilter] = useState("All");

	filter === "Active" && (tasksForTodoList = tasks.filter(task => !task.isDone));

	filter === "Completed" && (tasksForTodoList = tasks.filter(task => task.isDone));

	const filterTasks = (value:string) => setFilter(value);


	return (
		<div className="App">
			<Todolist 
			title="What to learn" 
			filter={filter} 
			error={error} 
			setError={changeSetError} 
			tasks={tasksForTodoList} 
			delTasks={removeTask} 
			filterTasks={filterTasks} 
			addTask={addTask} 
			changeTaskStatus={changeTaskStatus}
			/>
		</div>
	);
};

export default App;