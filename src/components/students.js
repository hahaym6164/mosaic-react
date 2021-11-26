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
  expandgrades(){
    return
 
  }
  render() {
    let { studentList } = this.state;
    let testList = this.state.testList;

    return (
      <div>
      <div className="container">
      
      {studentList.map((i) => (
        <div key={i.id}>
          {/* use showGrages to switch the show grades */}
          {i.showGrades=true}

          {console.log(i,'see show')}
                 <h1>{i.firstName} {i.lastName}</h1>
        <div className="student"  >

          <div>  
          <img className="avatar" src={i.pic}></img></div>
        <div className="student-info"> 
        <ul className="list-info">
        <li><span className={i.showGrades+ " title"}>City: </span>{i.city}</li>
          <li><span className="title">Company: </span>{i.company}</li>
          <li><span className="title">Cmail: </span>{i.email}</li>
          <li><span className="title">Skill:</span> {i.skill}</li>
        </ul>

        <ul className="grades" id={i.id}>
            {i.grades.map((grade,index) => (
              <li key={index} className="grade">Grade:{grade}</li>
            ))}
          </ul>
         </div>
         <button className="expand-btn" onClick={this.expandgrades()}><i className="fas fa-plus"></i></button>

        </div>
        </div>
      ))}
      {console.log(studentList)}
      </div>
      </div>
    );
  }
}