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
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

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

export const SearchBar = ({
  onSearch,
  onCategoryChange,
  categories,
  selectedCategory,
}) => {
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const getCategoryNameById = (categoryId) => {
    const foundCategory = categories.find((cat) => cat._id === categoryId);
    if (foundCategory) {
      console.log("get category name by id in search bar:", foundCategory);
      return foundCategory.name;
    } else {
      console.error(`Category with ID ${categoryId} not found.`);
      return "";
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategoryValue =
      selectedCategoryId === "" ? "" : getCategoryNameById(selectedCategoryId);
    setSelectedCategoryName(selectedCategoryId);
    onCategoryChange(selectedCategoryValue);
    console.log("category selector in search bar:", selectedCategoryValue);
    console.log("selectedCategoryId:", selectedCategoryId);
  };
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
    console.log("search change :", e.target.value);
  };

  const debounceChangeHandler = useCallback(
    debounce(handleSearchChange, 1000),
    []
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="1368px"
      width="100%"
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Category</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedCategoryName}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>Select ...</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
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
          onChange={debounceChangeHandler}
        />
      </Search>
    </Box>
  );
};
