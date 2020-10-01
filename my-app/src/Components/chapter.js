import React, { useState, Fragment, useEffect }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';



export default function Chapter () {
  
  const[chaptername, setChaptername]=useState("")
  const [gradename, setGradename] = useState("")
  const [grades, setGrades] = useState([])
  
 
  const onChangeChapterName = (event) => {
    setChaptername(event.target.value)
  }


  const onSubmit = (event) => {
    event.preventDefault();

    const chapter = {
        Name: chaptername,
        grade: gradename
    }

    console.log(chapter);
    
    axios.post("http://localhost:1000/chapter/add", chapter)
    .then(res => console.log(res.data));
  
    window.location = "/chapter";
  }   
  useEffect(() => {
    axios.get('http://localhost:1000/grade')
        .then(response => {
            console.log(response.data)
            setGrades(
                 response.data,
            )

        })
        .catch(function(error){
            console.log(error);
        })
  },[]);


    return (
      <body className="body" >
        <div className="wrapper">
            <h3 style={{textAlign:"center"}}>Add Chapter</h3>
            <form onSubmit={onSubmit}>
                <div className="contact-form"> 
                <div className="input-fields">
                <div>
                  <label className="label-fields">Grade Name</label>
                    <Select  onChange={(event) => setGradename(event.value) } defaultValue={{label:"Choose Grade ", value:"choose Grade"}} options={grades.map((item)=> ({value: item._id, label: item.Name}))}
                      theme={theme => ({
                        ...theme,
                        colors:{
                          ...theme.colors,
                          primary:'#64a19d',

                        }
                      })}
                      >
                    </Select>
                </div>
                <br></br>
                    <label className="label-fields">Chapter Name</label>
                
                    <input type="text" 
                        className="input"
                        value={chaptername}
                        onChange={event => onChangeChapterName(event)}
                    />
                </div>
                
                </div>

                <div >
                <input type="submit" value="Add Chapter" className="btn-skill btn-skill-primary mr-2" />
                <Link className="btn-skill btn-skill-primary" to={'/list'}>Cancel</Link> 
                </div>
            </form>
        </div>
      </body>
    )
  
}