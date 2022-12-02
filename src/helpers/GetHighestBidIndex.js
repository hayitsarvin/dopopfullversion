const GetHighestBidIndex = (bids) => {
    var max = 0;
    var index = 0;
   bids.map((bid , i) => {
        if(bid.bid_price > max){
            index = i
            max = bid.bid_price
        }
    })
    return index
}
export default GetHighestBidIndex