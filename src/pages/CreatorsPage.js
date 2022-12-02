import React, { useEffect , useRef ,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreatorsPageHero from '../components/CreatorsPageHero'
import { useParams } from 'react-router'
import { listNfts } from '../actions/nftActions'
import NftCart from '../components/NftCart'
import { singleUser } from '../actions/userActions'
import Loading from '../components/Loading'
import ReportPopup from '../components/ReportPopup'
import { Link } from 'react-router-dom'
import TopGalleryCart from '../components/TopGalleryCart'
import Footer from '../components/Footer'
import useLoco from '../hooks/useLoco'

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
const CreatorsPage = () => {
	closeOrderTap = (e) => {
		console.log(e)


		if(e.className == "more"){
			setReportModal(false)

		}else{
			setShareModal(false)

		}

		// setReportModal(false)
	}
	const {id}= useParams()
	var screen = window.matchMedia("(max-width: 992px)")
	const [deviceChange , setDeviceChange] = useState(screen.matches)

	const dispatch = useDispatch()
	const [sortOpen , setSortOpen] = useState(true)
	const [reportModal , setReportModal] = useState(false)
    const [reportPopupShow , setReportPopupShow] = useState(false)
    const [shareModal , setShareModal] = useState(false)
	const nftList = useSelector(state => state.nftList)
	const {loading , nfts} = nftList
	const signleUser = useSelector(state => state.userSingle)
	const {loading:loadingUser , user} = signleUser
	useEffect(() => {
		window.addEventListener('resize', () => {

			screen = window.matchMedia("(max-width: 992px)")
			if(deviceChange === screen.matches){
			
			}else{
				setDeviceChange(prev => screen.matches)
				
			}
		}
		);
		
	},[screen])
	const copyHandler = (e) => {
		e.preventDefault()
		var copyText = document.getElementById("creator-id-copy");
		// copyText.select();
  		// copyText.setSelectionRange(0, 99999);
  		navigator.clipboard.writeText(user._id);
  		var copyPopup = document.getElementById("copy-id-popup");


  		copyPopup.classList.add("copy-id-popup-active")
		  setTimeout(function() {
			copyPopup.classList.remove("copy-id-popup-active")

		  }, 1500);
	}
	useEffect(() => {
		dispatch(listNfts())
		// dispatch(singleUser(id))
	}, [dispatch])
	useEffect(() => {
		dispatch(singleUser(id))
	},[id,dispatch])
	useLoco(screen.matches)
	const shareDivRef = useRef(null);
	const reportDivRef = useRef(null);
	useOutsideAlerter(shareDivRef);
	useOutsideAlerter(reportDivRef);
    return (
        <div id="viewport">
		{reportPopupShow ? (
		<ReportPopup show={true} exit={() => setReportPopupShow(false)}/>

		): ""}
		{
			loadingUser ? <Loading /> :
			(
				<>
				{
					screen.matches ? 
					null :
					<CreatorsPageHero creator={user}/>

				}
            <div className=" creator-page container">
				<div className="row justify-content-center flex-backward-mobile">
					<div className="col-xl-3 col-lg-4  about-me-div">
						{
							screen.matches ? <div className="hero-image-div-mobile">
							<img src={user.banner} />
						</div> : null
						}
						
						<div className={screen.matches ? "" : "container"}>
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
						<div className="btns-and-avatar-div space-y-10 mb-5">
						<div className="avatar_wrap">
											<img className="avatar avatar-lg" src={user.avatar} alt="avatar" />
										</div>
										<h5>{user.name}</h5>
										<p className="mb-4">@{user.name}</p>
										<div className="copy" onClick={e => copyHandler(e)}>

											
												<span className="color_text" id="creator-id-copy">{user._id ? user._id.slice(0,10) + "... " + user._id.slice(10,15)+ " " : null}</span>
												<p className="copy-id-popup" id="copy-id-popup">copied</p>
												<a href="#" className="copy-icon-div" onClick={e => copyHandler(e)}>
													{/* <i className="ri-file-copy-line color_text"></i> */}
													<img src="/img/icons/copy-icon.svg" />
												</a>
											</div>
										<Link to="/login" className="btn btn-follow btn-lg btn-width-full" >Follow</Link>
										<Link to="/login" className="btn btn-place-bid btn-lg btn-width-full " > Place a bid</Link>


						</div>
						<div className="profile__sidebar">
							<div className="space-y-40">
								
								<div className="space-y-15">
								<div className="row">
											<div className="col-4" style={{paddingLeft: "10px"}}>
												<span className="txt_sm color_text">Total Volume</span>
												<h4>${user.nfts_for_sale}</h4>
											</div>
											<div className="col-4">
												<span className="txt_sm color_text">Market Cap</span>
												<h4>${user.views}</h4>
											</div>
											<div className="col-4">
												<span className="txt_sm color_text">Items</span>
												<h4>{user.views}</h4>
											</div>
											
										</div>
										<div className="row">
											<div className="col-4">
												<span className="txt_sm color_text">Highest Sale</span>
												<h4>${user.nfts_for_sale}</h4>
											</div>
											<div className="col-4">
												<span className="txt_sm color_text">Floor price</span>
												<h4>${user.views}</h4>
											</div>
											<div className="col-4">
												<span className="txt_sm color_text">Owners</span>
												<h4>${user.views}</h4>
											</div>
											
										</div>
								</div>
								<div className="space-y-10">
									<h5 >About</h5>
									<div className=" space-y-20 ">
										<p className="user-bio">
											{user.bio}
										</p>
										
									</div>
								</div>
							</div>
							<p className="text-center txt_sm mt-20 color_text">Since 2021</p>
						</div>
						</div>
					</div>
					<div className="col-xl-9 col-lg-8 col-md-12  pl-4 pr-4 mobile-margin-top">
						<div className="profile__content">
							<div className="d-flex justify-content-between">
								<div className="space-x-10" style={{width : "100%"}}>
									{/* <div className="d-flex justify-content-between">
										<ul className="nav nav-tabs d-flex space-x-10 mb-30" role="tablist">
											<li className="nav-item">
												<a className="btn btn-white btn-sm active" data-toggle="tab" href="#tabs-1" role="tab" aria-selected="true">
													NFTs</a>
											</li> */}
											{/* <li className="nav-item">
												<a className="btn btn-white btn-sm" data-toggle="tab" href="#tabs-2" role="tab" aria-selected="false">
													Collections</a>
											</li> */}
										{/* </ul> */}
										
										{/* <div className="dropdown ">
											<button className="btn btn-white btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setSortOpen(prev => !prev)}>
												Recent Active
											</button>
											<div  style={{color:'red'}} className="dropdown-menu" >
												<a className="dropdown-item"  href="#">Action</a>
												<a className="dropdown-item" href="#">Another
													action</a>
												<a className="dropdown-item" href="#">Something
													else here</a>
											</div>
										</div> */}
									{/* </div> */}
			
									<div className="tab-content">
										<div className="tab-pane active" id="tabs-1" role="tabpanel">
											<div className="row mb-30_reset">
												
												{
													loading ? <Loading /> : (
														nfts.map(n => {
															if(n.creator == user._id){
																if(n.is_auction){
																	return (
																		<>
																<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">				
																	<TopGalleryCart nft={n}/>
																</div>
																
														</>
																	)
																}
																else{
																	return (
																		<>
																		<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">				
																			<NftCart nft={n}/>
																		</div>
																		
																</>
																	)
																}
															
															}
														})
													)
												}
											</div>
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
	
            <Footer />
        </div>
    )
}

export default CreatorsPage
