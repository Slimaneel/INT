import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import ReactHtmlParser from "react-html-parser";
import MathJax from "react-mathjax2";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {Button, Modal} from "react-bootstrap";
import { addStyles, EditableMathField } from "react-mathquill";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './view-exercise.css';


addStyles();
function ViewExercise(props) {

    const [value, setValue] = useState ("")
    const [text, setText] = useState("")
    const [latex, setLatex] = useState("");
    const [hint, setHint] = useState ([]);
    const [click, setClick] = useState(0)
    const [answer, setAnswer] = useState ("")
    const [number, setNumber] = useState(0)
    const[validAnswer, setValidAnswer] = useState("") 
    const [currentSolution, setCurrentsolution] = useState("")
    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [mathfieldInput, setMathfieldInput] = useState([]);
    const injectMathFunction = (latexString) => {
      mathfieldInput.write(latexString);
    }
    const initmathInput = (mathField) => {
      setMathfieldInput(mathField);
      console.log('mathquillDidMount');
      console.log('mathfieldInput', mathfieldInput);
    }

  
    
    useEffect(() => {
        axios.get('http://localhost:1000/exercises/'+props.match.params.id)
          .then(response => {
            const hiddenHints = response.data.Hint.map((hints) => {
              hints.hidden = true;
              return hints;
            });
           
            console.log(response.data)
            setValue(response.data.Title)
            setText(response.data.InstructionField)
            setLatex(response.data.Solution)
            setHint(hiddenHints);
          })
          .catch(function (error) {
            console.log(error);
          })
    
      }, []);
     const CheckAnswer = () => {
       if(latex === answer){
        setValidAnswer(answer)
      } else {
        if(answer === "") {
          store.addNotification({
            title: "Error",
            message: "Write an anwer first!",
            type: "warning",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration:2000,
              onScreen: false
            }
    
            })
        }else{
       
        document.getElementById("hint").style.visibility = 'visible';  
        store.addNotification({
          title: "Wrong",
          message: "Wrong answer, try again!",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration:2000,
            onScreen: false
          }
  
          })
        }
      }
     }
   
    
    //function shownexthint that shows the next hint until there are no more
    //once there are no more hints we return false
    //function showsolution shows the solution
    const ShowHint = () =>{
      if (click < hint.length) {
        setClick(click + 1);
        setHint((oldHints) => {
          return oldHints.map((hints, index) => {
            if (click === index) {
              hints.hidden = false;
            }
            return hints;
          });
        });
    
      }else {
          document.getElementById("solution").style.visibility = 'visible';
          document.getElementById("solution-label").style.visibility = 'visible';
         
          document.getElementById("hint").style.visibility = 'hidden';
  
          document.getElementById("lasthint").style.visibility = 'hidden';
          store.addNotification({
            title: "No more hints",
            message: "Check the solution",
            type: "warning",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration:2000,
              onScreen: false
            }
    
            })
        }
    
    }
    const ShowSolution = () =>{
      
      setCurrentsolution(latex);
    
      document.getElementById("solution").style.visibility = 'hidden';
      document.getElementById("solution-label").style.visibility = 'visible';
    }
    
    if(validAnswer === latex && validAnswer !==""){
      return <Result />
    }
  
 

    
    return (
     
        <div className="view">
 
          <div style={{"color":"white"}} >
            <h5 className="pdd" style={{"padding-top":"1.5rem"}}>{value} </h5>
          </div>
          <br></br>
          <div >
            
          </div>
          <div style={{textAlign:"center", "color":"white"}}>
        
 
           
           
            <p>     
           
                 
              <MathJax.Context>
              
                <MathJax.Text 
                     
                text={parse(text)} />
               
              </MathJax.Context>
            </p>
            
          </div>
          <div>
   
            <h5 style={{"color":"white"}}>Answer</h5>
            <div >
     
              <EditableMathField  style={{"margin-left":"0.5rem","width":"20%", "border":"none", "border-bottom": "1px solid rgb(26, 25, 25)","font-family":"Lato","outline":"none"}} 
                onClick={()=> handleShow()}
                mathquillDidMount={initmathInput}
                latex={answer} // latex value for the input field
                onChange={(mathField) => {
                  // called everytime the input changes
                  setAnswer(mathField.latex());
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
              <ReactNotification />
            
            <button  type="button"  className="btn btn-primary btn-check"onClick={CheckAnswer}> Check <FontAwesomeIcon icon="check" /> </button> 
            
            
          </div>

          <div style={{"padding-left":"10px", "color":"white"}}>
              
                
                  <ul id="lasthint" >
     
                    {hint
                      .filter((hints) => hints.hidden !== true)
                      .map((hints) => (
                        <li key={hints}>{hints.Hint}</li>
                      ))}
    
                  
                  </ul>  
                  <button id="hint" style={{visibility: 'hidden'}}  className="btn btn-primary" onClick={ShowHint}>Show Hint</button>
 
     
                  <ul>
                    <label id="solution-label" style={{visibility: 'hidden'}}>Solution is: <EditableMathField latex={currentSolution} /> </label>
                  
                  </ul>
                  <button id="solution" style={{visibility: 'hidden'}} className="btn btn-primary" onClick={ShowSolution}>Show Solution</button>
            </div>
         
          <br></br>
          <div className="submit-button">
            <Link className="btn btn-primary" to={'/list'}>Back</Link> 
          </div>
          

        </div>

      );
  
}
function Result () {
  return (
    <div style={{"text-align":"center"}}>
    <div>
      <h1>Correct Answer</h1>
      </div>
      <div>
      <FontAwesomeIcon style ={{"width":"500px" }} icon="check" />
      </div>
      <Link className="btn btn-primary" Link to={'/list'}>Try another exercise</Link> 
    </div>
  )
  
}

export default ViewExercise;

