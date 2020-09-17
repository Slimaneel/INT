import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




export default class Program extends Component {
  constructor(props) {
    super(props);

    this.onChangeProgramName = this.onChangeProgramName.bind(this);
 
    this.state = {
      Name: "",
    };
  }

 
  onChangeProgramName(event){
    this.setState({
      Name: event.target.value
      })
  }


 
  onSubmit  = (event) => {
    event.preventDefault();

    const program = {
        Name: this.state.Name,
    }

    console.log(program);
    
    axios.post("http://localhost:1000/program/add", program)
    .then(res => console.log(res.data));
  
    window.location = "/program";
  }   

  render() {
    return (
      <body className="body" >
        <div className="wrapper">
            <h3 style={{textAlign:"center"}}>Add Program</h3>
            <form onSubmit={this.onSubmit}>
                <div className="contact-form"> 
                <div className="input-fields">
                
                    <label className="label-fields">Program Name</label>
                
                    <input type="text" 
                        className="input"
                        value={this.state.Name}
                        onChange={this.onChangeProgramName}
                    />
                </div>
                
                </div>

                <div >
                <input type="submit" value="Add Program" className="btn-skill btn-skill-primary mr-2" />
                <Link className="btn-skill btn-skill-primary" to={'/list'}>Cancel</Link> 
                </div>
            </form>
        </div>
      </body>
    )
  }
}