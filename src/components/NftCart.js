import React, { useEffect , useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { LikesCount } from '../helpers/LikesCount'
import { PlaceBidPopupAction , BuyPopupAction, PlaceBidNftAction , BuyNftAction } from '../actions/nftActions'
import Likes from './Likes'
import GetHighestBidIndex from '../helpers/GetHighestBidIndex'
import { singleUser } from '../actions/userActions'
import FetchCreator from '../helpers/FetchCreator'
import axios from 'axios'
import TimeCounter from './TimeCounter'
import CurtainBtn from '../helpers/CurtainBtn'
function NftCart(props) {
    const {nft} = props
	const dispatch = useDispatch()
    const [highestBidIndex , setHighestBidIndex] = useState(0)
    const [creator , setCreator] = useState()
    const userList = useSelector(state => state.userList)
	const {loading:loadingUsers , users} = userList
    const cartHoverAnimation = useRef()
	const q = gsap.utils.selector(cartHoverAnimation)
    var screen = window.matchMedia("(max-width: 992px)")
	const [deviceChange , setDeviceChange] = useState(screen)
    useEffect(()=> {
        const cardDiv = cartHoverAnimation.current
     

       
        cardDiv.addEventListener("mouseenter", () => {
           
           const anim1 = gsap.fromTo(q("svg rect.color"),{
                strokeDashoffset:1550,
 
              
            },
            {
                strokeDashoffset:-1550,
 
              duration:1.3,
                stagger:0.15,
                ease:"power3.out"
            })
           
            // const anim2 = gsap.to(q("svg rect.color"),{
            //     strokeDashoffset:-1550,
            //   duration:1.5,
            //      delay:0.6,
            //      stagger:-0.05,
            //        ease:"power3.out"
            // })
            
        })
        cardDiv.addEventListener("mouseleave", () => {
            // const carttest = document.querySelectorAll("svg rect.color")
            // gsap.to(carttest,
            // {
            //     strokeDashoffset:-1550,
            //     duration:1.5,
                
               
            // })
               
        })
    
        
    },[screen])
 
    // useEffect(() => {
        // const mouseCircle = document.querySelector(".mouse-circle")
        // const mouseText = document.querySelector(".mouse-text")
        // gsap.set(q(".button-place-bid") , {y:"30px", duration:0})
    // const cart = document.querySelector('#a'+props.nft._id + ' .card-nft-image')

        // cart.addEventListener("mouseenter", () => {
        //     // gsap.to(q(".button-place-bid") , {opacity:1, duration:0})
        //     // gsap.to(q(".button-place-bid") , {y:"0px", duration:0})
        //     gsap.to(mouseCircle, {
        //         duration: 0.3 ,
        //         scale: 8,
        //         backgroundColor: "rgba(0, 0, 0, 0.4)",
        //         backdropFilter: "blur(8px)"
        //       })
        //       gsap.set(mouseText, {
        //         opacity: 1,
        //         color:"white"
        //       })
        //  })
    //     cart.addEventListener("mouseleave", () => {
    //         // gsap.to(q(".button-place-bid") , {opacity:0,duration:0})
    //         // gsap.to(q(".button-place-bid") , {y:"30px", duration:0})
    //         gsap.to(mouseCircle, {
    //             duration: 0.3 ,
    //             scale: 1,
    //             backgroundColor: "white",
    //             backdropFilter: "blur(8px)"
    //           })
    //           gsap.set(mouseText, {
    //             opacity: 0,
    //             color:"black"
              
    //           })

    // } )
   
    // },[])
    // useEffect(() => {

    //     const FetchCreator = async () => {
    //         const {data} = await axios.get(`/api/users/${nft.creator}`)
    //         setCreator(data)
    //         return data
    //     }
    // FetchCreator()
    
    // },[])
    useEffect(() => {
		// console.log("1" , nft , nft.bids);
		if(nft.bids){


			setHighestBidIndex(GetHighestBidIndex(nft.bids));

		}
		return () => {
			setHighestBidIndex(0)
		}
	},[nft.bids])
    useEffect(() => {
		const user = users.find(u => u._id == nft.creator)
		setCreator(user)

	},[users,nft])
    const BidAndBuyClickHandler = (e, bool) => {
        if(bool){
            dispatch(PlaceBidPopupAction(true))
            dispatch(PlaceBidNftAction(nft._id))
        }else{
            dispatch(BuyPopupAction(true))
            dispatch(BuyNftAction(nft._id))

            
        }
        e.preventDefault();

    }
    if(!nft.bids){

    }else {



    return (
        <div className="slider-item todays-pick-card  my-cart-padding" ref={cartHoverAnimation}>
         
<div className="sc-card-product back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg" id={"a"+props.nft._id}>
<svg className='card-border-svg'>
      <rect rx="20" ry="20" className="color green">
        
      </rect>
      <rect rx="20" ry="20" className="color blue">
      </rect>
      <rect rx="20" ry="20" className="color red">
      </rect>
      
      <rect rx="20" ry="20" className="color yellow">
      </rect>
{/*       
      <rect rx="25" ry="25" class="back-color">
      </rect> */}
      </svg>
<div className="card-media active">
<Link to={`/artdetail/${props.nft._id}`}>
<img className="card-nft-image card-nft-hover-img" src={props.nft.image} alt="Image" />

    <img className="card-nft-image" src={props.nft.image} alt="Image" />
    
</Link>
<Likes likes={props.nft.likes} />
{
    props.nft.is_auction ? 
    (<div className="featured-countdown back-blur back-glass-effect back-glass-darker">
    <span className="slogan">
    {/* <i className="ri-fire-fill"></i> */}
    <img src="/img/icons/preload.png" />
    </span>
    {/* <span className="js-countdown" data-timer="81640" data-labels=" :  ,  : , : , "><div aria-hidden="true" className="countdown__timer"><span className="countdown__item" style={{display: "none"}}><span className="countdown__value countdown__value--0 js-countdown__value--0">0</span><span className="countdown__label">:</span></span><span className="countdown__item"><span className="countdown__value countdown__value--1 js-countdown__value--1">22</span><span className="countdown__label">:</span></span><span className="countdown__item"><span className="countdown__value countdown__value--2 js-countdown__value--2">18</span><span className="countdown__label">:</span></span><span className="countdown__item"><span className="countdown__value countdown__value--3 js-countdown__value--3">46</span><span className="countdown__label"></span></span></div></span> */}
    <TimeCounter time={props.nft.auction.auction_time} />
    </div>):
    ""
}

{/* <div className="button-place-bid ">
<a   onClick={(e) => BidAndBuyClickHandler(e , props.nft.is_auction) } href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span><i className="ri-shopping-bag-fill"></i> {props.nft.is_auction ? 'Place Bid' : 'Buy Now'}</span></a>
</div> */}
</div>
<div className="card-title">
<h5 className="style2"><Link to={`/artdetail/${props.nft._id}`}>"{props.nft.name}"</Link></h5>
{/* <div className="tags">bsc</div> */}
<Link to={`/artdetail/${props.nft._id}`} >
<div className='nft-buy-btn-div'>
<CurtainBtn mode="nft-card-buy-btn-color"/>
    Buy
</div>
</Link>
</div>
<div className="meta-info">
<div className="author">
<div className="avatar">
<Link to={creator ? `/creators/${creator._id}` : ""}>
<img src={creator ? creator.avatar : ""} alt="Image" />
</Link>
</div>
<div className="info">
<span>Creator</span>
<h6> <Link to={`/creators/${creator ? creator._id : ""}`}>{creator ? creator.name : ""}</Link> </h6>
</div>
 </div>
<div className="price">
<span>{props.nft.is_auction ? "Current Bid" : "Price"}</span>

<h5>{nft.is_auction ? nft.bids[GetHighestBidIndex(nft.bids)].bid_price  : nft.price} ETH</h5>

</div>
</div>
</div>
</div>
    )
}
}

export default NftCart
