import React, { Component } from 'react';
import './App.css';

let colorSetting = {
 color : '#fdg'
};

let fakeServerData = {
  user : {
    name : "David",
    playlists : [
      { name: "Pink Floyd's Best",
        songs: [
          "Shine on crazy Diamond",
          "Wish You were here",
          "Us and Them"
        ]
      },
      {name: "Pink Floyd's Best",
      songs: [
        "Shine on crazy Diamond",
        "Wish You were here",
        "Us and Them"
      ]
      },
      {name: "Pink Floyd's Best",
      songs: [
        "Shine on crazy Diamond",
        "Wish You were here",
        "Us and Them"
      ]
      },
      {name: "Pink Floyd's Best",
      songs: [
        "Shine on crazy Diamond",
        "Wish You were here",
        "Us and Them"
      ]
    }
    ]
  }
}
class Aggregate extends Component {
  render(){
    return (
      <div style={{...colorSetting, width: "40%", display: 'inline-block'}}>
        <h2>Number Text</h2>
      </div>
    );
  }
}
  
class Filter extends Component {
  render(){
    return (
      <div style = {colorSetting}>
      <img/>
      <input type = "text" />
      <button style = {{display:"inline-block"}}> Search </button>
      </div>
    );
  }
}

class Playlist extends Component {
  render(){
    return (
      <div style = {{...colorSetting, width: "20%", display: "inline-block"}}>
      <img/>
      <h3>Playlist Name</h3>
      <ul style = { {float: "left"} }>
        <li>Song 1</li>
        <li>Song 2</li>
        <li>Song 3</li>
      </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className = "App">
      <h1 style = {{...colorSetting, fontSize : '54px'}}> {fakeServerData.user.name}'s Playlist </h1>
      <Aggregate /> <Aggregate />
      <Filter />
      <Playlist /> <Playlist /> <Playlist /> <Playlist />
      </div>
    );
  }
}

export default App;
