import React ,{useEffect , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listNfts } from '../actions/nftActions'
import CurtainBtn from '../helpers/CurtainBtn'
import Loading from './Loading'
import TopGalleryCart from './TopGalleryCart'
const TopGallery = () => {
	const dispatch = useDispatch()
	const nftList = useSelector(state => state.nftList)
	const {loading , nfts} = nftList
	const [nftAuctionList , setNftAuctionList] = useState([])
	var x = window.matchMedia("(max-width: 990px)")
	var tablet = window.matchMedia("(min-width: 600px) and (max-width: 990px)")
	
	useEffect(() => {
		window.addEventListener('resize', () => {

			x = window.matchMedia("(max-width: 990px)")
	 tablet = window.matchMedia("(min-width: 600px) and (max-width: 990px)")

		}
		);
		
	},[x])
	useEffect(() => {
		dispatch(listNfts())
		
	}, [dispatch])
	useEffect(() => {
		sortNftList()
	}, [nfts.length])
	const sortNftList = () => {
		setNftAuctionList(prev => {
			const temp = nfts.filter(nft => nft.is_auction == true)
			temp.sort(function(a, b){return b.likes - a.likes})
			if(x.matches){
				if(tablet.matches){
					return (
						temp.slice(0,4)
					)
				}else{
					return (
						temp.slice(0,3)
					)
				}
				
			}else{
				return (
					temp.slice(0,4)
				)
			}
			
		})

		
	}
    return (
		<>
		{
			loading ? <Loading /> :
			(
<div id="topGallery" className="section__artists mt-100 py-100 bg-white color-back-change"  data-color="green">
{/* <div className="back-img-div">
				<img className="back-img" src="/img/bg/back-effect.png" /> 
			</div> */}
			{/* <div className="back-img-div-left">
				<img className="back-img"  src="/img/bg/back-effect.png" /> 
			</div> */}
        <div className="container ">
					<div className="space-y-30">
						<div className="section_head">
							<h2 className="section__title">Live auctions</h2>
						</div>
						<div id="id-cart-padding" className="row mb-30_reset my-cart-padding">
							{
								nftAuctionList.map((n , i)=> {
									return (
										<div className={ i == 1 ? "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 img-po" : "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 "}  key={n._id}>	
										<TopGalleryCart nft={n}/>
										</div>
									)
								})
							}
							
							
						</div>
			
					</div>
				
				</div>
				<div className="d-flex justify-content-center mt-30 margin-top-3-percent">
								<Link to="/explore" className="btn btn-sm
									btn-white view-all-btn">
							<CurtainBtn mode="todayspick-btn-color"/>

									 View all items
								</Link>
							</div>
                </div>
			)
		}
        
				</>
    )
}

export default TopGallery
