import React from 'react';
import { Link } from 'react-router-dom';
import { LikesCount } from '../helpers/LikesCount'

const Likes = (props) => {
    const {likes} = props
  return (
    <Link to="/login" className="likes space-x-3 back-blur back-glass-effect back-glass-darker">
    <img className="like-icon-img like-border" src="/img/icons/heart.png" />
    <img className="like-icon-img like-fill" src="/img/icons/heart-fill.png" />
    {/* <img src="/img/icons/heart-icon.png" /> */}
    <span className="txt_sm">{LikesCount(likes)}</span>
</Link>
    // <button className="wishlist-button heart"><i className="ri-heart-3-fill"></i><span className="number-like"> {LikesCount(likes)}</span></button>
    );
};

export default Likes;
