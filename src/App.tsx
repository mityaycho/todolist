import React, { useState } from 'react';
import { TaskType, Todolist } from './Components/Todolist';
import { TestFilter } from './TestFilter';
import './App.css';

let tasks1: Array<TaskType> = [
	{ id: 1, title: "CSS", isDone: true },
	{ id: 2, title: "JS", isDone: true },
	{ id: 3, title: "React", isDone: false }
];

let tasks2: Array<TaskType> = [
	{ id: 1, title: "Terminator", isDone: true },
	{ id: 2, title: "XXX", isDone: false },
	{ id: 3, title: "Jentlments of fortune", isDone: true }
];

// const topCars = [
//   {manufacturer:'BMW', model:'m5cs'},
//   {manufacturer:'Mercedes', model:'e63s'},
//   {manufacturer:'Audi', model:'rs6'}
// ];

// topCars.map((el, i) => console.log(`car: ${el.manufacturer}, model: ${el.model}`));

function App() {

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

	// const [fltr, setFilter] = useState("all");

	// let currentMoney = money;

	// fltr === "ruble" &&
	// 	(currentMoney = money.filter((filteredMoney) => filteredMoney.banknots === "RUBLS"))

	// 	fltr === "dollar" &&
	// 	(currentMoney = money.filter((filteredMoney) => filteredMoney.banknots === "Dollars"))

	// const sortBanknots = (nameBtn: string) => setFilter(nameBtn);

	return (
		<div className="App">
			<Todolist title="What to learn" tasks={tasks1} />
			<Todolist title="Movies" tasks={tasks2} />

			{/* <ul>
				{currentMoney.map((objFromMoneyArr: any, i) => {
					return (
						<li key={i}>
							<span> {objFromMoneyArr.banknots} </span>
							<span> {objFromMoneyArr.value} </span>
							<span> {objFromMoneyArr.number} </span>
						</li>
					)
				})}
			</ul>
			<TestFilter sortBanknots={sortBanknots}/> */}
		</div>
	);
}

export default App;
