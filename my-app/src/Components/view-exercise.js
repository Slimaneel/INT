import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MathJax from "react-mathjax2";

function ViewExercise (props) {

    const [value, setValue] = useState ("")
    const [text, setText] = useState("")
    const [inputFields, setInputFields] = useState([
        {Solution:""}
    ]);
    const [count, setCount] = useState ([
        {Hint:""}
    ]);
    const [click, setClick] = useState(0);
    const [answer, setAnswer] = useState("")

    const handleChangeAnswer = (event) => setAnswer(event.target.answer);
    useEffect(() => {
        axios.get('http://localhost:1000/exercises/'+props.match.params.id)
          .then(response => {
            console.log(response.data)
            setValue(response.data.Title)
            setText(response.data.InstructionField)
            setInputFields(response.data.Solution)
            setCount(response.data.Hint)
          })
          .catch(function (error) {
            console.log(error);
          })
    
      }, []);
    const clicker = () => {
 
       
        setClick(click+1);
        

    }
    return (
   
        <div className="Exercise">
        
            
              <div>
               
             
                    <h5 style={{textAlign:"center"}}>{value} </h5>
                    
                
              </div>
    
           
            
            <br></br>
          <div className="editor">
            <h5>Instruction Field</h5>
            
            </div>
            
            <div>
    
            <p> <MathJax.Context>
                    <MathJax.Text text={parse(text)} />
                    </MathJax.Context></p>
            
          </div>
          <div>
                <h5>Answer</h5>
                <textarea
                    type="text"
                    className="form-control"
                    value={answer}
                    onChange={event => handleChangeAnswer(event)}
                />
                
            </div>
            <br></br>
          <div>
          <h5>Solution</h5>
          
            < ul >
                
                    < li > 
                    
                        {inputFields[click].Solution}
                        <br></br>
                        <button className="btn btn-primary" onClick={clicker}>next solution</button>     
                    </li>
            </ul>
            <br></br>
            <h5>Hint</h5>
            {count.map((counts) => (
              
                 <div>
                <ul>
                <li>
                    {counts.Hint} 
                </li>
                </ul>
                      
                     
                 
                  </div>
                 
             
            ))}
    
          </div>
          <br></br>
          <div className="submit-button">
              <Link className="btn btn-primary" Link to={'/'}>Back</Link> 
          </div>
        </div>
        
       
      )
     
      
  
}
export default ViewExercise;