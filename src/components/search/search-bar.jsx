import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "solid 1px #252525",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  height: "40px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

export const SearchBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelector = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  const fetchCategory = async () => {
    try {
      const response = await api.get("/api/categories");
      if (!response.data) throw new Error();
      console.log("After fetch category", response.data);
      setCategories(response.data);
    } catch (err) {
      console.log("Error fetching category :", err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Category</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedCategory}
          label="Category"
          onChange={handleCategorySelector}
        >
          <MenuItem value="">
            <em>Select ...</em>
          </MenuItem>
          {categories.map((category, idx) => (
            <MenuItem key={idx} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search here…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
};
