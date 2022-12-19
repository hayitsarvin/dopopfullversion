import React, { useEffect, useState , useRef} from 'react'
import { Link } from 'react-router-dom'
import DarkMode from './DarkMode'
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import CurtainBtn from '../helpers/CurtainBtn';
var openHam = false
var hideMode = false
function useOutsideAlerter(ref, set) {
	useEffect(() => {
	  /**
	   * Alert if clicked on outside of element
	   */
	  function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
		//   alert("You clicked outside of me!");
		var burgerO = document.querySelector(".js-header-burger");
		var mobileO = document.querySelector(".js-header-mobile");
		var body = document.querySelector("body");
		body.classList.remove('my-overflow-hidden');

		burgerO.classList.remove('active');
		mobileO.classList.remove('visible');
		set(false)

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
const Header = () => {
	const headerRef = useRef();
const q = gsap.utils.selector(headerRef);
	const [hideMode , setHideMode] = useState(false)
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
	// We execute the same script as before
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
	const location = useLocation();
	const [searchValue , setSearchValue] = useState("")
	// burger.on('click', function (e) {
	// 	e.stopPropagation();
	var x = window.matchMedia("(max-width: 992px)")
	const [deviceChange , setDeviceChange] = useState(x.matches)

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
	const header = document.querySelector(".header__1");


		if(location.pathname.includes("/creators/") || location.pathname.includes("/artdetail/")){
			
			header.classList.add("active")
	
	}
	const scroll = new LocomotiveScroll();
	scroll.on('scroll', (args) => {
		
	});
	
	
	})
	useEffect(() => {
	const header = document.querySelector(".header__1");

		if(x.matches){
			header.classList.add("active")

			
		}
		else{
			header.classList.remove("active")

		}
	},[x])
	const burgerClickHandler =(e) => {
		var input = document.querySelector(".header__mobile__menu input");
		
		e.stopPropagation();
		if(e.target == input){
			
		}else{
			var burger = document.querySelector(".js-header-burger");
			var mobile = document.querySelector(".js-header-mobile");
			var body = document.querySelector("body");
			var header = document.querySelector("header");
			// var menu = document.querySelector(".header__mobile__menu");
	
			burger.classList.toggle('active');
			mobile.classList.toggle('visible');
			body.classList.toggle('my-overflow-hidden');
			header.classList.toggle('back-blur-none');
			// menu.classList.toggle('opacity-1')
			// hideMode = true
			setHideMode(prev => !prev)
			// if(!openHam){
			// 	burger.classList.add('active');
			// 	mobile.classList.add('visible');
			// }else{
			// 	burger.classList.remove('active');
			// 	mobile.classList.remove('visible');
			// }
			// openHam = !openHam
			// console.log("last :" , openHam)
		}
		

		
		
	}
	const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef , setHideMode);
    return (
        
            <header className="header__1 js-header " id="header" ref={headerRef}>
				<div className="container">
					<div className="wrapper js-header-wrapper">
						<div className="header__logo">
							<Link to="/">
								<img
									className="header__logo"
									id="logo_js"
									src="/img/logos/new-logo-white.svg"
									alt="logo"
									/>
									{/* <img
									className="header-brand-name"
									id="brand_js"
									src="/img/logos/darkBrandName.svg"
									alt="logo"
									/> */}
							</Link>
						</div>

						<div className="header__menu">
							<ul className="d-flex space-x-20">
								<li >
									<Link className={location.pathname == "/" ? "color_black active" : "color_black"} to="/">Home</Link>
								</li>
								<li>
									<Link className={location.pathname == "/explore" ? "color_black active" : "color_black"} to="/explore">Marketplace</Link>
								</li>
								{/* <li>
									<Link className={location.pathname == "/" ? "color_black active" : "color_black"} to="Collections.html">Collections</Link>
								</li> */}
								{/* <li>
									<Link className={location.pathname == "/" ? "color_black active" : "color_black"} to="Profile.html">Profile</Link>
								</li> */}
								<li>
									<Link className={location.pathname == "/creators" ? "color_black active" : "color_black"} to="/creators">Creators</Link>
								</li>
								<li>
									<Link className={location.pathname == "/contact" ? "color_black active" : "color_black"} to="/contact">Contact Us</Link>
								</li>
								{/* <li>
									<Link className="color_black" to="/FAQ">FAQ</Link>
								</li> */}
							</ul>
						</div>
						
								<div className="header-search-btns-div">
								<div className="header__search">
							
							<input type="text"  placeholder="Search" onChange={(e) => setSearchValue(e.target.value)}/>
							<Link to={`/explore?name=${searchValue}`}>
							<button className="header__result" >
								<i className="ri-search-line"></i>
							</button>
							</Link>
						</div>
						
						<div className="header__btns">
						{/* <DarkMode screen={false}/>

							<Link to="/login" id="connectbtn">
								<img width="35" src="img/icons/metamask.svg" alt="" />
							</Link> */}


							<Link to="/connectwallet" id="header-connect-wallet-btn">
								<CurtainBtn mode="light"/>
								<div className="header-btn-text">

									Connect Wallet
								</div>

							</Link>

						</div>
									</div>
						
						
						{
							deviceChange ? (
							<div ref={wrapperRef}>
						{deviceChange ? 
						(
							<>
							{
								!hideMode ? (
									null
								) : (
<div className="right-side" style={{zIndex:"10"}}>
								<DarkMode screen={true}/>
								</div>
								)
							}
								
							</>
						) : null}
						<div className="header__burger js-header-burger" onClick={(e) => burgerClickHandler(e,openHam)}></div>
						
						<div className="header__mobile js-header-mobile back-blur  back-glass-effect " onClick={(e) => burgerClickHandler(e)} >
							<div className="header__mobile__menu   space-y-80">
							<div className="space-y-20 container" style={{padding: 0}}>
									<div className="header__search  in_mobile w-full" id="header-search" style={{backgroundColor:"transparent"}}>
										<input type="text" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)}/>
										<Link to={`/explore?name=${searchValue}`}>

										<button className="header__result" >
											<i className="ri-search-line"></i>
										</button>
										</Link>

									</div>
									
								</div>
								<ul className="d-flex space-y-30 container" style={{padding: 0}}>
								<li> <Link className={location.pathname == "/" ? "color_black active" : "color_black"}  to="/" onClick={(e) => burgerClickHandler(e)}> Home</Link> </li>

									<li> <Link className={location.pathname == "/explore" ? "color_black active" : "color_black"} to="/explore" onClick={(e) => burgerClickHandler(e)}> Marketplace</Link> </li>
									<li> <Link className={location.pathname == "/creators" ? "color_black active" : "color_black"} to="/creators" onClick={(e) => burgerClickHandler(e)}> Creators</Link> </li>
									<li> <Link className={location.pathname == "/contact" ? "color_black active" : "color_black"} to="/contact" onClick={(e) => burgerClickHandler(e)}>Contact Us</Link> </li>
									{/* <li> <Link className="color_black" to="/login" onClick={(e) => burgerClickHandler(e)}>Sign in</Link> </li> */}
									{/* <li> <Link className="color_black" to="/register" onClick={(e) => burgerClickHandler(e)}>Sign Up</Link> </li> */}
									<li> <Link className={location.pathname == "/connectwallet" ? "color_black active" : "color_black"} to="/connectwallet" onClick={(e) => burgerClickHandler(e)}>Connect wallet</Link></li>
						
								</ul>
								<div className="headers-btns-div ">
									<Link onClick={(e) => burgerClickHandler(e)} className="btn  header-btn header-btn-signup" to="/register">Sign up</Link>

									<Link onClick={(e) => burgerClickHandler(e)} className="btn  header-btn header-btn-signin" to="/login">Login</Link>
									</div>
							</div>
						</div>
						</div>
							) : (
								null
							)
						}
						

					</div>
				</div>
			</header>
        
    )
}

export default Header
