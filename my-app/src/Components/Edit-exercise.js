import React, { useState, Fragment, useEffect} from 'react';
import MathJax from "react-mathjax2";
import { Link } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import {Button, Modal} from "react-bootstrap";
import { addStyles, EditableMathField } from "react-mathquill";



addStyles();
function EditExercise (props) {
 
  const [value, setValue] = useState ("")
  const [text, setText] = useState("")
  const [latex, setLatex] = useState("");
  const[name, setName]=useState([])
  const [hint, setHint] = useState ([
      {Hint:""}
  ]);
  const [isLoading, setIsLoading] = useState(true);
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
  const handleChangeTitle = (event) => {
    setValue(event.target.value);
  }


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

  useEffect(() => {
    axios.get('http://localhost:1000/exercises/'+props.match.params.id)
      .then(response => {
        console.log(response.data)
        setValue(response.data.Title)
        setText(response.data.InstructionField)
        setLatex(response.data.Solution)
        setCurrentskill(response.data.skill)
        setHint(response.data.Hint)
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, []);
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



  const handleSubmit = event => {
    event.preventDefault();

    const exercise = {
      Title: value,
      InstructionField: text,
      Solution: latex,
      Hint: hint,
      skill: currentskill
    }

    console.log(exercise);

    axios.post('http://localhost:1000/exercises/update/'+props.match.params.id, exercise)
      .then(res => console.log(res.data));

      window.location ="/list";
  }

  

  
    return (
      <>
      { isLoading ? <p>Loading...</p> : (
      <div className="row">
        <div className="text-center">
      <form onSubmit={handleSubmit}>
      <div>

          <Fragment >

            <div>
              <label className="label">Title</label>
              <input  type="text"
                  className="field"
                  id="title"
                  value={value} 
                  onChange={event => handleChangeTitle(event)}
              />
            </div>
  
          </Fragment>
          </div>
          <br></br>
          
          <div className="menu">
            <label className="label" >Skill Name</label>
            <Select  onChange={(event) => setCurrentskill(event.value) } placeholder={currentskill.Name} options={name.map((item)=> ({value: item._id, label: item.Name}))}>
            </Select>
          </div>
          <br></br>

         

        <div className="menuz">
          <label className="label">Instruction Field</label>
          <CKEditor 
         
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData()
              setText(data)
            }}
          >
  
          </CKEditor >
        </div>

            <Fragment>
              <div>
                <label className="label" style={{"margin-left":"1rem"}}>Solution</label>
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
            </Fragment>
          {hint.map((hints, index) => (
            <Fragment key={`${hints}~${index}`}>
               <div>
                <label className="label" style={{"margin-top":"1rem"}}>Hint</label>
              </div>
              <div>
                <input type="text"
                    className="field"
                    value={hints.Hint} 
                    id="hint"
                    onChange={event => handleChangeHint(index, event)}
                />
                  
                </div>
                <button type = "button" className="button" onClick={() => handleRemoveHint(index)}> - </button>
            </Fragment>
            
          ))}
            
              
              <button type = "button" className="button " onClick={() => handleAddHint()}> +</button>
            
        <div className="margin">
            <button className="link-button button" onSubmit={handleSubmit}> Submit </button>
            <button className="link-button button" Link to={'/list'}> Cancel </button> 
        </div>
  
      </form>
      </div>
      <div className="display">

      <h3 className="instr-view">Instruction field view</h3>

        <label > <MathJax.Context>
                <MathJax.Text text={parse(text)} />
                </MathJax.Context></label>
        
      </div>
      </div>
    )}
    </>
    )
  
}
export default EditExercise;
