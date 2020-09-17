import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default class Chapter extends Component {
  constructor(props) {
    super(props);

    this.onChangeChapterName = this.onChangeChapterName.bind(this);
 
    this.state = {
      Name: "",
    };
  }

 
  onChangeChapterName(event){
    this.setState({
      Name: event.target.value
      })
  }


 
  onSubmit  = (event) => {
    event.preventDefault();

    const chapter = {
        Name: this.state.Name,
    }

    console.log(chapter);
    
    axios.post("http://localhost:1000/chapter/add", chapter)
    .then(res => console.log(res.data));
  
    window.location = "/chapter";
  }   

  render() {
    return (
      <body className="body" >
        <div className="wrapper">
            <h3 style={{textAlign:"center"}}>Add Chapter</h3>
            <form onSubmit={this.onSubmit}>
                <div className="contact-form"> 
                <div className="input-fields">
                
                    <label className="label-fields">Chapter Name</label>
                
                    <input type="text" 
                        className="input"
                        value={this.state.Name}
                        onChange={this.onChangeChapterName}
                    />
                </div>
                
                </div>

                <div >
                <input type="submit" value="Add Chapter" className="btn-skill btn-skill-primary mr-2" />
                <Link className="btn-skill btn-skill-primary" to={'/list'}>Cancel</Link> 
                </div>
            </form>
        </div>
      </body>
    )
  }
}