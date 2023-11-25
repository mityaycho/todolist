import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";


type EditableSpanPropsType = {
	title: string;
	onChange: (newValue: string) => void;
};

const EditableSpan = (props: EditableSpanPropsType) => {
	const [editMod, setEditMode] = useState(false);
	const [title, setTitle] = useState("");

	const activateEditMode = () => {
		setEditMode(true);
		setTitle(props.title);
	};
	const activateViewMode = () => setEditMode(false);
	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
		props.onChange(title);
	}

	return (
		editMod ?
		<TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus /> :
		<span onDoubleClick={activateEditMode}>{props.title}</span>

	);
};

export default EditableSpan;