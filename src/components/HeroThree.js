import React, { useEffect, useRef, useState } from 'react'
import HeroArtCart from './HeroArtCart'
import { useSelector, useDispatch } from 'react-redux'
import { listNfts } from '../actions/nftActions'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import gsap from 'gsap'
import TopGalleryCart from './TopGalleryCart'
import CurtainBtn from '../helpers/CurtainBtn'
const Hero = ({MouseMove}) => {
	const el = useRef();
	var x = window.matchMedia("(max-width: 992px)")
	var heroMedia = window.matchMedia("(min-width:993px) and (max-width: 1350px)")
	const [deviceChange , setDeviceChange] = useState(x.matches)
	const dispatch = useDispatch()
	const nftList = useSelector(state => state.nftList)
	const {loading , nfts} = nftList
	const [nftAuctionList , setNftAuctionList] = useState([])
useEffect(()=> {
console.log(MouseMove)
},[])
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
			heroMedia = window.matchMedia("(min-width:993px) and (max-width: 1350px)")
			x = window.matchMedia("(max-width: 992px)")
			if(deviceChange === x.matches){
			
			}else{
				setDeviceChange(prev => x.matches)
	
			}
		
		}
		);
		
	},[x])
	useEffect(() => {
		if(!deviceChange){
			const hoverBg =  document.querySelector("#btn-test-three")
		
			const onMouseHover = () => {
	
				gsap.to( hoverBg, {
				  scaleX: 1.05,
				  scaleY: 0.97,
				  ease: 'elastic.out(1, 0.4)',
				  duration: 1.3
				})
			
				// Curtains passing in bg
				
			  }
	
			  const onMouseOut = () => {
	
				// Jelly Effect for BG
				gsap.to( hoverBg, {
				  scaleX: 1,
				  scaleY: 1,
				  ease: 'elastic.out(1, 0.4)',
				  duration: 1.3
				})
			
				// Curtains passing in bg
			
			
			  }
			  hoverBg.addEventListener('mouseover', onMouseHover)
			hoverBg.addEventListener('mouseout', onMouseOut)
		}

		
	},[])
	useEffect(() => {
		if(!deviceChange){
		const heroBtnHover = document.querySelector('.hero-btn-div .my-btns-div');
		const heroBtnHoverText = document.querySelector('.hero-btn-div .my-btns-div .my-btns-text');
		heroBtnHover.addEventListener('mouseover', (e) => {
			gsap.to(heroBtnHoverText,{
				mixBlendMode:"difference",
				delay: "0.2s"
			})
	});
		// heroBtnHover.addEventListener('mouseout', (e) => {
		// 		gsap.to(heroBtnHoverText,{
		// 			mixBlendMode:"normal"
		// 		})
		// });
}
	},[])

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
	// var btnX ;
	// var btnY ;
	// useEffect(() => {
	// 	const btnDiv = document.querySelector(".hero-btn-div")
	// 	btnX = btnDiv.getBoundingClientRect().left;
	// 	btnY = btnDiv.clientY;
	// 	console.log("fdfsdf", btnX)
		
	// }, [])
	const btnmove = (e) => {
		const q = gsap.utils.selector(el);
    const btnArea = q(".hero-btn-area");
    const {target}= e;
    const ofTop = target.getBoundingClientRect().top;
      const ofLeft = target.getBoundingClientRect().left;
      var s = e.clientX - ofLeft;
      var o = (e.clientY - ofTop)/130;
    // setMoveBtn(true);
    // console.log(ofTop, o, e.clientY )
    gsap.to(q(".my-btns-div"), {
      x: ((s - target.offsetWidth / 2) / target.offsetWidth) * 40,
      y:( o - .5) * 30,
      // x:e.clientX,
      // y: e.clientY,
      ease: "Power3.inOut",
      duration: .3,
    });
	  
	  
		
	}
	const mouseLeave = (e) => {
		const btnDiv = document.querySelector(".hero-btn-div")
		gsap.to(btnDiv, {
			x: 0,
			y:0,
			// x:e.clientX,
			// y: e.clientY,
			ease: "Power3.inOut",
			duration: .3,
		  });
		  
	}
	

	if( deviceChange ){
		return (
			
			<div className="hero__2 container">
			
			{/* <div className="back-img-div back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div> */}
			{/* <div className="back-img-div-left back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div> */}
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
																	<Link className="btn btn-threejs btn-grad btn-md btn-hover-tablet"
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
        <div className="hero__2 "  >
			{/* <div className="back-img-div back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div>
			<div className="back-img-div-left back-img-hero-div" style={{zIndex: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/Group-132-blur.png" /> 
			</div> */}
				<div className="container">
					<div className="row">
						
							<div className="col-lg-3 pl-0">
								
						</div>
						
					<div className="space-y-20 col-lg-6" style={{paddingTop: "55px"}}>
						<Link to="/explore">
						<h1 className="hero__title text-center hero__title__desktop" >
							
											<span className="text-1">Create,</span><br/> <span className="text-2">Buy & Sell NFTs</span>

									
						</h1>
						</Link>
						{/* <p className="hero__text text-center sub-text" >Discover the best & new digital assets</p> */}

					<div className="mt-50 space-x-20 d-flex justify-content-center hero-btn-div" ref={el}>
							{/* <div className='hero-btn-area' onMouseMove={(e) => btnmove(e)}>
							</div> */}

								<div className="my-btns-div" >

									{/* <span onMouseMove={btnmove} onMouseLeave={mouseLeave}  className="btn-area" >

									</span> */}
									
								<Link  id="btn-test-three"  className="btn btn-grad  btn-md btn-hover"
									to="/explore" >

									<CurtainBtn mode="noBg" />

									NFT Marketplace

								</Link>
								</div>
						</div>
						
					</div>
				
							<div className="col-lg-3 pr-0">
								
						</div>
						
					</div>
                        
					{
						!x.matches ? (
							null
						) : null
					}
				</div>
				{/* <div className="test-value"></div> */}
					<div className="hero-nfts-border-div">
					<div className="hero-nfts-div-border" style={{mixBlendMode: "soft-light !important"}}>
</div>
                <div className="hero-nfts-div ">
					
					{/* <div className="border-test"></div> */}
                            <h3 className="hero-nfts-text-title">Featured Auctions</h3>
					<div className="wrapper container">
						{/* <div className="bg-blur-div back-blur back-glass-effect"></div> */}
						<div className="row container">
							
							{
								loading ? <Loading />: (
									nftAuctionList.map((n,i) => {
										
											if(i <= 3){
												return (
													<div className={i <= 1 ? "col-lg-3 pl-0" : "col-lg-3 pr-0"} id={i == 1 ? "img-position" : ""} key={n._id}>
														{/* <HeroArtCart nft={n} /> */}
														<TopGalleryCart nft={n}/>
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
                    </div>
					</div>
			</div>
    )
	}
   
}

export default Hero
