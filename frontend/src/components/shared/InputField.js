import React from 'react'

function InputField({label,placeholder, value, setValue}) {
  return (
    <div className='flex flex-col space-y-2 w-full mt-6'>
        <label for={placeholder} className='font-semibold flex justify-start'>{label}</label>
        <input type="text" placeholder={placeholder} className='border-2 border-gray-500 rounded p-2 placeholder-slate-600' id={placeholder} value={value} onChange={(e)=>{setValue(e.target.value);}}/>
    </div>
  )
}

export default InputField