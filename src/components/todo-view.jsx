import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TodoModal from './modal';


const ViewTodos = () => {
    const token = localStorage.getItem("token")
    const [todoLists, setTodoLists] = useState(null)
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchTodoData = async () => {
            try {
                const response = await axios.get(
                    `https://htcode12.pythonanywhere.com/api/todos/?page=${currentPage}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                if (response.status === 401) {
                    navigate("/login")
                    console.log("Hey, It is dark in here. Who are you again?")
                }

                console.log(response.status)
                const data = response.data;

                console.log("Todo Data:", data);
                // navigate("/login")
                setTodoLists(data);


            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchTodoData();
    }, [currentPage]);

    const todos = todoLists?.results || []

    const closeModal = () => {
        setSelectedTodo(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [selectedTodo, setSelectedTodo] = React.useState(null);



    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
        setIsModalOpen(true);
        console.log('Selected Todo:', todo);

    };

    const handleMarkAsCompletedClick = async () => {
        if (selectedTodo) {
            try {
                const response = await axios.patch(
                    `https://htcode12.pythonanywhere.com/api/todos/${selectedTodo.id}`,
                    {
                        is_complete: !selectedTodo.is_complete,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                console.log("Response from backend:", response.status);

                if (response.status === 200) {
                    // navigate("/create-todo")
                    window.location.reload(false)
                }
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        }
    };

    const handleDeleteClick = async () => {
        if (selectedTodo) {
            try {
                const response = await axios.delete(
                    `https://htcode12.pythonanywhere.com/api/todos/${selectedTodo.id}`,
                    {
                        headers: {
                            Authorization: token,
                        }
                    }
                )

                if (response.status === 204) {
                    window.location.reload(false)
                }
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        }
    };

    return (
        <section id="view-todos" className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 to-yellow-600">
            <div className="max-w-2xl w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Your Todo List
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        Or <Link to="/create-todo" className="text-yellow-500">create a new todo</Link>
                    </p>
                </div>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {todos.map((todo) => (
                            <li key={todo.id} onClick={() => handleTodoClick(todo)} className="cursor-pointer todo-item">
                                <a className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm font-medium text-indigo-600 truncate ${todo.is_complete ? 'line-through' : ''}`}>
                                                {todo.title}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${todo.is_complete ? 'green' : 'red'}-100 text-${todo.is_complete ? 'green' : 'red'}-800`}>
                                                    {todo.is_complete ? 'Complete' : 'Incomplete'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between">
                        <button className='rounded-sm bg-blue-600 text-white p-2' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button className='rounded-sm bg-blue-600 text-white p-2' onClick={() => setCurrentPage(currentPage + 1)} >Next</button>
                    </div>

                </div>
                {isModalOpen && selectedTodo && (
                    <TodoModal
                        todo={selectedTodo}
                        onMarkAsComplete={handleMarkAsCompletedClick}
                        onDelete={handleDeleteClick}
                        onClose={handleCloseModal}
                    />
                )}
                {/* {selectedTodo && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">{selectedTodo.title}</h2>
                        <p className="text-gray-600">{selectedTodo.desc}</p>
                        <button onClick={handleMarkAsCompletedClick} className={`mt-4 ${selectedTodo.is_complete ? 'bg-gray-400' : 'bg-green-500'} text-white py-2 px-4 rounded`}>
                            {selectedTodo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                        </button>
                        <button onClick={() => handleDeleteClick(selectedTodo.id)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                )} */}
            </div>
        </section>
    );
};

export default ViewTodos;