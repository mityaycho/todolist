import React, { ChangeEvent } from "react";

type InputPropsType = {
	title: string;
	setTitle: (title: string) => void;
}

export function Input(props: InputPropsType) {

	const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		props.setTitle(event.currentTarget.value);
	};

	

	return <input value={props.title} onChange={onChangeInputHandler}/>;
};