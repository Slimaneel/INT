import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Exercise-list.css';


export default class ExerciseList extends Component {
  constructor(props) {
  
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
      exercises: [],
      count:1
                  
    };
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
      return <Exercise instruction={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} count={this.state.count++}/>;
    })
   
  }
  

  render() {
    return (
      <section>
      <div>
      <br></br>
        <br></br><br></br>
    
  
  
        
        <body > 
        <table className="table table-hover table-dark">
          <thead>
            <tr >
            <th>#</th>
              <th>Title</th>
              
            
            </tr>
          </thead>
          
          <tbody >
            {this.exerciseList() }
            
          </tbody>
        </table>
        </body>
      </div>
      </section>
    )
  }
}


const Exercise = props => (

  

    <tr>
      <td>{props.count}</td>
      <td>{props.instruction.Title}</td>
      
      <td><Link className="btnx" Link to={'/Exercise'}>Add</Link> | <Link className="btnx" to={'/edit/'+props.instruction._id}>Edit</Link > | <a className="btnx" href='#' onClick={() => {props.deleteExercise(props.instruction._id) }}>Delete</a> | <Link className="btnx" to={'/view/'+props.instruction._id}>View</Link></td>
        
        
        
      
      </tr>
  
  
);
