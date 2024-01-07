import { Box, Button, Tab, Typography } from "@mui/material";
import { Navbar } from "../../components/navigation/navbar";
import { Footer } from "../../components/footer/footer";
import * as React from "react";
import { useSelector } from "react-redux";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext, TabList } from "@mui/lab";
import { AddressList } from "../../components/profile/address-list";
import { api } from "../../api/axios";
import { DeleteAccount } from "../../components/alert/alert";

export const Dashboard = () => {
  const [value, setValue] = React.useState("1");
  const userSelector = useSelector((state) => state.auth);
  const [deleteAccountAlert, setDeleteAccountAlert] = React.useState(false);

  const [userAddresses, setUserAddresses] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");

    window.location.reload();
  };
  const handleDeleteAccount = async () => {
    setDeleteAccountAlert(true);
  };

  React.useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("auth");
        const response = await api.get("/api/delivery-addresses", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const addresses = response.data.data || [];
        console.log("Data in fetchAddress :", addresses);
        setUserAddresses(addresses);
      } catch (error) {
        console.error("Error fetching user addresses in dashboard:", error);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <>
      <Navbar />
      <DeleteAccount
        onOpen={deleteAccountAlert}
        onClose={() => setDeleteAccountAlert(false)}
      />
      <Box
        sx={{
          margin: "112px 20px 0 20px",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" />
              <Tab label="Order" value="2" />
              <Tab label="Address" value="3" />
              <Tab label="Setting" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "42px",
              }}
            >
              <Typography variant="h5" component="h5" fontFamily="Quicksand">
                Profile
              </Typography>
              <Typography fontFamily="Quicksand">
                UID : {userSelector.user ? userSelector.user.role : ""}
                &nbsp;-&nbsp;
                {userSelector.user ? userSelector.user.customer_id : ""}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontFamily="Quicksand">Name : </Typography>
                <Typography fontFamily="Quicksand">
                  {userSelector.user ? userSelector.user.full_name : ""}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontFamily="Quicksand">Email :</Typography>
                <Typography fontFamily="Quicksand">
                  {userSelector.user ? userSelector.user.email : ""}
                </Typography>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Typography variant="h5" component="h5" fontFamily="Quicksand">
              Order List
            </Typography>
          </TabPanel>
          <TabPanel value="3">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" component="h5" fontFamily="Quicksand">
                Address List
              </Typography>
              <AddressList
                addresses={userAddresses}
                setUserAddresses={setUserAddresses}
              />
            </Box>
          </TabPanel>
          <TabPanel value="4">
            <Typography
              marginBottom={4}
              variant="h5"
              component="h5"
              fontFamily="Quicksand"
            >
              Account Setting
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "",
                gap: "8px",
                alignitems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
      <Footer />
    </>
  );
};
