import { useEffect, useState } from "react";

const Home = () => {
	const username = "IsraelApp";
	const baseUrl = `https://playground.4geeks.com/todo/users/${username}`;

	const [list, setList] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [error, setError] = useState("");

	const loadTodos = async () => {
		try {
			const response = await fetch(baseUrl);
			if (!response.ok) throw new Error("No se pudo cargar la lista");
			const data = await response.json();
			setList(data.todos || []);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleAddTask = async (event) => {
		event.preventDefault();
		const task = newTask.trim();
		if (!task) return;

		try {
			const response = await fetch(`${baseUrl}/todos`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ label: task, is_done: false })
			});

			if (!response.ok) throw new Error("No se pudo agregar la tarea");

			setNewTask("");
			await loadTodos();
		} catch (err) {
			setError(err.message);
		}
	};

	const handleDeleteTask = async (todoId) => {
		try {
			const response = await fetch(`${baseUrl}/todos/${todoId}`, {
				method: "DELETE"
			});

			if (!response.ok) throw new Error("No se pudo eliminar la tarea");

			setList((prevList) => prevList.filter((task) => task.id !== todoId));
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		loadTodos();
	}, []);

	return (
		<div className="text-center">
			<h1>Lista de Tareas</h1>
			<form onSubmit={handleAddTask} className="mb-3">
				<input
					type="text"
					value={newTask}
					onChange={(event) => setNewTask(event.target.value)}
					placeholder="Escribe una tarea y presiona Enter"
					className="form-control"
				/>
			</form>

			{error && <p className="text-danger">{error}</p>}

			<ul className="list-group">
				{
					list.map((e) => {
						return (
							<li
								key={e.id}
								className="list-group-item d-flex justify-content-between align-items-center"
							>
								<span>{e.label}</span>
								<button
									type="button"
									className="btn btn-sm btn-danger"
									onClick={() => handleDeleteTask(e.id)}
								>
									Eliminar
								</button>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
};

export default Home;