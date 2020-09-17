import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




export default class Grade extends Component {
  constructor(props) {
    super(props);

    this.onChangeGradeName = this.onChangeGradeName.bind(this);
 
    this.state = {
      Name: "",
    };
  }

 
  onChangeGradeName(event){
    this.setState({
      Name: event.target.value
      })
  }


 
  onSubmit  = (event) => {
    event.preventDefault();

    const grade = {
        Name: this.state.Name,
    }

    console.log(grade);
    
    axios.post("http://localhost:1000/grade/add", grade)
    .then(res => console.log(res.data));
  
    window.location = "/grade";
  }   

  render() {
    return (
      <body className="body" >
        <div className="wrapper">
            <h3 style={{textAlign:"center"}}>Add Grade</h3>
            <form onSubmit={this.onSubmit}>
                <div className="contact-form"> 
                <div className="input-fields">
                
                    <label className="label-fields">Grade Name</label>
                
                    <input type="text" 
                        className="input"
                        value={this.state.Name}
                        onChange={this.onChangeGradeName}
                    />
                </div>
                
                </div>

                <div >
                <input type="submit" value="Add Grade" className="btn-skill btn-skill-primary mr-2" />
                <Link className="btn-skill btn-skill-primary" to={'/list'}>Cancel</Link> 
                </div>
            </form>
        </div>
      </body>
    )
  }
}