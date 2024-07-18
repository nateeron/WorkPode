import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { getmenu } from "../api/sheetsApi";
import "../assets/css/dilog_image.css";
import FetchStoreObject from "../redux/Main_FetchStore";
import Random from "../Tool/fn";
import { useSelector, useDispatch } from "react-redux";
import { dispatchAction, SendPost, SendPost_image } from "../redux/Main_FetchStore";
import { formatDate } from "../Tool/fn";
import { API_URLS } from "../api/sheetsApi";

const AddData = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const [show_bt_save, set_show_bt_save] = useState(false);
    const [menu1, setmenu1] = useState();
    const [menu2, setmenu2] = useState();
    const [menu3, setmenu3] = useState();
    const [menu4, setmenu4] = useState();

    const oj_menu = useSelector((s) => s);
    const ojs = {
        subject: "",
        DateAddWork: "",
        JobInformer: "",
        EmployingAgency: "",
        Company: "",
        Ardwork: null,
        Number: "",
        Price: "",
        Category: "",
        WorkSubmissionDate: "",
        JobCode: "",
        Note: "",
    };
    const [oj_infoSave, setoj_infoSave] = useState(ojs);
    const [reste, Sreste] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Promise.all ทำการโหดพร้อมกัน ในเวลาเดียวกัน งานไหนเสร็จก่อนก็จอรอ function อื่นจนเสร็จทั้งหมด
            const [result2, result3, result4] = await Promise.all([
                FetchStoreObject(dispatch, "menu_read", oj_menu.oj_menu2, 2),
                FetchStoreObject(dispatch, "menu_read", oj_menu.oj_menu3, 3),
                FetchStoreObject(dispatch, "menu_read", oj_menu.oj_menu4, 4),
            ]);

            setmenu2(result2);
            setmenu3(result3);
            setmenu4(result4);
            oj_infoSave.EmployingAgency = result2 ? result2[0][0] : [];
            oj_infoSave.Company = result3 ? result3[0][0] : [];
            oj_infoSave.Category = result4 ? result4[0][0] : [];
            oj_infoSave.DateAddWork = formatDate(new Date());
            oj_infoSave.WorkSubmissionDate = formatDate(new Date());
            setDate(new Date());
        };

        fetchData();

        console.log(menu1);
    }, [reste]);
    // useSelector ต้องเรียกใช้บันทัดเดียว ใน Function
    const LoadSto = useSelector((state) => state.oj_data);
    // useEffect จะทำเมื่อ มีการ Load หน้า
    useEffect(() => {
        try {
            // FetchStoreObject จะส่ง dispatch ชื่อ Object และข้อมูลที่มีอยู่ใน Store ถ้า มีข้อมูลอยู่แล้วจะไม่ เรียก API ซ้ำ
            // กรณี มี Update ข้อมูลจะ ใช้ อีก function Reset_FetchStoreObject
            const data = FetchStoreObject(dispatch, "read", LoadSto);
            console.log(data);
        } catch (error) {
            console.log(error + "\nsrc\\Page\\AddData.jsx");
        }
    }, []);

    const imageDialog = document.getElementById("imageDialog");
    const imageDialogRef = useRef(null);
    const addImageRef = useRef(null);
    const [droppedImageFile, setDroppedImageFile] = useState(null);

    const openDialogBtn = () => {
        document.getElementById("imageInput").click();
        // if (imageDialogRef.current) {
        //     imageDialogRef.current.showModal();
        // }
    };

    const handlePaste_image = (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile();
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    const img = document.createElement("img");
                    img.src = reader.result;
                    img.style.display = "block"; // Show the image
                    addImageRef.current.innerHTML = ""; // Clear the drop area
                    addImageRef.current.appendChild(img);
                };

                break;
            }
        }
    };

    // Function to handle file selection from input
    const handleFileSelect = (event) => {
        const files = event.target.files;
        // console.log(files[0])
        const formData = new FormData();
        formData.append("image", files[0]);
        oj_infoSave.Ardwork = formData;
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }
        setoj_infoSave(oj_infoSave);
        // console.log(oj_infoSave)
        handleFiles(files);
    };

    // Function to prevent default drag behaviors
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragEnterOver = () => {
        addImageRef.current.classList.add("highlight");
    };
    // Function to handle drag leave and drop events
    const handleDragLeaveDrop = () => {
        addImageRef.current.classList.remove("highlight");
    };

    // Function to handle file drop
    const handleDrop = (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    };

    // Function to handle dropped files
    const handleFiles = (files) => {
        [...files].forEach(previewFile);
    };

    // Function to preview the dropped file
    const previewFile = (file) => {
        setDroppedImageFile(file); // Save the dropped file
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = document.createElement("img");
            img.src = reader.result;
            img.style.display = "block"; // Show the image
            addImageRef.current.innerHTML = ""; // Clear the drop area
            addImageRef.current.appendChild(img);
        };
    };

    // Function to clear the dropped file
    const clearFile = () => {
        setDroppedImageFile(null); // Clear the file reference
        addImageRef.current.innerHTML = "";
        setEmployingAgency_("");
        setsubject_("");
        setDateAddWork_("");
        setJobInformer_("");
        setCompany_("");
        setNumber_("");
        setPrice_("");
        setCategory_("");
        setNote_("");

        Sreste(!reste);
    };

    // Function to handle saving the image (simulated fetch)
    const handleSaveImage = () => {
        if (droppedImageFile) {
            console.log("Saving image:", droppedImageFile);
            // Simulate API call with FormData
            const formData = new FormData();
            formData.append("image", droppedImageFile);
            const Action = "ADD_FORM_DATA";
            dispatch(dispatchAction(Action, formData));
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            return formData;
        } else {
            return null;
        }
    };

    const EmployingAgency_Change = (e) => {
        oj_infoSave.EmployingAgency = e.target.value;
        setoj_infoSave(oj_infoSave);
        setEmployingAgency_(e.target.value);
        console.log(oj_infoSave);
    };
    const [EmployingAgency_, setEmployingAgency_] = useState();
    const [subject_, setsubject_] = useState();
    const [DateAddWork_, setDateAddWork_] = useState();
    const [JobInformer_, setJobInformer_] = useState();
    const [Company_, setCompany_] = useState();
    const [Number_, setNumber_] = useState();
    const [Price_, setPrice_] = useState();
    const [Category_, setCategory_] = useState();
    const [Note_, setNote_] = useState();
    const [JobCode_, setJobCode_] = useState();

    const subject_Change = (e) => {
        oj_infoSave.subject = e.target.value;
        setsubject_(e.target.value);
        setoj_infoSave(oj_infoSave);
        console.log(oj_infoSave);
    };
    const DateAddWork_Change = (e) => {
        oj_infoSave.DateAddWork = e.target.value;
        setoj_infoSave(oj_infoSave);
        console.log(oj_infoSave);
    };
    const JobInformer_Change = (e) => {
        oj_infoSave.JobInformer = e.target.value;
        setoj_infoSave(oj_infoSave);
        setJobInformer_(e.target.value);
    };
    const Company_Change = (e) => {
        oj_infoSave.Company = e.target.value;
        setoj_infoSave(oj_infoSave);
        setCompany_(e.target.value);
    };
    const Number_Change = (e) => {
        oj_infoSave.Number = e.target.value;
        setoj_infoSave(oj_infoSave);
        setNumber_(e.target.value);
        console.log(oj_infoSave);
    };
    const Price_Change = (e) => {
        oj_infoSave.Price = e.target.value;
        setoj_infoSave(oj_infoSave);
        setPrice_(e.target.value);
        console.log(oj_infoSave);
    };
    const Category_Change = (e) => {
        oj_infoSave.Category = e.target.value;
        setoj_infoSave(oj_infoSave);
        setCategory_(e.target.value);
        console.log(oj_infoSave);
    };

    const Note_Change = (e) => {
        oj_infoSave.Note = e.target.value;
        setoj_infoSave(oj_infoSave);
        setNote_(e.target.value);
        console.log(oj_infoSave);
    };
    const JobCode_Change = (e) => {
        oj_infoSave.JobCode = e.target.value;
        setoj_infoSave(oj_infoSave);
        setJobCode_(e.target.value);
        console.log(oj_infoSave);
    };

    const view_Object = () => {
        // sened Post
        const imageFile = oj_infoSave.Ardwork;
        console.log(oj_infoSave);
        console.log(imageFile);
        console.log(typeof oj_infoSave.Ardwork);

        if (typeof oj_infoSave.Ardwork === "object" && oj_infoSave.Ardwork !== null) {
            for (let [key, value] of imageFile.entries()) {
                console.log(`${key}:`, value);
            }
        }
        // SendPost(API_URLS.API_create, oj_infoSave);
    };
    const save = async () => {
        // sened Post Upload image and return Url image
        // "https://drive.google.com/uc?export=view&id=19_5wVm5t90m6Hn43nqJDARJi21Z4LTNr"
        let resp = null;
        try {
            if (typeof oj_infoSave.Ardwork === "object" && oj_infoSave.Ardwork !== null) {
                resp = await SendPost_image(API_URLS.Upload, oj_infoSave.Ardwork);
                console.log(resp);
                console.log(resp.data);
                // add Url image to Object
                oj_infoSave.Ardwork = resp.data;
            }
        } catch (error) {
            console.log("*********** error SendPost_image Save ***********", error);
        }

        //    setoj_infoSave(oj_infoSave)
        console.log(oj_infoSave);
        try {
            const resps = await SendPost(API_URLS.API_create, oj_infoSave);
            console.log("*********** SendPost Save ***********", resps);
        } catch (error) {
            console.log("*********** error SendPost Save ***********", error);
        }

        CrearOJ();
        // SendPost(API_URLS.API_create, oj_infoSave);
    };

    const CrearOJ = () => {
        setoj_infoSave(ojs);
        clearFile();
    };
    return (
        <>
            <div>
                <div className="cy-box">
                    <div className="it txt-r">
                        <div className="cy-bt-save" onClick={save}>
                            Save
                        </div>
                     
                        <a
                            href="https://docs.google.com/spreadsheets/d/1pNgXiMG54vmF84jBBhtccclQGZwItYU2LeuP4oMNCWE/edit?gid=0#gid=0"
                            target="_blank"
                            className="cy-bt-save"
                        >
                            Open EXCEL
                        </a>

                        <div className="cy-bt-save hid" onClick={view_Object}>
                            view_Object
                        </div>
                        <div className="cy-bt-save hid" onClick={CrearOJ}>
                            CrearOJ
                        </div>
                    </div>
                    <div className="it txt-c">
                        <p className="read-the-docs it">Add Data</p>
                    </div>

                    <div className="btw" style={{}}>
                        <div
                            className="btw "
                            style={{ width: "20%", minWidth: "150px" }}
                            id="addimage"
                            ref={addImageRef}
                            onPaste={handlePaste_image}
                            onDragEnter={handleDragEnterOver}
                            onDragLeave={handleDragLeaveDrop}
                            onDragOver={preventDefaults}
                            onDrop={handleDrop}
                            tabIndex="0"
                        ></div>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="none"
                        />
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>Artwork</label>
                            </div>
                            <div className="it-col-5">
                                <div className="cy-bt-upload" id="openDialogBtn" onClick={openDialogBtn}>
                                    {" "}
                                    Upload
                                </div>
                            </div>
                        </div>
                    </div>

                    <dialog ref={imageDialogRef} id="imageDialog">
                        <div className="content">
                            <div className="flex-center al-center">
                                <div className="flex">
                                    <button className="dl-button" id="Save" onClick={handleSaveImage}>
                                        Save
                                    </button>
                                </div>
                                <div className="flex">
                                    <button
                                        className="dl-button"
                                        id="select_image"
                                        onClick={() => document.getElementById("imageInput").click()}
                                    >
                                        Select
                                    </button>
                                </div>
                                <div className="flex">
                                    <button className="dl-button" onClick={() => imageDialogRef.current.close()}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </dialog>

                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>เรื่อง</label>
                            </div>
                            <div className="it-col-5">
                                <input type="text" onChange={subject_Change} value={subject_} />
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>วันที่รับงาน</label>
                            </div>
                            <div className="it-col-5 datePicker-lite">
                                <div className="cayo-datepicker">
                                    <Flatpickr
                                        key={"date2"}
                                        className="cayo-datepicker-input"
                                        value={date}
                                        onChange={(selectedDates) => {
                                            setDate(selectedDates[0]);
                                        }}
                                        options={{
                                            dateFormat: "d/m/Y", // Format example: 01 Jan 2024
                                            defaultDate: new Date(), // Set the default date here
                                            onClose: (selectedDates, dateStr, instance) => {
                                                oj_infoSave.DateAddWork = dateStr;
                                                setoj_infoSave(oj_infoSave);
                                            },
                                        }}
                                        placeholder="Select Date" // Set the placeholder text
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>Owner</label>
                            </div>
                            <div className="it-col-5">
                                <input type="text" value={JobInformer_} onChange={JobInformer_Change} />
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>หน่วยงานผู้แจ้ง</label>
                            </div>
                            <div className="it-col-5">
                                <input type="text" value={EmployingAgency_} onChange={EmployingAgency_Change} />
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>บริษัท</label>
                            </div>
                            <div className="it-col-5">
                                <div className="select-container">
                                    <select value={Company_} onChange={Company_Change}>
                                        {menu3 &&
                                            menu3 != "undefined" &&
                                            menu3.map((row) => (
                                                <option key={Random()} value={row[0]}>
                                                    {row[0]}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>จำนวน</label>
                            </div>
                            <div className="it-col-5">
                                <input type="text" value={Number_} onChange={Number_Change} />
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>ราคา</label>
                            </div>
                            <div className="it-col-5">
                                <input type="text" value={Price_} onChange={Price_Change} />
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                {" "}
                                <label>หมวดงาน</label>
                            </div>
                            <div className="it-col-5">
                                <div className="select-container">
                                    <select value={Category_} onChange={Category_Change}>
                                        {menu4 &&
                                            menu4 != "undefined" &&
                                            menu4.map((row) => (
                                                <option key={Random()} value={row[0]}>
                                                    {row[0]}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>วันที่ส่งงาน</label>
                            </div>
                            <div className="it-col-5">
                                <Flatpickr
                                    key={"date1"}
                                    className="cayo-datepicker-input"
                                    value={date}
                                    onChange={(selectedDates) => {
                                        setDate(selectedDates[0]);
                                    }}
                                    options={{
                                        dateFormat: "d/m/Y", // Format example: 01 Jan 2024
                                        defaultDate: new Date(), // Set the default date here
                                        onClose: (selectedDates, dateStr, instance) => {
                                            oj_infoSave.WorkSubmissionDate = dateStr;
                                            setoj_infoSave(oj_infoSave);
                                        },
                                    }}
                                    placeholder="Select Date" // Set the placeholder text
                                />
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>JobCode</label>
                            </div>
                            <div className="it-col-5">
                                <input type="text" value={JobCode_} onChange={JobCode_Change} />
                            </div>
                        </div>
                    </div>
                    <div className="it">
                        <div className="it-row">
                            <div className="it-col-4 txt-r">
                                <label>หมายเหตุ</label>
                            </div>
                            <div className="it-col-5">
                                <textarea type="text" value={Note_} onChange={Note_Change} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddData;
