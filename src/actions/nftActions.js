import axios from "axios"
import nfts from "../data/nfts"
export const listNfts =  () => async ( dispatch) => {
    try {
        dispatch({type: 'NFT_LIST_REQUEST'})
        // const {data} = await axios.get('https://nftmarketplaceapp.herokuapp.com/api/nfts')
        const data = await nfts;
        dispatch({type: 'NFT_LIST_SUCCESS', payload: data})

    } catch (error) {

    }
}
export const singleNft =  (id) => async ( dispatch) => {
    try {
        dispatch({type: 'NFT_SINGLE_REQUEST'})
        // const {data} = await axios.get(`https://nftmarketplaceapp.herokuapp.com/api/nfts/${id}`)
        const data = await nfts.find(nft => nft._id == id);

        dispatch({type: 'NFT_SINGLE_SUCCESS', payload: data})

    } catch (error) {

    }
}
export const PlaceBidPopupAction =  (toggle) => async ( dispatch, getState) => {
        if(toggle){

            dispatch({type: 'PLACE_BID_OPEN'})
        }else{
            dispatch({type: 'PLACE_BID_CLOSE'})
        }


    
}

export const PlaceBidNftAction =  (id) => async ( dispatch, getState) => {
    try {

        dispatch({type: 'PLACE_BID_REQUEST'})
        // const {data} = await axios.get(`https://nftmarketplaceapp.herokuapp.com/api/nfts/${id}`)
        const data = await nfts.find(nft => nft._id == id);

        dispatch({type: 'PLACE_BID_SECCESS' , payload: data})

    }catch (error){
    }



}
export const BuyPopupAction =  (toggle) => async ( dispatch, getState) => {
    if(toggle){

        dispatch({type: 'BUY_POPUP_OPEN'})
    }else{
        dispatch({type: 'BUY_POPUP_CLOSE'})
    }



}
export const BuyNftAction =  (id) => async ( dispatch, getState) => {
    try {

        dispatch({type: 'BUY_NFT_REQUEST'})
        // const {data} = await axios.get(`https://nftmarketplaceapp.herokuapp.com/api/nfts/${id}`)
        const data = await nfts.find(nft => nft._id == id);

        dispatch({type: 'BUY_NFT_SECCESS' , payload: data})

    }catch (error){
    }


}