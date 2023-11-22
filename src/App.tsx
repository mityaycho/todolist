import { useState } from 'react';
import { TaskType, Todolist, TodolistsType } from './Components/Todolist';
import './App.css';
import { v1 } from 'uuid';
import AddItemForm from './Components/AddItemForm';

type TasksStateType = {
	[key: string]: Array<TaskType>;
};


function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistsType>>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	]);

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },

		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		]
	});


	const [error, setError] = useState<string | null>(null);

	const changeSetError = () => {
		setError(null);
	};

	function addTask(title: string, todolistId: string) {
		const task = { id: v1(), title: title.trim(), isDone: false };
		const todolistTasks = tasks[todolistId];
		
		tasks[todolistId] = [task, ...todolistTasks];
		title.trim() !== "" ? setTasks({ ...tasks }) : setError("Title is required");
	};

	const removeTask = (taskId: string, todolistId: string) => {
		let todolistTasks = tasks[todolistId];

		tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId);
		setTasks({ ...tasks });
	};

	const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
		let todolistTasks = tasks[todolistId];
		const task = todolistTasks.find(task => task.id === id);

		if (task) {
			task.isDone = isDone;
			setTasks({...tasks});
		};
	};

	const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
		let todolistTasks = tasks[todolistId];
		const task = todolistTasks.find(task => task.id === id);

		if (task) {
			task.title = newTitle;
			setTasks({...tasks});
		};
	};

	const changeTodolistTitle = (todolistId: string, newTitle: string) => {
		const todolist = todolists.find(tl => tl.id === todolistId);
		if (todolist) {
			todolist.title = newTitle;
			setTodolists([...todolists]);
		};
	};


	const changeFilter = (id: string, value: string) => {
		let todolist = todolists.find(tl => tl.id === id);

		if (todolist) {
			todolist.filter = value;
			setTodolists([...todolists]);
		};
	};

	const removeTodoList = (id: string) => {
		setTodolists(todolists.filter(todolist => todolist.id !== id));
		delete tasks[id];
		setTasks({...tasks});
	};

	const addTodolist = (title: string) => {
		const newTodolistId = v1();
		const newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: "All"};

		setTodolists([newTodolist, ...todolists]);
		setTasks({...tasks, [newTodolistId]: []});
	};

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist} />

			{
				todolists.map(todolist => {
					let allTodolistTasks = tasks[todolist.id];
					let tasksForTodoList = allTodolistTasks;

					if (todolist.filter === "Active") {
						tasksForTodoList = allTodolistTasks.filter(t => !t.isDone);
					};

					if (todolist.filter === "Completed") {
						tasksForTodoList = allTodolistTasks.filter(t => t.isDone);
					};
					return <Todolist
						key={todolist.id}
						id={todolist.id}
						title={todolist.title}
						filter={todolist.filter}
						error={error}
						setError={changeSetError}
						tasks={tasksForTodoList}
						removeTask={removeTask}
						filterTasks={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						changeTaskTitle={changeTaskTitle}
						changeTodolistTitle={changeTodolistTitle}
						removeTodoList={removeTodoList}
					/>
				})}

		</div>
	);
};

export default App;