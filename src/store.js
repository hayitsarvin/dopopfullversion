import {createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { nftListReducer, nftSingleReducer , placeBidPopupReducer , BuyPopupReducer } from "./reducers/NftReducers"
import { userListReducer , userSingleReducer } from "./reducers/UserReducers"
import { placeBidNftReducer , BuyNftReducer } from "./reducers/NftReducers"
const reducer = combineReducers({
    nftList: nftListReducer,
    singleNft: nftSingleReducer,
    placeBidPopup: placeBidPopupReducer,
    userList: userListReducer,
    userSingle: userSingleReducer,
    buyPopup: BuyPopupReducer,
    placeBidNft: placeBidNftReducer,
    buyNft: BuyNftReducer
})


const initialState = {}
const middleware = [thunk]

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store;