import React from 'react'

function PasswordField({label,placeholder, value, setValue}) {
  return (
    <div className='flex flex-col space-y-2 w-full mt-6'>
        <label for={placeholder} className='font-semibold flex justify-start'>{label}</label>
        <input type="password" placeholder={placeholder} className='border-2 border-gray-500 rounded p-2 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 '  id={placeholder} value={value} onChange={(e)=>{setValue(e.target.value);}}/>
    </div>
  )
}

export default PasswordField