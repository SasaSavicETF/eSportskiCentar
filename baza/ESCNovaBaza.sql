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
  `lozinka` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id_administrator`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `lozinka` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `blokiran` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id_dezurni_radnik`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `id_takmicenje` int NOT NULL,
  PRIMARY KEY (`id_ekipa`),
  KEY `FK_ekipa_sport_idx` (`id_sport`),
  KEY `FK_ekipa_takmicenje_idx` (`id_takmicenje`),
  CONSTRAINT `FK_ekipa_sport` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id_sport`),
  CONSTRAINT `FK_ekipa_takmicenje` FOREIGN KEY (`id_takmicenje`) REFERENCES `takmicenje` (`id_takmicenje`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `lozinka` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `blokiran` bit(1) NOT NULL DEFAULT b'0',
  `id_dvorana` int NOT NULL,
  PRIMARY KEY (`id_upravnik`),
  KEY `fk_upravnik_dvorana_idx` (`id_dvorana`),
  CONSTRAINT `fk_upravnik_dvorana` FOREIGN KEY (`id_dvorana`) REFERENCES `dvorana` (`id_dvorana`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zadatak`
--

DROP TABLE IF EXISTS `zadatak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zadatak` (
  `id_zadatak` int NOT NULL AUTO_INCREMENT,
  `datum_kreiranja` date NOT NULL,
  `rok_izvrsenja` date DEFAULT NULL,
  `info` varchar(500) DEFAULT NULL,
  `id_upravnik` int NOT NULL,
  `id_dezurni_radnik` int NOT NULL,
  PRIMARY KEY (`id_zadatak`),
  KEY `FK_zadatak_dezurni_radnik_idx` (`id_dezurni_radnik`),
  KEY `FK_zadatak_upravnik_idx` (`id_upravnik`),
  CONSTRAINT `FK_zadatak_dezurni_radnik` FOREIGN KEY (`id_dezurni_radnik`) REFERENCES `dezurni_radnik` (`id_dezurni_radnik`),
  CONSTRAINT `FK_zadatak_upravnik` FOREIGN KEY (`id_upravnik`) REFERENCES `upravnik` (`id_upravnik`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zahtjev`
--

DROP TABLE IF EXISTS `zahtjev`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zahtjev` (
  `id_zahtjev` int NOT NULL AUTO_INCREMENT,
  `id_klijent` int NOT NULL,
  `id_teren` int NOT NULL,
  `id_dnevni_raspored` int NOT NULL,
  `vrijeme_pocetka` time NOT NULL,
  `vrijeme_kraja` time NOT NULL,
  `poruka` varchar(200) DEFAULT NULL,
  `odobren` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id_zahtjev`),
  KEY `FK_zahtjev_klijent_idx` (`id_klijent`),
  KEY `FK_zahtjev_dnevni_raspored_idx` (`id_dnevni_raspored`),
  KEY `FK_zahtjev_teren_idx` (`id_teren`),
  CONSTRAINT `FK_zahtjev_dnevni_raspored` FOREIGN KEY (`id_dnevni_raspored`) REFERENCES `dnevni_raspored` (`id_dnevni_raspored`),
  CONSTRAINT `FK_zahtjev_klijent` FOREIGN KEY (`id_klijent`) REFERENCES `klijent` (`id_klijent`),
  CONSTRAINT `FK_zahtjev_teren` FOREIGN KEY (`id_teren`) REFERENCES `teren` (`id_teren`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-28 19:52:37
