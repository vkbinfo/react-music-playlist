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

  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps){
    // updated props will come here.
    this.setState({playlists:nextProps.playlists})
    this.render()
  }

  render(){
    let songsToLoad = this.state.playlists
    ?(this.state.playlists.reduce((allPlaylist, playlist) =>{
      return allPlaylist.concat(playlist.songs)}
      ,[]))
    :[]
    let totalDuaration = songsToLoad.reduce((sum, song) => sum + song.length, 0);

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
      <img src={this.props.playlist.imageURL} style={{width:"120px"}}/>
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
      filter :''
    };
  }

   getSongs(tracksInfo, accessToken){
    return fetch(tracksInfo.href,{headers: {Authorization: 'Bearer ' + accessToken}})
                          .then(  response => response.json())
                          .then(data => data.items.map(track =>{
                                                          let singleTrackInfo = {name:track.track.name, length:330}
                                                          return singleTrackInfo;
                                                          })
                                )                        
  }

  componentDidMount(){
    let params = (new URL(document.location)).searchParams;
    let accessToken = params.get("access_token");
    if (!accessToken){
      return 1;
    }

    //getting user names
    fetch("https://api.spotify.com/v1/me", {headers: {Authorization: 'Bearer ' + accessToken }})
    .then(  response => response.json())
    .then(data=>{ 
                  this.setState({user:{name: data.display_name}})
                  })
  
    
     //let's get playlists of user
      fetch("https://api.spotify.com/v1/me/playlists", {headers: {Authorization: 'Bearer ' + accessToken}})
      .then( response => response.json() )
      .then( data=>this.setState({playlists: data.items.map( playlist => { 
                                                      let playlistDetail={}
                                                      playlistDetail['name'] = playlist.name;
                                                      playlistDetail['imageURL']= playlist.images[0].url
                                                      this.getSongs(playlist.tracks,accessToken).then(data=>playlistDetail['songs']=data)
                                                      return playlistDetail
                                                    } 
                                      )
                                  })
            )
   
    
  }

  render() {
    let playListToRender = this.state.playlists
    ? this.state.playlists.filter( playlist =>
      playlist.name.toLowerCase().includes(this.state.filter.toLowerCase())) 
    : []
    return (
      <div className = "App">
        {
          this.state.user 
          ?<div>
            <h1 style = {{...colorSetting, fontSize : '54px'}}> {this.state.user.name}'s Playlist </h1>
            <PlaylistCounter playlists = {playListToRender} /> 
            <HoursCounter playlists = {playListToRender} />
            <Filter onTextChange={
              filterString => 
              this.setState({filter:filterString})
              }/>
            { playListToRender.map(playlist => <Playlist playlist = {playlist} />)}
            </div> 
          : <button onClick = {()=>window.location = "http://localhost:8888/login"}
                    style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}> Sign In
            </button> 
        }
      </div>
    );
  }
}

export default App;
