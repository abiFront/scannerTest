import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Html5Qrcode } from 'html5-qrcode'

function App() {
  const [codes, setCodes] = useState([])
  const [showScanner, setshowScanner] = useState(false)

  const handleShow = () =>{
    setshowScanner(true)
  }

  const handleAddCodes = (value) =>{
    setCodes(codes => [...codes, value])
  }

  const config = {
    fps: 10,
    qrbox: { width: 300, height: 150 },
    disableFlip: false,
  }

  useEffect(() => console.log('codes: ',codes), [codes])

  useEffect(() => {
    let html5QrCode
    if(showScanner){
     Html5Qrcode.getCameras().then((devices) => {
       html5QrCode = new Html5Qrcode('qrcode-scanner')
       console.log(html5QrCode)
       if (devices && devices.length) {
         html5QrCode.start(
           { facingMode: 'environment' },
           config,
           (value) => {
             console.log('Add tag Modal barcode result ===> ', value)
             handleAddCodes(value)
             // setOpenScanner(false)

           }
         )
       }
     })
    }
  },[showScanner])
  return (
    <>
      <div className="barcode-cont">
        <h1>barcode</h1>
        <button className='btn-scanner' onClick={handleShow}>ver juanito</button>
        <br />


        {
          showScanner ?
            <div id='qrcode-scanner' />
            :
            ''
        }



      </div>

      <section className='codes-cont'>
      {
        codes.map((code, i) => (
          <p key={i}>{code}</p>
        ))
      }
      </section>

    </>
  )
}

export default App
