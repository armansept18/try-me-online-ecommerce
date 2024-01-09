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
import {
  CreateAddressEmptyField,
  CreateAddressFailed,
  CreateAddressSuccess,
  UpdateAddressSuccess,
} from "../alert/alert";

export const AddressModal = ({
  open,
  onClose,
  setUserAddresses,
  editAddressId,
}) => {
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

  const [editMode, setEditMode] = useState(false);

  const [createSuccess, setCreateSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [createFailed, setCreateFailed] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      onClose(false);
      resetForm();
    }
  };
  const resetForm = () => {
    setLocationTag("");
    setLocationDetail("");
    setSelectedProvinceId("");
    setSelectedCityId("");
    setSelectedDistrictId("");
    setSelectedSubdistrictId("");
    setEditMode(false);
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await api.get("/api/delivery-addresses", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const addresses = response.data.data || [];
      setUserAddresses(addresses);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const data = await response.json();
      setProvinceOptions(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const provId = selectedProvinceId;
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
      );
      const data = await response.json();
      setCityOptions(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const cityId = selectedCityId;
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`
      );
      const data = await response.json();
      setDistrictOptions(data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchSubDistricts = async () => {
    try {
      const districtId = selectedDistrictId;
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
      );
      const data = await response.json();
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
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const responseData = response.data;
        console.log("create address :", responseData);
        setCreateSuccess(true);
        const newAddress = responseData.address;
        setUserAddresses((prevAddresses) => [...prevAddresses, newAddress]);

        console.log("Address added successfully:", responseData.address);
      } else {
        const errorData = response.data || {};
        setCreateFailed(true);
        console.error(
          "Failed to add address:",
          errorData.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const updateAddress = async (addressId, addressData) => {
    if (
      !addressData.nama ||
      !addressData.provinsi ||
      !addressData.kota ||
      !addressData.kecamatan ||
      !addressData.kelurahan ||
      !addressData.detail
    ) {
      setEmptyField(true);
      return;
    }
    try {
      const token = localStorage.getItem("auth");
      const res = await api.put(
        `/api/delivery-addresses/${addressId}`,
        addressData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const responseData = res.data;
        setUpdateSuccess(true);
        fetchAddresses();
      } else {
        const errorData = res.data || {};
        setCreateFailed(true);
        console.error(
          "Failed to update address:",
          errorData.message || "Unknown error"
        );
      }
    } catch (err) {
      console.error("Update address error :", err);
    }
  };

  const fetchAddressDetails = async (addressId) => {
    try {
      const token = localStorage.getItem("auth");
      const response = await api.get(`/api/delivery-addresses/${addressId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const addressData = response.data;

      if (addressData) {
        setLocationTag(addressData.nama || "");
        setLocationDetail(addressData.detail || "");
        setSelectedProvinceId(addressData.provinsi || "");
        setSelectedCityId(addressData.kota || "");
        setSelectedDistrictId(addressData.kecamatan || "");
        setSelectedSubdistrictId(addressData.kelurahan || "");

        fetchProvinces();
        fetchCities(addressData.provinsi);
        fetchDistricts(addressData.kota);
        fetchSubDistricts(addressData.kecamatan);
      } else {
        console.error("No data found for the given address ID: ", addressId);
      }
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };
  const handleCreate = () => {
    resetForm();
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
    fetchAddressDetails(editAddressId);
  };

  useEffect(() => {
    if (editAddressId) {
      handleEdit();
    } else {
      handleCreate();
    }
  }, [editAddressId]);

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
    if (
      !locationTag ||
      !selectedProvinceId ||
      !selectedCityId ||
      !selectedDistrictId ||
      !selectedSubdistrictId
    ) {
      setEmptyField(true);
      return;
    }

    if (editMode) {
      await updateAddress(editAddressId, addressData);
    } else {
      await createAddress(addressData);
    }
    resetForm();
    setTimeout(() => {
      onClose(false);
    }, 2000);
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
      <CreateAddressSuccess
        onOpen={createSuccess}
        onClose={() => setCreateSuccess(false)}
      />
      <UpdateAddressSuccess
        onOpen={updateSuccess}
        onClose={() => setUpdateSuccess(false)}
      />
      <CreateAddressFailed
        onOpen={createFailed}
        onClose={() => setCreateFailed(false)}
      />
      <CreateAddressEmptyField
        onOpen={emptyField}
        onClose={() => setEmptyField(false)}
      />
      <DialogTitle>
        {editMode ? "Edit Your Address" : "Create Your Address"}
      </DialogTitle>
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
        <Button
          sx={{
            color: "#252525",
            fontFamily: "Quicksand",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#F6E6CD",
            },
          }}
          onClick={handleClose}
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
          onClick={handleSaveAddress}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
