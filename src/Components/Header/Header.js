import React from 'react'

import './app-header.css'

const Header = ({toDo, done}) => {

  return (
    <header className="app-header d-flex">
      <h1>ToDo List</h1>
      <h2>{ toDo } more to do, { done } done</h2>
    </header>
  )
}

export default Header