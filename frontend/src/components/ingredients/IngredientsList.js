import React, { useEffect, useState, useMemo } from "react";
import * as actions from './IngredientsActions';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useTable } from 'react-table';
import Ingredient from "./IngredientForm";
import {useNavigate} from "react-router-dom";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [editingIngredientId, setEditingIngredientId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    actions.loadIngredients(setIngredients);
  }, []);

  const handleEditIngredient = (id) => {
    setEditingIngredientId(id);
    navigate(`/ingredients/${id}`);
  };

  const handleAddIngredient = () => {
    setEditingIngredientId("new");
    navigate(`/ingredients/new`);
  };

  const handleIngredientDelete = (id) => {
    actions.deleteIngredient(id, () => {
      actions.loadIngredients(setIngredients);
    });
  };

  const columns = useMemo(() => [
    {
      Header: 'Ingredients',
      accessor: 'name',
    },
    {
      Header: () => (
        <div style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddIngredient}
            startIcon={<Add />}
          >
            Add Ingredient
          </Button>
        </div>
      ),
      accessor: 'id',
      Cell: ({ value }) => (
        <div>
          <Button onClick={() => handleEditIngredient(value)} startIcon={<Edit />}>
            Edytuj
          </Button>
          <Button onClick={() => handleIngredientDelete(value)} startIcon={<Delete />}>
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
    data: ingredients,
  });

  return (
    <div className="records">
      {editingIngredientId !== null ? (
        <Ingredient ingredientId={editingIngredientId} />
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

export default IngredientsPage;
