import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component{
    render () {
     return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                    <li className='navrbar-item'> 
                        <Link to='/' className='nav-link'>Exercise list</Link>
                    </li>
                    <li className='navrbar-item'> 
                        <Link to='/exercise' className='nav-link'>add Exercise</Link>
                    </li>
                    <li className='navrbar-item'> 
                        <Link to='/skills' className='nav-link'>add skill</Link>
                    </li>
                   
                    
                </ul>
            </div>
        </nav>
     );
    }
}

