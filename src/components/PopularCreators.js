import React,{useEffect, useRef, useState} from 'react'
import PopularCreatorCart from './PopularCreatorCart'
import { useSelector, useDispatch } from 'react-redux'
import { listUser } from '../actions/userActions'
import gsap from "gsap"
import ScrollTrigger from 'gsap/ScrollTrigger'
import Loading from './Loading'
import { nodeName } from 'jquery'
import { useAppContext } from '../contexts/appcontext'
function PopularCreators(props) {
	const { isMobile } = useAppContext();

	// var x = window.matchMedia("(max-width: 992px)")
    // useEffect(() => {
	// 	window.addEventListener('resize', () => {
	// 		x = window.matchMedia("(max-width: 992px)")
		
	// 	}
	// 	);
		
	// },[x])
	gsap.registerPlugin(ScrollTrigger);
	var screen = window.matchMedia("(max-width: 530px)")

	const popularCreatorsRef = useRef()
	const q = gsap.utils.selector(popularCreatorsRef)
	const dispatch = useDispatch()
	const userList = useSelector(state => state.userList)
	const {loading , users} = userList
	const [topUsers , setTopUsers] = useState([])
	useEffect(() => {
		dispatch(listUser())

	}, [dispatch])
	const ChangeScreen = () => {
		screen = window.matchMedia("(max-width: 530px)")

	}
	useEffect(() => {
		window.addEventListener('resize', ChangeScreen);
		return()=>{
		window.removeEventListener('resize', ChangeScreen);

		}
	},[screen])
	
	useEffect(() => {
	
			setTopUsers(prev => {
				users.sort(function(a, b){return b.total_sold_price - a.total_sold_price})
				return (
					users
				)
			})

	}, [users.length])
	useEffect(() => {
		ScrollTrigger.refresh();
		// var tl = gsap.timeline({ ease:"none" });
		// tl.to(q(".creators_anim1"), {xPercent: screen.matches ? 20 : 40 ,scrollTrigger: {
		// 	trigger:	"#popularCreators",
		// 	start: "top bottom",
		// 	end: "bottom+=50 top",
		// 	scrub:true,
		// 	scroller: "#viewport"


		// }})

		const ani1 = gsap.to([q(".creators_anim1"),q(".creators_anim3")], {
			xPercent: screen.matches ? 40 : 30,
			ease:"none",
			// duration: 3,
			scrollTrigger: {
				trigger:	"#popularCreators",
				start: "top bottom",
        		end: "bottom+=50 top",
				scrub:true,
		
			}
		});
		const ani2 = gsap.to(q(".creators_anim2"), {
			xPercent: screen.matches ? -40 : -20,
			ease:"none",

			// duration: 1,
			scrollTrigger: {
				trigger: "#popularCreators",
				start: "top bottom",
       			 end: "bottom+=50 top",
				scrub: true,
				
			}
			
		});

		return () => {
			
			ani1.scrollTrigger.kill(true);
			ani2.scrollTrigger.kill(true);
		}
	},)

    return (
		<>
		
			
				<div id="popularCreators" data-scroll className="section__creators mt-100 color-back-change" data-color="red" data-opacity="0.2" ref={popularCreatorsRef}>
				<div className="container" >
				{/* <div className="back-img-div" style={{top: "0"}}>
				<img className="back-img back-img-4" src="/img/bg/back-effect.png" /> 
			</div> */}
					<div className="space-y-30">
						{
							props.show ? (
<div className="section_head">
							<h2 className="section__title text-center">Popular Creators</h2>
						</div>
							) : 
							(
								null
							)
						}
						
						<div className={screen.matches ? "section__body space-y-10" : "section__body space-y-10"}>
							
							<div className="d-flex space-x-10 justify-content-center
								creators_anim1">
								{
									(topUsers.slice(0,10)).map(user => {
										return (
								       <PopularCreatorCart user={user} key={user._id}/>

										)
									})
								}
								
								
								{/* second row */}
							</div>
							<div className="-ml-70 creators_anim2">
								<div className="d-flex space-x-10 justify-content-center">
								{
									(topUsers.slice(10,20)).map(user => {
										return (
								       <PopularCreatorCart user={user} key={user._id}/>

										)
									})
								}
								
								
									
									
									
									
									
									
									
									
								</div>
							</div>
							
                            {/* third row */}
							<div className="d-flex space-x-10 justify-content-center
								creators_anim3">
								{
									(topUsers.slice(20,30)).map(user => {
										return (
								       <PopularCreatorCart user={user} key={user._id}/>

										)
									})
								}
								
								
								
								
								
								
								
								
								
							</div>
						</div>
			
					</div>
				</div>
			</div>
			
		
        </>
    )
}

export default PopularCreators
