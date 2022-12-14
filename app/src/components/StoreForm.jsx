import React from 'react';
import Form from './Form';

import "../styles/storeForm.scss";
import { Link } from 'react-router-dom';

import iconDelivery from '../images/delivery-icon.png';
import iconWalk from '../images/walk-icon.png';
import GallerySlide from './GallerySlide';

export default class StoreForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
			categories: [],
			categoryId: 0,
			useEat: 3,
			name: "",
			detail: "",
			content: "",
			thumbnail: "",
			address: "",
			url: "",
			visitors: 0,
			images: [],
			uploadedImages: [],
			apiURL: "",
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onInput = this.onInput.bind(this);
		this.onInputCheckbox = this.onInputCheckbox.bind(this);
		this.onInputFile = this.onInputFile.bind(this);
		this.onInputFileItem = this.onInputFileItem.bind(this);

		this.inputCheckboxElement = this.inputCheckboxElement.bind(this);
		this.inputTextElement = this.inputTextElement.bind(this);
		this.inputTextAreaElement = this.inputTextAreaElement.bind(this);
		this.inputFileElement = this.inputFileElement.bind(this);
		this.inputFileItemElement = this.inputFileItemElement.bind(this);
		this.inputSelectElement = this.inputSelectElement.bind(this);
		this.inputSelect = this.inputSelect.bind(this);
		this.deleteInputElement = this.deleteInputElement.bind(this);
	}

	componentDidMount() {
		fetch("/api/categoryList", {
			method: "GET"
		})
			.then(response => response.json())
			.then(data => {
				const categories = data.map(category => {
					return {
						id: category.id,
						class: category.className,
						selected: true,
						displayName: category.name
					};
				});
				this.setState({categories: categories});
			});
	}

	componentDidUpdate = (prevProps) => {
		if (!prevProps.store && this.props.store) {
			const store = this.props.store;
			console.log(store);
		
			this.setState({
				id : store.id,
				name : store.name,
				detail : store.detail,
				content : store.content,
				address : store.address,
				url : store.url,
				images : store.images,
				categoryId : store.categoryId
			});
			store.images.forEach((image, index) => {
				console.log('image load request', image);
				fetch("/upload/" + image)
					.then(response => response.blob())
					.then(data => {
						this.setState((state) => {
							const images = state.images.slice();
							if (state.images.length > index) {
								images[index] = URL.createObjectURL(data);
							}
							
						
							return { images: images };
						});
					});
			});
		}
	}

	onSubmit(event) {


		const useEat = this.state.useEat;
		const name = event.target.name.value;
		const detail = event.target.detail.value;
		const content = event.target.content.value;
		const address = event.target.address.value;
		let url = event.target.url.value;
		let images = this.state.uploadedImages;
		let thumbnail = this.state.thumbnail;
		let apiURL = this.state.apiURL;
		let categoryId  = this.state.categoryId;
		
		const urlVaridation = /(http|https):\/\//;

	 	if(useEat == null || useEat === "undefined" || useEat === ""){
			alert("?????? ????????? ??????????????????");
			event.preventDefault();
		}else if(name == null || name === "undefined" || name === ""){
			alert("?????? ????????? ??????????????????");
			event.preventDefault();
		}else if(detail == null || detail === "undefined" || detail === ""){
			alert("?????? ????????? ??????????????????");
			event.preventDefault();
		}else if(content == null || content === "undefined" || content === ""){
			alert("?????? ??????????????? ??????????????????");
			event.preventDefault();			
		}else if(address == null || address === "undefined" || address === ""){
			alert("?????? ????????? ??????????????????");
			event.preventDefault();
		}else if(useEat === 1 && !urlVaridation.test(url)){
			alert("?????????????????? ??????????????? ?????? ????????? ???????????? ????????????.");
			event.preventDefault();
		}else if(images.length < 1 && this.state.id === 0){
			alert("???????????? ?????? ?????? ????????? ????????????");
			event.preventDefault();
		}else if(categoryId === "0" || categoryId == null || categoryId === 0){
			console.log('test')
			alert("??????????????? ??????????????????.");
			event.preventDefault();
		}else{
			if(useEat === 2 || this.state.useEat === 2 ){
				if(useEat === 3){
					console.log("??????");
				}else{
					url = " ";
				}
			}

			if(images.length >= 1){
				thumbnail = images.slice(0, 1).toString();
			}


			const formData = new FormData();
			formData.append('useEat' , useEat);
			formData.append('name' , name);
			formData.append('detail' , detail);
			formData.append('content' , content);
			formData.append('address' , address);
			formData.append('url' ,  url.trim());
			formData.append('images' , images);
			formData.append('thumbnail' , thumbnail);
			formData.append('categoryId' , categoryId);

			if(this.state.id === 0){
				apiURL = "/api/createdStore";
			}else{
				formData.append("id" , this.state.id);
				apiURL = "/api/updateStore";
			}

			fetch(apiURL , {
				method: "POST",
				body : formData,
			})
			
			.then(response => response.text())
			.then(data => {
				if(data === "1"){
					if(this.state.id === 0){
						alert("????????? ????????? ?????????????????????.");
						this.setState({
							categoryId: 0,
							useEat: 3,
							name: "",
							detail: "",
							content: "",
							thumbnail: "",
							address: "",
							url: "",
							//visitors: 0,
							images: [],
							uploadedImages : [],
						});
						window.location.href="/manage/store";
					}else{
						alert("?????? ????????? ?????????????????????.");
						window.location.reload();
					}
				}else{
					if(this.state.id === 0){
						alert("??????????????? ??????????????????.");
					}else{
						alert("??????????????? ??????????????????.");
					}
				}
			})
		}
		event.preventDefault();
	}



	onInput(event) {
		const data = event.target.value;
		const name = event.target.name;

		if (typeof this.state[name] !== 'undefined') {
			this.setState({
				[name]: data
			});
		}
	}

	onInputCheckbox(event, value) {
		const name = event.target.name;
		if (typeof this.state[name] !== 'undefined') {
			this.setState({
				[name]: this.state[name] ^ value
			});
		}
	}

	onInputFile(event) {
		console.log(event.target.files);
		const formData = new FormData();
		formData.append("file", event.target.files[0]);
		fetch("/api/upload", {
			method: "POST",
			body: formData
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					const uploadedImages = Array.prototype.slice.call(this.state.uploadedImages);

					uploadedImages.push(data.fileName);
					this.setState({
						uploadedImages: uploadedImages
					});
				}

				event.target.value = '';
			});
	}

	onInputFileItem(event, fileName) {
		const uploadedImages = Array.prototype.slice.call(this.state.uploadedImages);
		const imageIndex = uploadedImages.indexOf(fileName);

		if (imageIndex > -1) {
			uploadedImages.splice(imageIndex, 1);
			this.setState({
				uploadedImages: uploadedImages
			});
		}
	}

	inputCheckboxElement(name, thumbnail, text, value, className) {
		return <>
			<label className={className}>
				<input type="checkbox" name={name} checked={(this.state[name] & value) === value} onChange={(event) => this.onInputCheckbox(event, value)} />
				<div>
					<img src={thumbnail} />
					<span>{text}</span>
				</div>
			</label>
		</>;
	}

	inputTextElement(name, text, value) {
		return <>
			<div>
				<label>
					<span>{text}</span>
					<input type="text" name={name} onInput={this.onInput} value={value} />
				</label>
			</div>
		</>;
	}

	inputTextAreaElement(name, text, value) {
		return <>
			<div>
				<label>
					<span>{text}</span>
					<textarea name={name} onInput={this.onInput} value={value}></textarea>
				</label>
			</div>
		</>;
	}

	inputFileElement(text) {
		const uploadedImages = this.state.uploadedImages;
		return <>
			<div>
				<label>
					<input type="file" onInput={this.onInputFile} />
					<span>{text}</span>
					<div></div>
				</label>
				<ul className="file-list">{uploadedImages.map(image => <li key={image}>{this.inputFileItemElement(image)}</li>)}</ul>
			</div>
		</>;
	}
	inputFileItemElement(fileName) {
		return <>
			<div className="flex-box">
				<span>{fileName}</span>
				<button onClick={(event) => this.onInputFileItem(event, fileName)} type="button">X</button>
			</div>
		</>;
	}
	inputSelect(event){
		let categoryId = event.target.value;
		this.setState({
			categoryId : categoryId
		});
	}

	inputSelectElement(name, text, defaultValue) {
		console.log(this.state.categoryId)
		return <>
			<div>
				<label>
					<span>{text}</span>
					<select name={name} defaultValue={defaultValue} onChange={this.inputSelect}>
								   <option value={0} selected={this.state.categoryId !== 0 ? this.state.categoryId : 0}>??????</option>
						{this.state.categories.map(category => {
							return <option key={category.displayName} value={category.id} selected={this.state.categoryId === category.id}>{category.displayName}</option>;
						})}
					</select>
				</label>
			</div>
		</>;
	}

	deleteInputElement(event){
		const id = event.target.value;
		
		const formData = new FormData();
		formData.append("id" , id);

		fetch("/api/deleteStore",{
			method:"POST",
			body:formData
		})
			.then(response => response.text())
			.then(data => {
				if(data == 1){
					alert("?????????????????????.");
					window.location.href = "/manage/store";
				}else{
					alert("???????????? ??????!");
					event.preventDefault();
				}
			})
		}


	render() {
		return <>
			<div className="form form-store">
				<Form onSubmit={this.onSubmit}>
					<div className="flex-box align-column">
						<div className="form-item-category">
							{this.inputCheckboxElement("useEat", iconDelivery, "????????????", 1, "delivery")}
							{this.inputCheckboxElement("useEat", iconWalk, "????????? ??????", 2, "walk")}
						</div>
						{this.inputTextElement("name", "?????????", this.state.name)}
						{this.inputTextElement("detail", "?????? ??????", this.state.detail)}
						{this.inputTextAreaElement("content", "????????????", this.state.content)}
						{this.inputTextElement("address", "??????", this.state.address)}
						{this.inputTextElement("url", "URL", this.state.url)}
						{this.inputSelectElement("category", "????????????", this.state.categoryId)}
						<GallerySlide dataList={this.state.images.map(image => {
							return <>
								<figure>
									<picture>
										<img src={image} alt="" />
									</picture>
								</figure>
							</>;
						})} duration={500} />
						{this.inputFileElement("?????? ??????")}
					</div>
					<div className="flex-box align-column">
						<button className="btn">{this.state.id ? "??????" : "??????"}</button>
						<button className="btn" onClick={this.deleteInputElement} type="button" value={this.state.id}>??????</button>
						<Link className="btn btn-back" to="../store">??????</Link>
					</div>
				</Form>
			</div>
		</>;
	}
}
