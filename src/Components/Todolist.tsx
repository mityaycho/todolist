import { ChangeEvent, useState } from "react";
import { Button } from "./Button";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import FilterTasksButtons from "./FilterTasksButtons";
import { v1 } from "uuid";

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
	error: string | null;
	setError: () => void;
	removeTodoList: (id: string) => void;
	removeTask: (taskId: string, todolistId: string) => void;
	filterTasks: (id: string, value: string) => void;
	addTask: (title: string, todolistId: string) => void;
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
	changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
	changeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

export type TodolistType = {
	id: string;
	title: string;
	filter: string;
};

export function Todolist(props: PropsType) {

	const deleteIcon = <Delete />;

	const [message, setMessage] = useState([
		{ message: "message1" },
		{ message: "message2" },
		{ message: "message3" }
	]);

	const addMessage = (title: string) => {
		const newMessage = { message: title };
		setMessage([newMessage, ...message]);
	};

	const onChangeStatusHandler = (id: string, event: ChangeEvent<HTMLInputElement>) => {
		props.changeTaskStatus(id, event.currentTarget.checked, props.id);
	};

	const onChangeTitleHandler = (id: string, newTitle: string) => {
		props.changeTaskTitle(id, newTitle, props.id);
	};

	const changeTodolistTitle = (newTitle: string) => {
		props.changeTodolistTitle(props.id, newTitle);
	};

	const inputs = props.tasks.map((el) => {
		return (
			<li key={v1()} className={el.isDone ? "is-done" : ""}>
				<Checkbox color="primary" checked={el.isDone} onChange={(e) => onChangeStatusHandler(el.id, e)} />
				<EditableSpan title={el.title} onChange={(e) => onChangeTitleHandler(el.id, e)} />
				<Button classNameStatus="" name={deleteIcon} callBack={() => props.removeTask(el.id, props.id)} />
			</li>
		)
	});

	const addTask = (title: string) => {
		props.addTask(title, props.id);
		addMessage(title);
		// setTitle("");
	};



	return (
		<div>
			<h3>
				<EditableSpan title={props.title} onChange={changeTodolistTitle} />
				<Button classNameStatus="" name={deleteIcon} callBack={() => props.removeTodoList(props.id)} />
			</h3>
			<AddItemForm addItem={addTask} />
			{/* <div>
				<Input
					setTitle={setTitle}
					title={title}
					addTask={addTask}
					error={props.error}
					setError={props.setError}
				/>
				<Button classNameStatus="" name={"+"} callBack={addTask} />
				{props.error && <div className="error-message">{props.error}</div>}
				{message.map((el, i) => <div key={i}>{el.message}</div>)}
			</div> */}
			<ul>
				{inputs}
			</ul>
			<FilterTasksButtons filter={props.filter} id={props.id} filterTasks={props.filterTasks} />
		</div>
	);
};