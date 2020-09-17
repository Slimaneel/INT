import React from 'react';
import './App.css';
import './Components/Fontawesome'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ExerciseList from './Components/Exercise-list';
import Exercise from './Components/Exercise';
import EditExercise from './Components/Edit-Exercise';
import Skill from './Components/skill';
import Chapter from './Components/chapter';
import Add from './Components/adding-info';
import Grade from './Components/grade';
import Program from './Components/program';
import ViewExercise from './Components/view-exercise';
import firstPage from './Components/first-page';



import Nav from './Components/Nav';

function App() {
  return (
    
    
    <Router className="App-header">
      

      <Nav />
  
      <Switch>
        <Route path='/' exact component={firstPage} />
        <Route path='/list' component={ExerciseList} />
        <Route path='/exercise' component={Exercise} />
        <Route path='/edit/:id' component={EditExercise} />
        <Route path='/add' component={Add} />
        <Route path='/skills' component={Skill} />
        <Route path='/chapter' component={Chapter} />
        <Route path='/grade' component={Grade} />
        <Route path='/program' component={Program} />
        <Route path='/view/:id' component={ViewExercise} />

        
        
      </Switch>
      
    
    </Router>
 
    
   
  );
}

export default App;
