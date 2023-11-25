import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";

type AddItemFormPropsType = {
	addItem: (title: string) => void;
};

const AddItemForm = (props: AddItemFormPropsType) => {
	const [title, setTitle] = useState(" ");
	const [error, setError] = useState<string | null>(null);

	const addItem = () => {
		if (title.trim() !== "") {
			props.addItem(title);
			setTitle("");
		} else {
			setError("Title id required");
		};
	};

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value);
	};

	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (event.key === "Enter") {
			addItem();
		};
	};


	return (
		<div>
			<TextField
				label="Title"
				helperText={error}
				error={!!error}
				value={title}
				onChange={onChangeHandler}
				onKeyDown={onKeyPressHandler}
			/>
			<IconButton color="primary" onClick={addItem}>
				<AddBox />
			</IconButton>
		</div>
	);
};

export default AddItemForm;