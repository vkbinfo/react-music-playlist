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
          {name: "Shine on crazy Diamond", length: 345},
          {name: "Wish You were here", length: 800},
          {name: "Us and Them", length: 900}
        ]
      },
      {name: "Pink Floyd's Best",
      songs: [
        {name: "Shine on crazy Diamond", length: 345},
        {name: "Wish You were here", length: 800},
        {name: "Us and Them", length: 900}
      ]
      },
      {name: "Pink Floyd's Best",
      songs: [
        {name: "Shine on crazy Diamond", length: 345},
        {name: "Wish You were here", length: 800},
        {name: "Us and Them", length: 900}
      ]
      },
      {name: "Pink Floyd's Best",
      songs: [
        {name: "Shine on crazy Diamond", length: 345},
        {name: "Wish You were here", length: 800},
        {name: "Us and Them", length: 900}
      ]
    }
    ]
  }
}
class PlaylistCounter extends Component {
  render(){
    return (
      <div style={{...colorSetting, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render(){
    let allSongs = this.props.playlists.reduce((allPlaylist, playlist) =>{
      return allPlaylist.concat(playlist.songs)}
    ,[])
    let totalDuaration = allSongs.reduce((sum, song) =>
    {return sum + song.length;}, 0);
    return (
      <div style={{...colorSetting, width: "40%", display: 'inline-block'}}>
        <h2>{Math.round(totalDuaration/3600)} Hours</h2>
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
  constructor(props){
    super();
    this.state = {serverData: {}};
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
      }, 2000
    );
    
  }
  render() {
    return (
      <div className = "App">
      {this.state.serverData.user ?
      <div>
      <h1 style = {{...colorSetting, fontSize : '54px'}}> {this.state.serverData.user.name}'s Playlist </h1>
      <PlaylistCounter playlists = {this.state.serverData.user.playlists} /> 
      <HoursCounter playlists = {this.state.serverData.user.playlists} />
      <Filter />
      <Playlist /> <Playlist /> <Playlist /> <Playlist />
      </div> : <h2> Loading... </h2>}
      </div>
    );
  }
}

export default App;
