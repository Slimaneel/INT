import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import parse from "html-react-parser";
import MathJax from "react-mathjax2";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import './view-exercise.css';

function ViewExercise(props) {

    const [value, setValue] = useState ("")
    const [text, setText] = useState("")
    const [inputFields, setInputFields] = useState([
        {Solution:""}
    ]);
    const [count, setCount] = useState ([
        {Hint:""}
    ]);
    const [click, setClick] = useState(0)
    const [clicker, setClicker] = useState(0);
    const [answer, setAnswer] = useState("")
    const [number, setNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [currentHint, setCurrenthint] = useState("")
    const [currentSolution, setCurrentsolution] = useState("")

    const handleChangeAnswer = (event) => setAnswer(event.target.value);
    
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
     const CheckAnswer = () => {
       if(!!inputFields.filter(answers => answers.Solution === answer).length){
        console.log("djbsj");
        setIsLoading(false);
        store.addNotification({
        title: "Success",
        message: "Correct Answer!",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration:2000,
          onScreen: false
        }

        })
      } else {
        if(answer ==="") {
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
        setNumber(number + 1)
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
      
        if(click < count.length){
         
      
      
          setCurrenthint(count[click].Hint);
          setClick(click+1);
        }else {
          document.getElementById("solution").style.visibility = 'visible';
         
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
    const ShowSolution = ()=>{
      setCurrentsolution(inputFields[clicker].Solution);
      setClicker(clicker+1);
    }
    
    

   

    if(number > 2){
      return <Result />
    }

    
    return (
     
        <div className="view">
 
          <div style={{"color":"white"}} >
            <h5 className="pdd" style={{textAlign:"center"}}>{value} </h5>
          </div>
          <br></br>
          <div >
            
          </div>
          <div style={{textAlign:"center", "color":"white"}}>
            <p> 
              <MathJax.Context>
                <MathJax.Text text={parse(text)} />
              </MathJax.Context>
            </p>
            
          </div>
          <div>
   
            <h5 style={{"color":"white"}}>Answer</h5>
              <input
              
                type="text"
             
                value={answer}
                onChange={event => handleChangeAnswer(event)}
              />
              <ReactNotification />
            
            <button  type="button"  className="btn btn-primary" onClick={CheckAnswer}>Check</button>  
            
          </div>
          
          <div>
              
                
                  <ul id="lasthint" >
                    {currentHint}
                  
                  </ul>  
                  <button id="hint" className="btn btn-primary" onClick={ShowHint}>Show Hint</button>
              
              
                  <ul if>
                    
                  {currentSolution} 
                  
                  </ul>
                  <button id="solution" style={{visibility: 'hidden'}} className="btn btn-primary" onClick={ShowSolution}>Show Solution</button>
            </div>
         
          <br></br>
          <div className="submit-button">
            <Link className="btn btn-primary" Link to={'/list'}>Back</Link> 
          </div>
          

        </div>

      );
  
}
function Result () {
  return (
    <div>
      <h1>You run out of trials</h1>
      <Link className="btn btn-primary" Link to={'/list'}>Try another exercise</Link> 
    </div>
  )
  
}

export default ViewExercise;

