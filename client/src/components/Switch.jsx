import React, { useState } from 'react'

function Switch(props) {
    const { label, onToggleCallback } = props
    const [ isOn, setIsOn ] = useState(false)
    const handleToggle = () => {
        onToggleCallback(!isOn)
        setIsOn(!isOn)
    }

    return (
        <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitches'
          checked={isOn}
          onChange={handleToggle}
          readOnly
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
          {label}
        </label>
      </div>
    )
}

export default Switch
