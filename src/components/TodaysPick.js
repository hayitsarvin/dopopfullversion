import React,{useState , useEffect, useRef} from 'react'
import NftCart from './NftCart'
import axios from "axios"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listNfts } from '../actions/nftActions'
import Loading from './Loading'
import TopGalleryCart from './TopGalleryCart';
import $ from 'jquery';
import CurtainBtn from '../helpers/CurtainBtn'

var closeOrderExploreTap ;
function useOutsideAlerter(ref) {
	useEffect(() => {
	  /**
	   * Alert if clicked on outside of element
	   */
	  function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
		//   alert("You clicked outside of me!");
		closeOrderExploreTap()
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

const TodaysPick = () => {
	// useEffect(() => {

	// 	const hoverBg =  document.querySelector("#todaysPick .view-all-btn")
	// 	console.log("testtttt", hoverBg)
	// 	const onMouseHover = () => {

	// 		gsap.to( hoverBg, {
	// 		  scaleX: 1.25,
	// 		  scaleY: 0.97,
	// 		  ease: 'elastic.out(1, 0.4)',
	// 		  duration: 1.3
	// 		})
		
	// 		// Curtains passing in bg
			
	// 	  }

	// 	  const onMouseOut = () => {

	// 		// Jelly Effect for BG
	// 		gsap.to( hoverBg, {
	// 		  scaleX: 1,
	// 		  scaleY: 1,
	// 		  ease: 'elastic.out(1, 0.4)',
	// 		  duration: 1.3
	// 		})
		
	// 		// Curtains passing in bg
		
		
	// 	  }
	// 	  hoverBg.addEventListener('mouseover', onMouseHover)
	// 	hoverBg.addEventListener('mouseout', onMouseOut)
	// },[])
	closeOrderExploreTap = () => {
		setExploreModeOpen(false)
	}
	const dispatch = useDispatch()
	const nftList = useSelector(state => state.nftList)
	const {loading , nfts} = nftList
	const [recentNfts , setRecentNfts] = useState([])
	const [exploreMode , setExploreMode] = useState("recent")
	const [exploreModeOpen , setExploreModeOpen] = useState(false)
	useEffect(() => {
		dispatch(listNfts())
		
	}, [dispatch])
	useEffect(() => {
		setRecentNfts(prev => nfts.reverse())
		setRecentNfts(prev => prev.filter(nft => !nft.is_auction))

		// setRecentNfts(prev => !prev.is_auction)


	}, [nfts.length])
	const FilterHandler = (type) => {
		// const el = document.querySelectorAll(".filters-span-name")
		// for(var i = 0 ; i <= 2 ; i++){
		// 	el[i].classList.remove("active")
		// }
		// e.target.classList.add("active")
		// if(type === "all"){
		// 	setRecentNfts(prev => nfts)
		// }else if(type === "auction"){
		// 	setRecentNfts(prev => nfts.filter(nft => nft.is_auction))
			
		// }else if(type === "sell"){
		// 	setRecentNfts(prev => nfts.filter(nft => !nft.is_auction))
		// 	setRecentNfts(prev => prev.sort(function(a, b){return b.likes - a.likes}))

			
		// }
		if(type === "auction"){
			setRecentNfts(prev => nfts.filter(nft => nft.is_auction))
			setRecentNfts(prev => prev.reverse())

		}else if(type === "recent"){
			setRecentNfts(prev => nfts.reverse())
			setRecentNfts(prev => prev.filter(nft => !nft.is_auction))

		}else if(type === "popular"){
			setRecentNfts(prev => nfts.filter(nft => !nft.is_auction))
			setRecentNfts(prev => prev.sort(function(a, b){return b.likes - a.likes}))
		}


	}

	var x = window.matchMedia("(max-width: 990px)")
	var tablet = window.matchMedia("(min-width: 600px) and (max-width: 990px)")
	var smallWeb = window.matchMedia("(min-width: 990px) and (max-width: 1200px)")
	const [deviceChange , setDeviceChange] = useState(x.matches)
	const [deviceTablet , setDeviceTablet] = useState(tablet.matches)

	useEffect(() => {
		window.addEventListener('resize', () => {

			x = window.matchMedia("(max-width: 990px)")
	var tablet = window.matchMedia("(min-width: 600px) and (max-width: 990px)")
	if(deviceChange === x.matches){
			
	}else{
		setDeviceChange(prev => x.matches)

	}
	if(deviceTablet === tablet.matches){
			
	}else{
		setDeviceTablet(prev => tablet.matches)

	}
	

		}
		);
		
	},[x])
	useEffect(() => {
		// window.addEventListener('mousemove', (e) => {
			// console.log("x =" ,e.x ,"y =" , e.y)
		// })
		
	}, [loading ,exploreModeOpen])
	const popupPosition = () => {
		const titlePopup = document.querySelector(".todaysPick .explore-span")
		// console.log("title" ,titlePopup.getClientRects() )

		const left = titlePopup.getClientRects()[0].left;
		// console.log("title 2" ,titlePopup.getClientRects() )
		// console.log("title 3" ,titlePopup.getClientRects()[0].left )

		const PopupTest = document.querySelector(".todaysPick .explore-mode-div")
		// PopupTest.style.left = `269px`;
		// gsap.set(PopupTest , {left: `${titlePopup.getClientRects()[0].left}px` , top: `${titlePopup.getClientRects()[0].bottom }px`})
		console.log("1" ,$(".todaysPick  .explore-span").position()  )
		gsap.set(PopupTest , {left:($(".todaysPick  .explore-span").position().left + 10) + "px" , top: (($(".todaysPick  .explore-span").position().top + $(".todaysPick  .explore-span").height() + 10) + "px" )})
		console.log("2" ,$(".todaysPick .explore-mode-div").position()  )

	}
	// useEffect(() => {
	// 	document.querySelector("body").addEventListener("mousemove" , (e) => {
	// 		const {offsetX , offsetY , target} = e;
    // const {clientHeight , clientWidth} = target;
    // const xPos = (offsetX/clientWidth)-0.5;
    // const yPos = (offsetY/clientHeight)-0.5;
	// 		gsap.to(q(".back-img-div") ,{
	// 			duration: 1.2,
	// 			x:xPos*50,
	// 			y:yPos*60,
	// 			ease:'Power3.out'
	
	// 		})
	// 		console.log(q(".back-img-div"))
	// 	})
	// },[])
	const orderExploreModeRef = useRef(null);
  useOutsideAlerter(orderExploreModeRef);
    return (
        <>
		{
			loading ? <Loading /> :
			( 
				<>
<div className="section todaysPick-margin-top "></div>
        <div id="todaysPick" className="container todaysPick color-back-change" data-opacity="1"  data-color="green" >
			
		{/* <div className="back-img-div">
				<img className="back-img back-img-4" src="/img/bg/back-effect.png" /> 
			</div> */}
			{/* <div className="back-img-div-left">
				<img className="back-img back-img-4" src="/img/bg/back-effect.png" /> 
			</div> */}
				<div  className="row md:space-y-30">
					<div className="col-lg-12">
						<div className="section__head" >
							<h2 className="section__title mb-20 section-title-recent"  >Explore <span ref={orderExploreModeRef} className="explore-span" onClick={()=> {setExploreModeOpen(prev => !prev);popupPosition()}}>{exploreMode}<img className="arrow-down" src="/img/icons/arrow-down.svg" /> </span></h2>
							<div className={exploreModeOpen ? "explore-mode-div active" : "explore-mode-div dn"} >
								<ul>
									<li className={exploreMode == "recent" ? "active" : "" } onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);FilterHandler(e.target.innerText.toLowerCase())}}>recent</li>
									<li className={exploreMode == "auction" ? "active" : "" }  onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);FilterHandler(e.target.innerText.toLowerCase())}}>auction</li>
									<li className={exploreMode == "popular" ? "active" : "" }  onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);FilterHandler(e.target.innerText.toLowerCase())}}>popular</li>
									{/* <li>recent</li> */}
								</ul>
							</div>
							{/* <div className="d-flex space-x-10 recent-filter filter-mobile"> */}
								{/* <span className="color_text txt_sm" > FILTER BY: </span> */}
								{/* <ul className="menu_categories space-x-20">
									<li className="d-flex space-x-10 switch_item"> */}
										{/* <input type="checkbox" id="AllCheckBox" name="all" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} defaultChecked/><label
											htmlFor="AllCheckBox">Toggle</label>
										<span> All </span> */}
										{/* <label class="my-switch">
										<input type="checkbox" id="AllCheckBox" name="all" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} defaultChecked />
										<span class="my-slider my-round"></span>
										</label> */}
										{/* <span className="filters-span-name active" onClick={e => {FilterHandler(e,"all")}}>All</span>
									</li> */}
									{/* <li className="d-flex space-x-10 switch_item"> */}
										{/* <input type="checkbox" id="AuctionCheckBox" name="auction" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /><label
											htmlFor="AuctionCheckBox">Toggle</label>
										<span> Auction </span> */}
										{/* <label class="my-switch"> */}
										{/* <input type="checkbox" id="AuctionCheckBox" name="auction" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /> */}
										{/* <span> Auction </span> */}
										{/* <span class="my-slider my-round"></span>
										</label> */}
										{/* <span className="filters-span-name " onClick={e => {FilterHandler(e,"auction")}}>Auction</span>
									</li>
									<li className="d-flex space-x-10 switch_item"> */}
										{/* <input type="checkbox" id="SellCheckBox" name="sell" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /><label
											htmlFor="SellCheckBox">Toggle</label>
										<span> Sell </span> */}
										{/* <label class="my-switch"> */}
										{/* <input type="checkbox" id="SellCheckBox" name="sell" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /> */}
										{/* <span> Auction </span> */}
										{/* <span class="my-slider my-round"></span>
										</label> */}
										{/* <span className="filters-span-name" onClick={e => {FilterHandler(e,"sell")}}>Sell</span>

									</li>
								</ul>
							</div> */}
						</div>
						<div className={exploreMode == "auction" ? "row my-cart-padding" : "row"}>
						
							{
								deviceChange ? 
								(recentNfts.slice(0,(deviceTablet ? 4 : 3))).map(n => {
									if(exploreMode == "auction"){
										return(
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 " key={n._id + n.price}>
											<TopGalleryCart nft={n} />
										</div>
										)
									}else{
										return(
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 sell-cart-padding" key={n._id + n.price}>
												<NftCart nft={n} />
											</div>
										)
									}
									
								}) :
								(recentNfts.slice(0,12)).map(n => {
									if(exploreMode == "auction"){
										return(
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 " key={n._id + n.price}>
											<TopGalleryCart nft={n} />
										</div>
										)
									}else{
										return(
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 sell-cart-padding" key={n._id + n.price}>
												<NftCart nft={n} />
											</div>
										)
									}
									
								})
							}
							
							
							
							
							<div className="d-flex justify-content-center btn-div-test margin-top-2-percent">

								<Link to="/explore" className="btn btn-sm
									btn-white view-all-btn">
										
							<CurtainBtn mode="todayspick-btn-color"/>

											
									 View all items
								</Link>
							</div>
						</div>
					</div>
					{/* <div className="col-lg-4">
						<div className="section__head">
							<h2 className="section__title">Live Auctions</h2>
						</div>
						<div className="box is__live space-y-30">
							<div className="card__item two">
								<div className="card_body space-y-10">
									
									<div className="card_head">
										<a href="Item-details.html">
											<img
												src="img/items/item_1.png"
												alt="" />
										</a>
			
										<div className="block_timer">
											<div className="d-flex justify-content-center
												align-items-center">
												<div className="item">
													<div className="number hours"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number minutes"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number seconds"></div>
												</div>
											</div>
										</div>
										<div className="details d-flex
											justify-content-between">
											<div className="progress">
												<div className="progress-bar"
													role="progressbar"
													style={{width: "80%"}}
													aria-valuenow="80"
													aria-valuemin="0"
													aria-valuemax="100"></div>
											</div>
										</div>
									</div>
									
			
									<h6 className="card_title">
										<a className="color_black"
											href="/Item-details.html">
											Colorful Abstract Painting
										</a>
									</h6>
									<div className="hr"></div>
									<div className="card_footer justify-content-between">
										<div className="creators">
											<div className="avatars space-x-3">
												<div className="-space-x-20">
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_10.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_11.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
												</div>
												<a href="Profile.html">
													<p className="avatars_name txt_sm
														color_black"> @darian_barry
													</p>
												</a>
											</div>
										</div>
										<a href="#" className="space-x-3">
											<p className="color_green txt_sm">0.001 ETH</p>
										</a>
									</div>
								</div>
							</div>
							<div className="card__item two">
								<div className="card_body space-y-10">
									
									<div className="card_head">
										<a href="Item-details.html">
											<img
												src="img/items/item_2.png"
												alt="" />
										</a>
			
										<div className="block_timer">
											<div className="d-flex justify-content-center
												align-items-center">
												<div className="item">
													<div className="number hours"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number minutes"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number seconds"></div>
												</div>
											</div>
										</div>
										<div className="details d-flex
											justify-content-between">
											<div className="progress">
												<div className="progress-bar"
													role="progressbar"
													style={{width: "80%"}}
													aria-valuenow="80"
													aria-valuemin="0"
													aria-valuemax="100"></div>
											</div>
										</div>
									</div>
									
			
									<h6 className="card_title">
										<a className="color_black"
											href="/Item-details.html">
											Synthwave Modern Painting
										</a>
									</h6>
									<div className="hr"></div>
									<div className="card_footer justify-content-between">
										<div className="creators">
											<div className="avatars space-x-3">
												<div className="-space-x-20">
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_12.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_13.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
												</div>
												<a href="Profile.html">
													<p className="avatars_name txt_sm
														color_black"> @makinzi_beck
													</p>
												</a>
											</div>
										</div>
										<a href="#" className="space-x-3">
											<p className="color_green txt_sm">0.047 ETH</p>
										</a>
									</div>
								</div>
							</div>
							<div className="card__item two">
								<div className="card_body space-y-10">
									
									<div className="card_head">
										<a href="Item-details.html">
											<img
												src="assets/img/items/item_3.png"
												alt="" />
										</a>
			
										<div className="block_timer">
											<div className="d-flex justify-content-center
												align-items-center">
												<div className="item">
													<div className="number hours"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number minutes"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number seconds"></div>
												</div>
											</div>
										</div>
										<div className="details d-flex
											justify-content-between">
											<div className="progress">
												<div className="progress-bar"
													role="progressbar"
													style={{width: "80%"}}
													aria-valuenow="80"
													aria-valuemin="0"
													aria-valuemax="100"></div>
											</div>
										</div>
									</div>
									
			
									<h6 className="card_title">
										<a className="color_black"
											href="/Item-details.html">
											The girl with the firefly
										</a>
									</h6>
									<div className="hr"></div>
									<div className="card_footer justify-content-between">
										<div className="creators">
											<div className="avatars space-x-3">
												<div className="-space-x-20">
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_14.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_15.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
												</div>
												<a href="Profile.html">
													<p className="avatars_name txt_sm
														color_black"> @jaxon_duffy
													</p>
												</a>
											</div>
										</div>
										<a href="#" className="space-x-3">
											<p className="color_green txt_sm">0.074 ETH</p>
										</a>
									</div>
								</div>
							</div>
							<div className="card__item two">
								<div className="card_body space-y-10">
									
									<div className="card_head">
										<a href="Item-details.html">
											<img
												src="img/items/item_4.png"
												alt="" />
										</a>
			
										<div className="block_timer">
											<div className="d-flex justify-content-center
												align-items-center">
												<div className="item">
													<div className="number hours"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number minutes"></div>
												</div>
												<div className="dots">:</div>
												<div className="item">
													<div className="number seconds"></div>
												</div>
											</div>
										</div>
										<div className="details d-flex
											justify-content-between">
											<div className="progress">
												<div className="progress-bar"
													role="progressbar"
													style={{width: "80%"}}
													aria-valuenow="80"
													aria-valuemin="0"
													aria-valuemax="100"></div>
											</div>
										</div>
									</div>
									
			
									<h6 className="card_title">
										<a className="color_black"
											href="/Item-details.html">
											Liquid Forest Princess
										</a>
									</h6>
									<div className="hr"></div>
									<div className="card_footer justify-content-between">
										<div className="creators">
											<div className="avatars space-x-3">
												<div className="-space-x-20">
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_1.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
													<a href="Profile.html">
														<img
															src="img/avatars/avatar_2.png"
															alt="Avatar" className="avatar
															avatar-sm" />
													</a>
												</div>
												<a href="Profile.html">
													<p className="avatars_name txt_sm
														color_black"> @deon _ellis
													</p>
												</a>
											</div>
										</div>
										<a href="#" className="space-x-3">
											<p className="color_green txt_sm">0.075 ETH</p>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-20 d-flex justify-content-center">
							<a href="" className="btn btn-primary btn-sm"> view all</a>
						</div>
					</div> */}
					<div className="fixed-end"></div>
			
				</div>
			</div>
			</>
			)
		}
        
            </>
    )
}

export default TodaysPick
