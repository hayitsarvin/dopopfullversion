import React,{useState , useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlaceBidNftAction, singleNft } from '../actions/nftActions'
import { useParams } from 'react-router'
import PlaceBidPopup from '../components/PlaceBidPopup'
import { PlaceBidPopupAction } from '../actions/nftActions'
import { LikesCount } from '../helpers/LikesCount'
import Likes from '../components/Likes'
import GetHighestBidIndex from '../helpers/GetHighestBidIndex'
import axios from 'axios'
import ReportPopup from '../components/ReportPopup'
import TimeCounter from '../components/TimeCounter'
import { BuyPopupAction  } from '../actions/nftActions'
import { BuyNftAction } from '../actions/nftActions'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import useLoco from '../hooks/useLoco'
import CurtainBtn from '../helpers/CurtainBtn'
import { useAppContext } from '../contexts/appcontext'
var closeOrderTap ;
function useOutsideAlerter(ref) {
	// console.log(ref)
	useEffect(() => {
	  /**
	   * Alert if clicked on outside of element
	   */
	  function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
		//   alert("You clicked outside of me!");

		  closeOrderTap(ref.current)
		  
		// openHam = false

		}
	  }
	  // Bind the event listener
	  document.addEventListener("mousedown", handleClickOutside);
	  return () => {
		// Unbind the event listener on clean up
		document.removeEventListener("mousedown", handleClickOutside);
	  };
	}, [ref]);
  }
