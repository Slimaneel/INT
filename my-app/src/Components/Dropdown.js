import React, { useState, Component, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';


function Dropdown (){
    const[name, setName]=useState([])
    
    
    useEffect(() => {
        axios.get('http://localhost:1000/skills/Name,_id')
            .then(response => {
                console.log(response.data)
                setName(
                     response.data,
                )

            })
            .catch(function(error){
                console.log(error);
            })
    },[]);
   
        return (
            <div>
            <p>Skill Name</p>
            <Select defaultValue={{label:"Choose Skill ", value:"choose Skill"}} options={name.map((item)=> ({value: item._id, label: item.Name}))}>
            </Select>
            </div>
        )
    
}
export default Dropdown;