import { useState } from 'react'
import {  Link } from 'react-router-dom';

const Top = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className='topbar'>
                <div className='f'>
                    <div >
                        <Link to="/" className='cy-bt'>Add Data</Link>
                    
                    </div>
                    <div>
                    
                    <Link to="/dashboard" className='cy-bt'>Dashboard</Link>
                    </div>
                </div>
           
            </div>

        </>
    )
}

export default Top


