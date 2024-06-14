import React from 'react'

export default function Input({label,value,onChange,placeHolder}) {
  return (
    <div className='text-3xl'>
        <label className='text-stone-200' >{label}</label>
        <input type="number" value={value} onChange={onChange} placeholder={placeHolder} min="0" className='w-20 bg-transparent text-blue-400'/>
    </div>
  )
}
