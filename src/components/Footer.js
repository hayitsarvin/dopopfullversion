import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import CurtainBtn from '../helpers/CurtainBtn'

const Footer = () => {
	var screen = window.matchMedia("(max-width: 992px)")
	const [deviceChange , setDeviceChange] = useState(screen.matches)

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
    return (
        <footer className="footer__1 ">
			<div className="container">
				<div className="container">
					<div className="row container m-p-r-l-0-mobile">
						{
							deviceChange ?<>
							<div className="footer__logo">
								<a href="/">
									<img src="/img/logos/white-dopop-logo.svg" className="footer-logo" alt="logo" id="logo_js_f" />
									{/* <img src="/img/logos/black-dopop-logo.svg" className="footer-brand" alt="logo" id="brand_js_f" /> */}
								</a>
							</div>
<div className="send-email-div">
								<input type="text" id="footer-send-email-input" style={{border:"none"}} placeholder="Your e-mail" />
									<a href="#" >
										Send
									</a>
								
								</div>
								</>
								:

								<div className="col-lg-4 space-y-20">
							<div className="footer__logo">
								<a href="/">
									<img src="/img/logos/white-dopop-logo.svg" className="footer-logo" alt="logo" id="logo_js_f" />
									{/* <img src="/img/logos/black-dopop-logo.svg" className="footer-brand" alt="logo" id="brand_js_f" /> */}
								</a>
							</div>
							<div className="send-email-div">
								<input type="text" id="footer-send-email-input" style={{border:"none"}} placeholder="Your e-mail" />
									<a href="#" >
										<CurtainBtn mode="light" moveEffect={false} />
										Send
									</a>
								
								</div>
							
							
							
							
						</div>

						}
						
						
						<div className="col-xl-2 col-lg-2 col-6 tablet-padding-left-zero">
							<h6 className="footer__title">Menu</h6>
							<ul className="footer__list">
							<li> <Link to="/explore">MarketPlace</Link> </li>
								
								<li> <Link to="/creators">Creators</Link> </li>
								<li> <Link to="/">Home</Link>
								</li>
								{
									screen.matches ? (<li> <Link to="/contact">Contact Us</Link> </li>)
									: null
								}
								{/* <li> <a href="Marketplace.html"> Marketplace
									</a>
								</li> */}
							</ul>
						</div>
						{
							screen.matches ? null :
							
						<div className="col-xl-2 col-lg-2 col-6">
							<h6 className="footer__title">Creator</h6>
							<ul className="footer__list">
								<li> <Link to="/login"> Sign In </Link>
								</li>
								<li> <Link to="/register"> Sign Up </Link> </li>
								<li> <Link to="/connectwallet"> Connect wallet
									</Link> </li>
								{/* <li> <a href="Item-details.html"> Item details </a>
								</li> */}
							</ul>
						</div>
						}
						{/* <div className="col-xl-2 col-lg-2 d-xl-block d-lg-none col-6">
							<h6 className="footer__title">Creator</h6>
							<ul className="footer__list">
								
								<li> <Link to="/login"> Sign In </Link>
								</li>
								<li> <Link to="/register"> Sign Up </Link> </li>
								<li> <Link to="/connectwallet"> Connect wallet
									</Link> </li>
							
							</ul>
						</div> */}
						<div className="col-xl-2 col-lg-2 d-xl-block d-lg-none col-6">
							<h6 className="footer__title">Pages</h6>
							<ul className="footer__list">
								<li> <a href="/contact">Contact Us</a></li>
							</ul>
						</div>
						
						<div className="col-xl-2 col-lg-4 tablet-padding-left-zero padding-right-zero-social">
						<div>
								<ul className="footer__social space-x-10 mb-25">
									<li> <a href=""> <i className="ri-facebook-line"></i> </a>
									</li>
									<li> <a href=""> <i className="ri-messenger-line"></i> </a>
									</li>
									<li> <a href=""> <i className="ri-whatsapp-line"></i> </a>
									</li>
									<li> <a href=""> <i className="ri-youtube-line"></i> </a>
									</li>
								</ul>
							</div>
							{
								screen.matches ? <hr/> : null
							}
							{
								screen.matches ? null :(
									<div>
									<a href="https://deveb.co"  id="copyright-web" target="_blank" className="copyright" style={{marginTop : "105px "  }}>
									Design & Development
									
									<a href="https://deveb.co" target="_blank">
									<img src="/img/logos/ourLogoWhite.svg" className="copyright-logo" id="copyright-logo-f" />
									</a>
									
								</a>
								</div>
								)
								
							}
							</div>
						{
							screen.matches ? (
								<div className=" col-12 col-sm-12 copyright-div">
									<div className="left-copyright">
											<Link to="/privacy" className="copyright">Privacy policy</Link>
											</div>
									<div className="right-copyright">
									<a href="https://deveb.co" target="_blank" className="copyright" >
									Design &
									Development
									<a href="https://deveb.co" target="_blank">

									<img src="/img/logos/ourLogoBlack.svg" className="copyright-logo" id="copyright-logo-f" />
									</a>

									</a>
										</div>
										
						
						</div>
							):
							null
						}
						
					</div>
					</div>
				</div>
			</footer>
    )
}

export default Footer
