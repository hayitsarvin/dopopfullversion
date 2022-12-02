import React from 'react'
import { Link } from 'react-router-dom'

const RegisterMessagePopup = (props) => {
    const open = props.RegisterOpen
    return (
      <>
        
      <div className={open ? "modal  popup show" : "modal fade popup"} id="popup_error" tabIndex="-1" role="dialog" style={open ? {paddingRight: "16px", display: "block"}: {paddingRight: "16px", display: "none"}} aria-modal="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content back-blur back-glass-effect">
                          <button type="button" onClick={() => props.exit()} className="close back-blur back-glass-effect" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                          </button>
                          <div className="modal-body space-y-20 p-40">
                              <h3 className="color_green">Error!</h3>
                              <p>Your Account is created successfully... <br/>
                              Please login</p>
              
                              <Link to="/login" className="btn btn-primary">Login</Link>
                          </div>
                      </div>
                  </div>
              </div>
              <div className={ open ? "modal-backdrop fade show": "modal-backdrop fade"} style={open ? {display: "block"} : {display: "none"}}></div>
  
          </>
    )
}

export default RegisterMessagePopup