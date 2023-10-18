import React, { useEffect, useState, useMemo } from "react";
import * as actions from './RcipesActions';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useTable } from 'react-table';
import {useNavigate} from "react-router-dom";
import RecipeForm from "./RecipeForm";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    actions.loadRecipes(setRecipes);
  }, []);

  const handleEditRecipe = (id) => {
    setEditRecipeId(id);
    navigate(`/recipes/${id}`);
  };

  const handleAddRecipe = () => {
    setEditRecipeId(null);
    navigate(`/recipes/new`);
  };

  const handleRecipeDelete = (id) => {
    actions.deleteRecipe(id, () => {
      actions.loadRecipes(setRecipes);
    });
  };

  const columns = useMemo(() => [
    {
      Header: 'Recipes',
      accessor: 'name',
    },
    {
      Header: () => (
        <div style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRecipe}
            startIcon={<Add />}
          >
            Add Recipe
          </Button>
        </div>
      ),
      accessor: 'id',
      Cell: ({ value }) => (
        <div>
          <Button onClick={() => handleEditRecipe(value)} startIcon={<Edit />}>
            Edytuj
          </Button>
          <Button onClick={() => handleRecipeDelete(value)} startIcon={<Delete />}>
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
    data: recipes,
  });

  return (
    <div className="records">
      {editRecipeId !== null ? (
        <RecipeForm recipeId={editRecipeId} />
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

export default RecipePage;
