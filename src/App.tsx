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

	let [tasks, setTasks] = useState ([
		{ id: v1(), title: "CSS", isDone: true },
		{ id: v1(), title: "JS", isDone: true },
		{ id: v1(), title: "React", isDone: false }
	]);
	
	// let [tasks2, delTask2] = useState ([
	// 	{ id: 1, title: "Terminator", isDone: true },
	// 	{ id: 2, title: "XXX", isDone: false },
	// 	{ id: 3, title: "Jentlments of fortune", isDone: true }
	// ]);

	function addTask(title: string) {
		const task = { id: v1(), title: title, isDone: false };
		const newTasks = [task, ...tasks];
		setTasks(newTasks);
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
		tasksCopy.map(el => {
			el.id === id && (el.isDone = !isDone);
		});
		setTasks([...tasksCopy]);
	};

	let tasksForTodoList = tasks;

	const [filter, setFilter] = useState("All");

	filter === "Active" && (tasksForTodoList = tasks.filter(task => !task.isDone));

	filter === "Completed" && (tasksForTodoList = tasks.filter(task => task.isDone));

	const filterTasks = (value:string) => setFilter(value);


	// const [money, setMoney] = useState([
	// 	{ banknots: 'Dollars', value: 100, number: ' a1234567890' },
	// 	{ banknots: 'Dollars', value: 50, number: ' z1234567890' },
	// 	{ banknots: 'RUBLS', value: 100, number: ' w1234567890' },
	// 	{ banknots: 'Dollars', value: 100, number: ' e1234567890' },
	// 	{ banknots: 'Dollars', value: 50, number: ' c1234567890' },
	// 	{ banknots: 'RUBLS', value: 100, number: ' r1234567890' },
	// 	{ banknots: 'Dollars', value: 50, number: ' x1234567890' },
	// 	{ banknots: 'RUBLS', value: 50, number: ' v1234567890' },
	// ]);

	// const [fltr, setFltr] = useState("all");

	// let currentMoney = money;

	// fltr === "ruble" &&
	// 	(currentMoney = money.filter((filteredMoney) => filteredMoney.banknots === "RUBLS"))

	// 	fltr === "dollar" &&
	// 	(currentMoney = money.filter((filteredMoney) => filteredMoney.banknots === "Dollars"))

	// const sortBanknots = (nameBtn: string) => setFltr(nameBtn);

	return (
		<div className="App">
			<Todolist 
			title="What to learn" 
			tasks={tasksForTodoList} 
			delTasks={removeTask} 
			filterTasks={filterTasks} 
			addTask={addTask} 
			changeTaskStatus={changeTaskStatus}
			/>
			{/* <Todolist title="Movies" tasks={tasks2} delTask2={delTask2} /> */}

			{/* <ul>
				{currentMoney.map((objFromMoneyArr: {banknots: string, value: number, number: string}, i) => {
					return (
						<li key={i}>
							<span> {objFromMoneyArr.banknots} </span>
							<span> {objFromMoneyArr.value} </span>
							<span> {objFromMoneyArr.number} </span>
						</li>
					)
				})}
			</ul>
			<TestFilter sortBanknots={sortBanknots} /> */}
		</div>
	);
};

export default App;