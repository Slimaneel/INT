import React, { useState, Fragment } from "react";

import "bootstrap/dist/css/bootstrap.css";
import MathJax from "react-mathjax2";
import parse from "html-react-parser";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { Link } from 'react-router-dom';

function Exercise () {
  
  const [text, setText] = useState("")
  const [files, setFiles] = useState([])
  const [inputFields, setInputFields] = useState([
    {Solution:""}
  ]);
  const [count, setCount] = useState (
    [{Hint:""}
  ]);

  const onEditorChange = (value) => {
      setText(value)
      console.log(text)
  }

  const onFilesChange = (files) => {
      setFiles(files)
  }
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

  const handleAddSolution = () => {
    const values = [...inputFields];
    values.push({ Solution: '' });
    setInputFields(values);
  };

  const handleRemoveSolution = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
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

  const handleSubmit = event => {
    event.preventDefault();
    
  
    
    const exercises = {
     
      InstructionField: text,
      Solution: inputFields,
      Hint: count
    }
    console.log(exercises);

    axios.post('http://localhost:1000/exercises/add', exercises)
    .then(res => console.log(res.data));
    
  
  };

  

  return (
    
    
    
    <div className="Exercise">
    <form onSubmit={handleSubmit}>
      <div className="editor">
        <p>Instruction Field</p>
        <CKEditor 
          placeholder="start typing"
       
          editor={ClassicEditor}
          data={text}
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
      <div>
    
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <div>
              <label>Solution</label>
              <input  type="text"
                  className="form-control"
                  id="solution"
                  value={inputField.Solution} 
                  onChange={event => handleChangeSolution(index, event)}
              />
            </div>
            <div>
           
              <button className="btn btn-link" onClick={() => handleAddSolution()}> + </button>
              <button className="btn btn-link" onClick={() => handleRemoveSolution(index)}> - </button>
              
            </div>
          </Fragment>
          
          
        ))}
        {count.map((counts, index) => (
          <Fragment key={`${counts}~${index}`}>
             <div>
              <label>Hint</label>
              <input type="text"
                  className="form-control"
                  value={inputFields.Hint} 
                  id="hint"
                  onChange={event => handleChangeHint(index, event)}
              />
              </div>
              <div>
            
              <button className="btn btn-link" onClick={() => handleAddHint()}> +</button>
              <button className="btn btn-link" onClick={() => handleRemoveHint(index)}> - </button>
              
            </div>
          </Fragment>
        ))}

      </div>
      <div className="submit-button">
          <button className="btn btn-primary mr-2" onSubmit={handleSubmit}> Submit </button>
          <Link className="btn btn-primary" Link to={'/'}>Cancel</Link> 
      </div>

    </form>
    </div>
  
    
  );
}

export default Exercise;
