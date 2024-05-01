import { createContext, useReducer, useEffect } from "react"
import commonReducer from "./CommonReducer"


const INITIAL_STATE = {
	showLoading: false
};

export const CommonContext = createContext( INITIAL_STATE );

export const CommonContextProvider = ( { children } ) =>
{
	const [ state, dispatch ] = useReducer( commonReducer, INITIAL_STATE );


	return (
		<CommonContext.Provider
			value={ {
				showLoading: state.showLoading,
				dispatch
			} }>
			{ children }
		</CommonContext.Provider>
	)
}