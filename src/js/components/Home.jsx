import { useEffect, useState } from "react";

const Home = () => {

	const [list, setList] = useState([])

	async function hello() {
		let characters = await fetch("https://playground.4geeks.com/todo/users/IsraelApp")
		let data = await characters.json()
		setList(data.todos)
	}
	console.log(list)


	useEffect(() => {
		hello()
	}, [])

	return (
		<div className="text-center">
			<h1>Lista de Tareas</h1>
			<ul class="list-group">

				{
					list.map((e) => {
						return (
							<li class="list-group-item">{
								e.label}</li>
						)
					})
				}

			</ul>

		</div >
	);
};

export default Home;