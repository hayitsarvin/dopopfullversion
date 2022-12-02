import React,{useState , useEffect,useRef} from 'react'
import DiscoverCreatorCart from './DiscoverCreatorCart'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery';
import { listUser } from '../actions/userActions'
import gsap from 'gsap'
var closeOrderTap ;
function useOutsideAlerter(ref) {
	useEffect(() => {
	  /**
	   * Alert if clicked on outside of element
	   */
	  function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
		//   alert("You clicked outside of me!");
		  closeOrderTap()
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
const DiscoverAllCreators = () => {
	var x = window.matchMedia("(max-width: 992px)")
	useEffect(() => {
		window.addEventListener('resize', () => {

			x = window.matchMedia("(max-width: 992px)")
		}
		);
		const titlePopup = document.querySelector(".section__creators .discover-span")
		// const titleDiv = document.querySelector(".hero__collections")
		
		const Popup = document.querySelector(".section__creators  .order-type-dropdown ")
		// Popup.style.left = `${titlePopup.getClientRects()[0].left}px`;
		// Popup.style.top = `${titleDiv.getBoundingClientRects()[0].bottom}px`;

		console.log("1" ,$(".section__creators .discover-span").offset() ,$(".section__creators .discover-span").outerHeight(true))
		gsap.set(Popup , {left:($(".section__creators .discover-span").position().left + (x.matches ? 12 : 0)), top: ($(".section__creators .discover-span").position().top + $(".section__creators .discover-span").outerHeight(true)) + 10})
		console.log("Pop",Popup)
	},[x])
	closeOrderTap = () => {
		setOrderOpen(false)
	}
	const [usersList , setUsersList] = useState([])
	const [sortOpen , setSortOpen] = useState(false)
	const [sortType , setSortType] = useState("Popular")
	const [orderOpen , setOrderOpen] = useState(false)
	const [orderType , setOrderType] = useState("Popular")
	const dispatch = useDispatch()
	const userList = useSelector(state => state.userList)
	const [userSearch , setUserSearch] = ("")
	const {loading , users} = userList
	useEffect(() => {

			dispatch(listUser())

			

	}, [])
	useEffect(() => {
	
		setUsersList(prev => {
			users.sort(function(a, b){return b.total_sold_price - a.total_sold_price})
			return (
				users
			)
		})


}, [users.length])
	const sortNftList = (type) => {
		const temp = users
		setSortType(type)
		if(type == "Popular"){
			
			setUsersList(prev => temp.sort(function(a, b){return b.total_sold_price -a.total_sold_price}))

		}else if(type == "Recent"){
			setUsersList(prev => temp.reverse())

		}else if(type == "Top Rated"){
			setUsersList(prev => temp.sort(function(a,b) {
				return (b.views) - (a.views)
			}))

		}
	}
	const SearchChangeHandler = (value) => {
		const temp = users
		setUsersList(prev => temp.filter(user => user.name.toLowerCase().includes(value.toLowerCase())))

	}
	useEffect(() => {
		if(sortOpen){
			document.querySelector('.dropdown-toggle').classList.add("arrow-up")
		}else{
			document.querySelector('.dropdown-toggle').classList.remove("arrow-up")
		}
	},[sortOpen])
	const orderDivRef = useRef(null);
  useOutsideAlerter(orderDivRef);
    return (
        <div className="section__creators mt-200">
				<div className="container p-0">
					<div  className={x.matches ? "space-y-30 container" : "space-y-30" }>
						<div className="section_head">
							<div className="row justify-content-between
								align-items-center">
								<div className="col-lg-8 col-md-6 col-sm-7 moblie-full-width-630">
									<h2 className="section__title"><span  ref={orderDivRef} className="discover-span" onClick={() => {setOrderOpen(prev => !prev)}}>{x.matches ? (orderType == "Top Rated" ? "Top Rtd" : orderType) : orderType}<img className="arrow-down" src="/img/icons/arrow-down.svg" /></span>Creators</h2>
								</div>
								<div className={orderOpen ? "order-type-dropdown active" : "order-type-dropdown dn" } onClick={() => {setOrderOpen(false) }} >
											<a className={sortType === "Popular" ? "dropdown-item active-item" :"dropdown-item"} onClick={(e) => {setOrderType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)}}  href="#">Popular</a>
											<a className={sortType === "Recent" ? "dropdown-item active-item" :"dropdown-item"} onClick={(e) => {setOrderType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)}}  href="#">Recent</a>
											<a className={sortType === "Top Rated" ? "dropdown-item active-item" :"dropdown-item"} onClick={(e) => {setOrderType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)}} href="#">Top Rated</a>
										</div>
								
								<div className="col-lg-3 col-md-6 col-sm-6 width-60">
									<div className="search" id="creator-search" style={{borderRadius:"50px"}}>
										<input type="text" style={{border: "1px solid white" , borderRadius:"50px"}} placeholder="Search" onChange={(e) => SearchChangeHandler(e.target.value)} className="bg_white" style={{background:"white !important" }} />
										<button className="result">
											<i className="ri-search-line"></i>
										</button>
									</div> 
								</div>
			
								<div className="col-lg-1 width-40 display-none">
									<div className="dropdown">
										<button className="btn btn-primary btn-sm
											dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => {setSortOpen(prev => !prev)}}>
											{sortType}
										</button>
										<div className="dropdown-menu dropdown-position" onClick={() => {setSortOpen(false) }}  style={sortOpen ? {display: "block"} : {display: "none"}}>
											<a className={sortType === "Popular" ? "dropdown-item active" :"dropdown-item"} onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)}}  href="#">Popular</a>
											<a className={sortType === "Popular" ? "dropdown-item active" :"dropdown-item"} onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)}}  href="#">Recently Joined</a>
											<a className={sortType === "Popular" ? "dropdown-item active" :"dropdown-item"} onClick={(e) => {setSortType(e.target.innerText); e.preventDefault(); sortNftList(e.target.innerText)}} href="#">Top</a>
										</div>
									</div>
								</div>
			
							</div>
						</div>
						<div className="section__body space-y-20">
							<div className="row mb-20_reset">
								
								{
									loading ? "loading" :(usersList.map(u => {
										
										return(
											<div className="col-lg-3 col-lg-4 col-md-6 col-sm-6">
												<DiscoverCreatorCart user={u} />
											</div>
										)
										
									}))
									
								}
							</div>
			
						</div>
			
					</div>
				</div>
			</div>
    )
}

export default DiscoverAllCreators
