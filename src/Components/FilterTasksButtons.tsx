import { Button } from "@mui/material";

export type propType = {
	filter: string;
	id: string;
	filterTasks: (id: string, value: string) => void;
}


const FilterTasksButtons = (props: propType) => {
	const buttons = ["All", "Active", "Completed"];
	return (
		<div>
			{
				buttons.map((el: string) => <Button
					variant={el === props.filter ? "outlined" : "text"}
					onClick={() => props.filterTasks(props.id, el)}>
					{el}
				</Button>)
				}
		</div>
	)
};

export default FilterTasksButtons;