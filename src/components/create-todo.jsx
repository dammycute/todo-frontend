import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateTodo = () => {
    const token = localStorage.getItem("token")
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here

        try {
            const response = await axios.post("https://htcode12.pythonanywhere.com/api/todos/",
                {
                    title: title,
                    desc: desc
                },
                {
                    headers: {
                        authorization: token,
                    }
                }
            )

            if (response.status === 201) {
                console.log(response.data)
                navigate("/todo-details")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <section id="create-todo" className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-400 to-red-600">
            <div className="max-w-lg w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create a new To do
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Or <Link to="/todo-details" className="text-red-500">view your to dos</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="todo-title" className="sr-only">Title</label>
                            <input id="todo-title" name="title" type="text" required
                                className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="todo-desc" className="sr-only">Description</label>
                            <textarea id="todo-desc" name="desc" rows="3" required
                                className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                    </div>
                    {/* <input type="text" className='header' /> */}
                    <div>
                        <button type="submit" className="form-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Add Todo
                        </button>
                    </div>
                </form>
                
            </div>
        </section>
    );
}

export default CreateTodo;