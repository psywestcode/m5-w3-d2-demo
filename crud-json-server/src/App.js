import React from "react";
import Lists from "./Lists";

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

   render() {
    const listTable = this.state.loading ? (
      <span>Loading Data...... Please be patient</span>
    ) : (
      <Lists alldata={this.state.alldata} />
    );

    return (
      <div className="container">
        <span className="title-bar">
          <button type="button" className="btn btn-primary" onClick={this.getLists}>Get Lists</button>
        </span>
        {listTable}
      </div>
    );
  }

  }

export default App;