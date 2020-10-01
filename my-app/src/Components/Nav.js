import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import './Nav.css';


export default class Nav extends Component{
    render () {
     return (
        <nav className='navbar navbar-expand-lg navbar-light fixed top' id="mainNav">
            <div className="container">
            <a class="brand" href="/">
                MATHSCAN
            </a>
        
            <div style={{"margin-left":"20rem"}}className='collapse navbar-collapse'>
            
                <ul className='navbar-nav '>
                    <li className='nav-item'> 
                        <a  className='nav-link js-scroll-trigger' href="/list">Home</a>
                    </li>
                    <li className='nav-item'> 
                        <a className='nav-link js-scroll-trigger' href="/exercise">Add Exercise</a>
                    </li>
                 
                    <li className='nav-item'> 
                        <a to='/add' className='nav-link js-scroll-trigger' href="/add">Settings</a>
                    </li>
                    <li className='nav-item'> 
                        <a to='/contact' className='nav-link js-scroll-trigger' href="/contact">Contact</a>
                    </li>
                 
                    
                </ul>
            
            </div>
            </div>
        </nav>
     );
    }
}

