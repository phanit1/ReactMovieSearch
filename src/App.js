import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from 'axios';


// let movieList = []
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {movie: '',showName:false,movieList:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({movie: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    const movieName = this.state.movie
    axios(`https://www.omdbapi.com/?apikey=6cde2c47&type=movie&s=${movieName}`)
        // .then(res=>res.json())
        .then(respond=>this.setState({movieList:respond.data.Search}))
        .catch(err=>console.log(err))
    // if(movieName === '') {
    //   alert("You cant enter empty");
    //   return
    // }
    // moviefromapi = 
    // else if(movieList.includes(movieName)) {
    //   alert("You are trying to enter existing task");
    //   return;
    // }
    // movieList.push(movieName);

    console.log(this.state.movieList)
    this.setState({showName:true});
  }


  render(){
    return (
      <div className = "container" style={{"color":"white", "marginLeft":"250px"}}>
      <h1>MOVIES SEARCH APP</h1>
      <form onSubmit={this.handleSubmit}>
        <p>Enter the movie you want to search:</p>
        <input id = "movieName" value={this.state.value} onChange={this.handleChange} />
        <br></br><br></br>
        <input type="submit" value="Search"/>
      </form><br></br>
      {/* <h2>All Tasks</h2> */}
      <div>
      <CardGroup>
        {this.state.movieList.map((tk) => (
          <div>
          {tk.Poster !== "N/A" ? (<Card>
          <Card.Img variant="top" src={tk.Poster} height="400px" alt="No Poster Found"/>
          <Card.Body>
            <Card.Title style={{"color":"black"}}>{tk.Title}</Card.Title>
            <Card.Text style={{"color":"black"}}>{tk.Year}</Card.Text>
            <Card.Text style={{"color":"black"}}>{tk.Country}</Card.Text>
            {/* <Card.Text style={{"color":"black"}}>{tk.Language}</Card.Text>
            <Card.Text style={{"color":"black"}}>{tk.Actors}</Card.Text> */}
            </Card.Body></Card>):(<></>)}
          </div>
        ))}
        </CardGroup>
      </div>
      
      </div>
    )
  }
}