import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Searchbar from "./searchbar";
const url = "https://www.hatchways.io/api/assessment/students"

export default class students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: []
    }
    
  }
  componentDidMount() {
    axios
      .get(url)
      .then(res => {
        this.setState({ studentList: res.data.students })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  expandGrades(input) {
    let update = this.state.studentList
    update[input].showGrades = !update[input].showGrades
    
    this.setState({
      studentList : update
    })
  }
  render() {
    let { studentList } = this.state;
    return (
      <div>
        <div className="container">
              <Searchbar/>
          {studentList.map((i, index) => (
            <div key={i.id}>

              {/* {console.log(studentList[index], i)} */}
              <h1>{i.firstName} {i.lastName}</h1>
              <div className="student"  >

                <div>
                  <img className="avatar" src={i.pic}></img></div>
                <div className="student-info">
                  <div className="list-info">
                    <p><span className="title">City: </span>{i.city}</p>
                    <p><span className="title">Company: </span>{i.company}</p>
                    <p><span className="title">Email: </span>{i.email}</p>
                    <p><span className="title">Skill:</span> {i.skill}</p>
                  </div>

                  <div className={(i.showGrades ? " " : "hidden") + " grades"}>
                    {i.grades.map((grade, index) => (
                      <p key={index} className="grade"><span className="title" >Grade:</span>  {grade}</p>
                    ))}
                  </div>
                </div>
                <button className="expand-btn" onClick={this.expandGrades.bind(this, index,i)}><i className="fas fa-plus"></i></button>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}