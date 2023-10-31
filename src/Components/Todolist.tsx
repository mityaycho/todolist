import React, { useState, KeyboardEvent, ChangeEvent } from "react";
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
	filter: string;
	error: string | null | undefined;
	setError: () => void;
	delTasks: (taskId: string) => void;
	filterTasks: (value: string) => void;
	addTask: (title: string) => void;
	changeTaskStatus: (id: string, isDone: boolean) => void;
};

export function Todolist(props: PropsType) {

	let [message, setMessage] = useState([
		{message: "message1"},
		{message: "message2"},
		{message: "message3"}
	]);

	let [title, setTitle] = useState('');

	const addMessage = (title: string) => {
		let newMessage = {message: title};
		setMessage([newMessage, ...message]);
	};

	const inputs = props.tasks.map((el) => <li key={el.id}><input type="checkbox" checked={el.isDone} onChange={() => props.changeTaskStatus(el.id, el.isDone)}/> <span>{el.title}</span><Button classNameStatus="" name="x" callBack={() => props.delTasks(el.id)}/></li>);

	const addTask = () => {
		props.addTask(title);
		addMessage(title);
		setTitle("");
	};

	// const addTaskEnter = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addTask();

	const buttons = ["All", "Active", "Completed"];

	const filterTasksButtons = () => buttons.map((el: string) => <Button classNameStatus={el === props.filter ? "active-filter" : ""} name={el} callBack={() => props.filterTasks(el)} />);


	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<Input 
				setTitle={setTitle} 
				title={title} 
				addTask={addTask} 
				error={props.error} 
				setError={props.setError} 
				/>
				<Button classNameStatus="" name = {"+"} callBack={addTask}/>
				{props.error && <div className="error-message">{props.error}</div>}
				{message.map((el, i) => <div key={i}>{el.message}</div>)}
			</div>
			<ul>
				{inputs}
			</ul>
			<div>
				{filterTasksButtons()}
			</div>
		</div>
	);
};