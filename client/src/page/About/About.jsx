import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Evaluate from "../../components/Evaluate/Evaluate";
import Telephone from "../../components/Appointment/Telephone";
import Scroll from "../../components/ScrollToTop/Scroll";
import axios from "axios";
import SlideImage from "../../components/common/CaroselImage";

export default function About ()
{
	const [ store, setStore ] = useState( "" );
	const [ review, setReview ] = useState( [] );
	const [ customer, setCustomer ] = useState( [] );

	useEffect( () =>
	{
		const fetchStore = async () =>
		{
			const res = await axios.get( "http://localhost:8800/api/store/getById" );
			setStore( res.data.value );
		};
		fetchStore();

		const fetchReview = async () =>
		{
			const res = await axios.get( "http://localhost:8800/api/evaluate/all" );
			let data = res.data.value?.map( ( item, index ) =>
			{
				
				if(index <= 2) {
					item.is_show = true
				}
				return item
			} );
			data = data.concat(data)?.map( ( item, index ) =>
			{
				
				if(index <= 2) {
					item.is_show = true
				}
				return item
			} );
			console.log(data);
			setReview( data );
		};
		fetchReview();
	}, [] );

	return (
		<div className="container">
			<section className="section1">
				<div className="background-image">
					<div className="container-item">
						<TopBar />

						<SliderServices title="About" />
					</div>
				</div>
			</section>
			<div className="about-container mt-4">
				<div className="div-image">
					<img
						src="https://i.pinimg.com/474x/fa/ba/7a/faba7adb260e42bd636b45af39c92edd.jpg"
						alt=""
						className="image-about w-100"
					/>
				</div>
				<div className="text-about">
					<div className="text-about-mb">
						<span className="subheading"> About { store.Name_Store }</span>
						<h2 className="h2-about">
							A SMOOTH SPA PET EXPERIENCE IN YOUR TOWN
						</h2>
						<p>{ store.Description }</p>
					</div>
				</div>
			</div>

			<div className="pricing-container my-4">
				<span className="subheading"> TESTIMONIAL</span>
				<h2 className="h2-about">PEOPLE SAY ABOUT US </h2>
				<div className="w-100 pb-5">
					{/* { review.map( ( value, index ) => (
						<Evaluate
							key={ index }
							star={ value.Star }
							service={ value.Service }
							text={ value.Review }
							staff={ value.Staff }
						/>
					) ) } */}
					<SlideImage reviews={ review } setReview={setReview}/>
				</div>
			</div>
			<div className="telephone mb-4">
				<Telephone />
			</div>
			<Scroll />
			<Footer />
		</div>
	);
}
