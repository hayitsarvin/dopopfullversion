import axios from "axios"
import users from "../data/users"

export const listUser =  () => async ( dispatch) => {
    try {
        dispatch({type: 'USER_LIST_REQUEST'})
        // const {data} = await axios.get('https://nftmarketplaceapp.herokuapp.com/api/users')
        const data = await users;


        dispatch({type: 'USER_LIST_SUCCESS', payload: data})

    } catch (error) {

    }
}
export const singleUser =  (id) => async ( dispatch) => {
    try {
        dispatch({type: 'USER_SINGLE_REQUEST'})
        // const {data} = await axios.get(`https://nftmarketplaceapp.herokuapp.com/api/users/${id}`)
        const data = await users.find(user => user._id == id );


        dispatch({type: 'USER_SINGLE_SUCCESS', payload: data})

    } catch (error) {

    }
}