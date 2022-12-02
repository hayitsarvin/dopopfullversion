import React, { useState } from 'react'

const SiteLoader = (props) => {
  
  return (
    <div className="loader-div">
        <h1 className="loader-progress-bar">{Math.round(props.imageLoaded)}</h1>
        <div className="loader-change-color-div">

        </div>
    </div>
  )
}

export default SiteLoader