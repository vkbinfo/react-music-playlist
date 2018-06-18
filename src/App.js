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
                {name: "The Endless River",
                songs: [
                  {name: "Wake Up", length: 345},
                  {name: "Wish You were here", length: 800},
                  {name: "Us and Them", length: 900}
                ]
                },
                {name: "Wish you were here",
                songs: [
                  {name: "Time", length: 345},
                  {name: "Wish You were here", length: 800},
                  {name: "Us and Them", length: 900}
                ]
                },
                {name: "The dark side of the Moon.",
                songs: [
                  {name: "High Feels", length: 345},
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
        <h2>{Math.round(totalDuaration/60)} Minutes</h2>
      </div>
    );
  }
}
  
class Filter extends Component {
  render(){
    return (
      <div style = {colorSetting}>
      <img/>
      <input type = "text" onKeyUp = {
        event =>this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render(){
    return (
      <div style = {{...colorSetting, width: "20%", display: "inline-block"}}>
      <img/>
      <h3>{this.props.playlist.name}</h3>
      <ul style = { {float: "left"} }>
      {this.props.playlist.songs.map(song => <li>{song.name}</li>)}
      </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super();
    this.state = {
      serverData: {},
      filter :''
    };
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
      }, 2000
    );
    
  }
  render() {
    let playListToRender = this.state.serverData.user ? 
    this.state.serverData.user.playlists.filter( playlist =>
    playlist.name.includes(this.state.filter)) : []

    return (
      <div className = "App">
      {this.state.serverData.user ?
      <div>
      <h1 style = {{...colorSetting, fontSize : '54px'}}> {this.state.serverData.user.name}'s Playlist </h1>
      <PlaylistCounter playlists = {playListToRender} /> 
      <HoursCounter playlists = {playListToRender} />
      <Filter onTextChange={
        filterString => 
        this.setState({filter:filterString})
        }/>
      { playListToRender.map(playlist => <Playlist playlist = {playlist} />)}
      </div> : <h2> Loading... </h2>}
      </div>
    );
  }
}

export default App;
