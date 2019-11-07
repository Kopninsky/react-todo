import React, { Component } from 'react'

export default class ItemStatusFilter extends Component {
  
  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ]

  render() {
    const {filterValue, onFilterChange} = this.props
    const buttons = this.buttons.map(({name, label})=>{
      const isActive = filterValue === name
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
      return (
        <button type="button"
                key={name}
                className={`btn ${clazz}`}
                onClick={()=>onFilterChange(name)}
                >
                {label}
        </button>
      )
    })

    return (
    <div className="btn-group">
      {buttons}
    </div>
    )
  }
}