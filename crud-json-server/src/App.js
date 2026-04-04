import React, { Component } from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
  }

  // READ (GET all books)
  getLists = () => {
    fetch("http://localhost:3000/api/books") // Updated port to 3000
      .then(res => res.json())
      .then(result =>
        this.setState({
          loading: false,
          alldata: result
        })
      )
      .catch(console.log);
  }

  // Handle input changes
  handleChange = (event) => {
    let title = this.state.singledata.title;
    let author = this.state.singledata.author;

    if (event.target.name === "title") title = event.target.value;
    else author = event.target.value;

    this.setState({
      singledata: {
        title: title,
        author: author
      }
    });
  }

  // CREATE (POST new book)
  createList = () => {
    fetch("http://localhost:3000/api/books", { // Updated port to 3000
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists(); // Refresh table
      });
  }

  // READ (GET single book for Update/Delete modals)
  getList = (event, id) => {
    this.setState(
      {
        singledata: {
          title: "Loading...",
          author: "Loading..."
        }
      },
      () => {
        fetch("http://localhost:3000/api/books/" + id) // Updated port to 3000
          .then(res => res.json())
          .then(result => {
            this.setState({
              singledata: {
                title: result.title,
                author: result.author ? result.author : ""
              }
            });
          });
      }
    );
  }

  // UPDATE (PUT existing book)
  updateList = (event, id) => {
    fetch("http://localhost:3000/api/books/" + id, { // Updated port to 3000
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists(); // Refresh table
      });
  }

  // DELETE (DELETE existing book)
  deleteList = (event, id) => {
    fetch("http://localhost:3000/api/books/" + id, { // Updated port to 3000
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists(); // Refresh table
      });
  }

  render() {
    const listTable = this.state.loading ? (
      <span>Loading Data...... Please be patience.</span>
    ) : (
      <Lists
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        getList={this.getList}
        updateList={this.updateList}
        deleteList={this.deleteList}
        handleChange={this.handleChange}
      />
    );

    return (
      <div className="container mt-4">
        <span className="title-bar d-flex mb-3">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={this.getLists}
          >
            Get Lists
          </button>
          <CreateList
            singledata={this.state.singledata}
            handleChange={this.handleChange}
            createList={this.createList}
          />
        </span>
        {listTable}
      </div>
    );
  }
}

export default App;