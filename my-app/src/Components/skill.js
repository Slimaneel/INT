import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default class Skill extends Component {
  constructor(props) {
    super(props);

    this.onChangeSkillCode = this.onChangeSkillCode.bind(this);
    this.onChangeSkillName = this.onChangeSkillName.bind(this);
    this.onChangeSkillCategory = this.onChangeSkillCategory.bind(this);

    this.state = {
      exercises: "",
      Code:"",
      Name: "",
      Category:""

    };
  }

  onChangeSkillCode(event){
    this.setState({
      Code: event.target.value
    })
  }
  onChangeSkillName(event){
    this.setState({
      Name: event.target.value
      })
  }
  onChangeSkillCategory(event){
    this.setState({
      Category: event.target.value
    })
  }

 
  onSubmit  = (event) => {
    event.preventDefault();

    const skill = {
        Code : this.state.Code,
        Name: this.state.Name,
        Category: this.state.Category
       
    }

    console.log(skill);
    
    axios.post("http://localhost:1000/skills/add", skill)
    .then(res => console.log(res.data));

    
    window.location = "/";
   
}

  render() {
    return (
      <div>
      <h3 style={{textAlign:"center"}}>Add Skill</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Skill code: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.Code}
              onChange={this.onChangeSkillCode}/>
              
          
        </div>
      
        <div className="form-group"> 
          <label>Skill Name: </label>
         
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.Name}
              onChange={this.onChangeSkillName}
              />
         
        </div>
        <div className="form-group">
          <label>Skill Category:</label>
            
          <textarea 
              type="text" 
              className="form-control"
              value={this.state.Category}
              onChange={this.onChangeSkillCategory}
          />
          
        </div>

        <div className="submit-button">
          <input type="submit" value="Add Skill" className="btn btn-primary mr-2" />
          <Link className="btn btn-primary" Link to={'/'}>Cancel</Link> 
        </div>
      </form>
    </div>
    )
  }
}

