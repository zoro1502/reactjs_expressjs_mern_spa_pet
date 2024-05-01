import React, { useContext } from "react";
import { CommonContext } from "../../context/common/CommonContext";

export default function LoadingPage ( props )
{
	const { showLoading: showLoading } = useContext( CommonContext );
	console.log(showLoading);
	if(showLoading || props.showLoading) {
		return (
			<div className={` ${ props.className }`}>
				<div className={ `spinner-border text-warning` } role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	} 
	return null;
	
}
