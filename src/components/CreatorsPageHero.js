import React, { useState } from 'react'
import Creators from '../pages/Creators'
import ReportPopup from './ReportPopup'

const CreatorsPageHero = (props) => {
	
	const {creator} = props
    const [reportModal , setReportModal] = useState(false)
    const [reportPopupShow , setReportPopupShow] = useState(false)
    const [shareModal , setShareModal] = useState(false)

    return (
		<>
		{reportPopupShow ? (
		<ReportPopup show={true} exit={() => setReportPopupShow(false)}/>

		): ""}
        <div className="mb-25">
				<div className="hero__profile">
					<div className="cover">
						<img src={creator.banner} alt="" />
					</div>
					{/* <div className="infos back-blur back-glass-effect">
						<div className="container">
							<div className="row flex-wrap align-items-center
								justify-content-between">
								<div className="col-md-auto mr-20 img-name">
									<div className="avatars d-flex space-x-20
										align-items-center">
										<div className="avatar_wrap">
											<img className="avatar avatar-lg" src={creator.avatar} alt="avatar" />
										</div>
										<h5>@{creator.name}</h5>
									</div>
								</div>
								<div className="col-md-auto id-follow">
									<div className="d-flex flex-wrap align-items-center
										space-x-20 mb-20_reset">
										<div className="mb-20 avatar-mobile-id">
											<div className="copy">
												<span className="color_text" id="creator-id-copy">{creator._id ? creator._id.slice(0,14) + "..." : null}</span>
												<p className="copy-id-popup" id="copy-id-popup">copied</p>
												<a href="#" onClick={e => copyHandler(e)}>
													<i className="ri-file-copy-line color_text"></i>
												</a>
											</div>
										</div>
										<div className="d-flex flex-wrap align-items-center
											space-x-20 follow-share avatar-mobile-share">
											
											<div className="mb-20">
												<div className="share">
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
											</div>
											<div className="mb-20">
												<div className="more">
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
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
			</>
	)
}

export default CreatorsPageHero
