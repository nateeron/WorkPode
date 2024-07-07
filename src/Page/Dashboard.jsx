import React, { useEffect, useState } from 'react';


import { getData, createData, updateData, deleteData, searchData } from '../api/sheetsApi';



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
        console.log("useEffect********")
        console.log(data)
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

               
            </div>



        </>
    )
}

export default Dashboard
