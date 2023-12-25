import { IconButton } from '@mui/material';

type ButtonType = {
	name: any;
	classNameStatus: string;
	callBack: () => void;
};

export function Button(props: ButtonType) {
	const onClickHandler = () => props.callBack();

	return (
		<IconButton
			className={props.classNameStatus}
			onClick={onClickHandler}>
			{props.name}
		</IconButton>
	);
};