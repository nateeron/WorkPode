import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { getmenu } from "../api/sheetsApi";
import "../assets/css/dilog_image.css";

const AddData = () => {

    const [date, setDate] = useState(new Date());
    const [show_bt_save, set_show_bt_save] = useState(false);
    const [menu1, setmenu1] = useState();
    const [menu2, setmenu2] = useState();
    const [menu3, setmenu3] = useState();
    const [menu4, setmenu4] = useState();

    const fetchData = async () => {
        const result1 = await getmenu(1);
        setmenu1(result1.values);
        console.log(result1.values);

        const result2 = await getmenu(2);

        setmenu2(result2.values);
        const result3 = await getmenu(3);

        setmenu3(result3.values);
        const result4 = await getmenu(4);

        setmenu4(result4.values);
    };

    useEffect(() => {
        fetchData();

        console.log(menu1);
    }, []);

    const imageDialog = document.getElementById("imageDialog");
    const imageDialogRef = useRef(null);
    const addImageRef = useRef(null);
    const [droppedImageFile, setDroppedImageFile] = useState(null);

    const openDialogBtn = () => {
        if (imageDialogRef.current) {
            imageDialogRef.current.showModal();
        }
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
        addImageRef.current.innerHTML = "Drop an image here"; // Reset the drop area content
    };

    // Function to handle saving the image (simulated fetch)
    const handleSaveImage = () => {
        if (droppedImageFile) {
            console.log("Saving image:", droppedImageFile);
            // Simulate API call with FormData
            const formData = new FormData();
            formData.append("image", droppedImageFile);

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Uncomment below lines to actually make a fetch call to your API
            // fetch('YOUR_API_ENDPOINT', {
            //   method: 'POST',
            //   body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //   console.log('Success:', data);
            //   alert('Image saved successfully!');
            // })
            // .catch(error => {
            //   console.error('Error:', error);
            //   alert('Failed to save image.');
            // });
        } else {
            alert("Please drop an image first.");
        }
    };
    
    return (
        <>
            <div className="cy-box">
                <div className="it txt-c">
                    <p className="read-the-docs it">Add Data</p>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>รูปภาพ Ardwork</label>
                        </div>
                        <div className="it-col-2">
                            <div className="cy-bt-upload" id="openDialogBtn" onClick={openDialogBtn}>
                                {" "}
                                Upload
                            </div>
                        </div>
                    </div>
                </div>

                <dialog ref={imageDialogRef} id="imageDialog">
                    <div className="content">
                        <div className="">
                            <div
                                className="btw dialog-paste-Image"
                                id="addimage"
                                ref={addImageRef}
                                onPaste={handlePaste_image}
                                onDragEnter={handleDragEnterOver}
                                onDragLeave={handleDragLeaveDrop}
                                onDragOver={preventDefaults}
                                onDrop={handleDrop}
                                tabIndex="0"
                               
                            >
                                Drop an image here
                            </div>
                            <input type="file" id="imageInput" accept="image/*"  onChange={handleFileSelect} className="none" />
                        </div>
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
                        <div className="it-col-3 txt-r">
                            <label>เรื่อง</label>
                        </div>
                        <div className="it-col-3">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>วันที่รับงาน</label>
                        </div>
                        <div className="it-col-3 datePicker-lite">
                            <div className="cayo-datepicker">
                                <Flatpickr key={"date2"}
                                    className="cayo-datepicker-input"
                                    value={date}
                                    onChange={(selectedDates) => {
                                        setDate(selectedDates[0]);
                                        console.log("Selected date:", selectedDates[0]);
                                    }}
                                    options={{
                                        dateFormat: "d/m/Y", // Format example: 01 Jan 2024
                                        defaultDate: new Date(), // Set the default date here
                                        onClose: (selectedDates, dateStr, instance) => {
                                            console.log("Selected date:", dateStr);
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
                        <div className="it-col-3 txt-r">
                            <label>ผู้แจ้งงาน</label>
                        </div>
                        <div className="it-col-3">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>หน่วยงานผู้จ้าง</label>
                        </div>
                        <div className="it-col-3">
                            <div className="select-container">
                                <select>
                                    {menu2 &&
                                        menu2 != "undefined" &&
                                        menu2.map((row) => <option value={row[1]}>{row[0]}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>บริษัท</label>
                        </div>
                        <div className="it-col-3">
                            <div className="select-container">
                                <select>
                                    {menu3 &&
                                        menu3 != "undefined" &&
                                        menu3.map((row) => <option value={row[1]}>{row[0]}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>จำนวน</label>
                        </div>
                        <div className="it-col-3">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>ราคาชิ้นงาน</label>
                        </div>
                        <div className="it-col-3">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            {" "}
                            <label>หมวดงาน</label>
                        </div>
                        <div className="it-col-3">
                            <div className="select-container">
                                <select>
                                    {menu4 &&
                                        menu4 != "undefined" &&
                                        menu4.map((row) => <option value={row[1]}>{row[0]}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>วันส่งงาน</label>
                        </div>
                        <div className="it-col-3">
                            <Flatpickr
                                key={"date1"}
                                className="cayo-datepicker-input"
                                value={date}
                                onChange={(selectedDates) => {
                                    setDate(selectedDates[0]);
                                    console.log("Selected date:", selectedDates[0]);
                                }}
                                options={{
                                    dateFormat: "d/m/Y", // Format example: 01 Jan 2024
                                    defaultDate: new Date(), // Set the default date here
                                    onClose: (selectedDates, dateStr, instance) => {
                                        console.log("Selected date:", dateStr);
                                    },
                                }}
                                placeholder="Select Date" // Set the placeholder text
                            />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>หมายเหตุ</label>
                        </div>
                        <div className="it-col-3">
                            <textarea type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddData;
