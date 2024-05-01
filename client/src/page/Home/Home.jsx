import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderHome } from "../../components/Home/Slider/Slider";
import Service from "../../components/Home/Service/Service";
import Pricing from "../../components/Home/Pricing/Pricing";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import ReactPlayer from "react-player";
import Scroll from "../../components/ScrollToTop/Scroll";
import axios from "axios";
import { CommonContext } from "../../context/common/CommonContext";

export default function Home ()
{
	const [ service, setService ] = useState( [] );

	const { showLoading, dispatch } = useContext( CommonContext );
	const toggleShowLoading = (value) => {
		dispatch({
			type: 'LOADING',
			payload: value
		})
	}
	useEffect( () =>
	{
		const fetchData = async () =>
		{
			toggleShowLoading( true );
			const res = await axios.get( "http://localhost:8800/api/service/limit4" );
			toggleShowLoading( false );
			setService( res.data.value );
		};
		fetchData();
	}, [] );

	

	return (
		<div className="container">
			<section className="section1">
				<div className="background-image">
					<div className="container-item" style={ { zIndex: 999 } }>
						<TopBar />
						<div className="slider">
							<SliderHome />
						</div>
					</div>
					<div className="bg-ab"></div>
				</div>
			</section>
			<div className="about-container my-4">
				<div className="div-image">
					<img
						src="https://bizweb.dktcdn.net/100/458/454/themes/869149/assets/feature_banner_1.jpg"
						alt=""
						
						className="image-about w-100"
					/>
				</div>
				<div className="text-about">
					<div className="text-about-mb">
						<span className="subheading"> About Blissful Pets</span>
						<h2 className="h2-about">
							A SMOOTH SPA EXPERIENCE IN YOUR TOWN
						</h2>
						<p>
							Pet Spa services are becoming increasingly popular in pet care and nurturing. Here, pets not only enjoy relaxation therapies and care but also experience a comfortable and luxurious environment, akin to a real vacation getaway. Services typically include bathing, grooming, nail trimming, and even relaxing massages for your furry friend. With a safe and professional environment, Pet Spa not only enhances the physical appearance of your pet but also improves their overall well-being and spirits.
						</p>
					</div>
				</div>
			</div>
			<section className="section-2">
				<div className="service-container ">
					{ service.map( ( value, index ) => (
						<>
							<Service
								title={ value.Name_Service }
								p={ value.Description }
								image={ value.Image }
							/>
						</>
					) ) }
				</div>
			</section>

			<div className="pricing-container my-4">
				<span className="subheading"> pricing</span>
				<h2 className="h2-about"> PRICE & PLANS</h2>
				<div className="pricing-item">
					<Pricing />
				</div>
			</div>
			<div className="telephone mb-4">
				<Telephone />
			</div>



			<Scroll />
			{/* <div className="video">
        <ReactPlayer
          url="https://youtu.be/r9lvNDkQhd4"
          playing={true}
          volume={1}
          width="100%"
          height="100%"
          onReady={() => console.log("ready now")}
        />
      </div> */}
			<Footer />
		</div>
	);
}
