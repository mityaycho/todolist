
type ButtonType = {
	name: string;
	classNameStatus: string;
	callBack: () => void;
};

export function Button(props: ButtonType) {
	const onClickHandler = () => props.callBack();

	return (
		<button
			style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
			className={props.classNameStatus}
			onClick={onClickHandler}>
			{props.name}
		</button>
	);
};