import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const PrivacyCheck = () => {
  const [clicked , setClicked] = useState(false)
  return (
    <div className="privacy-check-div" onClick={()=> setClicked(prev => !prev)}>
        <span class="checkmark"  style={{backgroundColor: "transparent"}}><span className="inner-ckeck" style={clicked ? {backgroundColor: "white"} : {backgroundColor: "transparent"}}></span></span>

        <p >I have read and accept the <Link to="/privacy">Privacy Policy</Link></p>
{/* <div class="toggle-button-cover">
      <div class="button-cover">
        <div class="button r" id="button-9">
          <input type="checkbox" class="checkbox" />
          <div class="knobs">
            <span></span>
          </div>
          <div class="layer"></div>
        </div>
      </div>
    </div> */}

    </div>
  )
}

export default PrivacyCheck