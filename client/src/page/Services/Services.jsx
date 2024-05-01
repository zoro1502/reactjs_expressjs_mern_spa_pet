import React, { useContext } from "react";
import "../../styles/services.css";
import TopBar from "../../components/Topbar/TopBar";
import { SliderServices } from "../../components/Home/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import Telephone from "../../components/Appointment/Telephone";
import Category from "../../components/Category/Category";
import axios from "axios";
import { useState, useEffect } from "react";
import Scroll from "../../components/ScrollToTop/Scroll";
import FindService from "../../components/Find/FindService";
import { CommonContext } from "../../context/common/CommonContext";
import Skeleton from "react-loading-skeleton";
import CategoryLoading from "../../components/Category/CategoryLoading";
import { timeDelay } from "../../context/helperService";

export default function Services ()
{
	const [ hairCut, setHairCut ] = useState( [] );
	const [ service, setService ] = useState( [] );
	const [ beard, setBeard ] = useState( [] );
	const [ curling, setCurling ] = useState( [] );
	const [ dye, setDye ] = useState( [] );
	const [ takeEar, setTakeEar ] = useState( [] );
	const [ shampoo, setShampoo ] = useState( [] );
	const [ shave, setShave ] = useState( [] );
	const [ hairCare, setHairCare ] = useState( [] );



	const { showLoading, dispatch } = useContext( CommonContext );
	const toggleShowLoading = ( value ) =>
	{
		dispatch( {
			type: 'LOADING',
			payload: value
		} )
	}

	// useEffect(() => {
	//   const fetchData = async () => {
	//     const res = await axios.get(
	//       "http://localhost:8800/api/service/category?Category=CẮT TÓC"
	//     );
	//     setHairCut(res.data.value);
	//   };
	//   fetchData();
	// }, []);

	// useEffect(() => {
	//   const fetchData = async () => {
	//     const res = await axios.get(
	//       "http://localhost:8800/api/service/category?Category=Beard Trim"
	//     );
	//     setBeard(res.data.value);
	//   };
	//   fetchData();
	// }, []);

	// useEffect(() => {
	//   const fetchData = async () => {
	//     const res = await axios.get(
	//       "http://localhost:8800/api/service/category?Category=Curling hair"
	//     );
	//     setCurling(res.data.value);
	//   };
	//   fetchData();
	// }, []);

	useEffect( () =>
	{
		const fetchData = async () =>
		{
			toggleShowLoading( true )
			const res = await axios.get(
				"http://localhost:8800/api/service/all"
			);
			await timeDelay( 1000 )
			toggleShowLoading( false )
			setService( res?.data?.value || [] )
			const data = groupData( res?.data?.value || [] );
			console.log( 'Service-----------> ', data );
			setHairCut( data );
		};
		fetchData();
	}, [] );

	const groupData = ( data ) =>
	{
		return data.reduce( ( newItem, item, index ) =>
		{
			let obj = {
				category: item.Category,
				serviceData: [ item ]
			};
			let i = newItem.findIndex( e => e.category == obj.category );
			if ( i >= 0 )
			{
				newItem[ i ].serviceData.push( item )
			} else
			{
				newItem.push( obj );
			}
			return newItem;
		}, [] );

	}

	// useEffect(() => {
	//   const fetchData = async () => {
	//     const res = await axios.get(
	//       "http://localhost:8800/api/service/category?Category=Shave"
	//     );
	//     setShave(res.data.value);
	//   };
	//   fetchData();
	// }, []);
	// useEffect(() => {
	//   const fetchData = async () => {
	//     const res = await axios.get(
	//       "http://localhost:8800/api/service/category?Category=Shampoo"
	//     );
	//     setShampoo(res.data.value);
	//   };
	//   fetchData();
	// }, []);
	// useEffect(() => {
	//   const fetchData = async () => {
	//     const res = await axios.get(
	//       "http://localhost:8800/api/service/category?Category=Take Earwax"
	//     );
	//     setTakeEar(res.data.value);
	//   };
	//   fetchData();
	// }, []);

	// useEffect(() => {
	//   const fetchData = async () => {
	//     const res = await axios.get(
	//       "http://localhost:8800/api/service/category?Category=Hair Care"
	//     );
	//     setHairCare(res.data.value);
	//   };
	//   fetchData();
	// }, []);

	return (
		<div className="container">
			<section className="section1">
				<div className="background-image">
					<div className="container-item">
						<TopBar />
						<SliderServices title="Service" />
					</div>
				</div>
				<div className="telephone">
					<Telephone />
				</div>
				<FindService data={ service } show={ true } />
			</section>
			<div className="services-container">

				{ showLoading &&
					<div className="category mx-0">
						<div className="row">
							{ [ 1, 2 ].map( ( item, index ) =>
							{
								return <div className="col-md-6 col-12" key={ index }>
									<CategoryLoading />
								</div>
							} ) }
						</div>
					</div>

				}
				{
					!showLoading && hairCut?.map( ( item, index ) => (
						<div className="category  mx-0" key={ index }>
							<div className="title-category">
								<h3>{ item?.category }</h3>
							</div>
							<div className="row">

								{ showLoading && [ 1, 2 ].map( ( item, index ) =>
								{
									return <div className="col-md-6 col-12" key={ index }>
										<CategoryLoading />
									</div>
								} ) }
								{ !showLoading && item?.serviceData?.length > 0 && item?.serviceData.map( ( e, index ) =>
								{
									return <div className="col-md-6 col-12" key={ index }>
										<Category

											image={ e?.Image }
											name={ e?.Name_Service }
											description={ e?.Description }
											price={ e?.Price }
										/>
									</div>
								} ) }

							</div>
						</div>
					) )
				}

			</div>

			<div className="telephone">
				<Telephone />
			</div>
			<Scroll />
			<Footer />
		</div>
	);
}
