import React,{useEffect , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlaceBidPopupAction } from '../actions/nftActions'
import GetHighestBidIndex from '../helpers/GetHighestBidIndex'
import BidSuccessPopup from './BidSuccessPopup'
import Loading from './Loading'
const PlaceBidPopup = () => {
	const dispatch = useDispatch()
	const placeBidPopup = useSelector(state => state.placeBidPopup)
	const {open} = placeBidPopup
	const [bidAmount , setBidAmount] = useState(0.0)
	const [serviceFee , setServiceFee] = useState(0.60)
	const [openSuccess , setOpenSuccess] = useState(false)
	const placeBidNft = useSelector(state => state.placeBidNft)
	const {loading , nft} = placeBidNft


	if(open){


    return (
		<>
        <div className={open ? "modal  popup show" : "modal fade popup "} id="popup_bid" tabIndex="-1" role="dialog"  aria-modal="true">
			    <div className="modal-dialog modal-dialog-centered" role="document">
			        <div className="modal-content back-blur back-glass-effect">
			            <button type="button"  className="close back-blur back-glass-effect" data-dismiss="modal" aria-label="Close" onClick={() => dispatch(PlaceBidPopupAction(false))}>
			                <span aria-hidden="true">×</span>
			            </button>
			            <div className="modal-body space-y-20 p-40">
			                <h3>Place a Bid</h3>
			                <p>You must bid at least <span className="color_black">{loading ? "...": nft.bids[GetHighestBidIndex(nft.bids)].bid_price} ETH</span>
			                </p>
			                <input onChange={e => setBidAmount(e.target.value)} type="text" className="form-control" placeholder="00.00 ETH" />
			
			                {/* <p>Enter quantity. <span className="color_green">5 available</span>
			                </p>
			                <input type="text" className="form-control" value="1" /> */}
			                <div className="hr"></div>
			                <div className="d-flex justify-content-between">
			                    <p> You must bid at least:</p>
			                    <p className="text-right color_black txt _bold">{loading ? "..." : nft.bids[GetHighestBidIndex(nft.bids)].bid_price} ETH </p>
			                </div>
			                <div className="d-flex justify-content-between">
			                    <p> service fee:</p>
			                    <p className="text-right color_black txt _bold"> {serviceFee} ETH </p>
			                </div>
			                <div className="d-flex justify-content-between">
			                    <p> Total bid amount:</p>
			                    <p className="text-right color_black txt _bold"> {(Number(bidAmount) + Number(serviceFee))} ETH </p>
			                </div>
			                <a href="" className="btn btn-primary w-full" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close" onClick={e => {setOpenSuccess(true) ;e.preventDefault();dispatch(PlaceBidPopupAction(false)) }}> Place a bid</a>
			            </div>
			        </div>
			    </div>
			</div>
			<div className={ open ? "modal-backdrop fade show": "modal-backdrop fade"} style={open ? {display: "block"} : {display: "none"}}></div>
			
			</>
    )
}else{
	return (
		<>
			{ openSuccess ? <BidSuccessPopup open={openSuccess} exit={() => {setOpenSuccess(false)}}  bidPrice={bidAmount}/> : null}

		</>
	)
}
}

export default PlaceBidPopup
