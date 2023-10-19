import React from "react";
import { Button } from "./Components/Button";

export function TestFilter(props: any) {
	return (
		<div>
				<Button name={"all"} callBack={() => props.sortBanknots("all")} />
				<Button name={"ruble"} callBack={() => props.sortBanknots("ruble")} />
				<Button name={"dollar"} callBack={() => props.sortBanknots("dollar")} />
			</div>
	);
};