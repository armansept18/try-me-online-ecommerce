import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export const AddAddressModal = ({ open, onClose, setUserAddresses }) => {
  const [locationTag, setLocationTag] = useState("");
  const [locationDetail, setLocationDetail] = useState("");

  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedSubdistrictId, setSelectedSubdistrictId] = useState("");

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState([]);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      onClose(false);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const data = await response.json();
      console.log("Response fetchProvinces :", response);
      console.log("Data fetchProvinces :", data);
      setProvinceOptions(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const provId = selectedProvinceId;
      console.log("Fetch Cities Check provid:", provId);
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
      );
      const data = await response.json();
      console.log("Response fetchCities :", response);
      console.log("Data fetchCities :", data);
      setCityOptions(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const cityId = selectedCityId;
      console.log("Fetch districts check cityid:", cityId);
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`
      );
      const data = await response.json();
      console.log("Response fetchDistricts :", response);
      console.log("Data fetchDistricts :", data);
      setDistrictOptions(data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchSubDistricts = async () => {
    try {
      const districtId = selectedDistrictId;
      console.log("Fetch Sub districts check districtId:", districtId);
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
      );
      const data = await response.json();
      console.log("Response fetchSubDistricts :", response);
      console.log("Data fetchSubDistricts :", data);
      setSubDistrictOptions(data);
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  };

  const createAddress = async (addressData) => {
    try {
      const token = localStorage.getItem("auth");
      const response = await api.post("/api/delivery-addresses", addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const responseData = response.data;
        alert(responseData.message);
        const newAddress = responseData.address;
        setUserAddresses((prevAddresses) => [...prevAddresses, newAddress]);
        console.log("Address added successfully:", responseData.address);
      } else {
        const errorData = response.data || {};
        alert("Failed creating address, please try again!");
        console.error(
          "Failed to add address:",
          errorData.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleSaveAddress = async () => {
    const selectedProvinceName = provinceOptions.find(
      (province) => province.id === selectedProvinceId
    )?.name;

    const selectedCityName = cityOptions.find(
      (city) => city.id === selectedCityId
    )?.name;

    const selectedDistrictName = districtOptions.find(
      (district) => district.id === selectedDistrictId
    )?.name;

    const selectedSubdistrictName = subDistrictOptions.find(
      (subDistrict) => subDistrict.id === selectedSubdistrictId
    )?.name;
    const addressData = {
      nama: locationTag,
      kelurahan: selectedSubdistrictName,
      kecamatan: selectedDistrictName,
      kota: selectedCityName,
      provinsi: selectedProvinceName,
      detail: locationDetail,
    };
    console.log("Input address data :", addressData);
    await createAddress(addressData);
    onClose(false);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);
  useEffect(() => {
    fetchCities(selectedProvinceId);
  }, [selectedProvinceId]);
  useEffect(() => {
    fetchDistricts(selectedCityId);
  }, [selectedCityId]);
  useEffect(() => {
    fetchSubDistricts(selectedDistrictId);
  }, [selectedDistrictId]);

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Create Your Address</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 495 }}>
            <TextField
              label="Location Tag"
              name="name"
              value={locationTag}
              onChange={(e) => {
                setLocationTag(e.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id="province-label">Province</InputLabel>
            <Select
              labelId="province-label"
              value={selectedProvinceId}
              onChange={(e) => {
                setSelectedProvinceId(e.target.value);
                console.log("selected province ID : ", e.target.value);
              }}
              input={<OutlinedInput label="Province" />}
            >
              {provinceOptions.map((province) => (
                <MenuItem key={province.id} value={province.id}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id="city-label">City/Regency</InputLabel>
            <Select
              labelId="city-label"
              value={selectedCityId}
              onChange={(e) => {
                setSelectedCityId(e.target.value);
                console.log("selected city ID :", e.target.value);
              }}
              input={<OutlinedInput label="City/Regency" />}
            >
              {cityOptions &&
                cityOptions.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id="district-label">District</InputLabel>
            <Select
              labelId="district-label"
              value={selectedDistrictId}
              onChange={(e) => {
                setSelectedDistrictId(e.target.value);
                console.log("selected district ID :", e.target.value);
              }}
              input={<OutlinedInput label="District" />}
            >
              {districtOptions &&
                districtOptions.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id="sub-district-label">Sub-District</InputLabel>
            <Select
              labelId="sub-district-label"
              value={selectedSubdistrictId}
              onChange={(e) => {
                setSelectedSubdistrictId(e.target.value);
                console.log("selected subdistrict ID :", e.target.value);
              }}
              input={<OutlinedInput label="Sub-District" />}
            >
              {subDistrictOptions &&
                subDistrictOptions.map((subDistrict) => (
                  <MenuItem key={subDistrict.id} value={subDistrict.id}>
                    {subDistrict.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 495 }}>
            <TextField
              label="Location Detail"
              name="detail"
              value={locationDetail}
              multiline
              onChange={(e) => {
                setLocationDetail(e.target.value);
              }}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveAddress}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
