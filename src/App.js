import React from 'react';
import './App.css';
import { CATEGORIES } from './data'

class App extends React.Component {

  state = {
    newTaskText: '',
    newTaskCategory: 'Code',
    onBtn: '',
    SelectedBtn: 'All',
    tasks: [
      {
        text: 'Buy rice',
        category: 'Food'
      },
      {
        text: 'Save a tenner',
        category: 'Money'
      },
      {
        text: 'Build a todo app',
        category: 'Code'
      },
      {
        text: 'Build todo API',
        category: 'Code'
      },
      {
        text: 'Get an ISA',
        category: 'Money'
      },
      {
        text: 'Cook rice',
        category: 'Food'
      },
      {
        text: 'Tidy house',
        category: 'Misc'
      }
    ]
  }

  handleClick = e => {
    this.setState({
      SelectedBtn: e.target.name,
      onBtn: e.target.name
    })
  }

  deleteTask = doneTask => {
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(task => task !== doneTask)
      }
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if(this.state.newTaskText){
      let newTask = {
        text: this.state.newTaskText,
          category: this.state.newTaskCategory
      }
      this.setState(prevState => {
        return {
          newTaskText: '',
          newTaskCategory: 'Code',
          tasks: [...prevState.tasks, newTask]
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h2>My tasks</h2>
        <div className='categories'>
          <h5>Categories filter</h5>
          {CATEGORIES.map(category => <button name={category} onClick={this.handleClick} className={this.state.onBtn === category ? 'selected' : undefined}>{category}</button>)}
        </div>
        <div className='tasks'>
          <h5>Tasks</h5>
          <form onSubmit={this.handleSubmit} className='new-task-form'>
            <input type='text' value={this.state.newTaskText} name='newTaskText' onChange={this.handleChange} />
            <select value={this.state.newTaskCategory} name='newTaskCategory' onChange={this.handleChange}>
            {CATEGORIES.map(category => category !== 'All' ? <option>{category}</option> : null)}
            </select>
            <input type='submit' name='submit' value='Add Task' />
          </form>
          {this.state.SelectedBtn === 'All' ?
            this.state.tasks.map(task => <div className='task'><div className='label'>{task.category}</div><div className='text'>{task.text}</div><button className='delete' onClick={() => this.deleteTask(task)}>X</button></div>)
            :
            this.state.tasks.filter(task => task.category === this.state.SelectedBtn).map(task => <div className='task'><div className='label'>{task.category}</div><div className='text'>{task.text}</div><button className='delete' onClick={() => this.deleteTask(task)}>X</button></div>)
          }
        </div>
      </div>
    );
  }
}


export default App;