const ArtDetail = () => {
	closeOrderTap = (e) => {
		


		if(e.className == "more"){
			setReportModal(false)

		}else{
			setShareModal(false)

		}

		// setReportModal(false)
	}
	const { isMobile } = useAppContext();

	const {id}= useParams()
	// var screen = window.matchMedia("(max-width: 992px)")
	// const [deviceChange , setDeviceChange] = useState(screen.matches)

	const dispatch = useDispatch()
	const nftSingle = useSelector(state => state.singleNft)
	const {loading , nft} = nftSingle
	const userList = useSelector(state => state.userList)
	const {loading:loadingUsers , users} = userList
	const [highestBid , setHighestBid] = useState(0)
	const [activeTab , setActiveTab] = useState("details")
    const [creator , setCreator] = useState()
    const [authenticityModal , setAuthenticityModal] = useState(false)
    const [reportModal , setReportModal] = useState(false)
    const [reportPopupShow , setReportPopupShow] = useState(false)
    const [shareModal , setShareModal] = useState(false)
    const [highestBider , setHighestBider] = useState()
	// useEffect(() => {
	// 	window.addEventListener('resize', () => {

	// 		screen = window.matchMedia("(max-width: 992px)")
	// 		if(deviceChange === screen.matches){
			
	// 		}else{
	// 			setDeviceChange(prev => screen.matches)
				
	// 		}
	// 	}
	// 	);
		
	// },[screen])

	useEffect(() => {
		dispatch(singleNft(id))
			
		
		

	}, [dispatch])
	useEffect(() => {
		if(!loading){
			const user = users.find(u => u._id == nft.creator)

			setCreator(user)
		}

	},[loading])
	const getUser = (id) => {
		// console.log("54545445")
		const user = users.find(u => u._id === id);
		// console.log(user)
		setHighestBider(user)
	}
	useEffect(() => {
		// console.log("1" , nft , nft.bids);
		if(nft.bids){


			setHighestBid(GetHighestBidIndex(nft.bids));
			getUser(nft.bids[GetHighestBidIndex(nft.bids)].user)
		}
		return () => {
			setHighestBid(0)
		}
	},[loading])
	const shareDivRef = useRef(null);
	const reportDivRef = useRef(null);
	useOutsideAlerter(shareDivRef);
	useOutsideAlerter(reportDivRef);
	// setTimeout(() => {
	// 	useLoco()

	//   }, 1000);

	if(loading){
		return (
			<>
			<div id="viewport" data-scroll-container>

			<Loading />
			<Footer />
			</div>
			</>
		)
	}else {

	if(isMobile){
		return (
			<div id="viewport" data-scroll-container>
			<div className="art-detail-page-mobile" >
		

					<div className="share-more-btns-div">
				<div className="container">
				<div className="container">

			<div className="share" ref={shareDivRef}>
													<div className="icon"  onClick={() => setShareModal(prev => !prev)}>
														<i className="ri-share-line"></i>
														
													</div>
													<div className={shareModal ? "dropdown__popup visible" : "dropdown__popup"}>
														<ul className="space-y-10">
															<li> <a href=""> <i className="ri-facebook-line"></i>
																</a>
															</li>
															<li> <a href=""> <i className="ri-messenger-line"></i>
																</a>
															</li>
															<li> <a href=""> <i className="ri-whatsapp-line"></i>
																</a>
															</li>
															<li> <a href=""> <i className="ri-youtube-line"></i>
																</a>
															</li>
														</ul>
													</div>
												</div>
												<div className="more" ref={reportDivRef}>
													<div className="icon" onClick={() => setReportModal(prev => !prev)}>
														<i className="ri-more-fill"></i>
														
													</div>
													<div className={reportModal ? "dropdown__popup visible" : "dropdown__popup"}>
														<ul className="space-y-10">
															<li>
																<a href="#" onClick={(e) => {setReportPopupShow(true);e.preventDefault()}}  className="space-x-10
																	d-flex">
																	<i className="ri-flag-line"></i>
																	<span> Report </span>
																</a>
															</li>
														</ul>
													</div>
												</div>
											
												</div>
												</div>
												</div>
				<div className="image-info-mobile">
				<div className="art-image-div-mobile">
					<img src={nft.image_s} />
				</div>
				<div className="art-info-div-mobile space-y-50 container">
					<div className="name-like-div container">
						<h2>{nft.name ? nft.name.slice(0 , 15) + "..." : nft.name}</h2>
						<Likes likes={nft.likes} />
						
					</div>
					<div className="price-info-div container">
					<div className="numbers">
									<div className="row">
										<div className="col-4 ">
											<div className="space-y-5">
												<p className="color_text">price</p>
												<h4>{ nft.price }<span className="txt_sm color_text"> ETH</span></h4>
											</div>
										</div>
										<div className="col-4 ">
											<div className="space-y-5">
												<p className="color_text">Ends in</p>
												<h4><TimeCounter time={nft.auction ? nft.auction.auction_time : null}/></h4>
											</div>
										</div>
										<div className="col-4 ">
											<div className="space-y-5">
												<p className="color_text">highest bid</p>
												<h4 className="text-blue-color">{nft.bids ? nft.bids[highestBid].bid_price : null }<span className="txt_sm color_text"> ETH</span></h4>
											</div>
										</div>
										
										
									</div>
								</div>
					</div>
					<div className="art-btns-mobile container">
						<a className="btn art-btn-mobile art-bid-btn" onClick={(e) => {dispatch(BuyPopupAction(true)); e.preventDefault(); dispatch(BuyNftAction(nft._id)) }}>Bid</a>
						<a className="btn art-btn-mobile art-buy-btn" onClick={(e) => {dispatch(BuyPopupAction(true)); e.preventDefault(); dispatch(BuyNftAction(nft._id)) }}>Buy {nft.price} ETH</a>

					</div>
				</div>
				</div>
				<div className="art-extra-info-div-mobile container">
				<div className="container">

						<div className="tabs-div ">
									{/* <div className="space-y-20"> */}
										{/* <div className="d-flex justify-content-between mb-30_reset"> */}
											<ul className="nav nav-tabs d-flex space-x-10 " role="tablist">
											<li className="nav-item btn-one"  onClick={(e) => setActiveTab((e.target.innerText).toLowerCase()) }>
													<a className={activeTab == "about" ? "btn tabs-btn btn-sm active" : "btn tabs-btn btn-sm"} data-toggle="tab"  href="" onClick={(e) => e.preventDefault()} role="tab">
														About</a>
												</li>
												<li className="nav-item btn-one"  onClick={(e) => setActiveTab((e.target.innerText).toLowerCase()) }>
													<a className={activeTab == "details" ? "btn tabs-btn btn-sm active" : "btn tabs-btn btn-sm"} data-toggle="tab"  href="" onClick={(e) => e.preventDefault()} role="tab">
														Details</a>
												</li>
												<li className="nav-item btn-two"  onClick={(e) => setActiveTab((e.target.innerText).toLowerCase()) }>
													<a className={activeTab == "bids" ? "btn tabs-btn btn-sm active" : "btn tabs-btn btn-sm"} data-toggle="tab" href="" onClick={(e) => e.preventDefault()}  role="tab">
														Bids</a>
												</li>
												{/* <li className="nav-item">
													<a className="btn btn-white btn-sm" data-toggle="tab" href="" role="tab">
														History</a>
												</li> */}
											</ul>
											
											{/* <div className="dropdown d-none d-sm-block">
												<button className="btn btn-white btn-sm
													dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													Recent Active
												</button>
												<div className="dropdown-menu">
													<a className="dropdown-item" href="#">Action</a>
													<a className="dropdown-item" href="#">Another
														action</a>
													<a className="dropdown-item" href="#">Something
														else here</a>
												</div>
											</div> */}
										{/* </div> */}
										
								
									{/* </div> */}
									</div>
								</div>
								<div className="tab-content mt-5 container">
											<div className={activeTab == "about" ? "tab-pane active space-y-20" : "tab-pane space-y-20 "}>
												<p className="about-art-dis">{nft.dis}</p>
											</div>
											<div className={activeTab == "details" ? "tab-pane active space-y-20 " : "tab-pane space-y-20 "} id="tabs-1" role="tabpanel">
											<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
															<a href="#">
																<img src="/img/avatars/non-avt.png" alt="Avatar" className="avatar
																	avatar-md"/>
															</a>
														</div>
														<div>
															<p className="details-name"><span>Highest bid by</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{highestBider ? highestBider.name : null }</p>
														</div>
													</div>
												</div>
												<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
														<Link to={creator ? "/creators/"+creator._id : "#"}>
																<img src={creator ? creator.avatar : null} alt="Avatar" className="avatar
																	avatar-md"/>
															</Link>
														</div>
														<div>
															<p className="details-name"><span>Creator</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{creator ? creator.name : null }</p>
														</div>
													</div>
												</div>
												<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
														<Link to={creator ? "/creators/"+creator._id : "#"}>

																<img src={creator ? creator.avatar : null} alt="Avatar" className="avatar
																	avatar-md"/>
															</Link>
														</div>
														<div>
															<p className="details-name"><span>Owner</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{creator ? creator.name : null }</p>
														</div>
													</div>
												</div>
												<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
															<a href="#">
																<img src="/img/logos/eth_logo.png" alt="Avatar" className="avatar
																	avatar-md"/>
															</a>
														</div>
														<div>
															<p className="details-name"><span>Blockchain</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">Etherium</p>
														</div>
													</div>
												</div>
											</div>
											<div className={activeTab == "bids" ? "tab-pane space-y-20 active" : "tab-pane space-y-20"} id="tabs-2" role="tabpanel">
												{nft.bids ? (
													nft.bids.map(bid => {
														const bider = users.find(u => u._id === bid.user)
														
														if(bider){
														return(
											
	
															<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
															{/* <div className="badge">
																<img src="/img/icons/Badge.svg" alt="" />
															</div> */}
																														<Link to={bider ? "/creators/"+bider._id : "#"}>

																<img src={bider.avatar} alt="Avatar" className="avatar
																	avatar-md"/>
															</Link>
														</div>
														<div>
															<p className="biders-name"><span>{bider.name}</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{bid.bid_price } ETH</p>
														</div>
													</div>
												</div>
												
														)
															}
													})
												) : <p>No active bids yet. Be the first to make
												a bid!</p>}
												
											</div>
												
											
										
										</div>
						
				</div>

			</div>
			<Footer />
			</div>
		)
	}else{

		return (
			<div id="viewport" data-scroll-container>
			{/* <div > */}
			{reportPopupShow ? (
			<ReportPopup show={true} exit={() => setReportPopupShow(false)}/>
	
			): ""}
			<PlaceBidPopup />
			{
				loading ? <Loading /> :
				(<div className="container item_details_page">
				{/* <a href="/" className="btn btn-white btn-sm my-40">
					Back to home
				</a> */}
				<div className="item_details">
					<div className="row sm:space-y-20">
						<div className="col-lg-5 my-col-lg-5" >
							<img className="item_img" src={nft.image_s} alt="" />
						</div>
						<div className=" col-lg-7 my-col-lg-7 right-side-div">
						<div className=" nft-info-left">
							<div className="space-y-20 info-inner-div">
							{/* {
									screen.matches ? (
										<>
										<div className="name-like-item">
								<h3>{nft.name}</h3>
	
								<Likes likes={nft.likes} />
	
								</div>
										</>
									) : (
										<>
								
	
										</>
									)
		} */}
								
								<div className="d-flex justify-content-between">
									<div className="space-x-10 d-flex align-items-center">
									{
									isMobile ? (
										<>
											
										</>
									) : 
										<>
										<Likes likes={nft.likes} />
										</>
	
		}
									</div>
									<div className="space-x-10 d-flex align-items-center">
										<div className="share" ref={shareDivRef}>
											<div className="icon" onClick={() => setShareModal(prev => !prev)}>
												<i className="ri-share-line"></i>
												{/* <img src="/img/icons/share-icon.png"/> */}
											</div>
											<div className={shareModal ? "dropdown__popup visible" : "dropdown__popup"}>
												<ul className="space-y-10">
													<li> <a href=""> <i className="ri-facebook-line"></i>
														</a>
													</li>
													<li> <a href=""> <i className="ri-messenger-line"></i>
														</a>
													</li>
													<li> <a href=""> <i className="ri-whatsapp-line"></i>
														</a>
													</li>
													<li> <a href=""> <i className="ri-youtube-line"></i>
														</a>
													</li>
												</ul>
											</div>
										</div>
										<div className="more" ref={reportDivRef}>
											<div className="icon" onClick={() => setReportModal(prev => !prev)}>
												<i className="ri-more-fill"></i>
											</div>
											<div className={reportModal ? "dropdown__popup visible" : "dropdown__popup"}>
												<ul className="space-y-10">
													<li  >
														<a href="#" onClick={(e) => {setReportPopupShow(true);e.preventDefault()}} className="space-x-10 d-flex" data-toggle="modal" data-target="#popup_report">
															<i className="ri-flag-line"></i>
															<span> Report</span>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								{
									isMobile ? (
										<>
									
										</>
									) : (
										<>
								<h1 className="nft-name">{nft.name}</h1>
	
										</>
									)
		}
								
								{
									isMobile ? 
									(
										<>
										{/* <div className="creators">
									<div className="row">
										<div className="col-lg-6">
											<div className="avatars space-x-5">
												<p className="item-creator-tag">Creator : </p>
												<div className="media">
												<Link to={`/creators/${creator ? creator._id : ""}`}>
														<img src={creator ? creator.avatar : ""}  alt="Avatar" className="avatar
															avatar-sm" />
													</Link>
												</div>
												<div>
													<Link to={`/creators/${creator ? creator._id : ""}`}>
														<p className="avatars_name color_black">{creator ? creator.name : ""}</p>
													</Link>
												</div>
	
											</div>
										</div>
										
										
										
									</div>
	
								</div> */}
	
								<div className="d-flex space-x-20">
									{
										nft.is_auction ? (
											<a href="" className="btn btn-grad btn-lg btn-width-full" onClick={(e) => {dispatch(PlaceBidPopupAction(true)); e.preventDefault(); dispatch(PlaceBidNftAction(nft._id)) }} > Place bid</a>
	
										):
										(
											<a href="" className="btn btn-grad btn-primary btn-lg btn-width-full" onClick={(e) => {dispatch(BuyPopupAction(true)); e.preventDefault(); dispatch(BuyNftAction(nft._id)) }} data-toggle="modal" data-target="#popup_buy"> Buy Now</a>
	
										)
									}
								</div>
										</>
									) : null
								}
								{
									isMobile ? (
										<div className="numbers">
									<div className="row">
										<div className="col-lg-6 width-half">
											<div className="space-y-5">
												<p className="color_text">{nft.is_auction ? "highest bid" : "price"}</p>
												<h4 className="text-blue-color">{nft.is_auction ? nft.bids[highestBid].bid_price  : nft.price }<span className="txt_sm color_text"> ETH</span></h4>
											</div>
										</div>
										{
											nft.is_auction ? (
												<div className="col-lg-6 width-half">
													<div className="space-y-5">
													<p className="color_text my-text-right">countdown</p>
													<TimeCounter time={nft.auction.auction_time}/>
			
											</div>
										</div>
											):
											null
										}
										
									</div>
								</div>
									) : 
									(
										null
									)
								}
							
								{
									isMobile ? 
									(
										null
									) : 
									(
	<div className="numbers">
									<div className="row">
										<div className="col-lg-4 width-half">
											<div className="space-y-5">
												<p className="color_text">price</p>
												<h4>{ nft.price }<span className="txt_sm color_text"> ETH</span></h4>
											</div>
										</div>
										<div className="col-lg-4 width-half">
											<div className="space-y-5">
												<p className="color_text">Ends in</p>
												<h4><TimeCounter time={nft.auction ? nft.auction.auction_time : null}/></h4>
											</div>
										</div>
										<div className="col-lg-4 width-half">
											<div className="space-y-5">
												<p className="color_text">highest bid</p>
												<h4 className="text-blue-color">{nft.bids ? nft.bids[highestBid].bid_price : null }<span className="txt_sm color_text"> ETH</span></h4>
											</div>
										</div>
										
										
									</div>
								</div>
									)
								}
								
								{/* <div className="hr2"></div> */}
								<p className="nft-dis">{nft.dis}</p>
								{
									!isMobile ? 
									(
										<>
										{/* <div className="creators">
									<div className="row">
										<div className="col-lg-6 ">
											<div className="avatars space-x-5">
											<p className="item-creator-tag">Creator : </p>
												
												<div className="media">
												<Link to={`/creators/${creator ? creator._id : ""}`}>
														<img src={creator ? creator.avatar : ""}  alt="Avatar" className="avatar
															avatar-sm" />
													</Link>
												</div>
												<div>
													<Link to={`/creators/${creator ? creator._id : ""}`}>
														<p className="avatars_name color_black">{creator ? creator.name : ""}</p>
													</Link>
												</div>
											</div>
										</div>
										
									</div>
								</div> */}
								<div className="d-flex space-x-20 info-btns-div">
								
											<a href="" className="btn btn-primary btn-lg btn-width-full info-buy-btn" 
												onClick={(e) => {
													dispatch(BuyPopupAction(true));
													e.preventDefault();
													dispatch(BuyNftAction(nft._id)) 
												}} 
												data-toggle="modal" data-target="#popup_buy"> 
												<CurtainBtn mode="blue" moveEffect={false} />
												Buy for {nft.price} ETH
											</a>
	
											<a href="" 
												className="btn btn-grad btn-lg btn-width-full info-place-bid-btn" 
												onClick={(e) => {dispatch(PlaceBidPopupAction(true)); e.preventDefault(); 
												dispatch(PlaceBidNftAction(nft._id)) }} > 
												<CurtainBtn mode="sec-blue" moveEffect={false} />
												Place a bid
											</a>
									
								</div>
										</>
									) : null
								}
							</div>
						</div>
						<div className="right-bids-div">
						<div className="tabs-div">
									{/* <div className="space-y-20"> */}
										{/* <div className="d-flex justify-content-between mb-30_reset"> */}
											<ul className="nav nav-tabs d-flex space-x-10 " role="tablist">
												<li className="nav-item btn-one"  onClick={(e) => setActiveTab((e.target.innerText).toLowerCase()) }>
													<a className={activeTab == "details" ? "btn tabs-btn btn-sm active" : "btn tabs-btn btn-sm"} data-toggle="tab"  href="" onClick={(e) => e.preventDefault()} role="tab">
														Details</a>
												</li>
												<li className="nav-item btn-two"  onClick={(e) => setActiveTab((e.target.innerText).toLowerCase()) }>
													<a className={activeTab == "bids" ? "btn tabs-btn btn-sm active" : "btn tabs-btn btn-sm"} data-toggle="tab" href="" onClick={(e) => e.preventDefault()}  role="tab">
														Bids</a>
												</li>
												{/* <li className="nav-item">
													<a className="btn btn-white btn-sm" data-toggle="tab" href="" role="tab">
														History</a>
												</li> */}
											</ul>
											
											{/* <div className="dropdown d-none d-sm-block">
												<button className="btn btn-white btn-sm
													dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													Recent Active
												</button>
												<div className="dropdown-menu">
													<a className="dropdown-item" href="#">Action</a>
													<a className="dropdown-item" href="#">Another
														action</a>
													<a className="dropdown-item" href="#">Something
														else here</a>
												</div>
											</div> */}
										{/* </div> */}
										
								
									{/* </div> */}
									
								</div>
								<div className="tab-content">
											<div className={activeTab == "details" ? "tab-pane active space-y-25 " : "tab-pane space-y-25 "} id="tabs-1" role="tabpanel">
											<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
															<a href="#">
																<img src="/img/avatars/non-avt.png" alt="Avatar" className="avatar
																	avatar-md"/>
															</a>
														</div>
														<div>
															<p className="details-name"><span>Highest bid by</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{highestBider ? highestBider.name : null }</p>
														</div>
													</div>
												</div>
												<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
															<Link to={creator ? "/creators/"+creator._id : "#"}>
																<img src={creator ? creator.avatar : null} alt="Avatar" className="avatar
																	avatar-md"/>
															</Link>
														</div>
														<div>
															<p className="details-name"><span>Creator</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{creator ? creator.name : null }</p>
														</div>
													</div>
												</div>
												<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
														<Link to={creator ? "/creators/"+creator._id : "#"}>

																<img src={creator ? creator.avatar : null} alt="Avatar" className="avatar
																	avatar-md"/>
															</Link>
														</div>
														<div>
															<p className="details-name"><span>Owner</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{creator ? creator.name : null }</p>
														</div>
													</div>
												</div>
												<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
															<a href="#">
																<img src="/img/logos/eth_logo.png" alt="Avatar" className="avatar
																	avatar-md"/>
															</a>
														</div>
														<div>
															<p className="details-name"><span>Blockchain</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">Etherium</p>
														</div>
													</div>
												</div>
											</div>
											<div className={activeTab == "bids" ? "tab-pane space-y-20 active" : "tab-pane space-y-20"} id="tabs-2" role="tabpanel">
												{nft.bids ? (
													nft.bids.map(bid => {
														const bider = users.find(u => u._id === bid.user)
														
														if(bider){
														return(
											
	
															<div className="creator_item creator_card
													space-x-10">
													<div className="avatars space-x-10">
														<div className="media">
															{/* <div className="badge">
																<img src="/img/icons/Badge.svg" alt="" />
															</div> */}
															<Link to={bider ? "/creators/"+bider._id : "#"}>
																<img src={bider.avatar} alt="Avatar" className="avatar
																	avatar-md"/>
															</Link>
														</div>
														<div>
															<p className="biders-name"><span>{bider.name}</span></p>
															{/* <span className="date color_text">28/06/2021,
																12:08</span> */}
																<p  className="biders-price">{bid.bid_price } ETH</p>
														</div>
													</div>
												</div>
												
														)
															}
													})
												) : <p>No active bids yet. Be the first to make
												a bid!</p>}
												
											</div>
												
											
										
										</div>
						</div>
						</div>
					</div>
				</div>
			{/* <Footer /> */}
			</div>)
			}
			
				{/* </div> */}
			<Footer />

			</div>
		)
	}
    
	}
}

export default ArtDetail
