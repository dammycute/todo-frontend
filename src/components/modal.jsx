import React from 'react'

const TodoModal = ({ todo, onClose, onMarkAsComplete, onDelete }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="text-2xl font-bold">{todo.title}</h2>
                <p className="text-gray-600">{todo.desc}</p>
                <button onClick={onMarkAsComplete} className={`mt-4 mx-2 ${todo.is_complete ? 'bg-gray-400' : 'bg-green-500'} text-white py-2 px-4 rounded`}>
                    {todo.is_complete ? 'Mark as Incomplete' : 'Mark as Completed'}
                </button>
                <button onClick={onDelete} className="mt-4 mx-2 bg-red-500 text-white py-2 px-4 rounded">
                    Delete
                </button>
                <button onClick={onClose} className="mt-4 mx-2 bg-blue-500 text-white py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default TodoModal;