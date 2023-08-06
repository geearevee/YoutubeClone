import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed , History, Favorites} from './components';
import ContextProvider from "./context";
import Library from "./components/Library";
const App = () => {
  let localHistoryData = localStorage.getItem("history"); // null | undefined
  if(!localHistoryData) {
    localStorage.setItem("history", JSON.stringify([]));
  }
  let localFavouriteData = localStorage.getItem("favourites"); // null | undefined
  if(!localFavouriteData) {
    localStorage.setItem("favourites", JSON.stringify([]));
  }
  return (
  <ContextProvider>
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000' }}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Feed />} />
          <Route path='/video/:id' element={<VideoDetail />} />
          <Route path='/history' element={<History />} />
          <Route path='/favourite' element={<Favorites />} />
          <Route path='/Library' element={<Library />} />
          <Route path='/channel/:id' element={<ChannelDetail />} />
          <Route path='/search/:searchTerm' element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </ContextProvider>
)};

export default App;
