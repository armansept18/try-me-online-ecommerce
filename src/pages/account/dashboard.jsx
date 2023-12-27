import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import PropTypes from "prop-types";
import * as React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 12, maxWidth: "860px", width: "100vw" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 625,
          margin: "112px 20px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            maxWidth: "200px",
            width: "100vw",
          }}
        >
          <Tab
            label="Profile"
            {...a11yProps(0)}
            sx={{ marginBottom: "20px" }}
          />
          <Tab label="Order" {...a11yProps(1)} sx={{ marginBottom: "20px" }} />
          <Tab
            label="Address"
            {...a11yProps(2)}
            sx={{ marginBottom: "10px" }}
          />
          <Tab label="Setting" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "42px",
            }}
          >
            <Typography>UID : {"3Ss3226csaoSpK" || `${""}`}</Typography>
            <Typography>Name : {"Username" || `${""}`}</Typography>
            <Typography>Email : {"user@mail.com" || `${""}`}</Typography>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Box>
      <Footer />
    </>
  );
};
