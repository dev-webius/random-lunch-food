package net.webius.randomlunchfood.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import net.webius.randomlunchfood.entity.CategoryEntity;
import net.webius.randomlunchfood.entity.StoreEntity;

@Repository
public class StoreMapper {
	public final SqlSession sqlSession;
	
	public StoreMapper(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public List<CategoryEntity> categoryList() {
		return sqlSession.selectList("categoryList");
	}

	public List<StoreEntity> storeList(List<Integer> categories, int type) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("categories", categories);
		map.put("type", type);
		
		return sqlSession.selectList("storeList", map);
	}
	
	public StoreEntity store(int id, Boolean manage) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("id", id);
		map.put("manage", manage);
		
		return sqlSession.selectOne("store", map);
	}

	public int storeAdd(Map<String, Object> map) {
		int addCount = sqlSession.insert("storeAdd", map);
		String id = sqlSession.selectOne("selectID" , map);
		
		if (id != null && id != "0"){
			
			Map<String, Object> imagesFileMap = new HashMap<String, Object>();
			
			imagesFileMap.put("id", id);
			imagesFileMap.put("images", map.get("images"));
			
			sqlSession.insert("storeAddFileUpload" , imagesFileMap);
		
		}
		
		return addCount;
	}
	

	public int storeUpdate(Map<String, Object> map) {
		int updateCount = sqlSession.update("storeUpdate" , map);
		
		if(!map.get("thumbnail").equals("")) {
						
			sqlSession.delete("deleteImagesFile" , map);

			Map<String, Object> imagesFileMap = new HashMap<String, Object>();

			imagesFileMap.put("id", map.get("id"));
			imagesFileMap.put("images", map.get("images"));

			sqlSession.insert("updateImagesFile" , imagesFileMap);
		}
		return updateCount;
	}

	public int addVisitor(int id) {
		int count = sqlSession.update("addVisitor" , id);
		return count;
	}

	public int deleteStore(int id) {
		int count = sqlSession.delete("deleteStore" , id);
		return count;
	}
	
}
