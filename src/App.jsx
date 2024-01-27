import { useState } from 'react'
import './App.css'

function App() {
	const [tasks, setTasks] = useState([])
	const [inputText, setInputText] = useState("")
	const [remainingCount, setRemainingCount] = useState(0)
	const [totalCount, setTotalCount] = useState(0)

	const handleChange = (e) => {
		setInputText(e.target.value)
	}

	const handleButtonClick = () => {
		if(inputText.length===0) return
		setTasks(prevState => [...prevState, inputText])
		setRemainingCount(value => value+1)
		setTotalCount(value => value+1)
		setInputText("")
	}

	const handleListItemClick = (e) => {
		let element = e.target
		if(element.classList.contains("is-done")){
			setRemainingCount(value => value+1)
			element.classList.remove("is-done")
		}
		else {
			setRemainingCount(value => value-1)
			element.classList.add("is-done")
		}
	}

	return (
		<>
			<div>
				<h2>Todo App</h2>
			</div>
			<div>
				<input 
					type="text" 
					name="task" 
					id="task" 
					onChange={handleChange}
					value={inputText}
				/>
				<button onClick={handleButtonClick}>Add</button>
				<br />
				<span>{remainingCount} remaining out of {totalCount} tasks</span>
			</div>
			<div>
				<ul>
					{
						!!tasks.length && tasks.map((task,i) => (
							<li key={i+task} onClick={handleListItemClick}>{task}</li>
						))
					}
				</ul>
			</div>
			<style>

			</style>
		</>
	)
}

export default App
