package net.webius.randomlunchfood.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.webius.randomlunchfood.entity.CategoryEntity;
import net.webius.randomlunchfood.entity.StoreEntity;
import net.webius.randomlunchfood.service.FileService;
import net.webius.randomlunchfood.service.StoreService;

@RestController
@RequestMapping("/api")
public class MainApiController {
	private final StoreService storeService;
	private final FileService fileService;

	public MainApiController(StoreService storeService, FileService fileService) {
		this.storeService = storeService;
		this.fileService = fileService;
	}
	
	@GetMapping("categoryList")
	public List<CategoryEntity> getCategoryList() {
		return storeService.categoryList();
	}
	
	@PostMapping("storeList")
	public List<StoreEntity> getStoreList(@RequestParam(value="categories", required=false) String categories, @RequestParam(value="type", defaultValue="0") int type) {
		List<StoreEntity> storeList = storeService.storeList(categories, type);
		
		return storeList;
	}
	
	@PostMapping("store")
	public Map<String, Object> getStore(@RequestParam("id") int id, @RequestParam(value="manage", defaultValue="false") Boolean manage) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		StoreEntity store = storeService.store(id, manage);
		
		map.put("success", store != null);
		map.put("data", store);
		
		return map;
	}
	
	@PostMapping( value = "createdStore")
	public int createdStore(@RequestParam("useEat") int useEat ,@RequestParam("name") String name, @RequestParam("detail") String detail , @RequestParam("content") String content, @RequestParam("address") String address, 
			@RequestParam("url") String url, @RequestParam("categoryId") int categoryId, @RequestParam("images") List<Object> images){
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("useEat", useEat);
		map.put("name", name);
		map.put("detail", detail);
		map.put("content", content);
		map.put("address", address);
		map.put("url", url);
		map.put("categoryId", categoryId);
		map.put("thumbnail", images.get(0));
		map.put("images", images);
				
		int addCount = storeService.storeAdd(map);

		return addCount;
	}
	
	@PostMapping( value = "updateStore")
	public int updateStore(@RequestParam("useEat") int useEat ,@RequestParam("name") String name, @RequestParam("detail") String detail , @RequestParam("content") String content, @RequestParam("address") String address, 
			@RequestParam("url") String url, @RequestParam("categoryId") int categoryId , @RequestParam("id") int id, @RequestParam("images") List<Object> images , @RequestParam("thumbnail") String thumbnail){
	
		Map<String, Object> map = new HashMap<String, Object>();
						
		map.put("useEat", useEat);
		map.put("name", name);
		map.put("detail", detail);
		map.put("content", content);
		map.put("address", address);
		map.put("url", url);
		map.put("categoryId", categoryId);
		map.put("thumbnail", thumbnail);
		map.put("id" , id);
		map.put("images", images);
								
		int updateCount = storeService.storeUpdate(map);
		
		return updateCount;
	}
	
	@PostMapping(value = "visitor")
	public String visitor(@RequestParam("id") int id){
		
		String status = "Fail";
		
		if(id != 0) {
			 int count = storeService.addVisitor(id);
			status = "success";
		}
		
		return status;
	}
	
	@PostMapping(value = "deleteStore")
	public int deleteStore(@RequestParam("id") int id) {
		
		System.out.println(id);
		
		int num = 0;
		
		if(id != 0){
			int count = storeService.storeDelete(id);
			num = 1;
			System.out.println(num);
			return num;
		}
		
		return num;
	}
	
	@PostMapping("upload")
	public Map<String, Object> upload(@RequestParam("file") MultipartFile file) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String fileName = fileService.upload(file);
		
		map.put("success", fileName != null);
		map.put("fileName", fileName);
		
		return map;
	}

}

