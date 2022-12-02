import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import CurtainBtn from '../helpers/CurtainBtn'
import gsap from 'gsap'
const MarketData = () => {
	// useEffect(() => {

	// 	const hoverBg =  document.querySelector("#btn-test-three-test")
	// 	console.log("testtttt", hoverBg)
	// 	const onMouseHover = () => {

	// 		gsap.to( hoverBg, {
	// 		  scaleX: 1.15,
	// 		  scaleY: 0.97,
	// 		  ease: 'elastic.out(1, 0.4)',
	// 		  duration: 1.3
	// 		})
		
	// 		// Curtains passing in bg
			
	// 	  }

	// 	  const onMouseOut = () => {

	// 		// Jelly Effect for BG
	// 		gsap.to( hoverBg, {
	// 		  scaleX: 1,
	// 		  scaleY: 1,
	// 		  ease: 'elastic.out(1, 0.4)',
	// 		  duration: 1.3
	// 		})
		
	// 		// Curtains passing in bg
		
		
	// 	  }
	// 	  hoverBg.addEventListener('mouseover', onMouseHover)
	// 	hoverBg.addEventListener('mouseout', onMouseOut)
	// },[])
    return (
        <div className="container market-data-page color-back-change" data-color="market-data-section" data-opacity="0.6" style={{position:"relative"}}>
			{/* <div className="back-img-div-left" style={{top: "-100%"}}>
				<img className="back-img" src="/img/bg/Group-132-blur.png" /> 
			</div>
			<div className="back-img-div" style={{top: "-100%"}}>
				<img className="back-img" src="/img/bg/Group-132-blur.png" /> 
			</div> */}
			    <div className="logos__wrap pull-mt market-div" style={{backgroundColor: "transparent" , border: "none" , boxShadow: "none"}}>
			        <div className="row align-items-center   justify-content-center">
			            <div className="col-lg-8 market-data-div">
			                <h3 className="section__title market-data-text md:mb-20">Pull market data from our
			                    digital asset API</h3>
			            </div>
			            <div className="connect-wallet-btn-div">
						<div    className="my-btns-div">

			                <Link id="btn-test-three-test"  className="btn btn-grad " to="/connectwallet">
							<CurtainBtn mode="creator-hero-btn-color"/>

							</Link>
							<p className="my-btns-text">Connect wallet</p>
							</div>
			            </div>
			        </div>
			    </div>
			</div>
    )
}

export default MarketData
