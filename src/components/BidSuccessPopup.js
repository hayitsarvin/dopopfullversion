import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const BidSuccessPopup = (props) => {
	const [open , setOpen] = useState(props.open)
	
    return (
		<>
        <div className={open ? "modal  popup show" : "modal fade popup " } id="popup_bid_success" tabIndex="-1" style={open ? {display: "block", paddingRight: "16px"} : {display: "none", paddingRight: "16px"}} aria-modal="true" role="dialog">
			    <div className="modal-dialog modal-dialog-centered" role="document">
			        <div className="modal-content back-blur back-glass-effect">
			            <button onClick={() => {props.exit(); setOpen(false)}} type="button" className="close back-blur back-glass-effect" data-dismiss="modal" aria-label="Close">
			                <span aria-hidden="true">×</span>
			            </button>
			            <div className="modal-body  space-y-20 p-40">
			                <h3 className="text-center">Your Bidding
			                    Successfuly Added</h3>
			                <p className="text-center">your bid <span className="color_text txt
			                        _bold">({props.bidPrice} ETH) </span> has been listing
			                    to our database</p>
			
			                <Link to="/explore" onClick={() => {props.exit(); setOpen(false)}} className="btn btn-dark w-full"> Watch Other Arts</Link>
			            </div>
			        </div>
			    </div>
			</div>
			<div className={ open ? "modal-backdrop fade show": "modal-backdrop fade"} style={open ? {display: "block"} : {display: "none"}}></div>
			</>
    )
}

export default BidSuccessPopup
