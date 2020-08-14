import React, { useState, Component, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';


class Dropdown extends Component {
    state ={
        Name: []
    };
    
    componentDidMount() {
        axios.get('http://localhost:1000/skills/Name,_id')
            .then(response => {
                console.log(response.data)
                this.setState({
                    Name: response.data,
                })

            })
            .catch(function(error){
                console.log(error);
            })
    }
    render () {
        return (
            <div>
            <p>Skill Name</p>
            <Select defaultValue={{label:"Choose Skill ", value:"choose Skill"}} options={this.state.Name.map((item)=> ({value: item._id, label: item.Name}))}>
            </Select>
            </div>
        )
    }
}
export default Dropdown;