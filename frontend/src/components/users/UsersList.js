import React, {useEffect, useMemo, useState} from "react";
import * as actions from './UsersActions';
import theme from "../../theme";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Add} from "@mui/icons-material";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import {useTable} from "react-table";
import {useNavigate} from "react-router-dom";
import UserForm from "./UserForm";
import UserIcon from "../icons/UserIcon";

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [editUserId, setEditUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadUsers(setUsers);
    }, [])

    const handleEditUser = (id) => {
        setEditUserId(id);
        navigate(`/users/${id}`);
    };

    const handleAddUser = () => {
        setEditUserId(null);
        navigate(`/users/new`);
    };

    const handleUserDelete = (id) => {
        actions.deleteUser(id, () => {
            actions.loadUsers(setUsers);
        });
    };

    const columns = useMemo(() => [
        {
            Header: () => (
                <div style={theme.flexContainer}>
                    <UserIcon />
                    Users
                </div>
            ),
            accessor: 'email',
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
                        onClick={handleAddUser}
                        startIcon={<Add />}
                    >
                        Add new
                    </Button>
                </div>
            ),
            accessor: 'id',
            Cell: ({ value }) => (
                <div style={{textAlign: "right"}}>
                    <EditIcon onClick={() => handleEditUser(value)} />
                    <DeleteIcon onClick={() => handleUserDelete(value)} />
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
        data: users,
    });

    return (
        <div className="records">
            {editUserId !== null ? (
                <UserForm userId={editUserId} />
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
                        <TableCell sx={theme.tableCell}>User</TableCell>
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
}

export default UsersPage;