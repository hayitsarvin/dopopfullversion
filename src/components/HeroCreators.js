import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/appcontext';

const HeroCreators = () => {
	const { isMobile } = useAppContext();
	// const x = window.matchMedia("(max-width: 992px)")
	// const [deviceChange , setDeviceChange] = useState(x.matches)

	// useEffect(() => {
	// 	window.addEventListener('resize',windowSizeChange);

	// 	return () => {
	// 		window.removeEventListener('resize',windowSizeChange)
	// 	}
		
	// },[x])

	// const windowSizeChange = () => {
	// 	x = window.matchMedia("(max-width: 992px)")
	// 	if(deviceChange === x.matches){
		
	// 	}else{
	// 		setDeviceChange(prev => x.matches)
			
	// 	}
	// }

	return (
			<div className="hero__creators">
				<div className="container">
						<div className="row hero align-items-center justify-content-between">
								<div className="col-lg-12">
										<div className="space-y-20" style={{textAlign: "center"}}>
												<h1>Top Selling Creators</h1>
												{/* <p className="hero__text sub-text">
														Dopop is home to best nft creators in the world.
												</p> */}
										</div>
								</div>
					{
						!isMobile ? (
							<div className="btn-div">	
								<Link className="btn btn-grad  btn-dark btn-hover" to="/register"> Be a creator
								</Link>
							</div>
						)
						: null
					}
								
						</div>
		
				</div>
		</div>
	)
}

export default HeroCreators
