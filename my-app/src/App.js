import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ExerciseList from './Components/Exercise-list';
import Exercise from './Components/Exercise';
import EditExercise from './Components/Edit-Exercise';
import Skill from './Components/skill';
import ViewExercise from './Components/view-exercise';


import Nav from './Components/Nav';

function App() {
  return (
    <Router>
      <div className='App'>
      <Nav />
      <Switch>
        <Route path='/' exact component={ExerciseList} />
        <Route path='/exercise' component={Exercise} />
        <Route path='/edit/:id' component={EditExercise} />
        <Route path='/skills' component={Skill} />
        <Route path='/view/:id' component={ViewExercise} />
        
        
      </Switch>
      </div>
    </Router>
  );
}

export default App;
