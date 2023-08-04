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
        onClick={() => {
          navigate("/history")
        }}
        className="category-btn"
        style={{
          background: "white",
          color: "black",
          backgroundColor: "white",
        }}
      >
        <span >
          History
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
