import React, { Component } from 'react';
import './App.css';

let colorSetting = {
 color : '#fdg'
};

class PlaylistCounter extends Component {
  render(){
    return (
      <div style={{...colorSetting, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.userPlaylists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {

  render(){
    let songsToLoad = this.props.userPlaylists
    ?(this.props.userPlaylists.reduce((allPlaylist, playlist) =>{
      return allPlaylist.concat(playlist.songs)}
      ,[]))
    :[]
   let totalDuaration = songsToLoad.reduce((sum, song) => ((song === undefined)?sum + 0:sum + song.length), 0)
  
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
      { this.props.playlist.songs 
        && this.props.playlist.songs.map(song => <li>{song.name}</li>)}
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

   async getSongs(tracksInfo, accessToken){
    let response = await fetch(tracksInfo.href,{headers: {Authorization: 'Bearer ' + accessToken}})
                          .then(  response => response.json())
                          .then(data => data.items.map(songObj =>{
                                                          let track =songObj.track
                                                          let singleTrackInfo = {name:track.name, length:Math.round(track.duration_ms/1000)}
                                                          return singleTrackInfo;
                                                          })
                                )
    return response
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
      .then( data=>data.items.map( async playlist => { 
                                                      let playlistDetail={}
                                                      playlistDetail['name'] = playlist.name;
                                                      playlistDetail['imageURL']= playlist.images[0].url
                                                      playlistDetail['songs'] = await this.getSongs(playlist.tracks,accessToken)
                                                      return playlistDetail
                                                    } 
                                      )
            )
      // We should get all ansynchronmous data then we should set the state, 
      // otherwise object will be created in state and something gets updates in object in deeper
      // level the setState will not get applied. Allways apply setState when you have full data.
      .then(data => {
        data.map(playlistPromise=> playlistPromise.then(playlist=>
          {
            let playlistsNow = this.state.playlists
                                ?this.state.playlists
                                :[];
            playlistsNow.push(playlist)
            this.setState({playlists:this.state.playlists
                          ? playlistsNow
                          :[]
                        })
          }))
    })
  }

  
  render() {
    let playListToRender = this.state.playlists && this.state.user
    ? this.state.playlists.filter( playlist =>
     {
      return playlist.name.toLowerCase().includes(this.state.filter.toLowerCase())
      }) 
    : []

    return (
      <div className = "App">
        {
          this.state.user 
          ?<div>
            <h1 style = {{...colorSetting, fontSize : '54px'}}> {this.state.user.name}'s Playlist </h1>
            <PlaylistCounter userPlaylists = {playListToRender} /> 
            <HoursCounter userPlaylists = {playListToRender} />
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
