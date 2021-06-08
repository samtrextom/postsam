import React, { useState } from 'react';
import { makeStyles, TextField, Button, CircularProgress, FormControlLabel, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { convertToJSON } from './JSONconvertor';
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const useStyles = makeStyles(({
  textInput:{
    width:500
  }
}))

const MainScreen = () => {

  const [getURL, setGetURL] = useState("")
  const [postURL, setPostURL] = useState("")
  const [parent, setParent] = useState("")
  const [getRes, setGetRes] = useState()
  const [postRes, setPostRes] = useState()
  const [before, setBefore] = useState()
  const [after, setAfter] = useState()
  const [postJSON, setPostJSON] = useState()
  const [getError, setGetError] = useState(null)
  const [getErrorMessage, setGetErrorMessage] = useState()
  const [postError, setPostError] = useState(null)
  const [postErrorMessage, setPostErrorMessage] = useState()
  const [isGetLoading, setIsGetLoading] = useState(false)
  const [isPostLoading, setIsPostLoading] = useState(false)
  const [same, setSame] = useState(false)

  const classes = useStyles()
  
  const handleChecked = (e) =>{
    var checked = e.target.checked
    if(checked){
      setPostURL(getURL)
      setSame(true)
    }
    else{
      setPostURL('')
      setSame(false)
    }
  }

  const handleGetURL = (e) =>{
    setGetURL(e.target.value)
    if(same){
      setPostURL(e.target.value)
    }
  }

  const handlePostURL = (e) =>{
    setPostURL(e.target.value)
    setSame(false)
  }

  const handleAfter = (e) =>{
    setAfter(JSON.parse(e.json))
  }

  const handleCopy = () =>{
    setGetURL('https://tsdev.serigraph.com/scripts/data/dal')
  }

  const clearGet = () =>{
    setGetError(false)
    setGetURL('')
    setBefore()
  }

  const clearPost = () =>{
    setPostError(false)
    setPostURL('')
    setAfter()
  }

  const fireGet = () =>{
    setIsGetLoading(true)
    setGetError(false)
    setGetErrorMessage()
    setBefore()
    setAfter()
    axios.get(getURL)
    .then((resp)=>{
      var data = resp.data
      if(data.meta[0].err){
        setGetError(true)
        setGetErrorMessage(data.meta[0].errmsg)
      }
      else{
        setGetError(false)
        delete data['meta']
        setGetRes(data)
        var beforeData = JSON.parse(JSON.stringify(data))
        var afterData = JSON.parse(JSON.stringify(data))
        setBefore(convertToJSON(beforeData, 'b'))
        setAfter(convertToJSON(afterData, 'a'))
      }
    })
    .catch((error)=>{
      setGetError(true)
      console.log(error.response)
      setGetErrorMessage(error.response.statusText +" : "+error.response.status)
    })
    .then(()=>{
      setIsGetLoading(false)
    })
  }

  const firePost = () =>{

    if(!postURL){
      setPostError(true)
      setPostErrorMessage("NO URL")
      return
    }

    setIsPostLoading(true)
    setPostError(false)
    setPostErrorMessage()
    axios.post(postURL, {...before, ...after})
    .then((resp)=>{
      if(resp.data.meta.err){
        setPostError(resp.data.meta.errmsg)
      }
      else{
        setPostError(false)
      }
    })
    .then(()=>{
      console.log('end')
      setIsPostLoading(false)
    })
  }

  return (
    <div className="App">
      <img src="/dragon.png" className="dragon" style={{
        position:"absolute", 
        top:0, 
        opacity:.15, 
        width:700, 
        left:'50%',
        marginLeft:-350}}/>
      <h1><i className="fas fa-fire-alt"></i>PostSam<i className="fas fa-fire-alt"></i></h1>
      <div style={{display:'flex', marginLeft:'39vw', marginRight:'39vw', color:'red', borderBottom:'1px solid black'}}>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
        <i className="fas fa-fire-alt"></i>
      </div>
      <div>https://tsdev.serigraph.com/scripts/data/dal<Button onClick={handleCopy}><i class="far fa-copy"></i></Button></div>
      <div style={{display:'flex', padding:24}}>
        <div style={{flex:1, display:'block', textAlign:'center'}}>
          <h2>Status: {getError?<span style={{color:'red'}}>Error</span>:getError===null?'':<span style={{color:'green'}}>Success</span>}</h2>
          <div style={{height:50}}>{getErrorMessage && <pre>{getErrorMessage.replaceAll('\\n', '\n')}</pre>}</div>
          <div style={{flex:1}}>
            <TextField className={classes.textInput} value={getURL} onChange={handleGetURL} label={"Get URL"}/>
            <Button onClick={fireGet} variant={"contained"} color={"secondary"}><i className="fas fa-fire-alt"></i></Button>
            <Button onClick={clearGet} variant={"contained"} color={"primary"}><i className="fas fa-times"></i></Button>
          </div>
          <div style={{height:42}}></div>
          <h2>BEFORE</h2>
          <div style={{textAlign:'left', paddingLeft:150}}>
            {before && <JSONInput placeholder={{...before}} locale={locale} viewOnly height="800px" width="650px" reset onChange={handleAfter}/>}
          </div>
          {isGetLoading && <div>...Loading <CircularProgress color="inherit"/></div>}
        </div>
        <div style={{flex:1, display:'block', textAlign:'center'}}>
        <h2>Status: {postError?<span style={{color:'red'}}>Error</span>:postError===null?'':<span style={{color:'green'}}>Success</span>}</h2>
        <div style={{height:50}}>{postErrorMessage && <pre>{postErrorMessage.replaceAll('\\n', '\n')}</pre>}</div>
          <div style={{flex:1}}>
            <TextField className={classes.textInput} value={postURL} onChange={handlePostURL} label={"Post URL"}/>
            <Button onClick={firePost} variant={"contained"} color={"secondary"}><i className="fas fa-fire-alt"></i></Button>
            <Button onClick={clearPost} variant={"contained"} color={"primary"}><i className="fas fa-times"></i></Button>
          </div>
          <FormControlLabel control={<Checkbox checked={same} onChange={handleChecked}/>} label="Same as Get URL"/>
          <h2>AFTER</h2>
          <div style={{textAlign:'left', paddingLeft:150}}>
          {after && <JSONInput placeholder={{...after}} locale={locale} height="800px" width="650px" reset onChange={handleAfter}/>}
          </div>
          {isPostLoading && <div>...Loading <CircularProgress color="inherit"/></div>}
        </div>
      </div>
      <div style={{
        fontSize: 12,
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        left:'50%',
        marginLeft:-50
      }}>
        PostSam ver 0.1.1
      </div>
    </div>
  )
}

export default MainScreen
