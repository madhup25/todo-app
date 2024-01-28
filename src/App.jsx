import { useState } from 'react'
import './App.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


const TodoSchema = Yup.object().shape({
	todo: Yup.string().required()
})


function App() {
	const [tasks, setTasks] = useState([])
	const [remainingCount, setRemainingCount] = useState(0)
	const [totalCount, setTotalCount] = useState(0)

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
		<div className='container mx-auto px-4'>
			<div className='flex flex-row justify-center'>
				<div className="basis-1/4 mt-5 mx-2 border rounded-lg p-2">
					<h2 className="text-5xl font-bold mb-4">Todo App</h2>
					<Formik
						initialValues={{ todo: '' }}
						validationSchema={TodoSchema}
						onSubmit={(values, {resetForm}) => {
							setTasks(prevState => [...prevState, values.todo])
							setRemainingCount(value => value+1)
							setTotalCount(value => value+1)
							resetForm();
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<Field
									type="text" 
									name="todo"
									id="todo" 
									placeholder='Enter todo here'
									className='w-full font-medium border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 mr-2'
								/>
								<ErrorMessage 
									name="todo" 
									component="div" 
									className="text-xs font-semibold ps-2 mt-2 text-red-800"
								/>

								<button 
									type='submit' 
									className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2.5 rounded focus:outline-none focus:shadow-outline" 
									disabled={isSubmitting}
								>
									Add
								</button>
							</Form>
						)}
						</Formik>
					<p className='my-3'>{remainingCount} remaining out of {totalCount} tasks</p>
				</div>

				<div className="basis-1/2 mt-5 mx-2 border rounded-lg p-2">
					<div className='flex flex-row items-center'>
						{
							!!tasks.length && tasks.map((task) => (
								<>
									<div className="basis-11/12 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded my-2" key={uuidv4()} onClick={handleListItemClick}>{task}</div>
									<MdDelete key={uuidv4()} className="basis-1/12 text-3xl text-red-500 hover:text-red-800 cursor-pointer ms-2" />
								</>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
