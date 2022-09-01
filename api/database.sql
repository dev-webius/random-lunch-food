use random_lunch_food;

DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS store_image;
DROP TABLE IF EXISTS store;
DROP TABLE IF EXISTS category;

CREATE TABLE category (
	id tinyint unsigned auto_increment primary key,
    name varchar(255) not null,
    className varchar(255) not null
);

CREATE TABLE store (
	id int unsigned auto_increment primary key,
    categoryId tinyint unsigned not null,
    useEat tinyint unsigned not null default 0,
    name varchar(50) not null,
    detail varchar(255) not null,
    content text not null,
    thumbnail varchar(255) not null,
    address varchar(255) not null,
    url varchar(255) not null,
    visitors int unsigned not null default 0,
    
    foreign key (categoryId) references category (id) on update cascade on delete cascade
);

CREATE TABLE store_image (
	id int unsigned auto_increment primary key,
    storeId int unsigned not null,
    image varchar(255) not null,
    
    foreign key (storeId) references store (id) on update cascade on delete cascade
);

CREATE TABLE review (
	id int unsigned auto_increment primary key,
    storeId int unsigned not null,
    author varchar(50) not null,
    comment varchar(255) not null,
    
    foreign key (storeId) references store (id) on update cascade on delete cascade
);

SHOW TABLES;

-- 데이터 삽입
INSERT INTO category (name, className) VALUES
	("한식", "korean"),
	("양식", "western"),
	("중식", "chinese"),
	("일식", "japanese"),
	("베트남식", "vietnam"),
	("카페", "cafe")
    ;
INSERT INTO store (categoryId, useEat, name, detail, content, thumbnail, address, url) VALUES
	(1,0,"한솥도시락","","","","",""),
	(1,0,"시래향","","","","",""),
	(1,0,"소담","","","","",""),
	(1,0,"청년다방","","","","",""),
	(1,0,"담미온","","","","",""),
	(1,0,"초막집","","","","",""),
	(1,0,"교대밥상","","","","",""),
	(1,0,"오토김밥","","","","",""),
	(1,0,"창화당","","","","",""),
	(1,0,"백채김치찌개","","","","",""),
	(1,0,"엉클부대찌개","","","","",""),
	(1,0,"맛짱분식","","","","",""),
	(1,0,"교대곱창","","","","",""),
	(1,0,"동대문엽기떡볶이","","","","",""),
	(1,0,"보영만두","","","","",""),
	(2,0,"버거파이터","","","","",""),
	(2,0,"7번가피자","","","","",""),
	(3,0,"송쉐프","","","","",""),
	(3,0,"스타마라탕","","","","",""),
	(3,0,"홍콩반점","","","","",""),
	(4,0,"호주","","","","",""),
	(4,0,"길초밥","","","","",""),
	(5,0,"호아빈오리진","","","","",""),
	(6,0,"쉬즈베이글","","","","",""),
	(6,0,"스타벅스","","","","",""),
	(6,0,"퍼플마녀","","","","",""),
	(6,0,"브리지","","","","",""),
	(6,0,"페임커피","","","","",""),
	(6,0,"다솜채","","","","",""),
	(6,0,"컴포즈커피","","","","",""),
	(6,0,"산도","","","","","")
    ;

SELECT * FROM store;
SELECT * FROM category;

-- 관리자 전체 목록
SELECT * FROM store ORDER BY id DESC LIMIT 0, 10;

-- 관리자 전체 목록 갯수
SELECT COUNT(id) FROM store;

-- 관리자 식장 상세정보 
SELECT * FROM store
JOIN menu 
ON categoryId = storeId 
WHERE store.id = 1;

-- 관리자 카테고리 필터
SELECT * FROM store
JOIN category
on store.categoryId = category.id
WHERE category.id = 1;

-- 관리자 가게 추가 (음식추가)
INSERT INTO store (categoryId, useEat, name, detail, content, thumbnail, address, url)
VALUES(1, 1, '테스트가게이름', '가게요약정보', '가게소개글', '가게이미지', '가게주소', '가게URL주소');

INSERT INTO menu (storeId, name, detail, price, thumbnail) 
VALUES (1, '테스트이름', '테스트소개', 4000, '테스트이미지');

-- 관리자 업데이트 (식당저보)
UPDATE store SET
name = '',
detail = '',
content = '',
thumbnail = '',
address = ''
WHERE id = 33;

-- 관리자 식당 삭제
DELETE FROM store
WHERE id = 33;

-- 관리자 음식 삭제
DELETE FROM menu
WHERE id = 33;

-- 관리자 리뷰 관리
DELETE FROM review 
WHERE id = 1;

-- -----------------------------------


-- 사용자 룰렛목록 출력
SELECT 
store.id,
store.name,
store.detail
FROM store
JOIN category
ON store.categoryId = category.id
WHERE useEat = 0 AND category.id in ('1','2');

-- 사용자 룰렛돌리판 카테고리 출력 
SELECT * FROM category;

-- 사용자 가게 상세정보
SELECT
store.name,
store.content,
store.thumbnail,
store.address,
store.visitors,
menu.name,
menu.detail,
menu.price,
menu.thumbnail,
review.author,
review.comment
FROM store
JOIN menu
ON store.categoryId = menu.storeId
JOIN review
ON menu.storeId = review.storeId
WHERE store.useEat = 0 AND store.id = 1;

-- 사용자 리뷰 등록
INSERT INTO review (storeId, author, comment) 
VALUES (1, '작성자', '댓글');
