import { ChangeEvent, useState } from "react";


type EditableSpanPropsType = {
	title: string;
};

const EditableSpan = (props: EditableSpanPropsType) => {
	const [editMod, setEditMode] = useState(false);
	const [title, setTitle] = useState("");

	const activateEditMode = () => {
		setEditMode(true);
		setTitle(props.title);
	};
	const activateViewMode = () => setEditMode(false);
	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

	return (
		editMod ?
		<input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus /> :
		<span onDoubleClick={activateEditMode}>{props.title}</span>

	);
};

export default EditableSpan;