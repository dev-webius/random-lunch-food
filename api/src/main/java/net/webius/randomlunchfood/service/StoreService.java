package net.webius.randomlunchfood.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import net.webius.randomlunchfood.entity.CategoryEntity;
import net.webius.randomlunchfood.entity.StoreEntity;
import net.webius.randomlunchfood.mapper.StoreMapper;

@Service
public class StoreService {
	public final StoreMapper storeMapper;

	public StoreService(StoreMapper storeMapper) {
		this.storeMapper = storeMapper;
	}
	
	public List<CategoryEntity> categoryList() {
		return storeMapper.categoryList(); 
	}
	
	public List<StoreEntity> storeList(String categories, int type) {
		List<Integer> categoryList = null;
		
		if (!(categories == null || categories.isEmpty())) {
			String[] categoryArray = categories.split(",");
			
			if (categoryArray.length > 0) {
				categoryList = new ArrayList<Integer>();
				
				for (String category : categoryArray) {
					try {						
						categoryList.add(Integer.parseInt(category));
					} catch (NumberFormatException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		return storeMapper.storeList(categoryList, type);
	}
	
	public StoreEntity store(int id, Boolean manage) {
		return storeMapper.store(id, manage);
	}

	public int storeAdd(Map<String, Object> map) {
		int addCount = storeMapper.storeAdd(map);
		return addCount;
	}

	public int storeUpdate(Map<String, Object> map) {
		int updateCount = storeMapper.storeUpdate(map);
		return updateCount;
	}

	public int addVisitor(int id) {
		int Count = storeMapper.addVisitor(id);
		return Count;
	}
}
