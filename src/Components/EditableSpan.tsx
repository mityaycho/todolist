import { useState } from "react";


type EditableSpanPropsType = {
	title: string;
};

const EditableSpan = (props: EditableSpanPropsType) => {
	const [editMod, setEditMode] = useState(false);

	const activateEditMode = () => setEditMode(true);
	const activateViewMode = () => setEditMode(false);

	return (
		editMod ?
		<input value={props.title} onBlur={activateViewMode} autoFocus /> :
		<span onDoubleClick={activateEditMode}>{props.title}</span>

	);
};

export default EditableSpan;