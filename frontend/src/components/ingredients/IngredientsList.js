import React, {useEffect, useState, useMemo} from "react";
import * as actions from './IngredientsActions';
import {Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
import {Edit, Delete, Add} from '@mui/icons-material';
import {useTable} from 'react-table';
import Ingredient from "./IngredientForm";
import {useNavigate} from "react-router-dom";
import '../../App.scss'

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
        setEditingIngredientId(null);
        navigate(`/ingredients/new`);
    };

    const handleIngredientDelete = (id) => {
        actions.deleteIngredient(id, () => {
            actions.loadIngredients(setIngredients);
        });
    };

    const columns = useMemo(() => [{
        Header: () => (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                <img
                    src="/recipe_icon.svg"
                    alt="Recipe Icon"
                    style={{
                        maxWidth: '24px',
                        maxHeight: '24px',
                        verticalAlign: 'middle',
                        marginRight: '8px',
                    }}
                />
                Ingredients
            </div>
        ),
        accessor: 'name',
    },
        {
            Header: () => (
                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#867DF0', borderRadius: '10px', textTransform: 'capitalize' }}
                        onClick={handleAddIngredient}
                        startIcon={<Add/>}
                    >
                        Add New
                    </Button>
                </div>
            ),
            accessor: 'id',
            Cell: ({value}) => (
                <div style={{textAlign: 'right'}}>
                    <Button className="custom-button" onClick={() => handleEditIngredient(value)} startIcon={<Edit/>}>
                    </Button>
                    <Button className="custom-button" onClick={() => handleIngredientDelete(value)} startIcon={<Delete/>}>
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
        <div className="list-container">
            <div className="records">
                {editingIngredientId !== null ? (
                    <Ingredient ingredientId={editingIngredientId}/>
                ) : null}
                <TableContainer component={Paper}>
                    <Table {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps() } >
                                    {headerGroup.headers.map((column) => (
                                        <TableCell {...column.getHeaderProps()}>{column.render("Header") } </TableCell>
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
                                            <TableCell {...cell.getCellProps()} style={{ fontSize: '16px', padding: '10px 50px' }} >
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
        </div>
    );
};

export default IngredientsPage;
