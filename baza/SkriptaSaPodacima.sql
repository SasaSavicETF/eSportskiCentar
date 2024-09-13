CREATE DATABASE  IF NOT EXISTS `e_sportski_centar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `e_sportski_centar`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: e_sportski_centar
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cjenovnik`
--

LOCK TABLES `cjenovnik` WRITE;
/*!40000 ALTER TABLE `cjenovnik` DISABLE KEYS */;
INSERT INTO `cjenovnik` VALUES (6,'07:30:00','12:30:00',300.00,11),(7,'12:30:00','23:30:00',700.00,11),(8,'07:30:00','23:30:00',200.00,13),(9,'04:30:00','06:30:00',10.00,11);
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
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dnevni_raspored`
--

LOCK TABLES `dnevni_raspored` WRITE;
/*!40000 ALTER TABLE `dnevni_raspored` DISABLE KEYS */;
INSERT INTO `dnevni_raspored` VALUES (156,'2024-09-09',13),(157,'2024-09-10',13),(158,'2024-09-13',13);
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
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogadjaj`
--

LOCK TABLES `dogadjaj` WRITE;
/*!40000 ALTER TABLE `dogadjaj` DISABLE KEYS */;
INSERT INTO `dogadjaj` VALUES (109,4,NULL,NULL,'11:30:00','14:30:00','Trening omladinaca',156,11,1700.00,NULL,16,_binary ''),(110,5,4,5,'18:30:00','23:30:00','UEFA utakmica lige konferencija',156,11,3500.00,NULL,16,_binary ''),(112,4,NULL,NULL,'20:30:00','21:30:00','licni termin',156,13,200.00,3,17,_binary ''),(113,4,NULL,NULL,'11:30:00','15:30:00','Trening FK Naprijed',157,11,2400.00,3,16,_binary ''),(114,4,NULL,NULL,'10:30:00','12:30:00','Lični tening',158,11,600.00,3,22,_binary '\0');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dvorana`
--

LOCK TABLES `dvorana` WRITE;
/*!40000 ALTER TABLE `dvorana` DISABLE KEYS */;
INSERT INTO `dvorana` VALUES (13,'Borik',22,3500,'Olimpijska sportska dvorana izgrađena 1974. za potrebe sportskog društva Borac i za razvoj sporta u Banjoj Luci.'),(14,'Gradski stadion',22,9730,'Najveći i najmoderniji stadion u Republici Srpskoj. Po UEFA standardizaciji stadion ima 3 zvjezdice pa je pogodan za evropska takmičenja.'),(15,'Kulturno-sportska dvorana',24,5000,'Objekat u izgradnji');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ekipa`
--

LOCK TABLES `ekipa` WRITE;
/*!40000 ALTER TABLE `ekipa` DISABLE KEYS */;
INSERT INTO `ekipa` VALUES (4,'Borac Banja Luka',16),(5,'Lask Linc',16),(6,'Radnik Bijeljina',16);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klijent`
--

LOCK TABLES `klijent` WRITE;
/*!40000 ALTER TABLE `klijent` DISABLE KEYS */;
INSERT INTO `klijent` VALUES (3,'Milan','I','066555333','milan','efee614420c57ddd2a8e91eeef6f6b83d5356c2288155be0f273bef986e3b850','mica.ignjatic01@gmail.com',_binary '\0'),(4,'Stojan','Stojan','066777888','stojan','bed85a5c17800dd8adcdcf05ca89da4c79d156a98f58832c1f6a029b5259ae8a','stojan@email.com',_binary '\0');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES (16,'Fudbal',105.00,68.00,4),(17,'Košarka',45.00,25.00,5),(18,'Rukomet',50.00,30.00,5),(19,'Sprint 100m',120.00,20.00,6),(21,'Bacanje kugle',30.00,20.00,4),(22,'Bacanje koplja',100.00,50.00,4),(23,'Futsal',50.00,20.00,5),(24,'Mali fudbal',80.00,50.00,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
INSERT INTO `ulaz` VALUES (8,14,'Istok',1,_binary ''),(9,14,'Sjever',1,_binary ''),(10,14,'Zapad',1,_binary ''),(11,14,'Jug',1,_binary '\0'),(12,13,'Zapad',1,_binary ''),(13,13,'Zapad',2,_binary '');
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

-- Dump completed on 2024-09-13 13:25:18
