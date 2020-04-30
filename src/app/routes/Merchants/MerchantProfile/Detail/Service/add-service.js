import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import URL, { upfileUrl } from '../../../../../../url/url';
import { Formik, Form } from 'formik';
import { store } from 'react-notifications-component';
import DialogContent from '@material-ui/core/DialogContent';

import ServiceImg from '../Product/hpadmin2.png';
import Extra from './extra';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as Yup from 'yup';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import 'react-table/react-table.css';
import '../../MerchantProfile.css';
import '../../../MerchantsRequest/MerchantReqProfile.css';
import '../../../MerchantsRequest/MerchantsRequest.css';
import '../../../MerchantsList/merchantsList.css';
import '../Detail.css';

import { AiOutlineClose } from "react-icons/ai";

const colourStyles = {
	control: (styles) => ({ ...styles, borderWidth: 0, borderBottomWidth: 1, borderRadius: 0 }),
	input: (styles) => ({ ...styles, borderWidth: 0, fontSize: 16, paddingLeft: 0 }),
	placeholder: (styles) => ({ ...styles })
	// singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
};

const dot = (color = '#ccc') => ({
	alignItems: 'center',
	display: 'flex',

	':before': {
		backgroundColor: color,
		borderRadius: 10,
		content: '" "',
		display: 'block',
		marginRight: 8,
		height: 10,
		width: 10
	}
});

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class AddService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 1,
			category: [],
			categoryId: 0,
			categoryName: '',
			description: '',
			discount: 0,
			fileId: 0,
			name: '',
			openTime: 0,
			position: 0,
			price: 0,
			secondTime: 0,
			serviceId: 0,
			duration: 0,
			isDisabled: 0,
			imageUrl: '',
			extras: [],
			//~ preview image
			imagePreviewUrl: '',
			render: true,
			open: false
		};
	}

	componentDidMount() {
		const ID = this.props.MerchantProfile.merchantId;
		axios
			.get(URL + '/category/getbymerchant/' + ID, {
				headers: {
					Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
				}
			})
			.then((res) => {
				this.setState({ category: res.data.data });
			});
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	_handleImageChange = (e) => {
		e.preventDefault();
		// handle preview Image
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		};
		reader.readAsDataURL(file);
		// handle upload image
		let formData = new FormData();
		formData.append('Filename3', file);
		const config = {
			headers: { 'content-type': 'multipart/form-data' }
		};
		axios
			.post(upfileUrl, formData, config)
			.then((res) => {
				this.setState({ fileId: res.data.data.fileId });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	goBack = () => {
		// this.props.history.push("/app/merchants/profile/service");
		this.setState({ open: false });
	};

	handleClickOpen = () => {
		this.setState({ open: !this.state.open });
	};

	render() {
		const serviceStatus = [{ value: '0', label: 'Active' }, { value: '1', label: 'Disable' }];

		const extrasCondition =
			this.state.render === true
				? Yup.array().of(
					Yup.object().shape({
						name: Yup.string().required('Required'),
						duration: Yup.string().required('Required'),
						price: Yup.string().required('Required'),
						isDisabled: Yup.string().required('Required')
					})
				)
				: '';

		const validationSchema = Yup.object().shape({
			extras: extrasCondition,
			name: Yup.string().required('Required'),
			categoryId: Yup.string().required('Required'),
			duration: Yup.string().required('Required'),
			price: Yup.string().required('Required'),
			isDisabled: Yup.string().required('Required')
		});

		const ExtraInitialValues =
			this.state.render === true
				? [
					{
						name: '',
						description: '',
						duration: '',
						price: '',
						isDisabled: ''
					}
				]
				: [];

		//~ preview image
		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (
				<img
					src={imagePreviewUrl}
					style={{ width: '200px', height: '150px', marginBottom: '30px' }}
					alt="service 1"

				/>
			);
		} else {
			$imagePreview = (
				<img src={ServiceImg} style={{ width: '200px', height: '150px', marginBottom: '30px' }} alt="service" />
			);
		}

		return (
			<div>
				<Button className="btn btn-green" onClick={this.handleClickOpen}>
					NEW SERVICE
				</Button>
				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClickOpen}
					TransitionComponent={Transition}
				>
					{/* <AppBar>
						<Toolbar>
							<IconButton edge="start" color="inherit" onClick={this.handleClickOpen} aria-label="close">
								<CloseIcon />
							</IconButton>
						</Toolbar>
					</AppBar> */}
					<div onClick={this.goBack} style={{ position: 'absolute', right: 30, top: 30 }}>
						<AiOutlineClose style={{ fontWeight: 'bold', width: 30, height: 30 }} />
					</div>
					<DialogContent>
						<div className="profile-nav PendingLBody">
							<div className="detail-content">
								<div className="service-container PendingLBody" style={{ paddingtop: '70px' }}>
									<h2 style={{ color: '#4054B2', marginBottom: '65px', marginTop: 15, textAlign: 'center', letterSpacing: 0.6 }}>New service</h2>
									<Formik
										initialValues={{
											name: '',
											description: '',
											duration: '',
											openTime: 0,
											secondTime: 0,
											price: '',
											categoryId: '',
											isDisabled: '',
											extras: ExtraInitialValues
										}}
										validationSchema={validationSchema}
										onSubmit={(values, { setSubmitting }) => {
											// console.log("VALUES", values);
											// console.log("NOT RUNNING");
											const {
												categoryId,
												name,
												description,
												duration,
												openTime,
												secondTime,
												price,
												extras,
												isDisabled
											} = values;
											const { discount, fileId } = this.state;
											const merchantId = this.props.MerchantProfile.merchantId;

											axios
												.post(
													URL + '/service',
													{
														categoryId,
														name,
														duration,
														description,
														openTime,
														secondTime,
														price,
														discount,
														isDisabled,
														fileId,
														extras,
														merchantId
													},
													{
														headers: {
															Authorization: `Bearer ${this.props.InfoUser_Login.User
																.token}`
														}
													}
												)
												.then((res) => {
													let message = res.data.message;
													if (res.data.codeNumber === 200) {
														store.addNotification({
															title: 'SUCCESS!',
															message: `${message}`,
															type: 'success',
															insert: 'top',
															container: 'top-right',
															animationIn: ['animated', 'fadeIn'],
															animationOut: ['animated', 'fadeOut'],
															dismiss: {
																duration: 5000,
																onScreen: true
															},
															width: 250
														});
														this.setState({ open: false, imagePreviewUrl: '' });
														setTimeout(() => {
															//   this.props.history.push(
															//     "/app/merchants/profile/service"
															//   );
															this.props.reload();
														}, 800);
													} else {
														store.addNotification({
															title: 'ERROR!',
															message: `${message}`,
															type: 'danger',
															insert: 'top',
															container: 'top-right',
															animationIn: ['animated', 'fadeIn'],
															animationOut: ['animated', 'fadeOut'],
															dismiss: {
																duration: 5000,
																onScreen: true
															},
															width: 250
														});
													}
												});
										}}
									>
										{({
											values,
											errors,
											touched,
											handleChange,
											handleBlur,
											handleSubmit,
											isSubmitting,
											setFieldValue,
											isValidating
											/* and other goodies */
										}) => (
												<Form noValidate autoComplete="off">
													<div className="container Service">
														<div className="row">
															<div className="col-7 style={{ paddingRight: 30 }} ">
																<div className="row">
																	<div className="col-4">
																		<label style={{ textAlign: 'left', color: '#4054B2' }}>
																			Category *
																	</label>
																		<br />
																		<div>
																			<Select
																				styles={colourStyles}
																				options={this.state.category ? this.state.category.filter((e) => e.categoryType !== 'Product').map((e) => {
																					return {
																						id: e.categoryId,
																						value: e.categoryId,
																						label: e.name
																					};
																				}) : []}
																				onChange={(selectedOption) => {
																					setFieldValue(
																						'categoryId',
																						selectedOption.value
																					);
																				}}
																				placeholder="- Select -"
																				loadingMessage={() => 'Fetching Service'}
																				noOptionsMessage={() =>
																					'Service appears here!'}
																			/>
																		</div>

																		{errors.categoryId &&
																			touched.categoryId && (
																				<div className="input-feedback">
																					{errors.categoryId}
																				</div>
																			)}
																	</div>
																	<div className="col-12" style={{ marginTop: 40 }}>
																		<label style={{ color: '#4054B2' }}>Service Name*</label>
																		<br />
																		<input
																			name="name"
																			type="text"
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={values.name}
																			style={{ borderBottomColor: '#dddddd', borderBottomWidth: 1 }}
																			className={
																				errors.name && touched.name ? (
																					'text-input error'
																				) : (
																						'text-input'
																					)
																			}
																		/>
																		{errors.name &&
																			touched.name && (
																				<div className="input-feedback">
																					{errors.name}
																				</div>
																			)}
																	</div>
																	<div className="col-12" style={{ marginTop: 40 }}>
																		<label style={{ color: '#4054B2' }}>Description</label>
																		<br />
																		<textarea
																			name="description"
																			type="text"
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={values.description}
																			style={styles.textarea}
																		/>
																		<label style={{ paddingTop: '10px', color: '#4054B2',marginBottom : 8 }}>Image</label>
																		<br />
																		<div
																			style={{
																				display: 'flex'
																			}}
																		>
																			{$imagePreview}
																			<input
																				name="price"
																				type="file"
																				onChange={this._handleImageChange}
																				style={styles.inputPrice}
																			/>
																		</div>
																	</div>

																	<div className="col-4" style={{ marginTop: 40 }}>
																		<label style={{ color: '#333' }}>
																			<span className="small-label">Minutes</span>
																		</label>
																		<br />
																		<input
																			name="duration"
																			type="number"
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={values.duration}
																			placeholder="Min"
																			style={{ borderBottomColor: '#dddddd', borderBottomWidth: 1 }}
																			className={
																				errors.duration && touched.duration ? (
																					'text-input error'
																				) : (
																						'text-input'
																					)
																			}
																		/>
																		{errors.duration &&
																			touched.duration && (
																				<div className="input-feedback">
																					{errors.duration}
																				</div>
																			)}
																	</div>
																	<div className="col-4" style={{ marginTop: 40 }}>
																		<label style={{ color: '#333' }}>
																			<span className="small-label">Open time</span>
																		</label>
																		<br />
																		<input
																			name="openTime"
																			type="number"
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={values.openTime}
																			placeholder="Min"
																			style={{ borderBottomColor: '#dddddd', borderBottomWidth: 1 }}
																		/>
																	</div>
																	<div className="col-4" style={{ marginTop: 40 }}>
																		<label style={{ color: '#333' }}>
																			<span style={{ color: '#dddddd' }} className="small-label">Second time</span>
																		</label>
																		<br />
																		<input
																			name="secondTime"
																			type="number"
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={values.secondTime}
																			placeholder="Min"
																			style={{ borderBottomColor: '#dddddd', borderBottomWidth: 1, color :'#dddddd' }}
																			className={
																				errors.secondTime && touched.secondTime ? (
																					'text-input error'
																				) : (
																						'text-input'
																					)
																			}
																		/>
																		{errors.secondTime &&
																			touched.secondTime && (
																				<div className="input-feedback">
																					{errors.secondTime}
																				</div>
																			)}
																	</div>

																	<div className="col-6" style={{ marginTop: 60 }}>
																		<label style={{ color: '#4054B2' }}>Price *</label>
																		<br />
																		<input
																			name="price"
																			type="number"
																			onChange={handleChange}
																			onBlur={handleBlur}
																			value={values.price}
																			placeholder="$"
																			style={{ borderBottomColor: '#dddddd', borderBottomWidth: 1, marginTop: 10 }}
																			className={
																				errors.price && touched.price ? (
																					'text-input error'
																				) : (
																						'text-input'
																					)
																			}
																		/>
																		{errors.price &&
																			touched.price && (
																				<div className="input-feedback">
																					{errors.price}
																				</div>
																			)}
																	</div>

																	<div className="col-6" style={{ marginTop: 60 }}>
																		<label style={{ color: '#4054B2' }}>Status</label>
																		<br />
																		<Select
																			styles={colourStyles}
																			options={serviceStatus}
																			onChange={(selectedOption) => {
																				setFieldValue(
																					'isDisabled',
																					selectedOption.value
																				);
																			}}
																		/>
																		{errors.isDisabled &&
																			touched.isDisabled && (
																				<div className="input-feedback">
																					{errors.isDisabled}
																				</div>
																			)}
																	</div>
																</div>
															</div>

															{/* EXTRA BÊN NÀY */}
															<div className="col-5">
																{this.state.render === false ? (
																	<p
																		className="extra-btn"
																		onClick={() => this.setState({ render: true })}
																		style={{ color: '#4054B2', fontWeight: '600', letterSpacing: 0.3, fontSize: 14 }}
																	>
																		+ Add Extra
																	</p>
																) : (
																		<Extra
																			setFieldValue={setFieldValue}
																			validationSchema={validationSchema}
																			errors={errors}
																			values={values}
																			handleChange={handleChange}
																			handleBlur={handleBlur}
																			touched={touched}
																		/>
																	)}
															</div>
														</div>

														<div style={{ paddingTop: '25px' }}>
															<Button
																className="btn btn-green"
																style={{
																	backgroundColor: '#4154B3',
																	color: 'white'
																}}
																type="submit"
																disabled={isSubmitting}
															>
																Save
														</Button>
															<Button className="btn btn-red" onClick={this.goBack}>
																Cancel
														</Button>
														</div>
													</div>
												</Form>
											)}
									</Formik>
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	MerchantProfile: state.ViewProfile_Merchants,
	InfoUser_Login: state.User,
	SERVICE: state.serviceProps
});
export default connect(mapStateToProps)(AddService);

const styles = {
	textarea : {
		width: '100%',
		height: '70px',
		borderWidth: 1.2,
		borderColor: '#dddddd',
		borderStyle: 'solid',
		borderRadius: 5,
		padding: '10px',
		marginTop: 8
	},
	inputPrice : {
		width: '100px !important',
		borderBottom: 'none',
		fontWeight: 400,
		margin: '80px 0px',
		paddingLeft: '20px'
	}
}
