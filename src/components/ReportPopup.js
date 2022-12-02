import React, { useState } from 'react';

const ReportPopup = (props) => {
    const {show , exit} = props
  return (
      <>
    <div className={show ? "modal  popup show" : "modal fade popup"} id="popup_report" tabIndex="-1" role="dialog" style={show ? {paddingRight: "16px", display: "block"} : {paddingRight: "16px", display: "none"}} aria-modal="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content back-blur back-glass-effect">
            <button type="button" className="close back-blur back-glass-effect" data-dismiss="modal" aria-label="Close" onClick={() => exit()}>
                <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-20 p-40">

                <h3>Report this item</h3>
                <div className="hr"></div>
                <div className="form-group space-y-10">
                    <span className="variationInput">reason:</span>
                    <select className="form-select custom-select" aria-label="Default select example">
                        <option> Select a reason</option>
                        <option>Purchase</option>
                        <option>Support</option>
                        <option>Technique</option>
                        <option>Service Request</option>
                    </select>
                </div>
                <div className="form-group space-y-10">
                    <span className="variationInput">Additional comments:</span>
                    <textarea name="..." cols="30" rows="10" placeholder="Explain why you are concerned about it."></textarea>
                </div>
                <a href="" className="btn btn-dark"> Report</a>
            </div>
        </div>
    </div>
</div>
<div className={ show ? "modal-backdrop fade show": "modal-backdrop fade"} style={show ? {display: "block"} : {display: "none"}}></div>
</>
  );
};

export default ReportPopup;
