import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { api } from "../../api/axios";
import { useState } from "react";
import { AddressModal } from "../modal/address";
import { CreateAddressFailed, DeleteAddressSuccess } from "../alert/alert";

export const AddressList = ({ addresses, setUserAddresses }) => {
  const addressList = Array.isArray(addresses) ? addresses : [];
  const [editAddressId, setEditAddressId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);

  const handleCreate = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async (addressId) => {
    try {
      const token = localStorage.getItem("auth");
      const res = await api.delete(`/api/delivery-addresses/${addressId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setDeleteSuccess(true);
      setUserAddresses((prevAddr) =>
        prevAddr.filter((addr) => addr._id !== addressId)
      );
    } catch (err) {
      setDeleteFailed(true);
      console.error("Handle delete err :", err);
    }
  };

  const handleEdit = (addressId) => {
    setEditAddressId(addressId);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <CreateAddressFailed
        onOpen={deleteFailed}
        onClose={() => setDeleteFailed(false)}
      />
      <DeleteAddressSuccess
        onOpen={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
      />
      <Button
        fontFamily="Quicksand"
        onClick={handleCreate}
        variant="contained"
        sx={{
          maxWidth: "180px",
          width: "100vw",
          margin: "10px 0",
          alignSelf: "flex-end",
          color: "#252525",
          backgroundColor: "#F6E6CD",
          fontFamily: "Quicksand",
          fontWeight: 700,
          "&:hover": {
            backgroundColor: "#FFD48A",
          },
        }}
      >
        + Add Address
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addressList.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nama}
                </TableCell>
                <TableCell align="right">
                  {row.detail}, {row.kelurahan}, {row.kecamatan}, {row.kota}{" "}
                  {row.provinsi}
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={{
                      color: "#252525",
                      fontFamily: "Quicksand",
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      handleEdit(row._id);
                      console.log("Edit Pressed!", row);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{
                      color: "#252525",
                      fontFamily: "Quicksand",
                      fontWeight: 700,
                    }}
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddressModal
        open={isEditModalOpen}
        onClose={() => {
          setEditAddressId(null);
          setIsEditModalOpen(false);
        }}
        setUserAddresses={setUserAddresses}
        editAddressId={editAddressId}
      />
    </>
  );
};
