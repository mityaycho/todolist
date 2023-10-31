import React from "react";
import { Button } from "./Components/Button";

type sortBanknotsType = {
	sortBanknots: (nameBtn: string) => void;
};

export function TestFilter(props: sortBanknotsType) {
	return (
		<div>
				{/* <Button name={"all"} callBack={() => props.sortBanknots("all")} />
				<Button name={"ruble"} callBack={() => props.sortBanknots("ruble")} />
				<Button name={"dollar"} callBack={() => props.sortBanknots("dollar")} /> */}
			</div>
	);
};