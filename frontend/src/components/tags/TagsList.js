import React, { useEffect, useState, useMemo } from "react";
import * as actions from './TagsActions';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useTable } from 'react-table';
import {useNavigate} from "react-router-dom";
import TagForm from "./TagForm";

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [editTagId, setEditTagId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    actions.loadTags(setTags);
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
    actions.deleteTag(id, () => {
      actions.loadTags(setTags);
    });
  };

  const columns = useMemo(() => [
    {
      Header: 'Tags',
      accessor: 'name',
    },
    {
      Header: () => (
        <div style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTag}
            startIcon={<Add />}
          >
            Add Tag
          </Button>
        </div>
      ),
      accessor: 'id',
      Cell: ({ value }) => (
        <div>
          <Button onClick={() => handleEditTag(value)} startIcon={<Edit />}>
            Edytuj
          </Button>
          <Button onClick={() => handleTagDelete(value)} startIcon={<Delete />}>
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
    data: tags,
  });

  return (
    <div className="records">
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
