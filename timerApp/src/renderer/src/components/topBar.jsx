import React from 'react'

export default function topBar() {
    const handelCloseClick=()=>{
        window.electron.ipcRenderer.send("close-window")

    }
    const handelMinimiseClick=()=>{
        window.electron.ipcRenderer.send("minimize-window")

    }
  return (
    <div>
        <div className='rounded-t-xl bg-blue-400 w-screen h-5 ' style={{
            webkitAppRegion:"drag"
        }}></div>
        <div className='bg-blue-400 h-5'></div>
        <div className='absolute top-1  right-0 text-stone-200 pe-2' id='controll-Button'>
        <button id='minimise' onClick={handelMinimiseClick} style={{margin:"5px"}}>&#128469;</button>
        <button id='close ' onClick={handelCloseClick} className='p-1'>	&#x2715;</button>
        <div></div>
        
        </div>
       
    </div>
  )
}
