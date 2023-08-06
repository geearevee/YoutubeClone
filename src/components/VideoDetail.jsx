import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import { appContext } from "../context";

const VideoDetail = () => {
  console.log("is this videoDetail component rerendering?")
  // const { favourites, setFavourites} = useContext(appContext);
  const [videoDetail, setVideoDetail] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  // fuvaourites =[ {id : "", vide}, snippits, stastistico]
  
   

  /*
    when the funcion starts running we will check if the current video is favourite or not by checking the list.
    if favrourited => the liked status icon shold be displayed
    if not in faovourite list => normal icon shold be displayed
  */

  function makeFavourite () {
      let prevValue = JSON.parse(localStorage.getItem("favourites"));
      localStorage.setItem("favourites", JSON.stringify([...prevValue, videoDetail]))
      setIsFavourite(true);
    }
    
    function makeUnFavroutie () {
      let prevValue = JSON.parse(localStorage.getItem("favourites"));
      let filteredPrevValue = prevValue?.filter((item) => item.id !== id);
      localStorage.setItem("favourites", JSON.stringify([...filteredPrevValue]))
      setIsFavourite(false);
  }

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => {
      setVideoDetail(data.items[0])
      let prevValue = JSON.parse(localStorage.getItem("history"));
      let filteredPrevValue = prevValue?.filter((item) => item.id !== data.items[0].id);
      localStorage.setItem("history", JSON.stringify([...filteredPrevValue, data.items[0]]));
    })

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  
  useEffect(() => {
      let localFavouriteData = localStorage.getItem("favourites"); // null | undefined
      localFavouriteData = JSON.parse(localFavouriteData);
      if(localFavouriteData !== null){
        const [isInFavourite] = localFavouriteData.filter(item => {
          if(item.id === id){
            return true;
          }
        })
        console.log(isInFavourite !== undefined,"is in favourite")
        setIsFavourite(isInFavourite !== undefined ? true : false)
      }else{
        setIsFavourite(false)
      }
  },[videoDetail])

  if(!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                {
                  isFavourite ? (
                    <ThumbUpAltIcon color="success" onClick={makeUnFavroutie}/>              
                    ) : (
                    <ThumbUpAltIcon color="primary" onClick={makeFavourite}/>              
                  )
                }
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
