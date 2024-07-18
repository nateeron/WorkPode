import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { getmenu } from "../api/sheetsApi";
import "../assets/css/dilog_image.css";
import FetchStoreObject from "../redux/Main_FetchStore";
import Random from "../Tool/fn";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import "../Tool/stylePhoto.css";
import CloseIcon from "@mui/icons-material/Close";
import { Padding } from "@mui/icons-material";

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

    const GenItem = ({ i, data, opdi }) => {
        let localServerUrl = API_URLS.MAIN_API + "/get_image";
        const httpsUrl = data[5].startsWith("https");
        if (httpsUrl) {
            localServerUrl = data[5].replace("https://drive.google.com/uc", API_URLS.MAIN_API + "/get_image");
        }

        return (
            <>
                <div id={i} key={Random()} className="item-list ">
                    <div className="flex ">
                        <div>
                            <img className="img" onClick={() => opdi(localServerUrl)} src={localServerUrl} />
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

    // ------------------------------------
    const dialogContent = document.getElementById("dialog-content");
    const dialogContentZ = document.getElementById("dialog-contentz");
    const dialogContentMove = document.getElementById("dialog-image");
    let scale = 0.9;
    let offsetX, offsetY;
    let MountoffsetX, MountoffsetY;
    function resetsize() {
        offsetY = 0;
        offsetX = 0;
        MountoffsetX = 0;
        MountoffsetY = 0;
        scale = 0.9;
    }

    const openDialog = (src) => {
        // const src = event.target.src;
        resetsize();
        console.log("openDialog(src)");
        console.log(document.querySelector(".dialog-overlay"));
        dialogContent.style.transform = `scale(0.9)`;

        const img = document.getElementById("dialog-image");
        img.src = src;
        console.log(document.querySelector(".dialog-overlay"));
        document.querySelector(".dialog-overlay").style.display = "block";
        dialogContentZ.addEventListener("mousewheel", zoom);
        dialogContentMove.addEventListener("mousedown", startDrag);
        dialogContentZ.addEventListener("mousedown", startDrag);
    };

    function closeDialog() {
        document.querySelector(".dialog-overlay").style.display = "none";
        dialogContent.style.top = 0;
        dialogContent.style.left = 0;
        dialogContent.style.transform = "";
    }

    const handleTouchMove = (e) => {
        console.log('Touch moved', e);
        // Logic to handle touch move events
        startDrag(e)
    };
    
    const startDrag = (event) => {
        MountoffsetX = event.clientX;
        MountoffsetY = event.clientY;
        event.preventDefault();
        const inlineStyle = dialogContent.style.cssText;
        const leftValue = getPropertyValue(inlineStyle, "left");
        const topValue = getPropertyValue(inlineStyle, "top");
        offsetX = leftValue;
        offsetY = topValue;
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDrag);
    };

    const drag = (event) => {
        event.preventDefault();

        const MoveX = MountoffsetX - event.clientX;
        const Movey = MountoffsetY - event.clientY;
        let x = offsetX - MoveX;
        let y = offsetY - Movey * 2;
        dialogContent.style.left = x + "px";
        dialogContent.style.top = y + "px";
    };
    const getPropertyValue = (style, property) => {
        const regex = new RegExp(property + ":\\s*(-?\\d+\\.?\\d*)px");
        const match = style.match(regex);
        if (match) {
            return parseFloat(match[1]);
        }
        return null;
    };

    const getScaleValue = (style) => {
        const regex = /scale\((\d+(\.\d+)?)\)/;
        const match = style.match(regex);
        if (match) {
            return parseFloat(match[1]);
        }
        return null;
    };
    const endDrag = () => {
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
    };

    let sizeimgW, sizeimgH;
    const zoom = (event) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            // Scroll down, zoom out
            if (scale > 2) {
                scale = Math.max(0.001, scale - 1);
            } else if (scale > 1) {
                scale = Math.max(0.001, scale - 0.5);
            } else {
                scale = Math.max(0.001, scale - 0.1);
            }
        } else {
            // Scroll up, zoom in
            if (scale > 2) {
                scale = Math.min(20, scale + 1);
            } else if (scale > 1) {
                scale = Math.min(20, scale + 0.5);
            } else {
                scale = Math.min(20, scale + 0.1);
            }
        }

        const setscale = scale.toLocaleString(undefined, { maximumFractionDigits: 1 });
        dialogContent.style.transform = `scale(${setscale})`;

        const img = document.getElementById("dialog-image");
        const elementToAnimate = document.getElementById("zoom-show");

        // Add the 'show' class to trigger the transition
        elementToAnimate.classList.add("show");

        // Remove the 'show' class after 3 seconds
        setTimeout(() => {
            elementToAnimate.classList.remove("show");
        }, 3000); // 3 seconds

        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const rect = img.getBoundingClientRect(); // Assuming 'element' is the element you want to get the size from
        const percentage = (rect.width / naturalHeight) * 100;
        const cal = ((setscale - 1) * 100) / 1;
        const cal_ = cal < 10 && cal > 0 ? 0 : cal > -10 && cal < 0 ? 0 : cal;
        console.log(setscale, parseInt(cal_));
        // (เงินเดือนใหม่ - เงินเดือนเก่า) x 100 ÷ เงินเดือนเก่า = เปอร์เซ็นต์เงินเดือนที่เพิ่มขึ้น
        // document.getElementById('zoom-sizeimage').innerText = percen.toString("#,###") + '%';
        const zoomSizeElement = document.getElementById("zoom-sizeimage");
        // zoomSizeElement.innerText = percentage.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "%";
        zoomSizeElement.innerText = parseInt(cal_).toString() + "%";
    };

    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        setFilter(e.target.value); // Update the filter value
    };

    const filteredTable = Array.isArray(info_table)
        ? info_table.filter(
              (row) =>
                  row[0].toLowerCase().includes(filter.toLowerCase()) || // Filter by subject
                  row[2].toLowerCase().includes(filter.toLowerCase()) || // Filter by subject
                  row[3].toLowerCase().includes(filter.toLowerCase()) || // Filter by subject
                  row[4].toLowerCase().includes(filter.toLowerCase()) // Filter by JobInformer
          )
        : [];
    return (
        <>
            <div className="cy-box over">
                <div className="btw" >
                    <div className="flex">
                        <label style={{paddingTop:"4px"}}>
                        Search  : {" "}
                        </label>
                 
                    <input
                        type="text"
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Filter by subject or JobInformer or EmployingAgency or Company"
                        className="Search-input"
                    />{" "}
                    </div>
             
                </div>
                {Array.isArray(filteredTable) &&
                    filteredTable.map((row, index) => (
                        <GenItem key={Random()} i={index} data={row} opdi={openDialog} />
                    ))}
            </div>
            <Box className="dialog-overlay" id="dialog-contentz" zIndex={99}>
                <Box sx={{ width: "100%", textAlign: "end" }}>
                    <Button
                        sx={{ background: "#EC471486", color: "#FFFFFF", zIndex: 150 }}
                        className="close-button"
                        onClick={closeDialog}
                    >
                        <CloseIcon />
                    </Button>
                </Box>
                <Box
                    className="dialog-content"
                    id="dialog-content"
                    sx={{
                        top: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <img className="dialog-image" id="dialog-image" onTouchMove={handleTouchMove} src="" alt="Zoomed Image" sx={{ height: "100%" }} />
                </Box>
                <Box className="percen" id="zoom-show">
                    <span id="zoom-sizeimage">100%</span>
                </Box>
                <Box className="sizeimage">
                    <span id="sizeimage"></span>
                </Box>
                <Box />
            </Box>{" "}
        </>
    );
};

export default Dashboard;
