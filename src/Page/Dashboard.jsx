import React, { useEffect, useState } from "react";

import { getData, updateData, deleteData, searchData } from "../api/sheetsApi";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Random from "../Tool/fn";
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

const CreateRow = ({ data }) => {
    if (data) {
        return (
            <>
                {data &&
                    data.map((row) => (
                        <TableRow key={Random()} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell component="th" scope="row" >
                                    {row[0]}
                                </TableCell>
                                <TableCell align="right"> {row[1]}</TableCell>
                                <TableCell align="right"> {row[2]}</TableCell>
                                <TableCell align="right"> {row[3]}</TableCell>
                                <TableCell align="right"> {row[4]}</TableCell>
                                <TableCell align="right"> {row[5]}</TableCell>
                                <TableCell align="right"> {row[6]}</TableCell>
                                <TableCell align="right"> {row[7]}</TableCell>
                                <TableCell align="right"> {row[8]}</TableCell> 
                                <TableCell align="right"> {row[9]}</TableCell> 
                                <TableCell align="right"> {row[10]}</TableCell> 
                        </TableRow>
                    ))}
            </>
        );
    }
};

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
        console.log(result.values);
        setData(result.values);
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
                            <TableCell align="">subject</TableCell>
                            <TableCell align="">DateAddWork</TableCell>
                            <TableCell align="">JobInformer</TableCell>
                            <TableCell align="">EmployingAgency</TableCell>
                            <TableCell align="">Company</TableCell>
                            <TableCell align="center">Ardwork</TableCell>
                            <TableCell align="right">Number</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="">Category</TableCell>
                            <TableCell align="center">WorkSubmissionDate</TableCell>
                            <TableCell align="center">Note</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{data && <CreateRow data={data} />}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Dashboard;
