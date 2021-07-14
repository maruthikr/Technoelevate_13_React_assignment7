import axios from "axios";
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ShowAccounts extends Component {
  state = {
    accounts: [],
    show: false,
    id: "",
   name: "",
    email: "",
    phn: "",
    StudentID: "",
    pwd: "",
  };

  componentDidMount() {
    axios
      .get("https://index-student-default-rtdb.firebaseio.com/accounts.json")
      .then((resp) => {
        const fetchedAccounts = [];

        for (const key in resp.data) {
          console.log(resp.data[key]);
          fetchedAccounts.push({
            id: key,
            ...resp.data[key],
          });
        }

        console.log(fetchedAccounts);
        this.setState((data) => {
          console.log(data);
          return {
            accounts: fetchedAccounts,
          };
        });

        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeAccount = (account) => {
    console.log(account);
    const url = `https://index-student-default-rtdb.firebaseio.com/accounts/${account.id}.json`;
    axios
      .delete(url)
      .then((resp) => {
        console.log(resp.status);
        const updatedAccounts = this.state.accounts.filter((acc) => {
          if (acc.id === account.id) {
            return false;
          } else {
            return true;
          }
        });

        this.setState({
          accounts: updatedAccounts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  updateAccount = (account) => {
    console.log(account);
    this.setState({
      ...account,
      show: true,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  update = () => {
    console.log(this.state);
    const url = `https://index-student-default-rtdb.firebaseio.com/accounts/${this.state.id}.json`;


    
    const { name, email, StudentID, phn, pwd } = this.state;
    const acc = { name, email, StudentID, phn, pwd };

    axios
      .put(url, acc)
      .then((resp) => {
        console.log(resp);
        const updatedData = resp.data;

     const updatedRecords =  this.state.accounts.map((acc)=>{
            if ( acc.id === this.state.id ) {
                return {
                    id:this.state.id,
                    ...updatedData
                }
            }else{
                return acc;
            }
        })

        this.setState({
            show:false,
            accounts : updatedRecords
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (

              <div>
           <h1>Student Details</h1>
            <table class="table">
            <thead class="thead-dark">
            <tr>
              <th scope="col">SI.NO</th>
              <th scope="col">Student Name</th>
              <th scope="col">Email ID</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Student ID</th>
              <th></th>
              <th></th>
            </tr>
          </thead >
          <tbody >
            {this.state.accounts.map((account, index) => {
              return (
                <tr key={account.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.phn}</td>
                  <td>{account.StudentID}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        this.updateAccount(account);
                      }}
                    >
                      Update </button>

                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.removeAccount(account);
                      }}
                    >
                      Delete </button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Student update</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form className="container card-body ">
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
                <label htmlFor="scn">Student ID</label>
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
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.handleClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.update();
              }}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

