import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { LikesCount } from '../helpers/LikesCount';
import { useSelector, useDispatch } from 'react-redux'
import { PlaceBidPopupAction } from '../actions/nftActions';
import Likes from './Likes';
import GetHighestBidIndex from '../helpers/GetHighestBidIndex';
import { PlaceBidNftAction } from '../actions/nftActions';
import axios from 'axios';
import TimeCounter from './TimeCounter';
const TopGalleryCart = (props) => {
    const {nft} = props
    const [highestBidIndex , setHighestBidIndex] = useState(0)
    const [creator , setCreator] = useState()
    const userList = useSelector(state => state.userList)
	const {loading:loadingUsers , users} = userList
    const dispatch = useDispatch()
    useEffect(() => {
        setHighestBidIndex(GetHighestBidIndex(nft.bids))
    },[])
    // useEffect(() => {

    //     const FetchCreator = async () => {
    //         const {data} = await axios.get(`/api/users/${nft.creator}`)
    //         setCreator(data)
    //     }
	// 	if(nft.creator){
	// 		FetchCreator()

	// 	}
    
    // },[nft])
    useEffect(() => {
		const user = users.find(u => u._id == nft.creator)
		setCreator(user)

	},[users])
  return (
    <div className="card__item auction_card three back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg">
    <div className="card_body  space-y-10">
        
        <div className="card_head">
            <Link to={`/artdetail/${nft._id}`}>
            <img className="card-nft-image card-nft-auction-hover-img" src={nft.image} alt="" />

                <img className="card-nft-image" src={nft.image} alt="" />
            </Link>

            {/* <a href="#" className="likes space-x-3">
                <i className="ri-heart-3-fill"></i>
                <span className="txt_sm">{LikesCount(nft.likes)}</span>
            </a> */}
            <Likes likes={nft.likes}/>
            {/* <div className="action">
                <a href="#" onClick={(e) => {dispatch(PlaceBidPopupAction(true)); e.preventDefault();dispatch(PlaceBidNftAction(nft._id))}} className="btn btn-primary btn-sm
                    btn_auction" data-toggle="modal" data-target="#popup_bid">
                    <i className="ri-auction-line color_white"></i> Place Your Bid
                </a>
            </div> */}
        </div>
        
        
        <div className="card_footer d-block space-y-10">
        <div className="meta-info">
<div className="author">
<div className="avatar">
<Link to={creator ? `/creators/${creator._id}` : ""}>
<img   src={creator ? creator.avatar : ""} alt="Image" />
</Link>
</div>
<div className="info">
<span>by <Link to={`/creators/${creator ? creator._id : ""}`}>{creator ? creator.name : ""}</Link></span>
<h6> {nft.name.length >=14 ? nft.name.slice(0,14) + "..."   : nft.name} </h6>
{/* {creator._id ? creator._id.slice(0,14) + "..." : null} */}
</div>
 </div>
<div className="price">
<span>{props.nft.is_auction ? "ends in" : "Price"} <img src="img/icons/fire-icon-amir.svg" /></span>

<h6>{nft.is_auction ? <TimeCounter time={nft.auction.auction_time}/>  : null}</h6>

</div>
</div>
<div className="place-bid-card-footer-div">
    <div className="footer-bid-price-div">
        <p>highest bid</p>
        <h6>{nft.is_auction ? nft.bids[GetHighestBidIndex(nft.bids)].bid_price  : nft.price} ETH</h6>
    </div>
    <div className="footer-place-bid-btn-div">
        <a href="#" onClick={(e) => {dispatch(PlaceBidPopupAction(true)); e.preventDefault();dispatch(PlaceBidNftAction(nft._id))}} className="btn btn-primary btn-sm
                    btn_auction" data-toggle="modal" data-target="#popup_bid">
                    Place Your Bid
                </a>
    </div>
</div>
        </div>
    </div>
</div>
  );
};

export default TopGalleryCart;
