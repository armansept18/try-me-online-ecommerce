import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../api/axios";
import { useEffect, useRef, useState } from "react";
import defaultImage from "../../public/images/nopicture-default.jpg";
import { renderImage } from "../../lib/render-image";
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
  Typography,
} from "@mui/material";
import { SuccessAddProduct } from "../alert/alert";

export const ProductModal = ({ isOpen, onClose, edit, setProducts }) => {
  const fileInputRef = useRef();
  const [previewImage, setPreviewImage] = useState({});
  const [addProductSuccessAlert, setAddProductSuccessAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: edit?.image_url || "",
      name: edit?.name || "",
      price: edit?.price || 0,
      description: edit?.description || "",
      category: edit?.category || "",
      tags: edit?.tags || [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).required("Please fill the field"),
      price: Yup.number().required("Please  fill the field"),
      description: Yup.string(),
      category: Yup.string().required("Category is required"),
      tags: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("tags", values.tags);
        if (values.image) {
          formData.append("image", values.image);
        }
        const token = localStorage.getItem("auth");

        let response;
        if (edit) {
          response = await api.put(`/api/products/${edit._id}`, formData, {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          response = await api.post(`/api/products`, formData, {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        if (response.status === 200 || response.status === 201) {
          const responseData = response.data;
          const action = edit ? "updated" : "added";
          setAddProductSuccessAlert(true);
          formik.resetForm();
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
          setProducts((prevState) => [...prevState, responseData]);
        }
      } catch (err) {
        console.log("Error add/edit product in modal product:", err);
        if (err.response && err.response.status === 409) {
          formik.setErrors({
            name: "Category with the same name already exists!",
          });
        } else {
          console.log("Error add category :", err);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = async (e) => {
    try {
      const image = await renderImage(e);
      setPreviewImage(image);
      formik.setFieldValue("image", e.target.files[0]);
    } catch (error) {
      console.error("Error rendering image:", error);
    }
  };

  useEffect(() => {
    formik.setValues({
      image: edit?.image_url || "",
      name: edit?.name || "",
      price: edit?.price || 0,
      description: edit?.description || "",
      category: edit?.category || "",
      tags: edit?.tags || "",
    });

    setPreviewImage(
      edit?.image_url
        ? `http://localhost:5000/static/` + edit?.image_url
        : defaultImage
    );
  }, [isOpen, edit, formik.setValues]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      fullWidth
      maxWidth="md"
    >
      <SuccessAddProduct
        onOpen={addProductSuccessAlert}
        onClose={() => setAddProductSuccessAlert(false)}
      />
      <form action="" onSubmit={formik.handleSubmit}>
        <DialogTitle sx={{ alignSelf: "center" }}>
          {edit ? "Edit Product" : "Create Product"}
        </DialogTitle>
        <DialogContent sx={{ height: "610px" }}>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
          >
            <FormControl
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormLabel>Product Image</FormLabel>
              <img
                src={previewImage}
                style={{
                  maxWidth: "180px",
                  maxHeight: "180px",
                  width: "100vw",
                  height: "100vh",
                  aspectRatio: "1",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onError={({ currentTarget }) => {
                  currentTarget.src = defaultImage;
                }}
                onClick={() => fileInputRef.current.click()}
              />
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => fileInputRef.current.click()}
              >
                Click to upload files
              </Typography>
              <input
                className="hidden"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              ></input>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: "304px" }}>
              <TextField
                label="Product Name"
                name="name"
                value={formik.values.name}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                required
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: "304px" }}>
              <TextField
                label="Price"
                name="price"
                value={formik.values.price}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                required
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: "304px" }}>
              <TextField
                label="Category"
                name="category"
                value={formik.values.category}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
                required
              />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: "304px" }}>
              <TextField
                label="Tags"
                name="tags"
                value={formik.values.tags}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
              />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: "304px" }}>
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                multiline
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#252525",
              fontFamily: "Quicksand",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#F6E6CD",
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "#252525",
              fontFamily: "Quicksand",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#F6E6CD",
              },
            }}
            type="submit"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
