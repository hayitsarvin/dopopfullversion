import React from 'react'
import { Link } from 'react-router-dom'

const PopularCreatorCart = (props) => {
	const {user} = props
    return (
		<Link className='creator-popular-link' to={`/creators/${user._id}`}>
			<div className='creator-popular-back'></div>

        <div className="creator_item creator_card rounded_border space-x-10 back-blur back-glass-effect bg-color-dark bg-cart-dark-color not-blur-bg">
											<div className="avatars space-x-10">
												<div className="media">
													{/* <div className="badge">
														<img src="img/icons/Badge.svg" alt="" />
													</div> */}
													<Link to={`/creators/${user._id}`}>
														<img
															src={user.avatar}
															alt="Avatar"
															className="avatar avatar-md"
														/>
													</Link>
												</div>
												<div className="creator-info-div">
													<Link to={`/creators/${user._id}`}><p className="avatars_name color_black">@{user.name}</p></Link>
													<span className="price color_blue">{user.total_sold_price} ETH</span>
												</div>
											</div>
										</div>
										</Link>
    )
}

export default PopularCreatorCart
