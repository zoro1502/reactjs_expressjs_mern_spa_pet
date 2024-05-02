import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Evaluate from '../Evaluate/Evaluate';
import '../../styles/slide.css';

function SlideImage ( props )
{
	const [ currentIndex, setCurrentIndex ] = useState( 0 );


	const nextSlide = () =>
	{
		
		setCurrentIndex( ( prevIndex ) => {
			return ( (prevIndex + 1) ) % props.reviews.length
		} );
	};

	const buildData = (start, end) => {
		let data = props.reviews?.map((item, index) => {
			item.is_show = index >= start && index <= end;
			return item;
		});
		props.setReview(data);
	}

	const prevSlide = () =>
	{
		
		setCurrentIndex( ( prevIndex ) => {
			console.log(prevIndex, ( prevIndex - 1 + props.reviews.length ) % props.reviews.length);
			return ( (prevIndex - 1 + props.reviews.length) ) % props.reviews.length
		} );
	};
	// style={ { transform: `translateX(-${ currentIndex * 100 }%)` } }
	return (
		<div className="slide-container">
			<ul className="slide-list"  style={ { transform: `translateX(-${ (currentIndex % 3) * 100 }%)` } }>
				{ props?.reviews?.length > 0 && props?.reviews?.map( ( item, i ) =>
				{
					// if(item.is_show) {
					// 	return <Evaluate
					// 	key={ i }
					// 	star={ item.Star }
					// 	service={ item.Service }
					// 	text={ item.Review }
					// 	staff={ item.Staff }
					// />
					
					// }
					// return null;
					return <Evaluate
						key={ i }
						star={ item.Star }
						service={ item.Service }
						text={ item.Review }
						staff={ item.Staff }
					/>
				} ) }
			</ul>
			<div className="slide-nav">
				<button onClick={ prevSlide }>Previous</button>
				<button onClick={ nextSlide }>Next</button>
			</div>
		</div>
	);
	// return (
	// 	<Carousel data-bs-theme="dark">

	// 		{ props.reviews.map( ( value, index ) => (
	// 			<Carousel.Item key={ index } className='d-flex'>
	// 				{value?.reviews?.length > 0 && value?.reviews?.map((item, i) => {
	// 					return <Evaluate
	// 					key={ i }
	// 					star={ item.Star }
	// 					service={ item.Service }
	// 					text={ item.Review }
	// 					staff={ item.Staff }
	// 				/>
	// 				})}
	// 			</Carousel.Item>
	// 		) ) }
	// 	</Carousel>
	// );
}

export default SlideImage;