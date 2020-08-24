import React, { useState, Fragment, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import MathJax from "react-mathjax2";
import parse from "html-react-parser";
import Select from 'react-select';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

import './Exercise.css';

function Exercise () {
  
  const [value, setValue] = useState ("")
  const [text, setText] = useState("")
 
  const [inputFields, setInputFields] = useState([
    {Solution:""}]
  );
  const [count, setCount] = useState (
    [{Hint:""}]
  );
  const[name, setName]=useState([])


  const handleChangeSolution = (index, event) => {
    const values = [...inputFields];
      values[index].Solution = event.target.value;
    

    setInputFields(values);
  };
  const handleChangeHint = (index, event) => {
    const values = [...count];
      values[index].Hint = event.target.value;
    

    setCount(values);
  };
  const handleChangeTitle = (event) => setValue(event.target.value);


  const handleAddHint = () => {
    const values = [...count];
    values.push({ Hint: '' });
    setCount(values);
  };

  const handleRemoveHint = index => {
    const values = [...count];
    values.splice(index, 1);
    setCount(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const exercises = {
     
      InstructionField: text,
      Solution: inputFields.filter(field => field.Solution),
      Hint: count.filter(count => count.Hint),
      Title: value,
    
    }
    
    console.log(exercises);

    axios.post('http://localhost:1000/exercises/add', exercises)
    .then(res => console.log(res.data));
    
    window.location ="/list";
  };
  useEffect(() => {
    axios.get('http://localhost:1000/skills/Name,_id')
        .then(response => {
            console.log(response.data)
            setName(
                 response.data,
            )

        })
        .catch(function(error){
            console.log(error);
        })
},[]);

  

  return (
    <section className="projects-section text-center ">
    
    <div className=" Exercise " ><img src="../img/exercise-bg.jpg" alt="" /></div>
    <div className=" Exercise-add" ><img src="../img/bg-mst.jpg" alt="" /></div>
      <div className="row align-items-center no-gutters">
        
        <form onSubmit={handleSubmit}>
      
   
   
      

          <Fragment >
            <div>
            <label className="label" style={{"margin-left":"1.75rem"}} >Title</label>
              <input className="field" type="text"            
                  id="title"
                  value={value} 
                  onChange={event => handleChangeTitle(event)}
              />
  
            </div>
  
          </Fragment>
          
          <br></br>
          
          <div className="menu">
            <label className="label">Skill Name</label>
            <Select  defaultValue={{label:"Choose Skill ", value:"choose Skill"}} options={name.map((item)=> ({value: item._id, label: item.Name}))}>
            </Select>
          </div>
          <br></br>
      
      <div className="menuz">
        <label className="label">Instruction Field</label>
        <CKEditor 
          
       
          editor={ClassicEditor}
          data={text}
          config={
            {
              ckfinder:{
                uploadUrl:'/uploads'
              }
            } 
          }
          onChange={(event, editor) => {
            const data = editor.getData()
            setText(data)
          }}
        >

        </CKEditor >
      </div>
        <div>

        <br></br>
        

        <p> <MathJax.Context>
                <MathJax.Text text={parse(text)} />
                </MathJax.Context></p>
        
      </div>
     
    
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <div>
              <label className="label" style={{"margin-left":"1.75rem"}}>Solution</label>
              </div>
              <div >
              <input className="field" 
                required
                type="text"
                
                  id="solution"
                  value={inputField.Solution} 
                  onChange={event => handleChangeSolution(index, event)}
              />
              <div>
              <p style={{"color":"#158be8", "font-weight":"600"}} >Check to confirm the solution
              <input className="field"style={{"margin-left":"15rem", "margin-top":"-1rem"}}
                required
                type="checkbox" 
              />
              </p>
              
              
              </div>
            </div>
          
          </Fragment>
          
          
        ))}
        <br></br>
        {count.map((counts, index) => (
          <Fragment key={`${counts}~${index}`}>
             <div>
              <label className="label" style={{"margin-left":"1.75rem"}}>Hint</label>
              </div>
              <div >
              <input className="field"type="text"
                 
                  value={counts.Hint} 
                  id="hint"
                  onChange={event => handleChangeHint(index, event)}
              />
              </div>
              <div style={{"color":"white"}}>
            
              <button  type = "button " className="button" onClick={() => handleAddHint()}> +</button>
              <button  type = "button" className="button" onClick={() => handleRemoveHint(index)}> - </button>
              
            </div>
          </Fragment>
        ))}

    
      <div className="submit-button margin" style={{"text-align":"center"}}>
          <button style={{"margin-left":"2rem"}} className="link-button button" onSubmit={handleSubmit}> Submit </button>
          <button style={{"margin-left":"2rem"}} className="link-button button" Link to={'/'}>Cancel</button> 
      </div>
      

    </form>
    </div>
  
    </section>
    
  
    
  );
}

export default Exercise;
