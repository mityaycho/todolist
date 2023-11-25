import { Button } from "@mui/material";

export type propType = {
	filter: string;
	id: string;
	filterTasks: (id: string, value: string) => void;
}

const buttons = ["All", "Active", "Completed"];

export function FilterTasksButtons(props: propType) {
	return buttons.map((el: string) => <Button 
	className={el === props.filter ? "active-filter" : ""} 
	onClick={() => props.filterTasks(props.id, el)}>
		{el}
		</Button>);
}