import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BuyPopupAction } from '../actions/nftActions';

const BuyPopup = () => {
    const dispatch = useDispatch()
    const [buyQty , setBuyQty] = useState(1)
    const BuyPopup = useSelector(state => state.buyPopup)
	const [serviceFee , setServiceFee] = useState(0.60)

	const {open} = BuyPopup
    const buyNft = useSelector(state => state.buyNft)
	const {loading , nft} = buyNft

  return (
      <>
    <div className={open ? "modal  show  popup " : "modal fade  popup"} id="popup_buy" tabIndex="-1" role="dialog" style={open ? {paddingRight: "16px" , display: "block" } : {display: "none"}} aria-modal="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content back-blur back-glass-effect">
            <button type="button " className="close back-blur back-glass-effect" data-dismiss="modal" aria-label="Close" onClick={() => dispatch(BuyPopupAction(false))}>
                <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-20 p-40">
                <h3 >Checkout
                </h3>
                <p>You are about to purchase a <span className="color_black">{nft.name}</span>
                    {/* <span className="color_black">Lona</span> */}
                </p>
                {/* <div className="space-y-10">
                    <p>You pay
                    </p>
                    <input type="text" className="form-control" placeholder="00.00 ETH" />
                </div> */}
                {/* <div className="space-y-10">
                    <p>Enter quantity. <span className="color_green">5 available</span>
                    </p>
                    <input type="text" className="form-control" onChange={(e) => setBuyQty(e.target.value)} />
                </div> */}

                {/* <div className="hr"></div> */}
                <div className="d-flex justify-content-between pt-50">
                    <p> Items Price:</p>
                    <p className="text-right color_black txt _bold"> {nft.price * buyQty} ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p> service free:</p>
                    <p className="text-right color_black txt _bold">{(serviceFee * buyQty).toFixed(2)} ETH </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p> Total Price To Pay:</p>
                    <p className="text-right color_black txt _bold"> {((nft.price * buyQty) + (serviceFee * buyQty)).toFixed(2)} ETH </p>
                </div>
                <a href="/login" className="btn btn-primary
                    w-full" aria-label="Close">
                    Add funds</a>
            </div>
        </div>
    </div>
</div>
<div className={ open ? "modal-backdrop fade show": "modal-backdrop fade"} style={open ? {display: "block"} : {display: "none"}}></div>
</>
);
};

export default BuyPopup;
