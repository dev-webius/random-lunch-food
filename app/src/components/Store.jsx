import { useEffect } from 'react';
import '../styles/store.scss';
import ninefiveImage from './../images/ninefive.png';
import GallerySlide from './GallerySlide';


const {kakao} = window;

export default function Store(props) {
	const store = props.store.data;
	const formData = new FormData();

	formData.append("id" , store.id);
	fetch("api/visitor/", {
		method: "POST",
		body: formData
	})

	.then(response => response.text())
	.then(data => {
		console.log("방문자 : " + data);
	})
	
	useEffect(() => {
		const container = document.getElementById('kakaMap');
		const options = {
			center: new kakao.maps.LatLng(37.489262, 127.018384),
			level: 3,
		};

		let markerPosition = new kakao.maps.LatLng(37.489262, 127.018384);

		let imageSrc = ninefiveImage;
		let imageSize = new kakao.maps.Size(40, 45);
		let imageOption = {offset: new kakao.maps.Point(27, 30)}; // 

		var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

		let marker = new kakao.maps.Marker({
			position: markerPosition,
			image:markerImage,
		});

		//let infowindow = new kakao.maps.InfoWindow({ //회사표시 
		//	content: '<div style="width:150px;text-align:center;padding:5px 0; color:black;">나인파이브</div>'
		//});
		
	    const map = new kakao.maps.Map(container, options); //최초 지도 표시 

		//infowindow.open(map, marker);// 회사 텍스트 표시

		function positionFix(){		
		//map.setDraggable(); //지도 이동막기 
		//map.setZoomable(); //지도 확대축소 막기}
		}


		let geocoder = new kakao.maps.services.Geocoder(); //검색 객체 생성 

		geocoder.addressSearch(store.address, function(result, status) {
		//geocoder.addressSearch("서울 서초구 서초중앙로 54 1층", function(result, status) {

			// 정상적으로 검색이 완료됐으면 
			 if (status === kakao.maps.services.Status.OK) {
		
				let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
		
				// 결과값으로 받은 위치를 마커로 표시합니다
				let storePosition = new kakao.maps.Marker({
					map: map,
					position: coords,
				})

				// 인포윈도우로 장소에 대한 설명을 표시합니다
				let infowindow = new kakao.maps.InfoWindow({
					content:'<div style="width:150px;text-align:center;padding:5px 0; color:black;">' + store.name + '</div>'
				});
				infowindow.open(map, storePosition);
		
				// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
			 	map.setCenter(map);
			}
		});
		
		marker.setMap(map);
		positionFix();

		}, []);

		
	const typeData = (
		props.type === 1 ? <>
			<div className="verbose delivery">
				<h3>배달의 민족으로 볼까?</h3>
				<div id="kakaMap"style={{display:"none"}}></div>
				<a href={store.url} target="blank">배민으로 이동</a>
			</div>
		</> :
		props.type === 2 ? <>
			<div className="verbose walk">
				<h3>식당 위치가 어디더라?</h3>
				<div id="kakaMap"style={{height: '40vh'}}></div>
			</div>
		</> : <><span>No data</span></>
	);

	return <>
		<div className={"store " + store.categoryClassName}>
			<div className="info">
				<h2>{store.name  + "(" + store.detail + ")"}</h2>
				<div className="summary">
					<p>{store.content}</p>
				</div>
				<br />
				<figure>
					<picture>
						{<GallerySlide dataList= { store.images.map(image => {
						return <img src={"/upload/" + image} alt={store.name} />	
						})} duration={500} />}
					</picture>
				</figure>
			</div>
			{typeData}
		</div>
	</>;
}