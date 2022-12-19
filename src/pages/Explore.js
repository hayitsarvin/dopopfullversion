import React, { useEffect, useState,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listNfts } from '../actions/nftActions'
import NftCart from '../components/NftCart'
import PlaceBidPopup from '../components/PlaceBidPopup'
import BidSuccessPopup from '../components/BidSuccessPopup'
import GetHighestBidIndex from '../helpers/GetHighestBidIndex'
import useLoco from '../hooks/useLoco'
import {
	useLocation
  } from "react-router-dom";
import Loading from '../components/Loading'
import TopGalleryCart from '../components/TopGalleryCart'
import Footer from '../components/Footer'
import $ from 'jquery';
import gsap from 'gsap/all'
var closeOrderTap ;
function useOutsideAlerter(ref) {
	useEffect(() => {
	  /**
	   * Alert if clicked on outside of element
	   */
	  function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
		// 	ref
		//   console.log("You clicked outside of me!");
		  closeOrderTap(event)

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

const Explore = () => {
	
	var mySortType;
	var screen = window.matchMedia("(max-width: 530px)")
	useEffect(() => {
		window.addEventListener('resize', () => {

			screen = window.matchMedia("(max-width: 530px)")
		}
		);
		

	},[screen])
	// useEffect(() => {
	// 	const cardItemExplore = document.querySelectorAll(".slider-item")
	// 	function onMouseHoverOnCards() {

    //         gsap.to(mouseCircle, {
    //           duration: 0.3 ,
    //           scale: 5
    //         })
    //         gsap.set(mouseText, {
    //           opacity: 1
    //         })
    //       }
    //       function onMouseHoverOutOnCards() {
            
    //         gsap.to(mouseCircle, {
    //           duration: 0.3 ,
    //           scale: 5
    //         })
    //         gsap.set(mouseText, {
    //           opacity: 0
    //         })
    //       }
	// 	  if(cardItemExplore){
	
	// 		cardItemExplore.forEach((card , i) => {
	// 		 card.addEventListener('mouseenter', onMouseHoverOnCards)
	// 		  card.addEventListener('mouseleave', onMouseHoverOutOnCards)
	// 		})
	// 	  }
	// 	}, []);
	// useLoco(screen.matches)

	function useQuery() {
		const { search } = useLocation();
	  
		return React.useMemo(() => new URLSearchParams(search), [search]);
	}
	let query = useQuery();
	const name = query.get("name") ? query.get("name") : null
	const dispatch = useDispatch()
	const nftList = useSelector(state => state.nftList)
	const {loading , nfts} = nftList
	const [nftExploreList , setNftExploreList] = useState([])
	const [sortOpen , setSortOpen] = useState(false)
	const [exploreMode , setExploreMode] = useState("recent")
	const [exploreModeOpen , setExploreModeOpen] = useState(false)
	const [sortType , setSortType] = useState("Latest")
	const [filterType , setFilterType] = useState("recent")
	closeOrderTap = (e) => {
		if(e.target.className == "explore-span" || e.target.className == "arrow-down"){
			
		}else{
			setExploreModeOpen(false)

		}
	}
	var x = window.matchMedia("(max-width: 992px)")
	useEffect(() => {
		window.addEventListener('resize', () => {
			setExploreModeOpen(false)
			x = window.matchMedia("(max-width: 992px)")
		}
		);
		const titlePopup = document.querySelector(".explore-page .explore-span")
		const titleDiv = document.querySelector(".hero__collections")
		
		const Popup = document.querySelector(".explore-page .explore-mode-div")
		// Popup.style.left = `${titlePopup.getClientRects()[0].left}px`;
		// Popup.style.top = `${titleDiv.getBoundingClientRects()[0].bottom}px`;

		// console.log("1" ,$(".explore-page .hero__collections").position() ,$(".explore-page .hero__collections").outerHeight(true))
		gsap.set(Popup , {left:$(".explore-page .explore-span").offset().left , top: ($(".explore-page .hero__collections").position().top + $(".explore-page .hero__collections").outerHeight(true)) + 10})
		// console.log("2" ,$(".explore-page .explore-mode-div").position()  )
		// console.log("3" ,window.scrollY  )

		// if (titlePopup ) {
		// 	console.log(titlePopup)
		// 	const result = titlePopup.position();
		// 	console.log(result);
		// 	if (Popup  ) {
		// 		Popup.style.left = `${result.left}px`;
		// 		Popup.style.top = `${result.bottom}px`;
				
		// 	  }
		//   }
		// console.log("2" ,titlePopup.getBoundingClientRects())
	}, [x ,exploreModeOpen])

	useEffect(() => {
		dispatch(listNfts())
		
	}, [dispatch])
	useEffect(() => {
		if(name){
			const temp = nfts
			setNftExploreList(prev => temp.filter(nft => nft.name.toLowerCase().includes(name.toLowerCase())))
		}else{
			setNftExploreList(nfts)
			filterAndSortHandler(filterType)
			sortNftList(sortType)
		}
		
	}, [nfts.length, name])
	const sortNftList = (type) => {
		const temp = nfts
		mySortType = type


		if(type == "Popular"){


		setNftExploreList(prev => temp.sort(function(a, b){return b.likes - a.likes}))

			
		}else if(type == "Latest"){
			setNftExploreList(prev => temp.reverse())

		}else if(type == "Highest Price"){
			setNftExploreList(prev => temp.sort(function(a,b) {
				return (b.is_auction ? b.bids[GetHighestBidIndex(b.bids)].bid_price : b.price) - (a.is_auction ? a.bids[GetHighestBidIndex(a.bids)].bid_price : a.price)
			}))

		}else if(type == "Lowest Price"){
			setNftExploreList(prev => temp.sort(function(a,b) {
				return (a.is_auction ? a.bids[GetHighestBidIndex(a.bids)].bid_price : a.price) - (b.is_auction ? b.bids[GetHighestBidIndex(b.bids)].bid_price : b.price)

			}))
		}
		filterAndSortHandler(filterType)

	}
	const FilterHandler = (e) => {
		
		const el = document.querySelectorAll(".filters-span-name")
		for(var i = 0 ; i <= 2 ; i++){
			el[i].classList.remove("active")
		}
		e.target.classList.add("active")
		// if(e.target.innerText === "auction" && e.target.checked){

		// 	document.querySelector("#AllCheckBox").checked = false
		// 	document.querySelector("#SellCheckBox").checked = false

		// }else if(e.target.innerText === "all" && e.target.checked){

		// 	document.querySelector("#AuctionCheckBox").checked = false
		// 	document.querySelector("#SellCheckBox").checked = false

		// }else if(e.target.innerText === "sell" && e.target.checked){

		// 	document.querySelector("#AuctionCheckBox").checked = false
		// 	document.querySelector("#AllCheckBox").checked = false

		// } else if(e.target.innerText === "auction" && !e.target.checked){

		// 	document.querySelector("#SellCheckBox").checked = false
		// 	document.querySelector("#AllCheckBox").checked = true

		// }else if(e.target.innerText === "sell" && !e.target.checked){

		// 	document.querySelector("#AuctionCheckBox").checked = false
		// 	document.querySelector("#AllCheckBox").checked = true

		// }
		setFilterType(e.target.innerText.toLowerCase())
		// console.log(e.target)

	}
	const filterAndSortHandler = (type) => {
		if(type === "recent"){
			setNftExploreList(prev => nfts.filter(nft => !nft.is_auction))

		}else if(type === "auction"){
			setNftExploreList(prev => nfts.filter(nft => nft.is_auction))
			
		}else if(type === "popular"){
			setNftExploreList(prev => nfts.filter(nft => !nft.is_auction))

			setNftExploreList(prev => prev.sort(function(a, b){return b.likes - a.likes}))


			
		}
		// setNftExploreList(prev => prev.map((n,i) => {
		// 	if(i==0){
		// 		const temp = n;
		// 		n = prev[1];
		// 		prev[1] = temp; 
		// 	}
		// }))
		// var array = nftExploreList;
		// console.log(array)
		// var x= 0, y= 1
		// array[x] = array.splice(y, 1, array[x])[0];
		// console.log(array)

		// setNftExploreList(array)



	}

	useEffect(() => {
		if(sortOpen){
			document.querySelector('.dropdown-toggle').classList.add("arrow-up")
		}else{
			document.querySelector('.dropdown-toggle').classList.remove("arrow-up")
		}
	},[sortOpen])
const orderExploreRef = useRef();
  useOutsideAlerter(orderExploreRef);
    return (
        <div  id="viewport" data-scroll-container>
		<div  data-scroll-section >
		<div className="container explore-page">
		{
			screen.matches ?  (
				<>
				<div className="hero__collections">
			    <div className="container" >
				<h1 >Explore <span className="explore-span" ref={orderExploreRef} onClick={()=> setExploreModeOpen( prev => !prev )}>{exploreMode}<img className="arrow-down" src="/img/icons/arrow-down.svg" /> </span></h1>
				<div className={exploreModeOpen ? "explore-mode-div active" : "explore-mode-div dn"} >
								<ul>
									<li className={exploreMode == "recent" ? "active" : "" } onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);filterAndSortHandler(e.target.innerText.toLowerCase())}}>recent</li>
									<li className={exploreMode == "auction" ? "active" : "" }  onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);filterAndSortHandler(e.target.innerText.toLowerCase())}}>auction</li>
									<li className={exploreMode == "popular" ? "active" : "" }  onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);filterAndSortHandler(e.target.innerText.toLowerCase())}}>popular</li>
									{/* <li>recent</li> */}
								</ul>
							</div>
			    </div>
			</div>
            <div className="filters  border-b py-20">
			    <div className="container">
			        <div className="row justify-content-between align-items-center">
			            <div className="col-lg-auto pr-0">
			                <div className="d-flex space-x-10 align-items-center filter-mobile">
			                    {/* <span className="color_text txt_sm"> FILTER BY: </span> */}
			                    <ul className="menu_categories space-x-20">
									<li className="d-flex space-x-10 switch_item">
										{/* <input type="checkbox" id="AllCheckBox" name="all" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} defaultChecked/><label
											htmlFor="AllCheckBox">Toggle</label>
										<span> All </span> */}
										{/* <label class="my-switch">
										<input type="checkbox" id="AllCheckBox" name="all" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} defaultChecked />
										<span class="my-slider my-round"></span>
										</label> */}
										<span className="filters-span-name active" onClick={e => {FilterHandler(e);filterAndSortHandler("all")}}>All</span>
									</li>
									<li className="d-flex space-x-10 switch_item">
										{/* <input type="checkbox" id="AuctionCheckBox" name="auction" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /><label
											htmlFor="AuctionCheckBox">Toggle</label>
										<span> Auction </span> */}
										{/* <label class="my-switch"> */}
										{/* <input type="checkbox" id="AuctionCheckBox" name="auction" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /> */}
										{/* <span> Auction </span> */}
										{/* <span class="my-slider my-round"></span>
										</label> */}
										<span className="filters-span-name " onClick={e => {FilterHandler(e);filterAndSortHandler("auction")}}>Auction</span>
									</li>
									<li className="d-flex space-x-10 switch_item">
										{/* <input type="checkbox" id="SellCheckBox" name="sell" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /><label
											htmlFor="SellCheckBox">Toggle</label>
										<span> Sell </span> */}
										{/* <label class="my-switch"> */}
										{/* <input type="checkbox" id="SellCheckBox" name="sell" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /> */}
										{/* <span> Auction </span> */}
										{/* <span class="my-slider my-round"></span>
										</label> */}
										<span className="filters-span-name" onClick={e => {FilterHandler(e);filterAndSortHandler("sell")}}>Sell</span>

									</li>
								</ul>            </div>
			            </div>
			            <div className="col-lg-auto pl-0">
			                <div className="d-flex space-x-10 align-items-center sm:mt-20 my-margin-top-zero">
			                    {/* <span className="color_text txt_sm"> SORT BY: </span> */}
			                    <div className="dropdown">
			                        <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
			                            {sortType}
			                        </button>
			                        <div className="dropdown-menu" onClick={() => {setSortOpen(false) }} style={sortOpen ? {display: "block"} : {display: "none"}}>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)  }} href="#">Popular</a>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText) }} href="#">Highest Price</a>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText) }} href="#">Lowest Price</a>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText) }} href="#">Latest</a>
										
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			</>
			) :
			(
				<>
				<div className="">
				 <div className="hero__collections my-display-flex-explore-filters">
			    <div  >
			        <h1 >Explore <span className="explore-span" ref={orderExploreRef} onClick={()=> setExploreModeOpen(prev => !prev)}>{exploreMode}<img className="arrow-down" src="/img/icons/arrow-down.svg" /> </span></h1>
					<div className={exploreModeOpen ? "explore-mode-div active" : "explore-mode-div dn"} >
								<ul>
									<li className={exploreMode == "recent" ? "active" : "" } onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);filterAndSortHandler(e.target.innerText.toLowerCase())}}>recent</li>
									<li className={exploreMode == "auction" ? "active" : "" }  onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);filterAndSortHandler(e.target.innerText.toLowerCase())}}>auction</li>
									<li className={exploreMode == "popular" ? "active" : "" }  onClick={(e) => {setExploreMode(e.target.innerText.toLowerCase()); setExploreModeOpen(false);filterAndSortHandler(e.target.innerText.toLowerCase())}}>popular</li>
									{/* <li>recent</li> */}
								</ul>
							</div>
			    </div>
				<div className="filters  border-b py-20 ">
			    <div >
			        <div className="row justify-content-between align-items-center">
			            <div className="col-lg-auto display-none">
			                <div className="d-flex space-x-10 align-items-center filter-mobile">
			                    {/* <span className="color_text txt_sm"> FILTER BY: </span> */}
			                    <ul className="menu_categories space-x-20">
									<li className="d-flex space-x-10 switch_item">
										{/* <input type="checkbox" id="AllCheckBox" name="all" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} defaultChecked/><label
											htmlFor="AllCheckBox">Toggle</label>
										<span> All </span> */}
										{/* <label class="my-switch">
										<input type="checkbox" id="AllCheckBox" name="all" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} defaultChecked />
										<span class="my-slider my-round"></span>
										</label> */}
										<span className="filters-span-name active" onClick={e => {FilterHandler(e);filterAndSortHandler("all")}}>All</span>
									</li>
									<li className="d-flex space-x-10 switch_item">
										{/* <input type="checkbox" id="AuctionCheckBox" name="auction" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /><label
											htmlFor="AuctionCheckBox">Toggle</label>
										<span> Auction </span> */}
										{/* <label class="my-switch"> */}
										{/* <input type="checkbox" id="AuctionCheckBox" name="auction" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /> */}
										{/* <span> Auction </span> */}
										{/* <span class="my-slider my-round"></span>
										</label> */}
										<span className="filters-span-name " onClick={e => {FilterHandler(e);filterAndSortHandler("auction")}}>Auction</span>
									</li>
									<li className="d-flex space-x-10 switch_item">
										{/* <input type="checkbox" id="SellCheckBox" name="sell" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /><label
											htmlFor="SellCheckBox">Toggle</label>
										<span> Sell </span> */}
										{/* <label class="my-switch"> */}
										{/* <input type="checkbox" id="SellCheckBox" name="sell" onChange={(e) => {FilterHandler(e);filterAndSortHandler(e.target.name)}} /> */}
										{/* <span> Auction </span> */}
										{/* <span class="my-slider my-round"></span>
										</label> */}
										<span className="filters-span-name" onClick={e => {FilterHandler(e);filterAndSortHandler("sell")}}>Sell</span>

									</li>
								</ul>            </div>
			            </div>
						<div className="dropdown-menu btn-filter-theme" onClick={() => {setSortOpen(false) }} style={sortOpen ? {display: "block"} : {display: "none"}}>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)  }} href="#">Popular</a>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText) }} href="#">Highest Price</a>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText) }} href="#">Lowest Price</a>
			                            <a className="dropdown-item" onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText) }} href="#">Latest</a>
										
			                        </div>
			            <div className="col-lg-auto " ref={orderExploreRef}>
			                <div className="d-flex space-x-10 align-items-center sm:mt-20 my-margin-top-zero display-none">
			                    {/* <span className="color_text txt_sm"> SORT BY: </span> */}
			                    <div className="dropdown ">
			                        <button className="btn btn-dark btn-sm dropdown-toggle my-btn-padding btn-filter-theme display-none" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			                            {sortType}
			                        </button>
			                       
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			</div>
            </div>
				</>

			)
		}

           
            <div className="container">
            <div className="section mt-50">
			        
					<BidSuccessPopup />
			        <PlaceBidPopup />
			       <div className="modal fade popup" id="popup_history" tabIndex="-1" role="dialog" aria-hidden="true">
			        <div className="modal-dialog modal-dialog-centered" role="document">
			        		<div className="modal-content">
			        			<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			        				<span aria-hidden="true">×</span>
			        			</button>
			        			<div className="modal-body space-y-20 p-40">
			        				<h4> History </h4>
			        				<div className="creator_item creator_card space-x-10">
			        					<div className="avatars space-x-10">
			        						<div className="media">
			        							<div className="badge">
			        								<img src="img/icons/Badge.svg" alt="" />
			        							</div>
			        							<a href="Profile.html">
			        								<img src="img/avatars/avatar_1.png" alt="Avatar" className="avatar avatar-md" />
			        							</a>
			        						</div>
			        						<div>
			        							<p className="color_black">Bid accepted <span className="color_brand">1
			        									ETH</span> by <a className="color_black txt
			        									_bold" href="Profile.html">ayoub</a></p>
			        							<span className="date color_text">28/06/2021, 12:08</span>
			        						</div>
			        					</div>
			        				</div>
			        				<div className="creator_item creator_card space-x-10">
			        					<div className="avatars space-x-10">
			        						<div className="media">
			        							<div className="badge">
			        								<img src="img/icons/Badge.svg" alt="" />
			        							</div>
			        							<a href="Profile.html">
			        								<img src="img/avatars/avatar_2.png" alt="Avatar" className="avatar avatar-md" />
			        							</a>
			        						</div>
			        						<div>
			        							<p className="color_black">Bid accepted <span className="color_brand">3
			        									ETH</span> by <a className="color_black txt
			        									_bold" href="Profile.html">monir</a></p>
			        							<span className="date color_text">22/05/2021, 12:08</span>
			        						</div>
			        					</div>
			        				</div>
			        			</div>
			        		</div>
			        	</div>
			        </div><div className="row mb-30_reset">
			        	
			        	{
							loading ? <Loading /> : (
								nftExploreList.map(nft  => {
									if(nft.is_auction){
										return(
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 pl-0">
			        						<TopGalleryCart nft={nft} />
			        					</div>
										)
									}else{
										return(
											<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 pl-0">
												<NftCart nft={nft} />
											</div>
										)
									}
									
									
								})
							)
						}
			        </div>    </div></div>

					</div>
					<Footer />
					</div>
        </div>
    )
}

export default Explore
