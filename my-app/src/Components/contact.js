import React, { useState, Fragment, useEffect }from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './contact.css';

export default function Contact () {
    const [contactname, setContactname] = useState("")
    const [contactemail, setContactemail] = useState("")
    const [subject, setContactsubject] = useState("")
    const [message, setMessage] = useState("")
    
    const onChangecontactname = event => {
        setContactname(event.target.value)
    }
    const onChangecontactemail = event => {
        setContactemail(event.target.value)
    }
    const onChangecontactsubject = event => {
        setContactsubject(event.target.value)
    }
    const onChangemessage = event => {
        setMessage(event.target.value)
    }
    const handleSubmit = event => {
        event.preventDefault();

        emailjs.sendForm('gmail', 'template_metgyxl', event.target, 'user_pt1bM876DYbKGzVkPEXWA')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          event.target.reset()
      
    
    }

    return(
        <div className="bg-div">
           <form onSubmit={handleSubmit}>
            <div className="pad">
                <h2 style={{"color":"white"}}>CONTACT US</h2>
            </div>
            <div>
            <div className="contact" style={{"display":"flex"}}>
                <div style={{"display":"block", "margin-bottom":"3.5rem","width": "75%"}}>
                    <div style={{"display":"block"}}>
                        <label className="label-des">Name</label>
                        <input className="contact-inp" name="name" onChange={event => {onChangecontactname(event)}} />
                    </div>
                    <br></br>
                    <div  style={{"display":"block"}}>
                        <label className="label-des">Email</label>
                        <input className="contact-inp" name="email" onChange={event => {onChangecontactemail(event)}} />
                    </div>
                    <br></br>
                    <div>
                        <label className="label-des">Subject</label>
                        <input className="contact-inp" name="subject" onChange={event => {onChangecontactsubject(event)}} />
                    </div>
                </div>
                <div>
                    <label style={{"margin-left":"-17rem"}}className="label-des">Message</label>
                    <textarea className="contact-message" name="message" onChange = {event => {onChangemessage(event)}} />
                </div>
                </div>
                <button className="message-button prim-message-button"Link to='/contact'>SEND MESSAGE</button>
            </div>
            </form>
        </div>
    )
}