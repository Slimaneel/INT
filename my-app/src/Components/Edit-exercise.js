import React, { Component } from 'react';
import MathJax from "react-mathjax2";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeInstructionField = this.onChangeInstructionField.bind(this);
    this.onChangeSolution = this.onChangeSolution.bind(this);
    this.onChangeHint = this.onChangeHint.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      InstructionField: '',
      Solution: '',
      Hint: "",
      Tasks: [],
      Lists: []
      
    }
  }

  componentDidMount() {
    axios.get('http://localhost:1000/exercises/'+this.props.match.params.id)
      .then(response => {
        console.log(response.data)
        this.setState({
          InstructionField: response.data.InstructionField,
          Solution: response.data.Solution,
          Hint: response.data.Hint
        })
      })
      .catch(function () {
        console.log(Error);
      })

  }

  onChangeInstructionField(event) {
    this.setState({
      InstructionField: event.target.value
    })
  }

  onChangeSolution(event) {
    this.setState({
      Solution: event.target.value
    })
  }

  onChangeHint(event) {
    this.setState({
      Hint: event.target.value
    })
  }

  handleSolution = () => {
    this.setState(state => ({
      Tasks: [...state.Tasks, state.Solution],
      Solution: ""
    }))
  }

  handleHint = () => {
    this.setState(state => ({
      Lists: [...state.Lists, state.Hint],
      Hint: ""
    }))
  }
  

  onSubmit(event) {
    event.preventDefault();

    const exercise = {
      IntructionField: this.state.InstructionField,
      Solution: this.state.Solution,
      Hint: this.state.Hint
    }

    console.log(exercise);

    axios.post('http://localhost:1000/exercises/update/'+this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>InstructionField: </label>
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.InstructionField}
              onChange={this.onChangeInstructionField}>
              
          </textarea>
        </div>
        <div className="form-group">
              <br></br>
              
                <MathJax.Context input="tex">
                <MathJax.Text text={this.state.InstructionField} />
                </MathJax.Context>
            </div>
        <div className="form-group"> 
          <label>Solution: </label>
            <ul>
                {this.state.Tasks.map((task) => 
                <li>{task}</li>
                )}
            </ul>
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.Solution}
              onChange={this.onChangeSolution}
              />
          <button onClick = {this.handleSolution} >Add Solution</button>
          <br></br>
          <label> Is the solution correct? <input required type="checkbox" value="Correct?"></input> </label>
        </div>
        <div className="form-group">
          <label>Hint:</label>
            <ul>
              {this.state.Lists.map((task) => 
                <li>{task}</li>
              )}
            </ul>
          <input 
              type="text" 
              className="form-control"
              value={this.state.Hint}
              onChange={this.onChangeHint}
              />
          <button onClick = {this.handleHint}>Add Hint</button>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise" className="btn btn-primary" />
        </div>
        <Link className="btn btn-primary" Link to={'/'}>Cancel</Link> 
      </form>
    </div>
    )
  }
}

