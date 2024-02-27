import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Register from './components/register'
import Login from './components/login'
import CreateTodo from './components/create-todo'
import ViewTodos from './components/todo-view'


function App() {

  return (
    <>
      <Router>
        {/* <header>
        Add your navbar code here if you want common navbar.
      </header> */}

        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create-todo" element={<CreateTodo />} />
          <Route exact path="/todo-details" element={<ViewTodos />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
