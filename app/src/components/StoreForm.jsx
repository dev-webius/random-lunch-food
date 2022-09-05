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
			alert("먹는 종류를 선택해주세요");
			event.preventDefault();
		}else if(name == null || name === "undefined" || name === ""){
			alert("가게 이름을 입력해주세요");
			event.preventDefault();
		}else if(detail == null || detail === "undefined" || detail === ""){
			alert("한줄 소개를 입력해주세요");
			event.preventDefault();
		}else if(content == null || content === "undefined" || content === ""){
			alert("가게 상세정보를 입력해주세요");
			event.preventDefault();			
		}else if(address == null || address === "undefined" || address === ""){
			alert("가게 위치를 입력해주세요");
			event.preventDefault();
		}else if(useEat === 1 && !urlVaridation.test(url)){
			alert("주소입력란이 비어있거나 주소 양식이 올바르지 않습니다.");
			event.preventDefault();
		}else if(images.length < 1 && this.state.id === 0){
			alert("이미지를 한개 이상 업로드 해주세요");
			event.preventDefault();
		}else if(categoryId === "0" || categoryId == null || categoryId === 0){
			console.log('test')
			alert("카테고리를 선택해주세요.");
			event.preventDefault();
		}else{
			if(useEat === 2 || this.state.useEat === 2 ){
				if(useEat === 3){
					console.log("통합");
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
						alert("새로운 가게가 등록되었습니다.");
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
						alert("가게 정보가 수정되었습니다.");
						window.location.reload();
					}
				}else{
					if(this.state.id === 0){
						alert("가게등록이 실패했습니다.");
					}else{
						alert("가게수정에 실패했습니다.");
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
								   <option value={0} selected={this.state.categoryId !== 0 ? this.state.categoryId : 0}>선택</option>
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
					alert("삭제되었습니다.");
					window.location.href = "/manage/store";
				}else{
					alert("삭제오류 발생!");
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
							{this.inputCheckboxElement("useEat", iconDelivery, "시켜먹기", 1, "delivery")}
							{this.inputCheckboxElement("useEat", iconWalk, "나가서 먹기", 2, "walk")}
						</div>
						{this.inputTextElement("name", "식당명", this.state.name)}
						{this.inputTextElement("detail", "한줄 소개", this.state.detail)}
						{this.inputTextAreaElement("content", "상세정보", this.state.content)}
						{this.inputTextElement("address", "주소", this.state.address)}
						{this.inputTextElement("url", "URL", this.state.url)}
						{this.inputSelectElement("category", "카테고리", this.state.categoryId)}
						<GallerySlide dataList={this.state.images.map(image => {
							return <>
								<figure>
									<picture>
										<img src={image} alt="" />
									</picture>
								</figure>
							</>;
						})} duration={500} />
						{this.inputFileElement("식당 사진")}
					</div>
					<div className="flex-box align-column">
						<button className="btn">{this.state.id ? "수정" : "등록"}</button>
						<button className="btn" onClick={this.deleteInputElement} type="button" value={this.state.id}>삭제</button>
						<Link className="btn btn-back" to="../store">취소</Link>
					</div>
				</Form>
			</div>
		</>;
	}
}
