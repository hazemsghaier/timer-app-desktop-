
import TopBar from './components/topBar'
import { useEffect, useState } from 'react'
import Timer from './components/Timer'
function App() {
  const [isOverLay,setisOverLay]=useState(false)
  
    window.electron.ipcRenderer.on("overlay-channel",(e,args)=>{
      setisOverLay(args)
     }) 

 
   
  return (
    <div   >
      <div className={!isOverLay ? "visible" : "invisible"}>
      <TopBar />
      </div>
  
       <div className='bg-black bg-opacity-80 p-2 rounded-b-xl full-window'>
       <Timer isOverLay={isOverLay} />
       </div>
       
    </div>
  )
}

export default App

