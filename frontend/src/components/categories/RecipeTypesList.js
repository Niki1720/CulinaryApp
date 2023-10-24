import React, { useEffect, useState, useMemo } from "react";
import * as actions from './RecipeTypesActions';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTable } from 'react-table';
import RecipeType from "./RecipeTypeForm";
import {useNavigate} from "react-router-dom";
import RecipeIcon from "../icons/RecipeIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import theme from "../../theme";

const RecipeTypesPage = () => {
  const [recipeType, setRecipeType] = useState([]);
  const [editingRecipeTypeId, setEditingRecipeTypeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    actions.loadRecipeTypes(setRecipeType);
  }, []);

  const handleEditRecipeType = (id) => {
    setEditingRecipeTypeId(id);
    navigate(`/recipe_types/${id}`);
  };

  const handleAddRecipeType = () => {
    setEditingRecipeTypeId("new");
    navigate(`/recipe_types/new`);
  };

  const handleRecipeTypeDelete = (id) => {
    actions.deleteRecipeType(id, () => {
      actions.loadRecipeTypes(setRecipeType);
    });
  };

  const columns = useMemo(() => [
    {
      Header: () => (
          <div style={theme.flexContainer}>
            <RecipeIcon />
            Categories
          </div>
      ),
      accessor: 'name',
      Cell: ({ value }) => (
          <div style={theme.tableRow}>
            {value}
          </div>
      ),
    },
    {
      Header: () => (
        <div style={theme.flexButtonContainer}>
          <Button
            variant="contained"
            style={theme.buttonStyle}
            onClick={handleAddRecipeType}
            startIcon={<Add />}
          >
            Add new
          </Button>
        </div>
      ),
      accessor: 'id',
      Cell: ({ value }) => (
        <div style={{textAlign: "right"}}>
          <EditIcon onClick={() => handleEditRecipeType(value)} />
          <DeleteIcon onClick={() => handleRecipeTypeDelete(value)} />
        </div>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: recipeType,
  });

  return (
    <div className="records">
      {editingRecipeTypeId !== null ? (
        <RecipeType recipeTypeId={editingRecipeTypeId} />
      ) : null}
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableRow style={{ backgroundColor: '#F5F5F5' }}>
            <TableCell sx={theme.tableCell}>Category</TableCell>
            <TableCell sx={{ ...theme.tableCell, textAlign: 'right' }}>Options</TableCell>
          </TableRow>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} >
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell {...cell.getCellProps()} >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecipeTypesPage;
