import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const url = "https://www.hatchways.io/api/assessment/students"

export default class students extends Component {
  constructor(props) {
    super(props);

    // this.componentDidMount()
    this.state = {
      studentList: [],
      test: '',
      testList: [{
        test: 1,
        test2: 2
      }, {
        test: 1,
        test2: 2
      }]


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
  render() {
    let { studentList } = this.state;
    let testList = this.state.testList;

    return (<div className="container">
      {studentList.map((i) => (
        <div className="student" key={i.id} >

          <p className="name">{i.firstName} {i.lastName}</p>
          <img className="avatar" src={i.pic}></img>

          <p>City: {i.city}</p>
          <p>company: {i.company}</p>
          <p>email: {i.email}</p>
          <p>skill: {i.skill}</p>
          <ul className="grades">
            {i.grades.map(grade => (
              <li className="grade">Grade:{grade}</li>
            ))}
          </ul>
        </div>
      ))}
      {console.log(studentList)}

    </div>);
  }
}