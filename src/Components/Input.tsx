import { ChangeEvent, KeyboardEvent } from "react";

type InputPropsType = {
	title: string;
	error: string | null | undefined;
	setError: () => void;
	setTitle: (title: string) => void;
	addTask: () => void;
};

export function Input(props: InputPropsType) {

	const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
		props.setTitle(event.currentTarget.value);
	}

	const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		props.setError();
		event.key === "Enter" && props.addTask();
	};

	return <input 
	className={props.error ? "error" : ""} 
	value={props.title} 
	onChange={onChangeEventHandler} 
	onKeyDown={onKeyDownEventHandler} 
	/>;
};