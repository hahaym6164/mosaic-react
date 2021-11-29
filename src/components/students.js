import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import './style.css'
const url = "https://www.hatchways.io/api/assessment/students"

export default class students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      allStudentList: [],
      searchByName: '',
      searchByTag: ''
    }

  }
  update() {
    let update = this.state.searchByName || this.state.searchByTag ?
      this.state.allStudentList.filter(i => {
        let name = i.firstName + ' ' + i.lastName
        return name.toLowerCase().includes(this.state.searchByName.toLowerCase())
      }).filter(i => {
        if (this.state.searchByTag) {
          return i.tags ? i.tags.find(tag => tag.includes(this.state.searchByTag)) : false
        } else {
          return true
        }
      }) : this.state.allStudentList
    this.setState({
      studentList: update
    })
    console.log(update, 'update', this.state.searchByName)
  }
  componentDidMount() {

    axios
      .get(url)
      .then(res => {
        // if user enter search term, filter the student list with it

        this.setState({
          studentList: res.data.students,
          allStudentList: res.data.students

        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  // filters for user input, NAME and TAG
  filterByName(e) {
    this.setState({
      searchByName: e.target.value
    }, () => this.update())

  }
  filterByTag(e) {
    this.setState({
      searchByTag: e.target.value
    }, () => this.update())

  }
  expandGrades(input) {
    let update = this.state.studentList
    update[input].showGrades = !update[input].showGrades

    this.setState({
      studentList: update
    })
  }
  addTags(index, e) {

    let value = e.target.value
    if (e.key === "Enter") {
      let update = this.state.studentList
      if (update[index].tags) {
        if (!(update[index].tags.indexOf(value) > -1)) {
          update[index].tags.push(value)
        } else {
          alert(`This student already have this tag`)
        }
      } else {
        update[index].tags = [value]
      }

      this.setState({
        studentList: update,
        allStudentList: update
      })
    }

  }
  render() {

    let { studentList } = this.state;
    return (
      <div>
        <div className="container">
          <input className="search-bar" onKeyUp={this.filterByName.bind(this)} type="text" placeholder="Search by name" />
          <input className="search-bar" onKeyUp={this.filterByTag.bind(this)} type="text" placeholder="Search by tag" />

          {studentList.length > 0 ? '' : <div className="no-student">No student shown based on your search</div>}

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
                    <p><span className="title">Average:</span> {(i.grades.reduce((a, b) => parseInt(a) + parseInt(b))}</p>
                  </div>
                  <div className={(i.showGrades ? " " : "hidden") + " grades"}>
                    {i.grades.map((grade, index) => (
                      <p key={index} className="grade"><span className="title" >Grade:</span>  {grade}</p>
                    ))}
                  </div>
                  <div className="tags">
                    {i.tags ?
                      i.tags.map(tag => (
                        <div className="tag" key={tag}>{tag}</div>
                      ))
                      : ''}

                  </div>
                  <input type="text" className="add-tag" placeholder="Add tag here" onKeyUp={this.addTags.bind(this, index)} />

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