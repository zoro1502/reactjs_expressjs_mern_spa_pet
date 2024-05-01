import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/category.css";
import Skeleton from "react-loading-skeleton";
export default function CategoryLoading ( { image, name, description, price } )
{
	return (
		<div className="category-items">
			<div className="items-service mx-0">
				<Skeleton count={ 1 } className="img" />
				<div className="text-services w-100">
					<Skeleton count={ 5 } />
					<div className="mt-5 justify-content-between">
						<Skeleton count={ 1 } />
						<Skeleton count={ 1 } />
					</div>
				</div>
			</div>
		</div>
	);
}
