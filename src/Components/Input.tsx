import { TextField, TextFieldVariants } from "@mui/material";
import { ChangeEvent, KeyboardEvent } from "react";

type InputPropsType = {
	variant: TextFieldVariants | undefined
	title: string;
	error: string | null;
	setError: () => void;
	setTitle: (value: string) => void;
	addTask: () => void;
};

export function Input(props: InputPropsType) {

	const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
		props.setTitle(event.currentTarget.value);
	};

	const onKeyDownEventHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		props.setError();
		event.key === "Enter" && props.addTask();
	};

	return <TextField
		variant={'outlined'}
		className={props.error ? "error" : " "}
		value={props.title}
		onChange={onChangeEventHandler}
		onKeyDown={onKeyDownEventHandler}
	/>;
};