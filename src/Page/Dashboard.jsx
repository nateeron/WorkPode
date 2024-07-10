import React, { useEffect, useState } from "react";

import { getData,  updateData, deleteData, searchData } from "../api/sheetsApi";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const Dashboard = () => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [newValue, setNewValue] = useState("");
    const [updateRange, setUpdateRange] = useState("");
    const [updateValue, setUpdateValue] = useState("");
    const [deleteRange, setDeleteRange] = useState("");
    const [searchQuery, setSearchQuery] = useState({ subject: "", Company: "", DateAddWork: "" });

    const fetchData = async () => {
        const result = await getData();
        setData(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>subject</TableCell>
                            <TableCell align="right">DateAddWork</TableCell>
                            <TableCell align="right">JobInformer</TableCell>
                            <TableCell align="right">Ardwork</TableCell>
                            <TableCell align="right">Number</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">WorkSubmissionDate</TableCell>
                            <TableCell align="right">Note</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Dashboard;
