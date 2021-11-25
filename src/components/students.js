import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const url = "https://www.hatchways.io/api/assessment/students"

export default class students extends Component {
    constructor(props) {
      super(props);
      // this.componentDidMount()
      this.state = {
        students: []
      }
    }
    componentDidMount() {
      axios
        .get(url)
        .then(res => 
          {
            this.setState({students: res.data})
            console.log(this.state.students)
          })
        .catch((err) => {
          console.log(err);
        })
    }
    render(){
      let { students } = this.state;

      return  (<div> 
        
              {students.map( i=> {
                <div>{i.name}</div>
              })}
      </div>);
    }
  }