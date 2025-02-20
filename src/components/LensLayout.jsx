import React from 'react'
import ColorSelector from './ColorSelector'
import MaterialProperties from './PropertiesSelector'

function LensLayout() {
  return (
    <div className='w-full gap-3'>
        <div className="wrap my-3 text-lg text-white font-bold"><ColorSelector  /></div>
        <div className="wrap my-3 text-lg text-white font-bold"><MaterialProperties  /></div>
        
    </div>
  )
}

export default LensLayout