import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { BsTelephoneForward, BsGenderAmbiguous, BsFileEarmarkPerson, BsArrowDown, BsPercent } from "react-icons/bs";
import { FaRegAddressCard, FaBirthdayCake } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const formReceipt = {
	Services: [],
	Discount: "",
	Email: "",
	Telephone: "",
	Name_Customer: "",
	Staff_Name: ""
}
export default function ModalReceipt ( { open, onClose, ...props } )
{
	const [ data, setData ] = useState( { ...formReceipt } );

	useEffect( () =>
	{
		if ( open )
		{
			setData( props.form )
		} else
		{
			setData( { ...formReceipt } )
		}
	}, [ open ] );

	const submitHandle = async () => {
		try
			{
				const res = await axios.post(
					"http://localhost:8800/api/receipt/add",
					data
				);
				toast.success( "Create receipt successfully" );
				onClose()
			} catch ( error )
			{
				toast.error( "Create receipt failed" );
			}
	}

	return (
		open && (
			<div className="overlay">
				<div className="modalContainer">
					<p className="closeBtn" onClick={ onClose }>
						<IoIosCloseCircleOutline />
					</p>
					<div className="modalInformation">
						<h3 className="title-value"> Create recept</h3>
						<div>
							<label style={ { margin: "10px" } }> Customer Name: </label>
							<div className="items-value">
								<span className="icon-value">
									<MdDriveFileRenameOutline />
								</span>
								<input
									type="text"
									className="text-value"
									placeholder="Customer Name"
									name="Name"
									readOnly={ true }
									value={ data.Name_Customer }
								/>
							</div>
						</div>
						<div>
							<label style={ { margin: "10px" } }> Customer Phone: </label>
							<div className="items-value">

								<span className="icon-value">
									<BsTelephoneForward />
								</span>
								<input
									type="text"
									className="text-value"
									placeholder="Telephone"
									name="Telephone"
									readOnly={ true }
									value={ data.Telephone }
								/>
							</div>
						</div>
						<div>
							<label style={ { margin: "10px" } }> Customer Email: </label>
							<div className="items-value">
								<span className="icon-value">
									<MdOutlineEmail />
								</span>
								<input
									type="text"
									className="text-value"
									placeholder="Email"
									name="Email"
									readOnly={ true }
									value={ data.Email }
								/>
							</div>
						</div>
						<div>
							<label style={ { margin: "10px" } }> Services: </label>
							<div className="items-value">
								<span className="icon-value">
									<FaRegAddressCard />
								</span>
								<input
									type="text"
									className="text-value"
									placeholder="Services"
									value={ `${ data?.Services?.join( ', ' ) }` }
								/>
							</div>
						</div>
						<div>
							<label style={ { margin: "10px" } }> Discount: </label>
							<div className="items-value">
								<span className="icon-value">
									<BsPercent  />
								</span>
								<input
									type="text"
									className="text-value"
									placeholder="Discount"
									name="Gender"
									value={ data.Discount }
									onChange={ ( e ) =>
									{
										let value = e?.target?.value;
										
										if ( value.match( /^[0-9]+\.?([0-9]+)?$/g ) && Number(value) <= 100)
										{
											setData( { ...data, Discount: value } )
										} 
										else
										{
											setData( { ...data, Discount: data.Discount || '' } )
										}
									} }
								/>
							</div>
						</div>
						<div>
							<label style={ { margin: "10px" } }> Staff Name: </label>
							<div className="items-value">
								<span className="icon-value">
									<BsFileEarmarkPerson />
								</span>
								<input
									type="text"
									className="text-value"
									placeholder="Staff Name"
									name="Staff"
									readOnly={ true }
									value={ data.Staff_Name }
								/>
							</div>
						</div>
						<div className="button-receipt">
							<button className="button-action padding" onClick={ submitHandle }>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	);
}
