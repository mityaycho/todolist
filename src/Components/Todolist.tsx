import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

export type PropsType = {
	title: string;
	tasks: Array<TaskType>;
	delTasks: (taskId: string) => void;
	filterTasks: (value: "all" | "active" | "completed") => void;
	addTask: () => void;
};

export function Todolist(props: PropsType) {

	let [message, setMessage] = useState([
		{message: "message1"},
		{message: "message2"},
		{message: "message3"}
	])

	let [title, setTitle] = useState('');

	const addMessage = (title: string) => {
		let newMessage = {message: title};
		setMessage([newMessage, ...message])
	}
	const inputs = props.tasks.map((el) => <li key={el.id}><input type="checkbox" checked={el.isDone} /> <span>{el.title}</span><Button name="x" callBack={() => props.delTasks(el.id)}/></li>);

	const callBackButtonHandler = () => {
		addMessage(title);
		setTitle("");
	};


	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<Input setTitle={setTitle} title={title} />
				<Button name = {"+"} callBack={props.addTask}/>
				{message.map((el, i) => <div key={i}>{el.message}</div>)}
			</div>
			<ul>
				{inputs}
			</ul>
			<div>
				<Button name={"All"} callBack={() => props.filterTasks("all")} />
				<Button name={"Active"} callBack={() => props.filterTasks("active")} />
				<Button name={"Completed"} callBack={() => props.filterTasks("completed")} />
			</div>
		</div>
	);
};