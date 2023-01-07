import React, { useEffect,useState,useRef } from 'react'
import {Peer} from 'peerjs'
function Video() {
    const [myPeerId,setMyPeerId] = useState('');
    const myVideo = useRef();
    useEffect( () => {
    const peer = new Peer();
    
    peer.on('open',(id)=>{
         setMyPeerId(id);
 
    })
    console.log(myPeerId)
    let videoCall = async () => {
        
        let vidOptions = {audio:true,video:true};
        let videoStream = await navigator.mediaDevices.getUserMedia(vidOptions);
        console.log(videoStream.id)
        myVideo.current.srcObject = videoStream;
        myVideo.current.play();
      }
      videoCall();

     },[]);

   
 
     return (
    <div>
        <video ref={myVideo} style={{width:"300px",height:"300px"}}></video>
        <video></video>

    </div>
  )
}

export default Video