import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { api } from "../../api/axios";
import * as Yup from "yup";

export const CategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).required("Please fill the field"),
    }),
    onSubmit: async (values) => {
      console.log("On submit category values :", values);
      try {
        const token = localStorage.getItem("auth");
        const response = await api.post(`/api/categories`, values, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/x-www-form-urlencoded",
          },
        });
        console.log("Response add category :", response);
        if (response.status === 200) {
          const responseData = response.data;
          alert("Category added successfully!");
          const newCategory = responseData.category;
          onClose();
          onCategoryAdded(newCategory);
        } else {
          console.log("Unexpected response :", response);
        }
      } catch (err) {
        console.log("Error add category :", err);
        if (err.response && err.response.status === 409) {
          formik.setErrors({
            name: "Category with the same name already exists!",
          });
        } else {
          console.log("Error add category :", err);
        }
      }
    },
  });
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
      <DialogTitle>Create New Category</DialogTitle>
      <DialogContent>
        <form action="" onSubmit={formik.handleSubmit}>
          <FormControl sx={{ m: 1 }}>
            <TextField
              label="New Category"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
          </FormControl>
          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                color: "#252525",
                fontFamily: "Quicksand",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#F6E6CD",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                color: "#252525",
                fontFamily: "Quicksand",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#F6E6CD",
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
