import  Sidebar from "./Sidebar"
import { useState, useContext, useEffect } from "react"
import { appContext } from "../context";
import VideoCard from "./VideoCard";
import { useLocation } from "react-router-dom"

const parentStyle = {
    display : "flex",
}

const favouriteStyle = {
    flex : "1 1 auto", // flex-grow, flex-shrink, flex-basis
    display : "flex",
    padding : "5px",
    gap : "8px",
    flexWrap : "wrap"
}
const asideStyle = {
    flex : "0 0 300px",
}

const Favorites = () => {
    let location = useLocation();
    let displayAside = location.pathname === "/favourite" ? true : false
    console.log(location.pathname, "path")
    let {favourites, setFavourites} = useContext(appContext);

    let localFavouriteData = localStorage.getItem("favourites"); // null | undefined
    localFavouriteData = JSON.parse(localFavouriteData);
    useEffect(() => {
        setFavourites(localFavouriteData);
    },[])

    console.log(favourites);
    return (
        <div style={parentStyle}>
            {
                displayAside && (
                    <div style={asideStyle}>
                        <Sidebar/>
                    </div>
                )
            }
            <div style={favouriteStyle}>
                {console.log(favourites, "here is favourite")}
                {
                    favourites && favourites.map((videoObj) => {
                        console.log("look at this favourites videos",videoObj)
                        return (
                            <VideoCard key={videoObj.id} video={videoObj}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Favorites
