import React,{Component} from 'react';
import './App.css';
import Youtube from "react-youtube"

class App extends Component{

  state={
    vid_arr : [],
    string: "",
    sum: 0,
    vid_ide : []
  }
 
string=(event)=>{
  this.setState({
    string:event.target.value
  })
}

  arrayadd=(string)=>{
    if(string==null){
      alert("add link to search field")
    }
    else{
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = string.match(p);
    if(matches){
    const arr = this.state.vid_arr
    arr.push(string)
    
    const arrr= this.state.vid_ide
    arrr.push(string.replace("https://www.youtube.com/embed/",""))
    this.setState({
      vid_arr:arr,
      vid_ide:arrr
    })
    console.log(arrr)
  }
  else{
    alert("youtube link is not valid")
  }}
  }

  arraydelete=(index)=>{
    const arr = this.state.vid_arr
    arr.splice(index,1)
    console.log(arr)
    this.setState({
      vid_arr:arr
    })
  }

  playlist=()=>{
    if(this.state.vid_arr.length==0){
      alert("no video in playlist")
    }
    else{
        const sum= !this.state.sum
        this.setState({
          sum:sum
        })
      }
  }

  onReady=(event)=> {
    const arr = this.state.vid_ide
    // access to player in all event handlers via event.target0
    
    event.target.playVideoAt(50);
    console.log(event)
    event.target.loadPlaylist(arr,0,0)
  }
  delete=()=>{
    const arr = this.state.vid_arr
    arr.splice(0,1)
    this.setState({
        vid_arr:arr
    })

  }
   render(){
    const opts = {
      height: '390',
      width: '640',
      playerVars: { 
        autoplay: 1
      }
    };
     return(
        <div>
                  <div className="sidebar">
                    {this.state.vid_arr.map((video,index)=>{
                      return (
                      <div className="frame">
                     <iframe width="220" height="115"
                     src={video}>
                          </iframe>
                          <button onClick={this.arraydelete.bind(this,index)}>X</button>
                        </div>)
                    })}

                  </div>

          {/* Search area */}
             <h2>Youtube Search Link</h2>
             <input type="text" onChange={this.string.bind(this)}></input> 
             <button onClick={this.arrayadd.bind(this,this.state.string)}>add</button>
          {/* Search area end */}


          {/* playlist play */}
            <button onClick={this.playlist}>Play</button>
            {this.state.sum? <div> 
              <Youtube
            videoId={this.state.vid_arr[0].replace("https://www.youtube.com/embed/","")}
            opts={opts}
            onReady={this.onReady}
            onEnd={this.delete}
            /></div>: null}
          {/* playlist end */}


          

          </div>
     )
   }
}
export default App;
