import React, { useEffect, useState, useMemo } from "react";
import * as actions from './RcipesActions';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTable } from 'react-table';
import {useNavigate} from "react-router-dom";
import RecipeForm from "./RecipeForm";
import RecipeIcon from "../icons/RecipeIcon";
import theme from "../../theme";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

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
      Header: () => (
          <div style={theme.flexContainer}>
              <RecipeIcon />
              Recipes
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
                    onClick={handleAddRecipe}
                    startIcon={<Add/>}
                >
                    Add new
                </Button>
            </div>
        ),
      accessor: 'id',
        Cell: ({ value }) => (
            <div style={{textAlign: "right"}}>
                <EditIcon onClick={() => handleEditRecipe(value)} />
                <DeleteIcon onClick={() => handleRecipeDelete(value)} />
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
            <TableRow style={{ backgroundColor: '#F5F5F5' }}>
                <TableCell sx={theme.tableCell}>Recipe</TableCell>
                <TableCell sx={{ ...theme.tableCell, textAlign: 'right' }}>Options</TableCell>
            </TableRow>
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
