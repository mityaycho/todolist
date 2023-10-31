import React from "react";

type ButtonType = {
	name: string;
	classNameStatus: string;
	callBack: () => void;
};

export function Button(props: ButtonType) {
	const onClickHandler = () => props.callBack();

	return <button className={props.classNameStatus} onClick={onClickHandler}>{props.name}</button>;
};