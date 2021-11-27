import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Students from "./students";

export default class Searchbar extends Component {
    constructor(props) {
      super(props);
      
      
    }
    render(){
        return (
            <div>
               <div>
                   <input className="search-bar" type="text" placeholder="Search bar..."/>
               search bar
                   </div>

            </div>
        )
    }
}