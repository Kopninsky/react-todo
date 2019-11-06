import React, { Component } from 'react'

export default class SearchPanel extends Component {
  state = {
    searchValue : ''
  }

  onSearchChange = (e) => {
    const searchValue = e.target.value
    this.setState({searchValue})
    this.props.onSearchChange(searchValue)
  }

  render() {
    return (
    <input  type="text"
            className="form-control search-input"
            placeholder="type to search" 
            value = {this.searchValue}
            onChange = {this.onSearchChange}/>
    )
  } 
}
