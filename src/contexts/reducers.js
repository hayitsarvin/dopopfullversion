export const menuReducer = (state, action)=>{

    if (action.type === 'SET_MOBILE_TRUE'){
        return {...state, isMobile: true}
       }
       if (action.type === 'SET_MOBILE_FALSE'){
        return {...state, isMobile: false}
       }
       if(action.type === "RESET_LOCO"){
        // console.log(state.resetLoco, "loco")
        return {...state, resetLoco: !state.resetLoco}
      }
       return state;
}