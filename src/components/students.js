import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const url = "https://www.hatchways.io/api/assessment/students"

export default class students extends Component {
  constructor(props) {
    super(props);

    // this.componentDidMount()
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
    this.setState(state => {
      return state.studentList[input].showGrades = !state.studentList[input].showGrades
      // console.log('expand', state.studentList[input].showGrades)
    })
  }
  render() {
    let { studentList } = this.state;

    return (
      <div>
        <div className="container">

          {studentList.map((i, index) => (
            <div key={i.id}>
              {/* use showGrages to switch the show grades */}
              {i.showGrades = true}

              {/* {console.log(studentList[index], i)} */}
              <h1>{i.firstName} {i.lastName}</h1>
              <div className="student"  >

                <div>
                  <img className="avatar" src={i.pic}></img></div>
                <div className="student-info">
                  <ul className="list-info">
                    <li><span className="title">City: </span>{i.city}</li>
                    <li><span className="title">Company: </span>{i.company}</li>
                    <li><span className="title">Email: </span>{i.email}</li>
                    <li><span className="title">Skill:</span> {i.skill}</li>
                  </ul>

                  <ul className={(this.state.studentList[index].showGrades ? " " : "hidden") + " grades"}>
                    {i.grades.map((grade, index) => (
                      <li key={index} className="grade">Grade:{grade}</li>
                    ))}
                  </ul>
                </div>
                <button className="expand-btn" onClick={this.expandGrades.bind(this, index)}><i className="fas fa-plus"></i></button>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}