import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";


class App extends React.Component {
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

    getLists = () => {
    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(result =>
        this.setState({
          loading: false,
          alldata: result
        })
      )
      .catch(console.log);
   }

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

// App.js handlers:
getList = (event, id) => {
  this.setState(
    {
      singledata: {
        title: "Loading...",
        author: "Loading..."
      }
    },
    () => {
      fetch("http://localhost:8000/posts/" + id)
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

updateList = (event, id) => {
  fetch("http://localhost:8000/posts/" + id, {
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
      this.getLists();
    });
}

deleteList = (event, id) => {
    fetch("http://localhost:8000/posts/" + id, { // Make sure this matches your updated port!
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
        this.getLists(); // Refresh the table after deleting
      });
  }

createList = () => {
    fetch("http://localhost:8000/posts", { // Make sure this matches your current port (e.g., 8000)
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singledata)
    })
      .then(res => res.json())
      .then(result => {
        // Clear the form
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        // Auto-refresh the table with the new data
        this.getLists(); 
      });
  }

   render() {
    const listTable = this.state.loading ? (
      <span>Loading Data...... Please be patient</span>
    ) : (
      <Lists
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        getList={this.getList}
        updateList={this.updateList}
        deleteList={this.deleteList} // Add this line!
        handleChange={this.handleChange}
      />
    );

        

    return (
      <div className="container">
        <span className="title-bar">
            <button type="button" className="btn btn-primary" onClick={this.getLists}>
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