import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "./Input";

type AddItemFormType = {
	addItem: (title: string) => void;
};

const AddItemForm = (props: AddItemFormType) => {
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
				<input
					value={title}
					onChange={onChangeHandler}
					onKeyDown={onKeyPressHandler}
					className={error ? "error" : ""}
				/>
				<button onClick={addItem}>+</button>
				{error && <div className="error-message">{error}</div>}
			</div>
		);
};

export default AddItemForm;