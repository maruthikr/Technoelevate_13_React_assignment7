import React from 'react'
import axios from "axios";
import { Component } from 'react';


export default class CreateAccount extends Component {
    state = {
        user:"",
        email:"",
        phn:"",
        StudentID:"",
        pwd:""
    }

    handleChange =(event)=>{
        this.setState({
            [event.target.name ]: event.target.value
        })
    }

    handleSubmit =(event)=>{
        event.preventDefault();
        console.log(this.state);

        const url = "https://index-student-default-rtdb.firebaseio.com/accounts.json"
        const data = {...this.state}
      
        axios.post(url , data ).then((resp)=>{
            console.log(resp);
            if (resp.status === 200) {
                alert("Data Stored Successfully")
                this.setState({
                    name:"",
                    email:"",
                    phn:"",
                    StudentID:"",
                    pwd:""
                })

                this.props.history.push("/details")
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

  render() {
    return (
      
      <div className="container card col-md-10">
        <form className="container card-body , bg-secondary" onSubmit={this.handleSubmit}>
        <div className="form-group ">
            <label htmlFor="user">Student Name</label>
            <input
              type="text"
              className="form-control"
              id="user"
              aria-describedby="emailHelp"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phn">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="phn"
              aria-describedby="emailHelp"
              name="phn"
              value={this.state.phn}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="scn">StudentID</label>
            <input
              type="text"
              className="form-control"
              id="scn"
              aria-describedby="emailHelp"
              name="StudentID"
              value={this.state.StudentID}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="pwd"
              value={this.state.pwd}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}