import  Sidebar from "./Sidebar"
import { useState, useContext, useEffect } from "react"
import { appContext } from "../context";
import VideoCard from "./VideoCard";
import { useLocation } from "react-router-dom"

const parentStyle = {
    display : "flex",
}

const historyStyle = {
    flex : "1 1 auto", // flex-grow, flex-shrink, flex-basis
    display : "flex",
    padding : "5px",
    gap : "8px",
    flexWrap : "wrap"
}
const asideStyle = {
    flex : "0 0 300px",
}


export default function History () {
    let location = useLocation();
    let displayAside = location.pathname === "/history" ? true : false
    let {history, setHistory} = useContext(appContext);

    let localHistoryData = localStorage.getItem("history"); // null | undefined
    localHistoryData = JSON.parse(localHistoryData);
    useEffect(() => {
        setHistory(localHistoryData);
    },[])

    console.log(history);
    return (
        <div style={parentStyle}>
            {
                displayAside && (
                    <div style={asideStyle}>
                        <Sidebar/>
                    </div>
                )
            }
            <div style={historyStyle}>
                {console.log(history, "here is history")}
                {
                    history && history.map((videoObj) => {
                        return (
                            <VideoCard key={videoObj.id} video={videoObj}/>
                        )
                    })
                }
            </div>
        </div>
    )
}