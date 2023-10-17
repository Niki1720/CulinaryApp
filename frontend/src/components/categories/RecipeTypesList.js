import React, { useEffect, useState, useMemo } from "react";
import * as actions from './RecipeTypesActions';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useTable } from 'react-table';
import RecipeType from "./RecipeTypeForm";
import {useNavigate} from "react-router-dom";

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
      Header: 'Categories',
      accessor: 'name',
    },
    {
      Header: () => (
        <div style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRecipeType}
            startIcon={<Add />}
          >
            Add Category
          </Button>
        </div>
      ),
      accessor: 'id',
      Cell: ({ value }) => (
        <div>
          <Button onClick={() => handleEditRecipeType(value)} startIcon={<Edit />}>
            Edytuj
          </Button>
          <Button onClick={() => handleRecipeTypeDelete(value)} startIcon={<Delete />}>
            Usuń
          </Button>
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
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell {...cell.getCellProps()}>
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
