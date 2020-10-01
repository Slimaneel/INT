import React, {Component} from 'react';
import './first-page.css';
import { Link } from 'react-router-dom';

class firstPage extends Component {
    render() {
        return (
            <div className="masthead"> 
            <div className="containers align-items-center">
                <div className="text-center-cover color-block">
            <h1 className="text-white-50 my-0 text-uppercase">Mathscan</h1>
            <br></br>
            <h2 className="text-white-40 mx-auto mt-2 mb-5">Your contribution will guide students towards excellence in mathematics</h2>
        <Link className="btn " Link to={'/list'}>Get started</Link> 
        </div>
        </div>
        </div>
        )
    }
}
export default firstPage;