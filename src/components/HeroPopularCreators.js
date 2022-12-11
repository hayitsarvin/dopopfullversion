import React,{useEffect, useState} from 'react'
import HeroPopularCreatorCart from './HeroPopularCreatorCart'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listUser } from '../actions/userActions'
import CurtainBtn from '../helpers/CurtainBtn'
const HeroPopularCreators = () => {
	useEffect(() => {
		var mobileCheck = window.matchMedia("(max-width: 992px)")

		if(!mobileCheck.matches){
			const hoverBg =  document.querySelector("#btn-three-creators-test")
			
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

	const dispatch = useDispatch()
	const userList = useSelector(state => state.userList)
	const {loading , users} = userList
	const [topUsers , setTopUsers] = useState([])

	useEffect(() => {
		dispatch(listUser())

	}, [dispatch])
	useEffect(() => {
	
		setTopUsers(prev => {
			users.sort(function(a, b){return b.total_sold_price - a.total_sold_price})
			return (
				users.slice(0,4)
			)
		})

}, [users.length])
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
		if(x.matches){
			const slider = document.querySelector('.creators-hero-padding');
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
			slider.addEventListener('mouseup', () => {
			  isDown = false;
			  slider.classList.remove('active');
			});
			slider.addEventListener('mousemove', (e) => {
			  if(!isDown) return;
			  e.preventDefault();
			  const x = e.pageX - slider.offsetLeft;
			  const walk = (x - startX) * 2; //scroll-fast
			  slider.scrollLeft = scrollLeft - walk;
			  
			});
		}
		
	} , [x])
    return (
        <div className="container hero-creators-div">
			{/* <div className="back-img-div-left" >
				<img className="back-img" src="/img/bg/Group-132-blur.png" /> 
			</div> */}
			{/* <div className="back-img-div" >
				<img className="back-img" src="/img/bg/Group-132-blur.png" /> 
			</div> */}
				<div className="row creators-hero-padding">
					{/* <div className="col-lg-1"></div> */}
					{
						topUsers.map(user => {
							if(deviceChange){
								return (
									
									<div className=" col-6 col-md-4 col-sm-4">
										<HeroPopularCreatorCart user={user}/>
									</div>
								)
							}else{
								return (
									<div className="col-lg-3 col-md-4 col-3">
										<HeroPopularCreatorCart user={user}/>
									</div>
								)
							}
							
						})
					}
					{/* <div className="col-lg-1"></div> */}

				</div>
				{
					deviceChange ? <div className="mt-50 m-top-52  btn-div" style={{textAlign:"center"}}>
						<div className="my-btns-div">

					<Link className="btn btn-grad btn-dark btn-threejs btn-hover-tablet" to="/register" ></Link>
					<p className="my-btns-text">Be a creator</p>
					</div>
				</div>
				 :
					(
						<div className="mt-60 m-top-52  btn-div" style={{textAlign:"center"}}>	
								<div className="my-btns-div">

									<Link id="btn-three-creators-test" className="btn btn-grad btn-threejs btn-dark btn-hover" to="/register" >
										<CurtainBtn mode="creator-hero-btn-color"/>
									</Link>
									<p className="my-btns-text">Be a creator</p>
									</div>
								</div>
					)
				}
								
			</div>
    )
}

export default HeroPopularCreators
