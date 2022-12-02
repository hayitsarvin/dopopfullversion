import React,{useState, useRef , useEffect} from 'react'
import { Link } from 'react-router-dom'
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

		  closeOrderTap(event.target)
		  
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
const DiscoverCreatorCart = (props) => {
	closeOrderTap = (e) => {

console.log(e.className)
		if(e.className == "icon icon-more"){
			
			setShareModal(false)
			console.log("first")


		}else if( e.className == "icon icon-share"){
			setReportModal(false)
			console.log("2")


		}else 
		if(e.className == "ri-more-fill") {
			setShareModal(false)
			console.log("3")


		}else if( e.className == "ri-share-line"){
			setReportModal(false)
			console.log("4")

		}else{
			setShareModal(false)
			setReportModal(false)
			console.log("5")


		}

		// setReportModal(false)
	}
	const [reportModal , setReportModal] = useState(false)
    const [reportPopupShow , setReportPopupShow] = useState(false)
    const [shareModal , setShareModal] = useState(false)
	const {user} = props
	const shareDivRef = useRef(null);
	const reportDivRef = useRef(null);

	useOutsideAlerter(shareDivRef);
	useOutsideAlerter(reportDivRef);
	
    return (
		
        <div className="creator_item creator_card space-y-20 mb-20 back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg">
										<div className="avatars flex-column space-y-10">
											<Link to={`/creators/${user._id}`}>
											<div className="cover">
												<img src={user.banner} alt="Avatar" className="img-fluid " />
											</div>
											</Link>
											<div className="media has_border">
												<Link to={`/creators/${user._id}`}>
													<img src={user.avatar} alt="Avatar" className="avatar
														avatar-md" />
												</Link>
											</div>
											<div className="share" ref={shareDivRef}>
													<div className="icon icon-share"   onClick={() => setShareModal(prev => !prev)}>
														<i className="ri-share-line"></i>
														
													</div>
													<div className={shareModal ? "dropdown__popup visible" : "dropdown__popup"}>
														<ul className="space-y-10">
															<li> <a href=""> <i className="ri-facebook-line"></i>
																</a>
															</li>
															{/* <li> <a href=""> <i className="ri-messenger-line"></i>
																</a>
															</li> */}
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
													<div className="icon icon-more" onClick={() => setReportModal(prev => !prev)}>
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
											<Link to={`/creators/${user._id}`}>

											<div className="creator-name-div">
												<h1>{user.name}</h1>
												<p>@{user.name}</p>
											</div>
											</Link>
											<Link to={`/creators/${user._id}`}>

											<div className="details">

												<div>
													
													<p className="color_black txt_sm">Total Volume</p>
													<p className="color_black info-white txt_lg">${user.total_sold_price}M
														</p>
												</div>
												<div>
												<p className="color_black txt_sm">Items</p>
													<p className="color_black info-white txt_lg">{user.nfts_for_sale}</p>
													
												</div>
												<div>
												<p className="color_black txt_sm">Market Cap</p>
													<p className="color_black info-white txt_lg">${user.views}M</p>
													
												</div>
											</div>
											</Link>

										</div>
									</div>
									
    )
}

export default DiscoverCreatorCart
