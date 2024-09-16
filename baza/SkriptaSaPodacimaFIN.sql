CREATE DATABASE  IF NOT EXISTS `e_sportski_centar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `e_sportski_centar`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: e_sportski_centar
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id_administrator` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `broj_telefona` varchar(20) NOT NULL,
  `korisnicko_ime` varchar(50) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id_administrator`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (3,'Žarko','Žarković','123456789','zarko','370c1fac7890d9888431f0732b5cd8f1eb7effd4e5a3940c2ddb9e6aa5673bd9','zarko@email.com');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cjenovnik`
--

DROP TABLE IF EXISTS `cjenovnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cjenovnik` (
  `id_cjenovnik` int NOT NULL AUTO_INCREMENT,
  `vrijeme_od` time NOT NULL,
  `vrijeme_do` time NOT NULL,
  `cijena` decimal(6,2) NOT NULL,
  `id_teren` int NOT NULL,
  PRIMARY KEY (`id_cjenovnik`),
  KEY `FK_cjenovnik_teren_idx` (`id_teren`),
  CONSTRAINT `FK_cjenovnik_teren` FOREIGN KEY (`id_teren`) REFERENCES `teren` (`id_teren`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cjenovnik`
--

LOCK TABLES `cjenovnik` WRITE;
/*!40000 ALTER TABLE `cjenovnik` DISABLE KEYS */;
INSERT INTO `cjenovnik` VALUES (1,'00:00:00','02:00:00',40.00,11),(2,'02:00:00','04:00:00',45.00,11),(3,'04:00:00','06:00:00',50.00,11),(4,'06:00:00','08:00:00',55.00,11),(5,'08:00:00','10:00:00',60.00,11),(6,'10:00:00','12:00:00',65.00,11),(7,'12:00:00','14:00:00',70.00,11),(8,'14:00:00','16:00:00',75.00,11),(9,'16:00:00','18:00:00',80.00,11),(10,'18:00:00','20:00:00',85.00,11),(11,'20:00:00','22:00:00',90.00,11),(12,'22:00:00','00:00:00',95.00,11),(13,'00:00:00','02:00:00',35.00,12),(14,'02:00:00','04:00:00',40.00,12),(15,'04:00:00','06:00:00',45.00,12),(16,'06:00:00','08:00:00',50.00,12),(17,'08:00:00','10:00:00',55.00,12),(18,'10:00:00','12:00:00',60.00,12),(19,'12:00:00','14:00:00',65.00,12),(20,'14:00:00','16:00:00',70.00,12),(21,'16:00:00','18:00:00',75.00,12),(22,'18:00:00','20:00:00',80.00,12),(23,'20:00:00','22:00:00',85.00,12),(24,'22:00:00','00:00:00',90.00,12),(25,'00:00:00','02:00:00',30.00,13),(26,'02:00:00','04:00:00',35.00,13),(27,'04:00:00','06:00:00',40.00,13),(28,'06:00:00','08:00:00',45.00,13),(29,'08:00:00','10:00:00',50.00,13),(30,'10:00:00','12:00:00',55.00,13),(31,'12:00:00','14:00:00',60.00,13),(32,'14:00:00','16:00:00',65.00,13),(33,'16:00:00','18:00:00',70.00,13),(34,'18:00:00','20:00:00',75.00,13),(35,'20:00:00','22:00:00',80.00,13),(36,'22:00:00','00:00:00',85.00,13),(37,'00:00:00','02:00:00',25.00,14),(38,'02:00:00','04:00:00',30.00,14),(39,'04:00:00','06:00:00',35.00,14),(40,'06:00:00','08:00:00',40.00,14),(41,'08:00:00','10:00:00',45.00,14),(42,'10:00:00','12:00:00',50.00,14),(43,'12:00:00','14:00:00',55.00,14),(44,'14:00:00','16:00:00',60.00,14),(45,'16:00:00','18:00:00',65.00,14),(46,'18:00:00','20:00:00',70.00,14),(47,'20:00:00','22:00:00',75.00,14),(48,'22:00:00','00:00:00',80.00,14);
/*!40000 ALTER TABLE `cjenovnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dezurni_radnik`
--

DROP TABLE IF EXISTS `dezurni_radnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dezurni_radnik` (
  `id_dezurni_radnik` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `broj_telefona` varchar(20) NOT NULL,
  `korisnicko_ime` varchar(50) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `blokiran` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id_dezurni_radnik`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dezurni_radnik`
--

LOCK TABLES `dezurni_radnik` WRITE;
/*!40000 ALTER TABLE `dezurni_radnik` DISABLE KEYS */;
INSERT INTO `dezurni_radnik` VALUES (5,'a','a','123456789','a','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','a@email.com',_binary '\0'),(6,'Pero','Peric','065777888','pero','0db9df7d8e7ff24ae5980d8862caf37b60f0e3ef9165630a8d64247c9d42cfd3','pero@email.com',_binary '\0');
/*!40000 ALTER TABLE `dezurni_radnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dnevni_raspored`
--

DROP TABLE IF EXISTS `dnevni_raspored`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dnevni_raspored` (
  `id_dnevni_raspored` int NOT NULL AUTO_INCREMENT,
  `datum` date DEFAULT NULL,
  `id_raspored` int DEFAULT NULL,
  PRIMARY KEY (`id_dnevni_raspored`),
  KEY `FK_dnevni_raspored_raspored_idx` (`id_raspored`),
  CONSTRAINT `FK_dnevni_raspored_raspored` FOREIGN KEY (`id_raspored`) REFERENCES `raspored` (`id_raspored`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dnevni_raspored`
--

LOCK TABLES `dnevni_raspored` WRITE;
/*!40000 ALTER TABLE `dnevni_raspored` DISABLE KEYS */;
INSERT INTO `dnevni_raspored` VALUES (156,'2024-09-14',13),(157,'2024-09-12',13),(158,'2024-09-03',13),(162,'2024-09-04',13),(163,'2024-09-05',13),(164,'2024-09-06',13),(165,'2024-09-07',13),(166,'2024-09-08',13),(167,'2024-09-09',13),(168,'2024-09-10',13),(169,'2024-07-01',13),(170,'2024-07-02',13),(171,'2024-07-03',13),(172,'2024-07-04',13),(173,'2024-07-05',13),(174,'2024-07-06',13),(175,'2024-07-07',13),(176,'2024-07-08',13),(177,'2024-07-09',13),(178,'2024-07-10',13),(179,'2024-07-11',13),(180,'2024-07-12',13),(181,'2024-07-13',13),(182,'2024-07-14',13),(183,'2024-08-01',13),(184,'2024-08-02',13),(185,'2024-08-03',13),(186,'2024-08-04',13),(187,'2024-08-05',13),(188,'2024-08-06',13),(189,'2024-08-07',13),(190,'2024-08-08',13),(191,'2024-08-09',13),(192,'2024-08-10',13),(193,'2024-09-16',13);
/*!40000 ALTER TABLE `dnevni_raspored` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogadjaj`
--

DROP TABLE IF EXISTS `dogadjaj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dogadjaj` (
  `id_dogadjaj` int NOT NULL AUTO_INCREMENT,
  `id_takmicenje` int NOT NULL,
  `id_domace_ekipe` int DEFAULT NULL,
  `id_gostujuce_ekipe` int DEFAULT NULL,
  `vrijeme_od` time NOT NULL,
  `vrijeme_do` time NOT NULL,
  `info_dogadjaja` varchar(200) DEFAULT NULL,
  `id_dnevni_raspored` int NOT NULL,
  `id_teren` int NOT NULL,
  `cijena` decimal(6,2) NOT NULL,
  `id_klijent` int DEFAULT NULL,
  `id_sport` int DEFAULT NULL,
  `odobren` bit(1) NOT NULL,
  PRIMARY KEY (`id_dogadjaj`),
  KEY `FK_dogadjaj_dnevni_rapored_idx` (`id_dnevni_raspored`),
  KEY `FK_dogadjaj_teren_idx` (`id_teren`),
  KEY `FK_dogadjaj_ekipa_gost_idx` (`id_gostujuce_ekipe`),
  KEY `FK_dogadjaj_ekipa_domacin` (`id_domace_ekipe`),
  KEY `FK_dogadjaj_klijent_idx` (`id_klijent`),
  KEY `FK_dogadjaj_sport_idx` (`id_sport`),
  CONSTRAINT `FK_dogadjaj_dnevni_rapored` FOREIGN KEY (`id_dnevni_raspored`) REFERENCES `dnevni_raspored` (`id_dnevni_raspored`),
  CONSTRAINT `FK_dogadjaj_ekipa_domacin` FOREIGN KEY (`id_domace_ekipe`) REFERENCES `ekipa` (`id_ekipa`),
  CONSTRAINT `FK_dogadjaj_ekipa_gost` FOREIGN KEY (`id_gostujuce_ekipe`) REFERENCES `ekipa` (`id_ekipa`),
  CONSTRAINT `FK_dogadjaj_klijent` FOREIGN KEY (`id_klijent`) REFERENCES `klijent` (`id_klijent`),
  CONSTRAINT `FK_dogadjaj_sport` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id_sport`),
  CONSTRAINT `FK_dogadjaj_teren` FOREIGN KEY (`id_teren`) REFERENCES `teren` (`id_teren`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogadjaj`
--

LOCK TABLES `dogadjaj` WRITE;
/*!40000 ALTER TABLE `dogadjaj` DISABLE KEYS */;
INSERT INTO `dogadjaj` VALUES (115,5,4,5,'08:00:00','10:00:00','Jutarnja utakmica',156,11,50.00,NULL,2,_binary ''),(116,5,4,6,'10:00:00','12:00:00','Kasnija jutarnja utakmica',156,12,60.00,NULL,2,_binary ''),(117,5,5,4,'12:00:00','14:00:00','Podnevna utakmica',162,13,70.00,NULL,3,_binary ''),(118,5,6,5,'14:00:00','16:00:00','Popodnevna utakmica',163,14,80.00,NULL,2,_binary ''),(119,5,6,4,'16:00:00','18:00:00','Večernja utakmica',164,11,90.00,NULL,3,_binary ''),(120,5,4,5,'18:00:00','20:00:00','Noćna utakmica',165,12,100.00,NULL,1,_binary ''),(121,5,5,6,'20:00:00','22:00:00','Kasnonoćna utakmica',166,13,110.00,NULL,2,_binary ''),(122,5,6,4,'22:00:00','00:00:00','Ponoćna utakmica',167,14,120.00,NULL,3,_binary ''),(123,5,4,6,'00:00:00','02:00:00','Rana jutarnja utakmica',167,11,130.00,NULL,4,_binary ''),(124,5,5,4,'02:00:00','04:00:00','Rane sate utakmica',167,12,140.00,NULL,2,_binary ''),(125,5,6,5,'04:00:00','06:00:00','Zora utakmica',187,13,150.00,NULL,3,_binary ''),(126,5,4,5,'06:00:00','08:00:00','Ranojutarnja priprema',177,14,160.00,NULL,2,_binary ''),(127,5,4,6,'08:00:00','10:00:00','Sredinom jutra utakmica',177,11,50.00,NULL,3,_binary ''),(128,5,6,5,'10:00:00','12:00:00','Podnevno takmičenje',166,12,60.00,NULL,2,_binary ''),(129,5,5,4,'12:00:00','14:00:00','Podnevna borba',163,13,70.00,NULL,3,_binary ''),(130,5,6,4,'14:00:00','16:00:00','Popodnevno takmičenje',165,14,80.00,NULL,1,_binary ''),(131,5,4,5,'16:00:00','18:00:00','Večernja borba',162,11,90.00,NULL,2,_binary ''),(132,5,5,6,'18:00:00','20:00:00','Noćno takmičenje',157,12,100.00,NULL,3,_binary ''),(133,5,6,4,'20:00:00','22:00:00','Kasnonoćna borba',157,13,110.00,NULL,2,_binary ''),(134,5,4,6,'22:00:00','00:00:00','Ponoćna borba',157,14,120.00,NULL,3,_binary ''),(135,5,6,5,'00:00:00','02:00:00','Ranojutarnja borba',158,11,130.00,NULL,4,_binary ''),(136,5,4,5,'02:00:00','04:00:00','Rane jutarnje utakmice',158,12,140.00,NULL,2,_binary ''),(137,5,5,6,'04:00:00','06:00:00','Jutarnje zagrijavanje',176,13,150.00,NULL,3,_binary ''),(138,5,6,4,'06:00:00','08:00:00','Utakmica zore',165,14,160.00,NULL,2,_binary ''),(139,5,4,5,'08:00:00','10:00:00','Utakmica sredinom jutra',166,11,50.00,NULL,3,_binary ''),(140,5,5,6,'10:00:00','12:00:00','Takmičenje u podne',174,12,60.00,NULL,2,_binary ''),(141,5,6,4,'12:00:00','14:00:00','Borba u podne',182,13,70.00,NULL,3,_binary ''),(142,5,4,5,'14:00:00','16:00:00','Popodnevno finale',188,14,80.00,NULL,1,_binary ''),(143,5,5,6,'16:00:00','18:00:00','Večernje finale',164,11,90.00,NULL,2,_binary ''),(144,5,6,4,'18:00:00','20:00:00','Noćno finale',164,12,100.00,NULL,3,_binary ''),(145,5,4,6,'20:00:00','22:00:00','Noćna završnica',164,13,110.00,NULL,2,_binary ''),(146,5,5,4,'22:00:00','00:00:00','Ponoćna završnica',164,14,120.00,NULL,3,_binary ''),(147,5,6,5,'00:00:00','02:00:00','Ranojutarnja utakmica',162,11,130.00,NULL,1,_binary ''),(148,5,4,5,'02:00:00','04:00:00','Utakmica u ranim jutarnjim satima',162,12,140.00,NULL,4,_binary ''),(149,5,5,6,'04:00:00','06:00:00','Utakmica zore',188,13,150.00,NULL,2,_binary ''),(150,5,6,4,'06:00:00','08:00:00','Ranojutarnje finale',178,14,160.00,NULL,3,_binary ''),(151,5,4,6,'08:00:00','10:00:00','Utakmica sredinom jutra',177,11,50.00,NULL,2,_binary ''),(152,5,5,4,'10:00:00','12:00:00','Podnevna borba',166,12,60.00,NULL,3,_binary ''),(153,5,6,5,'12:00:00','14:00:00','Takmičenje u podne',163,13,70.00,NULL,1,_binary ''),(154,5,4,5,'14:00:00','16:00:00','Popodnevno takmičenje',162,14,80.00,NULL,2,_binary ''),(155,5,5,6,'16:00:00','18:00:00','Večernja borba',166,11,90.00,NULL,3,_binary ''),(156,5,6,4,'18:00:00','20:00:00','Noćno takmičenje',190,12,100.00,NULL,2,_binary ''),(157,5,4,6,'20:00:00','22:00:00','Kasnonoćno takmičenje',190,13,110.00,NULL,4,_binary ''),(158,5,5,4,'22:00:00','00:00:00','Ponoćna borba',189,14,120.00,NULL,3,_binary ''),(159,5,6,5,'00:00:00','02:00:00','Ranojutarnje finale',190,11,130.00,NULL,2,_binary ''),(160,4,NULL,NULL,'08:00:00','10:00:00','Rezervacija',156,11,55.00,5,NULL,_binary ''),(161,4,NULL,NULL,'10:00:00','12:00:00','Rezervacija',157,12,60.00,6,NULL,_binary ''),(162,4,NULL,NULL,'12:00:00','14:00:00','Rezervacija',158,13,65.00,7,NULL,_binary '\0'),(163,4,NULL,NULL,'14:00:00','16:00:00','Rezervacija',156,14,70.00,8,NULL,_binary ''),(164,4,NULL,NULL,'16:00:00','18:00:00','Rezervacija',157,11,75.00,9,NULL,_binary ''),(166,4,NULL,NULL,'20:00:00','22:00:00','Rezervacija',163,13,85.00,11,NULL,_binary ''),(167,4,NULL,NULL,'22:00:00','00:00:00','Rezervacija',157,14,90.00,12,NULL,_binary ''),(168,4,NULL,NULL,'00:00:00','02:00:00','Rezervacija',158,11,95.00,13,NULL,_binary '\0'),(169,4,NULL,NULL,'02:00:00','04:00:00','Rezervacija',156,12,100.00,14,NULL,_binary ''),(170,4,NULL,NULL,'04:00:00','06:00:00','Rezervacija',162,13,105.00,15,NULL,_binary ''),(171,4,NULL,NULL,'06:00:00','08:00:00','Rezervacija',158,14,110.00,16,NULL,_binary ''),(172,4,NULL,NULL,'08:00:00','10:00:00','Rezervacija',162,11,115.00,17,NULL,_binary ''),(173,4,NULL,NULL,'10:00:00','12:00:00','Rezervacija',157,12,120.00,18,NULL,_binary ''),(174,4,NULL,NULL,'12:00:00','14:00:00','Rezervacija',162,13,125.00,19,NULL,_binary '\0'),(175,4,NULL,NULL,'14:00:00','16:00:00','Rezervacija',165,14,130.00,20,NULL,_binary ''),(176,4,NULL,NULL,'16:00:00','18:00:00','Rezervacija',165,11,135.00,21,NULL,_binary ''),(177,4,NULL,NULL,'18:00:00','20:00:00','Rezervacija',158,12,140.00,22,NULL,_binary ''),(178,4,NULL,NULL,'20:00:00','22:00:00','Rezervacija',156,13,145.00,23,NULL,_binary ''),(179,4,NULL,NULL,'22:00:00','00:00:00','Rezervacija',157,14,150.00,24,NULL,_binary ''),(180,4,NULL,NULL,'00:00:00','02:00:00','Rezervacija',158,11,155.00,25,NULL,_binary '\0'),(181,4,NULL,NULL,'02:00:00','04:00:00','Rezervacija',156,12,160.00,26,NULL,_binary ''),(182,4,NULL,NULL,'00:00:00','02:00:00','Rezervacija',158,11,455.00,85,NULL,_binary '\0'),(183,4,NULL,NULL,'02:00:00','04:00:00','Rezervacija',156,12,460.00,86,NULL,_binary '');
/*!40000 ALTER TABLE `dogadjaj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dvorana`
--

DROP TABLE IF EXISTS `dvorana`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dvorana` (
  `id_dvorana` int NOT NULL AUTO_INCREMENT,
  `naziv_dvorane` varchar(100) NOT NULL,
  `id_grad` int NOT NULL,
  `kapacitet` int DEFAULT NULL,
  `info` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_dvorana`),
  KEY `FK_dvorana_grad_idx` (`id_grad`),
  CONSTRAINT `FK_dvorana_grad` FOREIGN KEY (`id_grad`) REFERENCES `grad` (`id_grad`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dvorana`
--

LOCK TABLES `dvorana` WRITE;
/*!40000 ALTER TABLE `dvorana` DISABLE KEYS */;
INSERT INTO `dvorana` VALUES (13,'Borik',22,3500,'Olimpijska sportska dvorana izgrađena 1974. za potrebe sportskog društva Borac i za razvoj sporta u Banjoj Luci.'),(14,'Gradski stadion',22,9730,'Najveći i najmoderniji stadion u Republici Srpskoj. Po UEFA standardizaciji stadion ima 3 zvjezdice pa je pogodan za evropska takmičenja.'),(15,'Kulturno-sportska dvorana',24,5000,'Objekat u izgradnji'),(16,'sa',24,12,'ads');
/*!40000 ALTER TABLE `dvorana` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ekipa`
--

DROP TABLE IF EXISTS `ekipa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ekipa` (
  `id_ekipa` int NOT NULL AUTO_INCREMENT,
  `naziv_ekipe` varchar(100) NOT NULL,
  `id_sport` int NOT NULL,
  PRIMARY KEY (`id_ekipa`),
  KEY `FK_ekipa_sport_idx` (`id_sport`),
  CONSTRAINT `FK_ekipa_sport` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id_sport`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ekipa`
--

LOCK TABLES `ekipa` WRITE;
/*!40000 ALTER TABLE `ekipa` DISABLE KEYS */;
INSERT INTO `ekipa` VALUES (4,'Borac Banja Luka',3),(5,'Lask Linc',3),(6,'Radnik Bijeljina',3),(8,'FK Zeljeznicar',3);
/*!40000 ALTER TABLE `ekipa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grad`
--

DROP TABLE IF EXISTS `grad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grad` (
  `id_grad` int NOT NULL AUTO_INCREMENT,
  `naziv_grada` varchar(100) NOT NULL,
  PRIMARY KEY (`id_grad`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grad`
--

LOCK TABLES `grad` WRITE;
/*!40000 ALTER TABLE `grad` DISABLE KEYS */;
INSERT INTO `grad` VALUES (22,'Banja Luka'),(23,'Bijeljina'),(24,'Mostar'),(25,'Doboj'),(26,'Trebinje'),(27,'Tuzla'),(28,'Prijedor');
/*!40000 ALTER TABLE `grad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventar`
--

DROP TABLE IF EXISTS `inventar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventar` (
  `id_inventar` int NOT NULL AUTO_INCREMENT,
  `id_dvorana` int NOT NULL,
  `naziv` varchar(100) DEFAULT NULL,
  `opis` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_inventar`),
  KEY `FK_inventar_dvorana_idx` (`id_dvorana`),
  CONSTRAINT `FK_inventar_dvorana` FOREIGN KEY (`id_dvorana`) REFERENCES `dvorana` (`id_dvorana`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventar`
--

LOCK TABLES `inventar` WRITE;
/*!40000 ALTER TABLE `inventar` DISABLE KEYS */;
INSERT INTO `inventar` VALUES (3,14,'Golovi','Dva gola i jedan pomoćni'),(4,14,'Led siplej','Led displeji namjenjeni za prikaz reklama'),(5,13,'Koševi','Koševi sa semaforom');
/*!40000 ALTER TABLE `inventar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `klijent`
--

DROP TABLE IF EXISTS `klijent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `klijent` (
  `id_klijent` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `broj_telefona` varchar(20) DEFAULT NULL,
  `korisnicko_ime` varchar(50) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `blokiran` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id_klijent`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klijent`
--

LOCK TABLES `klijent` WRITE;
/*!40000 ALTER TABLE `klijent` DISABLE KEYS */;
INSERT INTO `klijent` VALUES (5,'Jelena','Marković','060123456','jelena.markovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','jelena.markovic@example.com',_binary '\0'),(6,'Milan','Petrović','061234567','milan.petrovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','milan.petrovic@example.com',_binary '\0'),(7,'Ana','Jovanović','062345678','ana.jovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ana.jovanovic@example.com',_binary '\0'),(8,'Ivan','Nikolić','063456789','ivan.nikolic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ivan.nikolic@example.com',_binary '\0'),(9,'Milica','Marinković','064567890','milica.marinkovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','milica.marinkovic@example.com',_binary '\0'),(10,'Luka','Kostić','065678901','luka.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','luka.kostic@example.com',_binary '\0'),(11,'Sara','Janković','066789012','sara.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','sara.jankovic@example.com',_binary '\0'),(12,'Andrej','Tomić','067890123','andrej.tomic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','andrej.tomic@example.com',_binary '\0'),(13,'Nina','Banjac','068901234','nina.banjac','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','nina.banjac@example.com',_binary '\0'),(14,'Nikola','Tomić','069012345','nikola.tomic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','nikola.tomic@example.com',_binary '\0'),(15,'Marija','Simić','070123456','marija.simic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','marija.simic@example.com',_binary '\0'),(16,'Mladen','Janković','071234567','mladen.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','mladen.jankovic@example.com',_binary '\0'),(17,'Tomislav','Radović','072345678','tomislav.radovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','tomislav.radovic@example.com',_binary '\0'),(18,'Sanja','Jovanović','073456789','sanja.jovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','sanja.jovanovic@example.com',_binary '\0'),(19,'Goran','Milović','074567890','goran.milovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','goran.milovic@example.com',_binary '\0'),(20,'Danijela','Kovačić','075678901','danijela.kovacic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','danijela.kovacic@example.com',_binary '\0'),(21,'Vuk','Milinković','076789012','vuk.milinkovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','vuk.milinkovic@example.com',_binary '\0'),(22,'Ivana','Janković','077890123','ivana.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ivana.jankovic@example.com',_binary '\0'),(23,'Darko','Vuković','078901234','darko.vukovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','darko.vukovic@example.com',_binary '\0'),(24,'Maja','Jovanović','079012345','maja.jovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','maja.jovanovic@example.com',_binary '\0'),(25,'Aleksandar','Vasiljević','080123456','aleksandar.vasiljevic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','aleksandar.vasiljevic@example.com',_binary '\0'),(26,'Sara','Kostić','081234567','sara.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','sara.kostic@example.com',_binary '\0'),(27,'Nikolina','Tomić','082345678','nikolina.tomic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','nikolina.tomic@example.com',_binary '\0'),(28,'Igor','Stanić','083456789','igor.stanic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','igor.stanic@example.com',_binary '\0'),(29,'Marija','Lukić','084567890','marija.lukic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','marija.lukic@example.com',_binary '\0'),(30,'Dario','Petrović','085678901','dario.petrovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','dario.petrovic@example.com',_binary '\0'),(31,'Nina','Stefanović','086789012','nina.stefanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','nina.stefanovic@example.com',_binary '\0'),(32,'Lazar','Milovanović','087890123','lazar.milovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','lazar.milovanovic@example.com',_binary '\0'),(33,'Teodora','Stanković','088901234','teodora.stankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','teodora.stankovic@example.com',_binary '\0'),(34,'Goran','Vuković','089012345','goran.vukovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','goran.vukovic@example.com',_binary '\0'),(35,'Ana','Miljković','090123456','ana.miljkovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ana.miljkovic@example.com',_binary '\0'),(36,'Jovan','Todorović','091234567','jovan.todorovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','jovan.todorovic@example.com',_binary '\0'),(37,'Petra','Popović','092345678','petra.popovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','petra.popovic@example.com',_binary '\0'),(38,'Aleksandar','Kostić','093456789','aleksandar.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','aleksandar.kostic@example.com',_binary '\0'),(39,'Milena','Tomić','094567890','milena.tomic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','milena.tomic@example.com',_binary '\0'),(40,'Stefan','Radović','095678901','stefan.radovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','stefan.radovic@example.com',_binary '\0'),(41,'Milica','Stefanović','096789012','milica.stefanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','milica.stefanovic@example.com',_binary '\0'),(42,'Radojka','Milovanović','097890123','radojka.milovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','radojka.milovanovic@example.com',_binary '\0'),(43,'Igor','Kovačić','098901234','igor.kovacic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','igor.kovacic@example.com',_binary '\0'),(44,'Valentina','Lukić','099012345','valentina.lukic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','valentina.lukic@example.com',_binary '\0'),(45,'Luka','Jovanović','100123456','luka.jovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','luka.jovanovic@example.com',_binary '\0'),(46,'Gordana','Stanković','101234567','gordana.stankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','gordana.stankovic@example.com',_binary '\0'),(47,'Zoran','Janković','102345678','zoran.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','zoran.jankovic@example.com',_binary '\0'),(48,'Katarina','Kostić','103456789','katarina.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','katarina.kostic@example.com',_binary '\0'),(49,'Vladimir','Milić','104567890','vladimir.milic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','vladimir.milic@example.com',_binary '\0'),(50,'Branka','Pavić','105678901','branka.pavic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','branka.pavic@example.com',_binary '\0'),(51,'Miroslav','Stojanović','106789012','miroslav.stojanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','miroslav.stojanovic@example.com',_binary '\0'),(52,'Dragana','Milinković','107890123','dragana.milinkovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','dragana.milinkovic@example.com',_binary '\0'),(53,'Mladen','Stefanović','108901234','mladen.stefanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','mladen.stefanovic@example.com',_binary '\0'),(54,'Ivana','Pavić','109012345','ivana.pavic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ivana.pavic@example.com',_binary '\0'),(55,'Petar','Milovanović','110123456','petar.milovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','petar.milovanovic@example.com',_binary '\0'),(56,'Marina','Jovanović','111234567','marina.jovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','marina.jovanovic@example.com',_binary '\0'),(57,'Jovan','Lukić','112345678','jovan.lukic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','jovan.lukic@example.com',_binary '\0'),(58,'Branislav','Stanić','113456789','branislav.stanic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','branislav.stanic@example.com',_binary '\0'),(59,'Ksenija','Kovačić','114567890','ksenija.kovacic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ksenija.kovacic@example.com',_binary '\0'),(60,'Bogdan','Janković','115678901','bogdan.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','bogdan.jankovic@example.com',_binary '\0'),(61,'Milica','Kostić','116789012','milica.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','milica.kostic@example.com',_binary '\0'),(62,'Vesna','Lukić','117890123','vesna.lukic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','vesna.lukic@example.com',_binary '\0'),(63,'Nemanja','Jovanović','118901234','nemanja.jovanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','nemanja.jovanovic@example.com',_binary '\0'),(64,'Milena','Janković','119012345','milena.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','milena.jankovic@example.com',_binary '\0'),(65,'Igor','Stanković','120123456','igor.stankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','igor.stankovic@example.com',_binary '\0'),(66,'Ana','Pavić','121234567','ana.pavic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ana.pavic@example.com',_binary '\0'),(67,'Radojka','Popović','122345678','radojka.popovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','radojka.popovic@example.com',_binary '\0'),(68,'Luka','Stefanović','123456789','luka.stefanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','luka.stefanovic@example.com',_binary '\0'),(69,'Igor','Miljković','124567890','igor.miljkovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','igor.miljkovic@example.com',_binary '\0'),(70,'Gordana','Kostić','125678901','gordana.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','gordana.kostic@example.com',_binary '\0'),(71,'Aleksandar','Pavić','126789012','aleksandar.pavic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','aleksandar.pavic@example.com',_binary '\0'),(72,'Miroslav','Lukić','127890123','miroslav.lukic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','miroslav.lukic@example.com',_binary '\0'),(73,'Valentina','Stefanović','128901234','valentina.stefanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','valentina.stefanovic@example.com',_binary '\0'),(74,'Milica','Pavić','129012345','milica.pavic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','milica.pavic@example.com',_binary '\0'),(75,'Nemanja','Kostić','130123456','nemanja.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','nemanja.kostic@example.com',_binary '\0'),(76,'Mladen','Janković','131234567','mladen.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','mladen.jankovic@example.com',_binary '\0'),(77,'Branislav','Kostić','132345678','branislav.kostic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','branislav.kostic@example.com',_binary '\0'),(78,'Ksenija','Miljković','133456789','ksenija.miljkovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','ksenija.miljkovic@example.com',_binary '\0'),(79,'Dragana','Janković','134567890','dragana.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','dragana.jankovic@example.com',_binary '\0'),(80,'Vladimir','Popović','135678901','vladimir.popovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','vladimir.popovic@example.com',_binary '\0'),(81,'Branka','Janković','136789012','branka.jankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','branka.jankovic@example.com',_binary '\0'),(82,'Marina','Stanković','137890123','marina.stankovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','marina.stankovic@example.com',_binary '\0'),(83,'Jovana','Stefanović','138901234','jovana.stefanovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','jovana.stefanovic@example.com',_binary '\0'),(84,'Igor','Popović','139012345','igor.popovic','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','igor.popovic@example.com',_binary '\0'),(85,'Milan','I','066555333','milan','efee614420c57ddd2a8e91eeef6f6b83d5356c2288155be0f273bef986e3b850','mica.ignjatic01@gmail.com',_binary '\0'),(86,'Stojan','Stojan','066777888','stojan','bed85a5c17800dd8adcdcf05ca89da4c79d156a98f58832c1f6a029b5259ae8a','stojan@email.com',_binary '\0');
/*!40000 ALTER TABLE `klijent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raspored`
--

DROP TABLE IF EXISTS `raspored`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raspored` (
  `id_raspored` int NOT NULL AUTO_INCREMENT,
  `tip_rasporeda` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_raspored`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raspored`
--

LOCK TABLES `raspored` WRITE;
/*!40000 ALTER TABLE `raspored` DISABLE KEYS */;
INSERT INTO `raspored` VALUES (13,'Automatski');
/*!40000 ALTER TABLE `raspored` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sport`
--

DROP TABLE IF EXISTS `sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sport` (
  `id_sport` int NOT NULL AUTO_INCREMENT,
  `naziv_sporta` varchar(50) NOT NULL,
  `duzina` decimal(5,2) NOT NULL,
  `sirina` decimal(5,2) NOT NULL,
  `id_tip_terena` int NOT NULL,
  PRIMARY KEY (`id_sport`),
  KEY `FK_sport_tip_terena_idx` (`id_tip_terena`),
  CONSTRAINT `FK_sport_tip_terena` FOREIGN KEY (`id_tip_terena`) REFERENCES `tip_terena` (`id_tip_terena`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES (1,'Tenis',23.77,10.97,4),(2,'Košarka',28.00,15.00,4),(3,'Fudbal',105.00,68.00,4),(4,'Rukomet',40.00,20.00,4),(5,'Odbojka',18.00,9.00,5),(6,'Golf',150.00,50.00,6),(7,'Stoni tenis',2.74,1.53,4),(8,'Badminton',13.40,6.10,4),(9,'Hokej',60.00,30.00,4),(10,'Atletika',400.00,6.00,4),(25,'Fudbal',120.00,22.00,5);
/*!40000 ALTER TABLE `sport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `svlacionica`
--

DROP TABLE IF EXISTS `svlacionica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `svlacionica` (
  `id_svlacionica` int NOT NULL AUTO_INCREMENT,
  `id_dvorana` int NOT NULL,
  `broj_svlacionice` int DEFAULT NULL,
  `dostupna` bit(1) NOT NULL,
  PRIMARY KEY (`id_svlacionica`),
  KEY `FK_svlacionica_dvorana_idx` (`id_dvorana`),
  CONSTRAINT `FK_svlacionica_dvorana` FOREIGN KEY (`id_dvorana`) REFERENCES `dvorana` (`id_dvorana`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `svlacionica`
--

LOCK TABLES `svlacionica` WRITE;
/*!40000 ALTER TABLE `svlacionica` DISABLE KEYS */;
INSERT INTO `svlacionica` VALUES (3,14,1,_binary ''),(4,14,2,_binary ''),(5,13,1,_binary ''),(6,13,2,_binary '\0'),(7,13,3,_binary '');
/*!40000 ALTER TABLE `svlacionica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `takmicenje`
--

DROP TABLE IF EXISTS `takmicenje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `takmicenje` (
  `id_takmicenje` int NOT NULL AUTO_INCREMENT,
  `vrsta_takmicenja` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_takmicenje`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `takmicenje`
--

LOCK TABLES `takmicenje` WRITE;
/*!40000 ALTER TABLE `takmicenje` DISABLE KEYS */;
INSERT INTO `takmicenje` VALUES (4,'Rekreativni termin'),(5,'Zvanična utakmica');
/*!40000 ALTER TABLE `takmicenje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teren`
--

DROP TABLE IF EXISTS `teren`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teren` (
  `id_teren` int NOT NULL AUTO_INCREMENT,
  `id_tip_terena` int NOT NULL,
  `naziv_terena` varchar(100) NOT NULL,
  `info` varchar(500) DEFAULT NULL,
  `id_dvorana` int NOT NULL,
  `slika` varchar(500) DEFAULT NULL,
  `duzina` decimal(5,2) NOT NULL,
  `sirina` decimal(5,2) NOT NULL,
  `dostupan` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_teren`),
  KEY `FK_teren_tip_terena_idx` (`id_tip_terena`),
  KEY `FK_teren_dvorana_idx` (`id_dvorana`),
  CONSTRAINT `FK_teren_dvorana` FOREIGN KEY (`id_dvorana`) REFERENCES `dvorana` (`id_dvorana`),
  CONSTRAINT `FK_teren_tip_terena` FOREIGN KEY (`id_tip_terena`) REFERENCES `tip_terena` (`id_tip_terena`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teren`
--

LOCK TABLES `teren` WRITE;
/*!40000 ALTER TABLE `teren` DISABLE KEYS */;
INSERT INTO `teren` VALUES (11,4,'Glavni teren','Glavni teren Gradskog stadiona, pogodan za igranje profesionalnih utakmica',14,'http://localhost:8080/gradski.jpg',105.00,68.00,_binary ''),(12,4,'Pomoćni teren','Pomoćni teren Gradskog stadiona, pogodan za juniorske i amaterske mečeve.',14,'http://localhost:8080/pomocni.jpg',100.00,50.00,_binary ''),(13,5,'Glavni teren','Glavni teren Dvorane Borik, pogadan za igranje svih dvoranskih sportova.',13,'http://localhost:8080/Dvorana-Borik.jpg',60.00,30.00,_binary ''),(14,6,'Atletska staza','Moderna atletska staza pogodna za treninge, kao i atletska takmičenja',14,'http://localhost:8080/atletska.jpg',400.00,20.00,_binary '');
/*!40000 ALTER TABLE `teren` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_terena`
--

DROP TABLE IF EXISTS `tip_terena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip_terena` (
  `id_tip_terena` int NOT NULL AUTO_INCREMENT,
  `naziv_tipa_terena` varchar(100) NOT NULL,
  `info` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_tip_terena`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_terena`
--

LOCK TABLES `tip_terena` WRITE;
/*!40000 ALTER TABLE `tip_terena` DISABLE KEYS */;
INSERT INTO `tip_terena` VALUES (4,'Trava','Travnata podloga dužine od 0.6 cm do 1.5 cm sa kanalizacionim i toplotnim sistemom'),(5,'Parket','Hrastov parket srednje debljine, lakiran lakom niskog sjaja. Pogodan ya sve sportove'),(6,'Tartan','Sintetički materijal od slojeva gume i poliuretana. Pruža dobro prijanjanje i apsorpciju udara.');
/*!40000 ALTER TABLE `tip_terena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ulaz`
--

DROP TABLE IF EXISTS `ulaz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ulaz` (
  `id_ulaz` int NOT NULL AUTO_INCREMENT,
  `id_dvorana` int NOT NULL,
  `naziv_ulaza` varchar(100) NOT NULL,
  `broj_ulaza` int DEFAULT NULL,
  `dostupan` bit(1) NOT NULL,
  PRIMARY KEY (`id_ulaz`),
  KEY `FK_ulaz_dvorana_idx` (`id_dvorana`),
  CONSTRAINT `FK_ulaz_dvorana` FOREIGN KEY (`id_dvorana`) REFERENCES `dvorana` (`id_dvorana`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ulaz`
--

LOCK TABLES `ulaz` WRITE;
/*!40000 ALTER TABLE `ulaz` DISABLE KEYS */;
INSERT INTO `ulaz` VALUES (8,14,'Istok',1,_binary ''),(9,14,'Sjever',1,_binary ''),(10,14,'Zapad',1,_binary '\0'),(11,14,'Jug',1,_binary '\0'),(12,13,'Zapad',1,_binary ''),(13,13,'Zapad',2,_binary '');
/*!40000 ALTER TABLE `ulaz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upravnik`
--

DROP TABLE IF EXISTS `upravnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upravnik` (
  `id_upravnik` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `broj_telefona` varchar(20) NOT NULL,
  `korisnicko_ime` varchar(50) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `blokiran` bit(1) NOT NULL DEFAULT b'0',
  `id_dvorana` int NOT NULL,
  PRIMARY KEY (`id_upravnik`),
  KEY `fk_upravnik_dvorana_idx` (`id_dvorana`),
  CONSTRAINT `fk_upravnik_dvorana` FOREIGN KEY (`id_dvorana`) REFERENCES `dvorana` (`id_dvorana`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upravnik`
--

LOCK TABLES `upravnik` WRITE;
/*!40000 ALTER TABLE `upravnik` DISABLE KEYS */;
INSERT INTO `upravnik` VALUES (5,'Slavko','Slavković','987654321','slavko','0f2a6ac4a00cdf20a7357b7961d2563433eb432d9bd17f6d67443428a7e9beab','slavko@email.com',_binary '\0',14),(6,'Momčilo','Momčilović','066555333','momcilo','cbe47d42758db28f02547b05a49572f601cd2e195e75b405faa0c79aa792b0c0','momcilo@email.com',_binary '\0',13);
/*!40000 ALTER TABLE `upravnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zadatak`
--

DROP TABLE IF EXISTS `zadatak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zadatak` (
  `id_zadatak` int NOT NULL AUTO_INCREMENT,
  `naslov` varchar(100) NOT NULL,
  `datum_kreiranja` date NOT NULL,
  `rok_izvrsenja` date DEFAULT NULL,
  `info` varchar(500) DEFAULT NULL,
  `id_upravnik` int NOT NULL,
  `id_dezurni_radnik` int NOT NULL,
  `zavrsen` bit(1) NOT NULL,
  PRIMARY KEY (`id_zadatak`),
  KEY `FK_zadatak_dezurni_radnik_idx` (`id_dezurni_radnik`),
  KEY `FK_zadatak_upravnik_idx` (`id_upravnik`),
  CONSTRAINT `FK_zadatak_dezurni_radnik` FOREIGN KEY (`id_dezurni_radnik`) REFERENCES `dezurni_radnik` (`id_dezurni_radnik`),
  CONSTRAINT `FK_zadatak_upravnik` FOREIGN KEY (`id_upravnik`) REFERENCES `upravnik` (`id_upravnik`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zadatak`
--

LOCK TABLES `zadatak` WRITE;
/*!40000 ALTER TABLE `zadatak` DISABLE KEYS */;
INSERT INTO `zadatak` VALUES (6,'Testni lol','2024-09-09','2024-09-17','asaaa',5,5,_binary '\0'),(7,'Montiranje lcd displeja','2024-09-13','2024-09-20','Montirati lcd displeje za reklame',5,6,_binary '\0'),(8,'Montiranje točilice','2024-09-13','2024-09-14','Montirati točilicu na ulazu',5,6,_binary '');
/*!40000 ALTER TABLE `zadatak` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-16 21:54:22
