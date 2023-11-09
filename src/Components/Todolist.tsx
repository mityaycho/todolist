import { ChangeEvent, useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

export type PropsType = {
	id: string;
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

export type TodolistsType = {
	id: string;
	title: string;
	filter: string;
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

	const onChangeHandler = (id: string, event: ChangeEvent<HTMLInputElement>) => {
		props.changeTaskStatus(id, event.currentTarget.checked);
	};

	const inputs = props.tasks.map((el) => <li key={el.id} className={el.isDone ? "is-done" : ""}><input type="checkbox" checked={el.isDone} onChange={(e) => onChangeHandler(el.id, e)}/> <span>{el.title}</span><Button classNameStatus="" name="x" callBack={() => props.delTasks(el.id)}/></li>);

	const addTask = () => {
		props.addTask(title);
		addMessage(title);
		setTitle("");
	};

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