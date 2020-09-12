import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios';
import { json } from 'body-parser';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      OriginalUrl:'',
      ShortUrl:'',
      urlDetail:[]
    }
  }

  componentDidMount(){
    fetch('http://localhost:4000')
        .then(response => response.json())
        .then(json => this.setState({ urlDetail: json }));

    console.log(this.state.urlDetail)
  }

  changeHandler = (e) => {
    console.log(e)
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:4000/add`, { "originalUrl":this.state.OriginalUrl })
      .then(res => {
        console.log(res.data);
        this.setState({
          ShortUrl:res.data
        });
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  render() {
    return (
      <div className="container">
          <div className="jumbotron">
              <h1 className="display-4">URL Shortener</h1>
              <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="originalurl">Original Url</label>
                <input type="text" className="form-control" name="OriginalUrl" value={this.state.OriginalUrl} onChange={this.changeHandler}/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              
              <small id="emailHelp" className="form-text text-muted"><b>{this.state.ShortUrl}</b></small>
          </div>
    </div>
    )
  }
}

export default App;
