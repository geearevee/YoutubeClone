import React, {useContext} from "react";
import { Stack } from "@mui/material";
import  { useNavigate } from "react-router-dom";
import { categories } from "../utils/constants";
import { appContext } from "../context";
const Categories = () => {
  const navigate = useNavigate();
  const {selectedCategory, setSelectedCategory} = useContext(appContext);
  return (
    <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}
  >
      <button
        className="category-btn"
        onClick={() => { navigate("/history");}}
        style={{
          color: "white",
        }}
      >
        <span style={{ opacity:"0.8" }}>
          History
        </span>
      </button>
      <button
        className="category-btn"
        onClick={() => { navigate("/favourite");}}
        style={{
          color: "white",
        }}
      >
        <span style={{ opacity:"0.8" }}>
          Favorites
        </span>
      </button>
      <button
        className="category-btn"
        onClick={() => { navigate("/library");}}
        style={{
          color: "white",
        }}
      >
        <span style={{ opacity:"0.8" }}>
          Library
        </span>
      </button>
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => {setSelectedCategory(category.name); navigate("/");}}
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "white",
        }}
        key={category.name}
      >
        <span style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px" }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
  )
};

export default Categories;
