import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { getmenu } from "../api/sheetsApi";
import "../assets/css/dilog_image.css";
import FetchStoreObject from "../redux/Main_FetchStore";
import Random from "../Tool/fn";
import { useSelector, useDispatch } from "react-redux";



import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";




const CreateRow = ({ data }) => {
    if (data.length && typeof variable != undefined) {
        return (
            <>
                {Array.isArray(data) &&
                    data.map((row) => (
                        <TableRow key={Random()} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
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
    const dispatch = useDispatch();
    const LoadSto = useSelector((state) => state.oj_data);
    const [info_table, setinfo_table] = useState();


    // useEffect จะทำเมื่อ มีการ Load หน้า
    useEffect(() => {
        try {
            // FetchStoreObject จะส่ง dispatch ชื่อ Object และข้อมูลที่มีอยู่ใน Store ถ้า มีข้อมูลอยู่แล้วจะไม่ เรียก API ซ้ำ
            // กรณี มี Update ข้อมูลจะ ใช้ อีก function Reset_FetchStoreObject
            const fetchData = async () => {
                const data = await FetchStoreObject(dispatch, "read", LoadSto);
                setinfo_table(data);
            };

            fetchData();
        } catch (error) {
            console.log(error + "\nsrc\\Page\\AddData.jsx");
        }
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
                    <TableBody>{info_table && <CreateRow data={info_table} />}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Dashboard;
