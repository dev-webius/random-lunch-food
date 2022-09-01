-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: random_lunch_food
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `className` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'한식','korean'),(2,'양식','western'),(3,'중식','chinese'),(4,'일식','japanese'),(5,'베트남식','vietnam'),(6,'카페','cafe');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `storeId` int unsigned NOT NULL,
  `author` varchar(50) NOT NULL,
  `comment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,'작성자','댓글'),(2,1,'작성자','댓글');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `categoryId` tinyint unsigned NOT NULL,
  `useEat` tinyint unsigned NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL,
  `detail` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `visitors` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `store_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,1,3,'한솥도시락','간편한 도시락집','누구나 다 아는 그맛 어머니가 해주신 도시락 집\r\n','','서울 서초구 서초동 1577-8','',1),(2,1,3,'시래향','웰빙 그 자체 한식집','개인적으로 나는 내 스타일 아닙니다. 풀때기 좋아하시면 추천드립니다.','HeTrDiqnCapK6pM.jpg,qekwm3ZS0KGQx.jpg,2FsaH6mWbJcEf.jpg','서초동 1627-2','',0),(3,1,3,'소담','잔치국수가 맛집인 집','잔치국수가 맛있고 김치도 맛있는 집 하지만 음식에서 벌레가 나왔다는 정보가 있습니다.\r\n곱뺴기 + 1000원','sl50R581P5FGBnI.jpg,3wUXSFMOWhjcIwi.jpg','서초1동 1624-3  106호','',0),(4,1,3,'청년다방','국물떡볶이 집 ','누구나 한번 쯤은 가본 국물떡볶이 집, 이름은 다방인데 왜 떡볶이를 파는가? 가면 버터머시기 감자튀김 꼭 시켜야댐!! ','5ioxgiUaqkhHX.png,3ZZqTe1WsJyEIj.png,Ze7cagdDaDYH8o5.png,363dI4QLPHrAYSE.png,zYoJUM72dkRl6u.png,iilIBn9GLpVVUdX.png,kneMxCo0cr4w68.png','서울 서초구 서초중앙로 99','',0),(5,1,3,'담미온','국밥의 어머니','내가 첫 입사하고 처음 가본 국밥집인데 점심 때 방문하면 사람이 굉장히 많음, 야근 때 자주 갔는데 공기밥 서비스 댕꿀! 부대찌개 국밥, 수육국밥 적극적으로 추천!','nZt9j5JBH57fPe.jpg','서울 서초구 서초중앙로 54 1층','',0),(6,1,0,'초막집','','','','','',0),(7,1,0,'교대밥상','','','','','',0),(8,1,0,'오토김밥','','','','','',0),(9,1,0,'창화당','','','','','',0),(10,1,0,'백채김치찌개','','','','','',0),(11,1,0,'엉클부대찌개','','','','','',0),(12,1,0,'맛짱분식','','','','','',0),(13,1,0,'교대곱창','','','','','',0),(14,1,0,'동대문엽기떡볶이','','','','','',0),(15,1,0,'보영만두','','','','','',0),(16,2,0,'버거파이터','','','','','',0),(17,2,0,'7번가피자','','','','','',0),(18,3,0,'송쉐프','','','','','',0),(19,3,0,'스타마라탕','','','','','',0),(20,3,0,'홍콩반점','','','','','',0),(21,4,0,'호주','','','','','',0),(22,4,0,'길초밥','','','','','',0),(23,5,0,'호아빈오리진','','','','','',0),(24,6,0,'쉬즈베이글','','','','','',0),(25,6,0,'스타벅스','','','','','',0),(26,6,0,'퍼플마녀','','','','','',0),(27,6,0,'브리지','','','','','',0),(28,6,0,'페임커피','','','','','',0),(29,6,0,'다솜채','','','','','',0),(30,6,0,'컴포즈커피','','','','','',0),(31,6,0,'산도','','','','','',0),(217,4,3,'가츠몽','일식 돈까스,냉모밀집','거리가 좀 있으나 다양한 돈까스 메뉴와 냉모밀이 존맛탱 점심시간에 사람이 좀 많은편이니 재빠르게 가는걸 추천한다.','','서울 서초구 서초중앙로22길 34 아치빌딩 1층','https://baemin.me/WF3HeO1bR',3);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_image`
--

DROP TABLE IF EXISTS `store_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_image` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `storeId` int unsigned NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `store_image_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_image`
--

LOCK TABLES `store_image` WRITE;
/*!40000 ALTER TABLE `store_image` DISABLE KEYS */;
INSERT INTO `store_image` VALUES (55,217,'lodEV2XqgFzIy.jpg'),(56,217,'xzt1zLdK2BJpb4J.jpg'),(57,217,'8ee93qXMUHBXU.jpg'),(60,2,'HeTrDiqnCapK6pM.jpg'),(61,2,'qekwm3ZS0KGQx.jpg'),(62,2,'2FsaH6mWbJcEf.jpg'),(63,3,'sl50R581P5FGBnI.jpg'),(64,3,'3wUXSFMOWhjcIwi.jpg'),(74,4,'5ioxgiUaqkhHX.png'),(75,4,'3ZZqTe1WsJyEIj.png'),(76,4,'Ze7cagdDaDYH8o5.png'),(77,4,'363dI4QLPHrAYSE.png'),(78,4,'zYoJUM72dkRl6u.png'),(79,4,'iilIBn9GLpVVUdX.png'),(80,4,'kneMxCo0cr4w68.png'),(85,5,'nZt9j5JBH57fPe.jpg'),(86,6,'test'),(87,1,'1KC2qTWuHfkDvH9y.jpg');
/*!40000 ALTER TABLE `store_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-01 16:38:54
