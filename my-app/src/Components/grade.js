import React, {useState, Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';



export default function Grade () {


  
  const[programname, setProgramname]=useState("")
  const [gradename, setGradename] = useState("")
  const [programs, setPrograms] = useState([])
 
  const onChangeGradeName = (event) => {
    setGradename(event.target.value)
  }
  useEffect(() => {
    axios.get('http://localhost:1000/program')
        .then(response => {
            console.log(response.data)
            setPrograms(
                 response.data,
            )

        })
        .catch(function(error){
            console.log(error);
        })
  },[]);
 
  const onSubmit  = (event) => {
    event.preventDefault();

    const gradefield = {
        Name: gradename,
        program: programname
    }

    console.log(gradefield);
    
    axios.post("http://localhost:1000/grade/add", gradefield)
    .then(res => console.log(res.data));
  
    window.location = "/grade";
  }   
    return (
      <body className="body" >
        <div className="wrapper">
            <h3 style={{textAlign:"center"}}>Add Grade</h3>
            <form onSubmit={onSubmit}>
                <div className="contact-form"> 
                <div className="input-fields">
                <div>
                  <label className="label-fields">Program Name</label>
                    <Select  onChange={(event) => setProgramname(event.value) } defaultValue={{label:"Choose Program ", value:"choose Program"}} options={programs.map((item)=> ({value: item._id, label: item.Name}))}
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

                    <label className="label-fields">Grade Name</label>
                
                    <input type="text" 
                        className="input"
                        value={gradename}
                        onChange={event => onChangeGradeName(event)}
                    />
                </div>
                
                </div>

                <div>
                <input type="submit" value="Add Grade" className="btn-skill btn-skill-primary mr-2" />
                <Link className="btn-skill btn-skill-primary" to={'/list'}>Cancel</Link> 
                </div>
            </form>
        </div>
      </body>
    )
  
}