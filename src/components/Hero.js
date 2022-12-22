import React, { useEffect, useState } from 'react'
import HeroArtCart from './HeroArtCart'
import { useSelector, useDispatch } from 'react-redux'
import { listNfts } from '../actions/nftActions'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { useAppContext } from '../contexts/appcontext'
const Hero = () => {
	const { isMobile } = useAppContext();
	// var x = window.matchMedia("(max-width: 992px)")
	// const [deviceChange , setDeviceChange] = useState(x.matches)
	const dispatch = useDispatch()
	const nftList = useSelector(state => state.nftList)
	const {loading , nfts} = nftList
	const [nftAuctionList , setNftAuctionList] = useState([])

	useEffect(() => {
		dispatch(listNfts())
		
	}, [dispatch])
	useEffect(() => {
		sortNftList()
	}, [nfts.length])
	const sortNftList = () => {
		setNftAuctionList(prev => {
			const temp = nfts.filter(nft => nft.is_auction == true)
			temp.sort(function(a, b){return b.likes - a.likes})
			return (
				temp.slice(0,10)
			)
		})

		
	}
	useEffect(() => {
		window.addEventListener('resize', () => {
			x = window.matchMedia("(max-width: 992px)")
			if(deviceChange === x.matches){
			
			}else{
				setDeviceChange(prev => x.matches)
	
			}
		
		}
		);
		
	},[x])

	useEffect(() => {
		if(x.matches){
			const slider = document.querySelector('.mobile-hero-other-nfts');
			// const sliderItems = document.querySelector('.mobile-hero-other-nfts .mobile-hero-nft-card');
			let isDown = false;
			let startX;
			let scrollLeft;
			
			slider.addEventListener('mousedown', (e) => {
			  isDown = true;
			  slider.classList.add('active');
			  startX = e.pageX - slider.offsetLeft;
			  scrollLeft = slider.scrollLeft;
			});
			slider.addEventListener('mouseleave', () => {
			  isDown = false;

			  slider.classList.remove('active');
			});
			slider.addEventListener('mouseup', (e) => {
			  isDown = false;


			  slider.classList.remove('active');
			  slider.classList.remove('slider-click-none');

			});
			slider.addEventListener('mousemove', (e) => {
			  if(!isDown) return;
			  e.preventDefault();
			  slider.classList.add('slider-click-none');

			  const x = e.pageX - slider.offsetLeft;
			  const walk = (x - startX) * 2; //scroll-fast
			  slider.scrollLeft = scrollLeft - walk;
			 
			});
		}
		
	} , [x])

	if( deviceChange ){
		return (
			
			<div className="hero__2 container" >
			
			<div className="back-img-div back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div>
			<div className="back-img-div-left back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div>
				<div className="container my-mobile-padding-left-0">
					<div className="row">
					<div className="space-y-20 col-lg-6" style={{paddingTop: "55px"}}>
						<h1 className="hero__title text-center" >
						Create, buy &<br/>Sell NFTs
						</h1>
					</div>
					</div>
					<div >
					<div className="row my-mobile-padding-left-auto">
					{
								loading ? <Loading /> : (
									nftAuctionList.map((n,i) => {
										
											if(i === 0){
												return (
													<div className="col-lg-3  mobile-hero-single-nft" key={n._id}>
														<HeroArtCart nft={n} />
														{
															
																i == 0 ? (
																	<div className="space-x-20 mb-20 my-btns-div d-flex justify-content-center hero-btn-div " >
																	<Link className="btn btn-grad btn-md btn-hover-tablet"
								to="/explore"></Link>
								<p className="my-btns-text">View
								market</p>
																	</div>
																) : null
															
														}
													</div>
												)
											}
										
									}
								
									)
									
								)
}
								
								
								</div>
								<div className= "mobile-hero-other-nfts row">
									{
								loading ? <Loading />: (
									nftAuctionList.map((n,i) => {
										if(i >0 && i<=5){
											return (
												<div className="col-lg-1 mobile-hero-nft-card" key={n._id}>
													<HeroArtCart nft={n} draggable="false" />
													{
														
															i == 0 ? (
																<div className="space-x-20 mb-80 mt-30 d-flex justify-content-center hero-btn-div " >
																<Link className="btn btn-grad btn-md"
																	to="/explore">View
																	market</Link>
															</div>
															) : null
														
													}
												</div>
											)
										}
										
									}
								
									)
									
								)
							}
							</div>
							</div>
							</div>
							</div>
							


		)
	}
	else{
 return (
        <div className="hero__2 container" >

			<div className="back-img-div back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div>
			<div className="back-img-div-left back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div>
				<div className="container">
					<div className="row">
						
							<div className="col-lg-3  pl-0">
								{
									nftAuctionList.map((nft , i) => {
										if(i == 6){
											return(
										<HeroArtCart nft={nft} />

											)
										}
									})
								}
						</div>
						
					<div className="space-y-20 col-lg-6" style={{paddingTop: "55px"}}>
						<Link to="/explore">
						<h1 className="hero__title text-center" >
							
											Create, Buy & Sell NFTs

									
						</h1>
						</Link>
						<p className="hero__text text-center sub-text" >Discover the best & new digital assets</p>

					<div className="mt-50 space-x-20 d-flex justify-content-center hero-btn-div">
								<div className="my-btns-div">
							<Link className="btn btn-grad btn-md btn-hover"
								to="/explore"></Link>
								<p className="my-btns-text">View
								market</p>
								</div>
						</div>
						
					</div>
				
							<div className="col-lg-3 pr-0">
								{
									nftAuctionList.map((nft , i) => {
										if(i == 4){
											return(
										<HeroArtCart nft={nft} />

											)
										}
									})
								}
						</div>
						
					</div>

					<div className="wrapper">
						{/* <div className="bg-blur-div back-blur back-glass-effect"></div> */}
						<div className="row">
							
							{
								loading ? <Loading />: (
									nftAuctionList.map((n,i) => {
										
											if(i <= 3){
												return (
													<div className={i <= 1 ? "col-lg-3 pl-0" : "col-lg-3 pr-0"} id={i == 1 ? "img-position" : ""} key={n._id}>
														<HeroArtCart nft={n} />
														{
															x.matches ? (
																i == 0 ? (
																	<div className="space-x-20 mb-20 mt-30 d-flex justify-content-center hero-btn-div " >
																	<Link className="btn btn-grad btn-md"
																		to="/explore">View
																		market</Link>
																</div>
																) : null
															) : null
														}
													</div>
												)
											}

										}
										
										
									
								
									)
									
								)
							}
							
							
						</div>
						
						
					</div>
					{
						!x.matches ? (
							null
						) : null
					}
				</div>
			</div>
    )
	}
   
}

export default Hero
