import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'

const HeroPopularCreatorCart = (props) => {
	const {user} = props
	var x = window.matchMedia("(max-width: 990px)")
	useEffect(() => {
		window.addEventListener('resize', () => {

			x = window.matchMedia("(max-width: 990px)")
		}
		);
		
	},[x])
    return (
		<div className="creator-card-border-div">
		<div className="creator-card-border">
		</div>
		<Link to={`/creators/${user._id}`} >
		

        <div className="creator_item creator_item_threejs creator_card space-y-10 is_big hero_popular_creator_card back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg">
		
							<div className="avatars flex-column space-y-10">
								<div className="media">
									<Link to={"/creators/"+user._id}>
										<img src={user.avatar} alt="Avatar" className="avatar avatar-md" />
									</Link>
									{/* <div className="has_number">
										1
									</div> */}
								</div>
								<div className="text-center  hero-creator-info-div">
									<Link to={`/creators/${user._id}`}>
										<p className="avatars_name large color_black">{user.name}</p>
									</Link>
									
									<span className="sales color_text">{user.total_sold_nft} sales on {
										x.matches ? <br />
										: null
									}<span>{user.total_sold_price} ETH</span></span>
								</div>
							</div>
						</div>
		</Link>
		</div>
		
    )
}

export default HeroPopularCreatorCart
