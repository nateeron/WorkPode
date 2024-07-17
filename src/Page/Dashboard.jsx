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
import "./Dashboard.css";
import "../assets/css/index.css";
import { API_URLS } from "../api/sheetsApi";
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
            console.log(info_table);
        } catch (error) {
            console.log(error + "\nsrc\\Page\\AddData.jsx");
        }
    }, []);

    const GenItem = ({ i, data }) => {
        
        let localServerUrl =API_URLS.MAIN_API+ '/get_image'
        const httpsUrl = data[5].startsWith('https');
        console.log(httpsUrl)
        if (httpsUrl) {
            localServerUrl = data[5].replace("https://drive.google.com/uc", API_URLS.MAIN_API+"/get_image");
        }

        return (
            <>
                <div id={i}  key={Random()} className="item-list " >
                    <div className="flex ">
                        <div >
                            <img  className="img"  src={localServerUrl}/>
                        </div>
                        <div className="w-100">
                            <div className="flex-bt ">
                                <div>
                                    <div>
                                        <label>subject / เรื่อง : </label>
                                        {data[0]}
                                    </div>
                                    <div>
                                        <label>JobInformer / ผู้แจ้งงาน : </label>
                                        {data[2]}
                                    </div>
                                    <div>
                                        <label>EmployingAgency / บริษัทจัดหางาน : </label>
                                        {data[3]}
                                    </div>
                                    <div>
                                        <label>Company/บริษัท : </label>
                                        {data[4]}
                                    </div>
                                
                                 
                                </div>
                            </div>
                           
                        </div>
                        <div className="w-100">
                            <div className="flex-bt ">
                                <div>
                                    <div>
                                        <label>DateAdd Work / วันที่เพิ่มงาน : </label>
                                        {data[1]}
                                    </div>
                                    <div>
                                        <label>WorkSubmissionDate / วันที่ส่งงาน : </label>
                                        {data[9]}
                                    </div>
                                  
                                
                                 
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <div className="cy-box over">
                {Array.isArray(info_table) && info_table.map((row, index) => <GenItem  key={Random()} i={index} data={row} />)}
            </div>
        </>
    );
};

export default Dashboard;
