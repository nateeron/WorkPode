import { useState } from 'react'

const AddData = () => {

  const [count, setCount] = useState(0)

  return (
    <>
      <div className='cy-box'>
        <div className='it txt-c'>

          <p className="read-the-docs it">
            Add Data
          </p>
        </div>
 <div className='it'>

          <div className='it-row'>
            <div className='it-col-4 txt-r'>
              <label>เรื่อง</label>
            </div>
            <div className='it-col'>
              <input type="text" />
            </div>
          </div>
        </div>
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
              <label>หน่วยงานผู้จ้าง</label>
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

export default AddData
