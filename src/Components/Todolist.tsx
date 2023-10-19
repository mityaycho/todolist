import React from "react";
import { Button } from "./Button";
import { subscribe } from "diagnostics_channel";

export type TaskType = {
	id: number,
	title: string,
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskType>
}

export function Todolist(props: PropsType) {

	const Button1Foo = (subscriber: string, age: number, adress: string) => {
		console.log(subscriber, age, adress);
	};


	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				<li><input type="checkbox" checked={props.tasks[0].isDone} /> <span>{props.tasks[0].title}</span></li>
				<li><input type="checkbox" checked={props.tasks[1].isDone} /> <span>{props.tasks[1].title}</span></li>
				<li><input type="checkbox" checked={props.tasks[2].isDone} /> <span>{props.tasks[2].title}</span></li>
			</ul>
			<div>
				<Button name={"All"} callBack={() => Button1Foo("Im Dima", 40, "Live in Moscow")} />
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	);
};