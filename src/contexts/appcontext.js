import React, {useEffect, useContext, useReducer} from 'react';
import {menuReducer} from './reducers.js';
const AppContext = React.createContext();
const initState ={
    isMobile: "",
    resetLoco:false,
    
  }
export const AppProvider=({children})=>{
    const [state, dispatch] = useReducer(menuReducer, initState);
    const setMobileTrue =()=>{
        dispatch({type:'SET_MOBILE_TRUE'})
      }
      const setMobileFalse =()=>{
        dispatch({type:'SET_MOBILE_FALSE'})
      }
      const setReset =()=>{
        dispatch({type:'RESET_LOCO', })
      }
      return(
        <AppContext.Provider value={{ ...state, setMobileTrue,
          setMobileFalse , setReset}}
        >
          {children}
        </AppContext.Provider>
      )
}
export const useAppContext = ()=>{
    return useContext(AppContext)
  }