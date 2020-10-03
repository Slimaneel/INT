import React, {useState, Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import './skill.css';



export default function Skill () {

 
  const [skillname, setSkillname] = useState("")
  const [skillcode, setSkillcode] = useState("")
  const [skillcategory, setSkillcategory] = useState("")
  const[chaptername, setChaptername]=useState("")
  const [chapters, setChapters] = useState([])
  const[gradename, setGradename]=useState("")
  const [grades, setGrades] = useState([])
  const[programname, setProgramname]=useState("")
  const [programs, setPrograms] = useState([])

  const onChangeSkillCode = (event) => {
    setSkillcode(event.target.value)
  }
  const onChangeSkillName = (event) => {
    setSkillname(event.target.value)
  }
  const onChangeSkillCategory = (event) => {
    setSkillcategory(event.target.value)
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
  useEffect(() => {
    axios.get('http://localhost:1000/grade',{params: { program_id: programname} })
        .then(response => {
            console.log(response.data)
            setGrades(
                 response.data,
            )

        })
        .catch(function(error){
            console.log(error);
        })
  },[programname]);

  useEffect(() => {
    axios.get('http://localhost:1000/chapter',{params: { grade_id: gradename} })
        .then(response => {
            console.log(response.data)
            setChapters(
                 response.data,
            )

        })
        .catch(function(error){
            console.log(error);
        })
  },[gradename]);
 
  const onSubmit  = (event) => {
    event.preventDefault();

    const skill = {
        Code : skillcode,
        Name: skillname,
        Category: skillcategory,
        chapter: chaptername
       
    }

    console.log(skill);
    
    axios.post("http://localhost:1000/skills/add", skill)
    .then(res => console.log(res.data));

    
    window.location = "/skills";
   
}

    return (
      <body  className="body" >
      <div className="wrapper">
      <h3 style={{textAlign:"center"}}>Add Skill</h3>
      <form onSubmit={onSubmit}>
        <div className="contact-form"> 
          <div style={{"width":"280px"}} className="input-fields">
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
                  <br></br>
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
                  <br></br>
                  <label className="label-fields">Chapter Name</label>
                  <Select  onChange={(event) => setChaptername(event.value) } defaultValue={{label:"Choose Chapter ", value:"choose Chapter"}} options={chapters.map((item)=> ({value: item._id, label: item.Name}))}
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
            <label className="label-fields">Skill Code </label>
            <input type="text"
             
                className="input"
                value={skillcode}
                onChange={event => onChangeSkillCode(event)}/>
              
        
            <label className="label-fields">Skill Name </label>
          
            <input type="text"
                
                className="input"
                value={skillname}
                onChange={event => onChangeSkillName(event)}
                />
          
          
            <label className="label-fields">Skill Category</label>
              
            <input 
                type="text" 
                className="input"
                value={skillcategory}
                onChange={event => onChangeSkillCategory(event)}
            />
          </div>
          
        </div>

        <div >
          <input type="submit" value="Add Skill" className="btn-skill btn-skill-primary mr-2" />
          <Link className="btn-skill btn-skill-primary"  to={'/list'}>Cancel</Link> 
   
        </div>
      </form>
    </div>
    </body>
    )
  
}

