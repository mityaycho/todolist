import React from "react";
import { Button } from "./Button";
import { subscribe } from "diagnostics_channel";

export type TaskType = {
	id: number;
	title: string;
	isDone: boolean;
};

export type PropsType = {
	title: string;
	tasks: Array<TaskType>;
	delTasks: (taskId: number) => void;
};

export function Todolist(props: PropsType) {

	
	const inputs = props.tasks.map((el) => <li key={el.id}><input type="checkbox" checked={el.isDone} /> <span>{el.title}</span><Button name="x" callBack={() => props.delTasks(el.id)}/></li>)


	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				{inputs}
			</ul>
			<div>
				<Button name={"All"} callBack={() => "hello world"} />
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	);
};