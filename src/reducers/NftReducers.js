export const nftListReducer = (state = {nfts: []}, action) => {
    switch (action.type) {
        case 'NFT_LIST_REQUEST':
            return { loading: true ,nfts: []}
        case 'NFT_LIST_SUCCESS':
            return {loading: false , nfts: action.payload}
        case 'NFT_LIST_FAIL':
            return {loading:false , error: action.payload}
        default:
            return state
    }
}
export const nftSingleReducer = (state = {nft: {}}, action) => {
    switch (action.type) {
        case 'NFT_SINGLE_REQUEST':
            return { loading: true ,nft: {}}
        case 'NFT_SINGLE_SUCCESS':
            return {loading: false , nft: action.payload}
        case 'NFT_SINGLE_FAIL':
            return {loading:false , error: action.payload}
        default:
            return state
    }
}

export const placeBidPopupReducer = (state = {open: false}, action) => {
    switch (action.type) {
        case 'PLACE_BID_OPEN':
            return { open: true}
        case 'PLACE_BID_CLOSE':
            return { open: false}

        default:
            return state
    }
}

export const placeBidNftReducer = (state = {nft: {bids:[]}}, action) => {
    switch (action.type) {
        case 'PLACE_BID_REQUEST':
            return {loading:true, nft: {bids:[]}}
        case 'PLACE_BID_SECCESS':
            return {loading:false, nft: action.payload}

        default:
            return state
    }
}
export const BuyPopupReducer = (state = {open: false}, action) => {
    switch (action.type) {
        case 'BUY_POPUP_OPEN':
            return { open: true}
        case 'BUY_POPUP_CLOSE':
            return { open: false}

        default:
            return state
    }
}
export const BuyNftReducer = (state = {nft: {}}, action) => {
    switch (action.type) {
        case 'BUY_NFT_REQUEST':
            return {loading:true, nft: {}}
        case 'BUY_NFT_SECCESS':
            return {loading:false, nft: action.payload}

        default:
            return state
    }
}