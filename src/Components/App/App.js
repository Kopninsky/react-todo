import React, {Component} from 'react';

import Header from '../Header';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import './app.css';

export default class App extends Component {
  maxId = 0

  state = {
    todoData : [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    searchValue: ''
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, index),...todoData.slice(index + 1)]
      return {todoData: newArray} 
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({todoData})=>{
      const newArray = [...todoData, newItem]
      return {
        todoData : newArray
      }
    })
  }

  toggleProp = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id)
    const oldItem = arr[index]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
    
  }

  onToggleImportant = (id) => {
    this.setState(({todoData})=>{
      return { todoData: this.toggleProp(todoData, id, 'important') } 
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData})=>{
      return { todoData: this.toggleProp(todoData, id, 'done') } 
    })
  }

  search(items, searchValue) {
    if (searchValue.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    });
  }

  onSearchChange = (searchValue) => {
    this.setState({ searchValue });
  }

  render(){
    const { todoData, searchValue } = this.state
    const visibleItems = this.search(todoData, searchValue)
    const doneCount = todoData.filter((el)=>el.done).length
    const todoCount = todoData.length - doneCount
    
    return (
      <div className="todo-app">
        <Header toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter />
        </div>
        <TodoList 
          todos={visibleItems} 
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded = {this.addItem}/>
      </div>
    )
  }
}