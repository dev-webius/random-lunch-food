package net.webius.randomlunchfood.entity;

import java.util.ArrayList;
import java.util.List;

public class StoreEntity {
	private int id;
	private int categoryId;
	private String categoryName;
	private String categoryClassName;
	private int useEat;
	private String name;
	private String detail;
	private String content;
	private String thumbnail;
	private String address;
	private String url;

	private int visitors;
	private String images;

	public int getId() {
		return id;
	}


	@Override
	public String toString() {
		return "StoreEntity [id=" + id + ", categoryId=" + categoryId + ", categoryName=" + categoryName
				+ ", categoryClassName=" + categoryClassName + ", useEat=" + useEat + ", name=" + name + ", detail="
				+ detail + ", content=" + content + ", thumbnail=" + thumbnail + ", address=" + address + ", url=" + url
				+ ", visitors=" + visitors + ", images=" + images + "]";
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryClassName() {
		return categoryClassName;
	}

	public void setCategoryClassName(String categoryClassName) {
		this.categoryClassName = categoryClassName;
	}

	public int getUseEat() {
		return useEat;
	}

	public void setUseEat(int useEat) {
		this.useEat = useEat;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getVisitors() {
		return visitors;
	}

	public void setVisitors(int visitors) {
		this.visitors = visitors;
	}

	public List<String> getImages() {
		List<String> list = new ArrayList<String>();
		if (images != null) {
			String[] imageList = images.split("\\|");
			for (String image : imageList) {
				list.add(image);
			}
		}
		return list;
	}

	public void setImages(String images) {
		this.images = images;
	}
}
