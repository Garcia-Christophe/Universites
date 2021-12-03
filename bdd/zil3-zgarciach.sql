-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  sam. 04 déc. 2021 à 00:00
-- Version du serveur :  10.3.9-MariaDB
-- Version de PHP :  7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `zil3-zgarciach`
--

-- --------------------------------------------------------

--
-- Structure de la table `DEMOGRAPHIE`
--

CREATE TABLE `DEMOGRAPHIE` (
  `idDemographie` int(10) NOT NULL,
  `ageDemographie` int(10) DEFAULT NULL,
  `anneeDemographie` int(10) DEFAULT NULL,
  `nbPersonnes` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `DEMOGRAPHIE`
--

INSERT INTO `DEMOGRAPHIE` (`idDemographie`, `ageDemographie`, `anneeDemographie`, `nbPersonnes`) VALUES
(1, 20, 2016, 774800),
(2, 21, 2016, 751659),
(3, 22, 2016, 694682),
(4, 20, 2017, 812005),
(5, 21, 2017, 799231),
(6, 22, 2017, 781047),
(7, 20, 2018, 841697),
(8, 21, 2018, 803814),
(9, 22, 2018, 779065),
(10, 20, 2019, 611874),
(11, 21, 2019, 583716),
(12, 22, 2019, 512495),
(13, 20, 2020, 899482),
(14, 21, 2020, 868125),
(15, 22, 2020, 832751),
(16, 20, 2021, 979586),
(17, 21, 2021, 904451),
(18, 22, 2021, 884060);

-- --------------------------------------------------------

--
-- Structure de la table `DEPARTEMENT`
--

CREATE TABLE `DEPARTEMENT` (
  `idDepartement` int(10) NOT NULL,
  `nomDepartement` varchar(100) DEFAULT NULL,
  `nomDepartement_Court` varchar(20) DEFAULT NULL,
  `UFR_idUFR` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `DEPARTEMENT`
--

INSERT INTO `DEPARTEMENT` (`idDepartement`, `nomDepartement`, `nomDepartement_Court`, `UFR_idUFR`) VALUES
(1, 'Informatique', 'Info', 1),
(2, 'Mathématiques', 'Maths', 1);

-- --------------------------------------------------------

--
-- Structure de la table `EFFECTIF`
--

CREATE TABLE `EFFECTIF` (
  `anneeRef` int(10) NOT NULL,
  `effectif` int(10) DEFAULT NULL,
  `Demographie_idDemographie` int(10) NOT NULL,
  `Formation_idFormation` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `EFFECTIF`
--

INSERT INTO `EFFECTIF` (`anneeRef`, `effectif`, `Demographie_idDemographie`, `Formation_idFormation`) VALUES
(2016, 800, 1, 1),
(2016, 18, 1, 2),
(2016, 4, 1, 3),
(2016, 1714, 1, 4),
(2016, 53, 1, 5),
(2016, 0, 1, 6),
(2016, 1796, 1, 7),
(2016, 15, 1, 8),
(2016, 9, 1, 9),
(2016, 40, 2, 1),
(2016, 650, 2, 2),
(2016, 9, 2, 3),
(2016, 51, 2, 4),
(2016, 1201, 2, 5),
(2016, 0, 2, 6),
(2016, 14, 2, 7),
(2016, 1313, 2, 8),
(2016, 19, 2, 9),
(2016, 10, 3, 1),
(2016, 13, 3, 2),
(2016, 622, 3, 3),
(2016, 23, 3, 4),
(2016, 45, 3, 5),
(2016, 1106, 3, 6),
(2016, 1, 3, 7),
(2016, 31, 3, 8),
(2016, 1214, 3, 9),
(2017, 820, 4, 1),
(2017, 20, 4, 2),
(2017, 5, 4, 3),
(2017, 1785, 4, 4),
(2017, 61, 4, 5),
(2017, 7, 4, 6),
(2017, 1832, 4, 7),
(2017, 21, 4, 8),
(2017, 11, 4, 9),
(2017, 51, 5, 1),
(2017, 666, 5, 2),
(2017, 11, 5, 3),
(2017, 69, 5, 4),
(2017, 1289, 5, 5),
(2017, 13, 5, 6),
(2017, 24, 5, 7),
(2017, 1388, 5, 8),
(2017, 16, 5, 9),
(2017, 7, 6, 1),
(2017, 9, 6, 2),
(2017, 641, 6, 3),
(2017, 30, 6, 4),
(2017, 51, 6, 5),
(2017, 1154, 6, 6),
(2017, 12, 6, 7),
(2017, 31, 6, 8),
(2017, 1308, 6, 9),
(2018, 102, 6, 5),
(2018, 852, 7, 1),
(2018, 23, 7, 2),
(2018, 9, 7, 3),
(2018, 1852, 7, 4),
(2018, 87, 7, 5),
(2018, 26, 7, 6),
(2018, 1912, 7, 7),
(2018, 57, 7, 8),
(2018, 21, 7, 9),
(2018, 45, 8, 1),
(2018, 671, 8, 2),
(2018, 15, 8, 3),
(2018, 104, 8, 4),
(2018, 1342, 8, 5),
(2018, 47, 8, 6),
(2018, 45, 8, 7),
(2018, 1425, 8, 8),
(2018, 36, 8, 9),
(2018, 1, 9, 1),
(2018, 13, 9, 2),
(2018, 668, 9, 3),
(2018, 51, 9, 4),
(2018, 1221, 9, 6),
(2018, 19, 9, 7),
(2018, 34, 9, 8),
(2018, 1389, 9, 9),
(2019, 24, 9, 5),
(2019, 715, 10, 1),
(2019, 11, 10, 2),
(2019, 0, 10, 3),
(2019, 1684, 10, 4),
(2019, 63, 10, 5),
(2019, 2, 10, 6),
(2019, 1805, 10, 7),
(2019, 26, 10, 8),
(2019, 10, 10, 9),
(2019, 21, 11, 1),
(2019, 595, 11, 2),
(2019, 3, 11, 3),
(2019, 34, 11, 4),
(2019, 1197, 11, 5),
(2019, 12, 11, 6),
(2019, 66, 11, 7),
(2019, 1365, 11, 8),
(2019, 34, 11, 9),
(2019, 4, 12, 1),
(2019, 1, 12, 2),
(2019, 569, 12, 3),
(2019, 12, 12, 4),
(2019, 1075, 12, 6),
(2019, 21, 12, 7),
(2019, 89, 12, 8),
(2019, 1296, 12, 9),
(2020, 52, 12, 5),
(2020, 794, 13, 1),
(2020, 16, 13, 2),
(2020, 9, 13, 3),
(2020, 1768, 13, 4),
(2020, 43, 13, 5),
(2020, 10, 13, 6),
(2020, 2042, 13, 7),
(2020, 78, 13, 8),
(2020, 45, 13, 9),
(2020, 35, 14, 1),
(2020, 649, 14, 2),
(2020, 19, 14, 3),
(2020, 49, 14, 4),
(2020, 1266, 14, 5),
(2020, 32, 14, 6),
(2020, 45, 14, 7),
(2020, 1402, 14, 8),
(2020, 75, 14, 9),
(2020, 12, 15, 1),
(2020, 13, 15, 2),
(2020, 651, 15, 3),
(2020, 20, 15, 4),
(2020, 1159, 15, 6),
(2020, 14, 15, 7),
(2020, 46, 15, 8),
(2020, 1447, 15, 9),
(2021, 867, 16, 1),
(2021, 27, 16, 2),
(2021, 7, 16, 3),
(2021, 1889, 16, 4),
(2021, 111, 16, 5),
(2021, 16, 16, 6),
(2021, 2237, 16, 7),
(2021, 101, 16, 8),
(2021, 68, 16, 9),
(2021, 62, 17, 1),
(2021, 709, 17, 2),
(2021, 13, 17, 3),
(2021, 122, 17, 4),
(2021, 1362, 17, 5),
(2021, 54, 17, 6),
(2021, 56, 17, 7),
(2021, 1523, 17, 8),
(2021, 1016, 17, 9),
(2021, 14, 18, 1),
(2021, 21, 18, 2),
(2021, 671, 18, 3),
(2021, 71, 18, 4),
(2021, 74, 18, 5),
(2021, 1232, 18, 6),
(2021, 25, 18, 7),
(2021, 64, 18, 8),
(2021, 1498, 18, 9);

-- --------------------------------------------------------

--
-- Structure de la table `FORMATION`
--

CREATE TABLE `FORMATION` (
  `idFormation` int(10) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  `niveau` varchar(10) DEFAULT NULL,
  `Parcours_idParcours` int(10) NOT NULL,
  `Departement_idDepartement` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `FORMATION`
--

INSERT INTO `FORMATION` (`idFormation`, `type`, `niveau`, `Parcours_idParcours`, `Departement_idDepartement`) VALUES
(1, 'Licence', '3', 1, 1),
(2, 'Master', '1', 1, 1),
(3, 'Master', '2', 1, 1),
(4, 'Licence', '3', 2, 1),
(5, 'Master', '1', 2, 1),
(6, 'Master', '2', 2, 1),
(7, 'Licence', '3', 3, 2),
(8, 'Master', '1', 3, 2),
(9, 'Master', '2', 3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `PARCOURS`
--

CREATE TABLE `PARCOURS` (
  `idParcours` int(10) NOT NULL,
  `nomParcours` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `PARCOURS`
--

INSERT INTO `PARCOURS` (`idParcours`, `nomParcours`) VALUES
(1, 'Ingénierie Informatique (II)'),
(2, 'Informatique Fondements et Applications (IFA)'),
(3, 'Mathématiques et informatique appliquées aux sciences humaines et sociales (Miashs)');

-- --------------------------------------------------------

--
-- Structure de la table `SITE_UNIV`
--

CREATE TABLE `SITE_UNIV` (
  `idSite` int(10) NOT NULL,
  `nomSite` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `SITE_UNIV`
--

INSERT INTO `SITE_UNIV` (`idSite`, `nomSite`) VALUES
(1, 'Université de Bretagne Occidentale (UBO)');

-- --------------------------------------------------------

--
-- Structure de la table `SITUATION`
--

CREATE TABLE `SITUATION` (
  `Site_UNIV_idSite` int(10) NOT NULL,
  `UFR_idUFR` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `SITUATION`
--

INSERT INTO `SITUATION` (`Site_UNIV_idSite`, `UFR_idUFR`) VALUES
(1, 1),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `UFR`
--

CREATE TABLE `UFR` (
  `idUFR` int(10) NOT NULL,
  `nomUFR` varchar(100) DEFAULT NULL,
  `nomUFR_Court` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `UFR`
--

INSERT INTO `UFR` (`idUFR`, `nomUFR`, `nomUFR_Court`) VALUES
(1, 'Faculté de Sciences et Techniques', 'UFR Sciences'),
(2, 'Faculté de Sport et Éducation Physique', 'UFR Sport'),
(3, 'Faculté des Lettres et Sciences Humaines', 'UFR Lettres');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `DEMOGRAPHIE`
--
ALTER TABLE `DEMOGRAPHIE`
  ADD PRIMARY KEY (`idDemographie`);

--
-- Index pour la table `DEPARTEMENT`
--
ALTER TABLE `DEPARTEMENT`
  ADD PRIMARY KEY (`idDepartement`),
  ADD KEY `fk_Departement_UFR1_idx` (`UFR_idUFR`);

--
-- Index pour la table `EFFECTIF`
--
ALTER TABLE `EFFECTIF`
  ADD PRIMARY KEY (`anneeRef`,`Demographie_idDemographie`,`Formation_idFormation`),
  ADD KEY `fk_Effectif_Demographie1_idx` (`Demographie_idDemographie`),
  ADD KEY `fk_Effectif_Formation1_idx` (`Formation_idFormation`);

--
-- Index pour la table `FORMATION`
--
ALTER TABLE `FORMATION`
  ADD PRIMARY KEY (`idFormation`),
  ADD KEY `fk_Formation_Parcours1_idx` (`Parcours_idParcours`),
  ADD KEY `fk_Formation_Departement1_idx` (`Departement_idDepartement`);

--
-- Index pour la table `PARCOURS`
--
ALTER TABLE `PARCOURS`
  ADD PRIMARY KEY (`idParcours`);

--
-- Index pour la table `SITE_UNIV`
--
ALTER TABLE `SITE_UNIV`
  ADD PRIMARY KEY (`idSite`);

--
-- Index pour la table `SITUATION`
--
ALTER TABLE `SITUATION`
  ADD PRIMARY KEY (`Site_UNIV_idSite`,`UFR_idUFR`),
  ADD KEY `fk_Site_UNIV_has_UFR_UFR1_idx` (`UFR_idUFR`),
  ADD KEY `fk_Site_UNIV_has_UFR_Site_UNIV_idx` (`Site_UNIV_idSite`);

--
-- Index pour la table `UFR`
--
ALTER TABLE `UFR`
  ADD PRIMARY KEY (`idUFR`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `DEPARTEMENT`
--
ALTER TABLE `DEPARTEMENT`
  ADD CONSTRAINT `fk_Departement_UFR1` FOREIGN KEY (`UFR_idUFR`) REFERENCES `UFR` (`idUFR`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `EFFECTIF`
--
ALTER TABLE `EFFECTIF`
  ADD CONSTRAINT `fk_Effectif_Demographie1` FOREIGN KEY (`Demographie_idDemographie`) REFERENCES `DEMOGRAPHIE` (`idDemographie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Effectif_Formation1` FOREIGN KEY (`Formation_idFormation`) REFERENCES `FORMATION` (`idFormation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `FORMATION`
--
ALTER TABLE `FORMATION`
  ADD CONSTRAINT `fk_Formation_Departement1` FOREIGN KEY (`Departement_idDepartement`) REFERENCES `DEPARTEMENT` (`idDepartement`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Formation_Parcours1` FOREIGN KEY (`Parcours_idParcours`) REFERENCES `PARCOURS` (`idParcours`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `SITUATION`
--
ALTER TABLE `SITUATION`
  ADD CONSTRAINT `fk_Site_UNIV_has_UFR_Site_UNIV` FOREIGN KEY (`Site_UNIV_idSite`) REFERENCES `SITE_UNIV` (`idSite`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Site_UNIV_has_UFR_UFR1` FOREIGN KEY (`UFR_idUFR`) REFERENCES `UFR` (`idUFR`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
