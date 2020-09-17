import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './skill.css';



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

    
    window.location = "/skills";
   
}

  render() {
    return (
      <body className="body" >
      <div className="wrapper">
      <h3 style={{textAlign:"center"}}>Add Skill</h3>
      <form onSubmit={this.onSubmit}>
        <div className="contact-form"> 
          <div className="input-fields">
            <label className="label-fields">Skill Code </label>
            <input type="text"
             
                className="input"
                value={this.state.Code}
                onChange={this.onChangeSkillCode}/>
              
        
            <label className="label-fields">Skill Name </label>
          
            <input type="text"
                
                className="input"
                value={this.state.Name}
                onChange={this.onChangeSkillName}
                />
          
          
            <label className="label-fields">Skill Category</label>
              
            <input 
                type="text" 
                className="input"
                value={this.state.Category}
                onChange={this.onChangeSkillCategory}
            />
          </div>
          
        </div>

        <div >
          <input type="submit" value="Add Skill" className="btn-skill btn-skill-primary mr-2" />
          <Link className="btn-skill btn-skill-primary"  to={'/list'}>Cancel</Link> 
   
        </div>
      </form>
    </div>
    </body>
    )
  }
}

