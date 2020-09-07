import React, { useState, Fragment, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import MathJax from "react-mathjax2";
import parse, {ReactHtmlParser} from "html-react-parser";
import Select from 'react-select';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import { addStyles, EditableMathField } from "react-mathquill";
import { Link } from 'react-router-dom';

import './Exercise.css';


addStyles();
function Exercise () {
  
  const [value, setValue] = useState ("")
  const [text, setText] = useState("")
  const [latex, setLatex] = useState("");
  const [hint, setHint] = useState (
    [{Hint:""}]
  );
  const[name, setName]=useState([])
  const [currentskill, setCurrentskill] = useState("")
  const[show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const injectMathFunction = (latexString) => {
    setLatex((latex) => latex + latexString);
  }

 
  const handleChangeHint = (index, event) => {
    const values = [...hint];
      values[index].Hint = event.target.value;
    setHint(values);
  };
  const handleChangeTitle = (event) => setValue(event.target.value);


  const handleAddHint = () => {
    const values = [...hint];
    values.push({ Hint: '' });
    setHint(values);
  };

  const handleRemoveHint = index => {
    const values = [...hint];
    values.splice(index, 1);
    setHint(values);
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const exercises = {
     
      InstructionField: text,
      Solution: latex,
      Hint: hint.filter(hint => hint.Hint),
      Title: value,
      skill: currentskill,
    
    }
    
    console.log(exercises);

    axios.post('http://localhost:1000/exercises/add', exercises)
    .then(res => console.log(res.data));
    
    window.location ="/list";
  };
  useEffect(() => {
    axios.get('http://localhost:1000/skills')
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
    <section className="row" >
    
      <div className="text-center">
    
    
        
        <form onSubmit={handleSubmit}>
      
   
   
      
        <div >
          <Fragment >
           
            <label className="label"  >Title</label>
              <input className="field" type="text"            
                  id="title"
                  value={value} 
                  onChange={event => handleChangeTitle(event)}
              />
  
           
  
          </Fragment>
          </div>
          
          <br></br>
          
          <div className="menu">
            <label className="label" >Skill Name</label>
            <Select  onChange={(event) => setCurrentskill(event.value) } defaultValue={{label:"Choose Skill ", value:"choose Skill"}} options={name.map((item)=> ({value: item._id, label: item.Name}))}>
            </Select>
          </div>
          <br></br>
      
      <div className="menuz">
        <label className="label">Instruction Field</label>
        <CKEditor 
          
          data={text}
          editor={ClassicEditor}
          config={
            {
              ckfinder:{
                uploadUrl: '/uploads'
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
     
     
    
          <Fragment >
            <div>
              <label className="label">Solution</label>
              </div>
              <div>
     
              <EditableMathField  style={{"margin-left":"0.5rem","width":"50%", "border":"none", "border-bottom": "1px solid rgb(26, 25, 25)","font-family":"Lato","outline":"none"}} 
                onClick={()=> handleShow()}
          
                latex={latex} // latex value for the input field
                onChange={(mathField) => {
                  // called everytime the input changes
                  setLatex(mathField.latex());
                }}
              />
           
              <Modal style={{"margin-top":"27rem", "width":"50%","margin-left":"3rem", "display":"inline"}} show={show} onHide={handleClose}>
                <Modal.Body style={{"width":"100%"}}>
                    <button className="button" onClick={() => injectMathFunction("\\sqrt{}")}>√</button>
                    <button className="button" onClick={() => injectMathFunction("\\frac{}{}")}>/</button>
                    <button className="button" onClick={() => injectMathFunction("\\cos")}>cos</button>
                    <button className="button" onClick={() => injectMathFunction("\\sin")}>sin</button>
                    <button className="button" onClick={() => injectMathFunction("\\tan")}>tan</button>
                    <button className="button" onClick={() => injectMathFunction("\\lim_{}")}>lim</button>
                    <button className="button" onClick={() => injectMathFunction("\\binom{}{}")}>bin</button>
                    <button className="button" onClick={() => injectMathFunction("e^{}")}>e</button>
                    <button className="button" onClick={() => injectMathFunction("x^{}")}>x^</button>
                    <button className="button" onClick={() => injectMathFunction("\\int_{}")}>∫</button>
                    <button className="button" onClick={() => injectMathFunction("+\\infty")}>+∞</button>
                    <button className="button" onClick={() => injectMathFunction("-\\infty")}>-∞</button>
                    <button className="button" onClick={() => injectMathFunction("\\sum_{}^{} ")}>Σ</button>
                    <button className="button" onClick={() => injectMathFunction("\\pi ")}>pi</button>

                </Modal.Body>
                
              </Modal>
      
           </div>
           
              <div>
              <p style={{"color":"#158be8", "font-weight":"600"}} >Check to confirm the solution
              <input 
               style={{"margin-left":"0.7rem", "margin-top":"0.7rem"}}
                type="checkbox" 
              />
              </p>
              
              
              
            </div>
          
          </Fragment>
          
          
        
        <br></br>
        {hint.map((hints, index) => (
          <Fragment key={`${hints}~${index}`}>
             <div>
              <label  className="label">Hint</label>
              </div>
              <div >
              <input  type="text"
                  className="field"
                  value={hints.Hint} 
                  id="hint"
                  onChange={event => handleChangeHint(index, event)}
              />
              </div>
              <div style={{"color":"white"}}>
            
              <button  type = "button" className="button" onClick={() => handleAddHint()}> +</button>
              <button style={{"margin-right":"2rem"}} type = "button" className="button" onClick={() => handleRemoveHint(index)}> - </button>
              
            </div>
          </Fragment>
        ))}

    
      <div className="margin" >
          <button className="link-button button" onSubmit={handleSubmit}> Submit </button>
          <button style={{"margin-right":"1.5rem"}} className="link-button button" Link to={'/'}>Cancel</button> 
      </div>
      

    </form>
    </div>
    <div className="display">

      <h3 className="instr-view">Instruction Field View</h3>
      <label>
        <MathJax.Context >
            <MathJax.Text text={parse(text)} />
        </MathJax.Context>
      </label>
        
        

    </div>
  </section>
    
  
    
  );
}

export default Exercise;
