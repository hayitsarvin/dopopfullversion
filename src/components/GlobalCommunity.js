import React from 'react'

const GlobalCommunity = () => {
    return (
        <div className="container">

			
				<div className="community">
				<div className="back-img-div" style={{top: "unset"}}>
				<img className="back-img"  src="/img/bg/back-effect.png" /> 
			</div>
			
					<div className="section__head space-y-20">
						<h3 className="section__title text-center">Global community</h3>
						<p className="section__text text-center sub-text"> Learn more about Dopop, chat
							with the team,
							other people in the community, and express your opinion on the
							future development of Dopop. </p>
					</div>
			
					<div className="community__items">
					
						<div className="row justify-content-center mb-20_reset">
							<div className="col-md-4 ">
								<div className="item space-y-10 back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg">
									<div className="logo is-github ">
										{/* <img src="img/icons/github.svg" alt="logo_community" /> */}
									</div>
									<h5 className="text-center">Github</h5>
									<p className="text-center">Understand the progress of our
										code and project</p>
								</div>
							</div>
							<div className="col-md-4">
								<div className="item space-y-10 back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg">
									<div className="logo is_twitter">
										{/* <img src="img/icons/twitter.svg" alt="logo_community" /> */}
									</div>
									<h5 className="text-center">Twitter</h5>
									<p className="text-center">Understand the progress of our
										code and project</p>
								</div>
							</div>
							<div className="col-md-4">
								<div className="item space-y-10 back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg">
									<div className="logo is_discord">
										{/* <img src="img/icons/discord.svg" alt="logo_community" /> */}
									</div>
									<h5 className="text-center">Discord</h5>
									<p className="text-center">Understand the progress of our
										code and project</p>
								</div>
							</div>
			
						</div>
					</div>
				</div>
			</div>
    )
}

export default GlobalCommunity
