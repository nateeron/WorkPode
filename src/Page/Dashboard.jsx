import React, { useEffect, useState } from 'react';


import { getData, createData, updateData, deleteData, searchData } from '/src/api/sheetsApi';



const ListData = () => {




    return <>


    </>
}

const Dashboard = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([]);
    const [newValue, setNewValue] = useState('');
    const [updateRange, setUpdateRange] = useState('');
    const [updateValue, setUpdateValue] = useState('');
    const [deleteRange, setDeleteRange] = useState('');
    const [searchQuery, setSearchQuery] = useState({ subject: '', Company: '', DateAddWork: '' });


    const fetchData = async () => {
        const result = await getData();
        setData(result);
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        await createData([[newValue]]);
        fetchData();
        setNewValue('');
    };

    const handleUpdate = async () => {
        await updateData(updateRange, [[updateValue]]);
        fetchData();
        setUpdateRange('');
        setUpdateValue('');
    };

    const handleDelete = async () => {
        await deleteData(deleteRange);
        fetchData();
        setDeleteRange('');
    };

    const handleSearch = async () => {
        const result = await searchData(searchQuery);
        setData(result);
    };

    

    return (
        <>

            <div className='cy-box'>
                <p className="read-the-docs">
                    Dashboard
                </p>

                <div className='it'>

                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>วันที่รับงาน</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>

                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>ผู้แจ้งงาน</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>
                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>หน่อวยงานผู้จ้าง</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>

                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>บริษัท</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>

                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>รูปภาพ Ardwork</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>
                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>จำนวน</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>

                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>ราคาชิ้นงาน</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>
                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>  <label>หมวดงาน</label></div>
                        <div className='it-col'>
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
                <div className='it'>
                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>วันส่งงาน</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className='it'>
                    <div className='it-row'>
                        <div className='it-col-4 txt-r'>
                            <label>หมายเหตุ</label>
                        </div>
                        <div className='it-col'>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    <hr />
                </div>
                <div className='it txt-c'>
                    <button> Save </button>

                </div>
            </div>



        </>
    )
}

export default Dashboard
