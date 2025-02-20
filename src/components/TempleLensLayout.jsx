import React from 'react'
import TextureSelector from './TextureSelector'
import { Color, Material } from 'three/webgpu'
import ColorSelector from './ColorSelector'
import PropertirsSelctor from './PropertiesSelector'
import MaterialProperties from './PropertiesSelector'

function TempleLensLayout() {
  return (
    <div className='w-full gap-3'>
        <div className="wrap my-3 text-lg text-white font-bold"><TextureSelector  /></div>
        <div className="wrap my-3 text-lg text-white font-bold"><ColorSelector  /></div>
        <div className="wrap my-3 text-lg text-white font-bold"><MaterialProperties  /></div>
        
    </div>
  )
}

export default TempleLensLayout