import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:1000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:1000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
  
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise instruction={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3 style ={{textAlign: "center"}}>Added Exercises</h3>
        <hr></hr>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>InstructionField</th>
              <th>Solution</th>
              <th>Hint</th>
              
            </tr>
          </thead>
          <tbody>
            {this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
const Exercise = props => (
    <tr>
      <td>{props.instruction.InstructionField}</td>
      <td>{props.instruction.Solution.map(solution => {solution})}</td>
      <td>{props.instruction.Hint}</td>
      <td>
        <Link to={'/edit/'+props.instruction._id}>edit</Link> | <a href='#' onClick={() => {props.deleteExercise(props.instruction._id) }}>delete</a> 
      </td>
    </tr>
);