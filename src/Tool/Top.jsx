import { useState } from 'react'
import {  Link } from 'react-router-dom';

const Top = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className='topbar'>
                <div className='f'>
                    <div className='cy-bt'>
                        <Link to="/">Add Data</Link>
                    
                    </div>
                    <div className='cy-bt'>
                    
                    <Link to="/dashboard">Dashboard</Link>
                    </div>
                </div>
                <div className='item'>
                    Login
                </div>
            </div>

        </>
    )
}

export default Top
