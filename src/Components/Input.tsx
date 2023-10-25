import React, { ChangeEvent, KeyboardEvent } from "react";

type InputPropsType = {
	title: string;
	setTitle: (title: string) => void;
	addTask: () => void;
};

export function Input(props: InputPropsType) {

	const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		props.setTitle(event.currentTarget.value);
	};

	const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		event.key === "Enter" && props.addTask();
	};

	return <input value={props.title} onChange={onChangeInputHandler} onKeyDown={onKeyDownEventHandler}/>;
};