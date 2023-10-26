import React, { useEffect, useState, useMemo } from "react";
import * as actions from './TagsActions';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTable } from 'react-table';
import {useNavigate} from "react-router-dom";
import TagForm from "./TagForm";
import RecipeIcon from "../icons/RecipeIcon";
import theme from "../../theme";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ErrorsMessage from "../ErrorsMessage";

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [editTagId, setEditTagId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const hideError = () => {
    setError(null);
  };

  useEffect(() => {
    actions.loadTags((data, error) => {
      if (error) {
        if (error.response && error.response.status === 403) {
          setError("Nie masz uprawnień do tej zakładki.");
        } else {
          setError("Wystąpił nieznany błąd.");
        }
        setTimeout(hideError, 5000);
      } else {
        setTags(data);
      }
    });
  }, []);

  const handleEditTag = (id) => {
    setEditTagId(id);
    navigate(`/tags/${id}`);
  };

  const handleAddTag = () => {
    setEditTagId(null);
    navigate(`/tags/new`);
  };

  const handleTagDelete = (id) => {
    actions.deleteTag(id, (data, error) => {
      if (error) {
        if (error.response && error.response.status === 403) {
          setError("Nie masz uprawnień do tej akcji.");
        } else {
          setError("Wystąpił nieznany błąd.");
        }
        setTimeout(hideError, 5000);
      } else {
        actions.loadTags(setTags());
      }
    });
  };

  const columns = useMemo(() => [
    {
      Header: () => (
          <div style={theme.flexContainer}>
            <RecipeIcon />
            Tags
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
            onClick={handleAddTag}
            startIcon={<Add />}
          >
            Add new
          </Button>
        </div>
      ),
      accessor: 'id',
      Cell: ({ value }) => (
          <div style={{textAlign: "right"}}>
            <EditIcon onClick={() => handleEditTag(value)} />
            <DeleteIcon onClick={() => handleTagDelete(value)} />
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
    data: tags,
  });

  return (
    <div className="records">
      {error && (
          <ErrorsMessage message={error} />
      )}
      {editTagId !== null ? (
        <TagForm tagId={editTagId} />
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
            <TableCell sx={theme.tableCell}>Tag</TableCell>
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

export default TagsPage;
