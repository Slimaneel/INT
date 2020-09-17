import React from 'react';
import { Link } from 'react-router-dom';
import './adding-info.css'


export default function Add () {
    return(
        <section className='bg-black'>
            <div className='block'>
                <div className='card'>
                    <div className='card-body'>
                        <h4 className="h4-text">Add Skill</h4>
                        <hr className="hr2"/>
                        <Link className='links' to={'/skills/'}>+</Link>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <h4 className="h4-text">Add Chapter</h4>
                        <hr className="hr2"/>
                        <Link className='links' to={'/chapter/'}>+</Link>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <h4 className="h4-text">Add Grade</h4>
                        <hr className="hr2"/>
                        <Link className='links' to={'/grade/'}>+</Link>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <h4 className="h4-text">Add Program</h4>
                        <hr className="hr2"/>
                        <Link className='links' to={'/program/'}>+</Link>
                    </div>
                </div>
            
            </div>
        </section>
    )
}