import React from 'react'
import  Sidebar  from './Sidebar'
import Favorites from './Favorites'
import History from './History'
import { useLocation } from "react-router-dom"


const libraryContainer = {
  display : "flex",

}

const libraryAside = {
  flex : "0 0 300px",
}

const libraryMain = {
  flex : "1 1 auto"
}

const Library = () => {
  const currentPath = useLocation();
  console.log("here is the current path", currentPath)
  console.dir("current",currentPath);
  return (<div style={libraryContainer}>
    <div style={libraryAside}>
      <Sidebar/>
    </div>
    <main style={libraryMain}>
      <h2 style={{color : "white"}}>Library</h2>
      <h2 style={{color : "white"}}>Favorites</h2>
      <Favorites/>
      <h2 style={{color : "white"}}>History</h2>
      <History/>
    </main>
    </div>
  )
}

/*

aside favourite
      history
*/

export default Library