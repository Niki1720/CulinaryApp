import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as actions from './TagsActions';
import {Button, Table, TableHead, TableBody, TableRow, TableCell, TextField, Paper} from "@mui/material";

const TagForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (id !== "new") {
      actions.getTag(id, (tagData) => {
        setFormData({ name: tagData.name });
      });
    }
  }, [id]);

  const handleSave = () => {
    if (id === "new") {
      actions.saveTag(formData, () => {
        navigate('/tags');
      });
    } else {
      actions.saveTag({ ...formData, id: id }, () => {
        navigate('/tags');
      });
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData({ name: newName });
  };

  return (
    <div style={{width: "80%", margin: "auto"}}>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleNameChange}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TagForm;
