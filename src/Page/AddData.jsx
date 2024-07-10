import { useState } from "react";
import dayjs from "dayjs";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const AddData = () => {
    const [count, setCount] = useState(0);

    const [date, setDate] = useState(new Date());
    const [show_bt_save, set_show_bt_save] = useState(false);


    return (
        <>
            <div className="cy-box" >
                <div className="it txt-c">
                    <p className="read-the-docs it">Add Data</p>
                </div>
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
                                <Flatpickr
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
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>บริษัท</label>
                        </div>
                        <div className="it-col-3">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>รูปภาพ Ardwork</label>
                        </div>
                        <div className="it-col-3">
                            <input type="text" />
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
                                    <option value="option1">หมวดง 1</option>
                                    <option value="option2">หมวดง 2</option>
                                    <option value="option3">หมวดง 3</option>
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
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="it">
                    <div className="it-row">
                        <div className="it-col-3 txt-r">
                            <label>หมายเหตุ</label>
                        </div>
                        <div className="it-col-3">
                            <input type="text" />
                        </div>
                    </div>
                </div>
               
             
            </div>
        </>
    );
};

export default AddData;
