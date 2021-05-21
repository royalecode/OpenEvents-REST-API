-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2021 a las 18:15:16
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `openevents`
--
CREATE DATABASE IF NOT EXISTS `openevents` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `openevents`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `assistance`
--

CREATE TABLE `assistance` (
  `user_id` int(20) NOT NULL,
  `event_id` int(20) NOT NULL,
  `puntuation` int(2) DEFAULT NULL,
  `comentary` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `assistance`
--

INSERT INTO `assistance` (`user_id`, `event_id`, `puntuation`, `comentary`) VALUES
(2, 3, NULL, NULL),
(2, 17, 5, 'molt bona lactuacio'),
(5, 9, NULL, NULL),
(5, 19, NULL, NULL),
(5, 24, NULL, NULL),
(6, 11, NULL, NULL),
(7, 19, NULL, NULL),
(11, 16, NULL, NULL),
(11, 23, NULL, NULL),
(13, 7, NULL, NULL),
(13, 22, NULL, NULL),
(14, 1, NULL, NULL),
(15, 3, NULL, NULL),
(17, 10, NULL, NULL),
(17, 11, NULL, NULL),
(18, 10, NULL, NULL),
(18, 15, NULL, NULL),
(19, 3, NULL, NULL),
(20, 16, NULL, NULL),
(23, 7, NULL, NULL),
(23, 17, NULL, NULL),
(23, 20, NULL, NULL),
(24, 4, NULL, NULL),
(24, 17, NULL, NULL),
(25, 5, NULL, NULL),
(25, 7, NULL, NULL),
(25, 20, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `owner_id` int(20) NOT NULL,
  `date` date NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `eventStart_date` date NOT NULL,
  `eventEnd_date` date NOT NULL,
  `n_participators` int(20) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `name`, `owner_id`, `date`, `image`, `location`, `description`, `eventStart_date`, `eventEnd_date`, `n_participators`, `type`) VALUES
(1, 'Thoughtstorm', 1, '2020-07-04', NULL, '63 Onsgard Trail', 'Pnctr w fb of r little finger w/o damage to nail, subs', '2021-06-10', '2020-12-02', 34, 'Gembucket'),
(2, 'Lajo', 2, '2020-05-14', NULL, '394 Forest Run Plaza', 'Burn of first degree of unspecified lower leg, subs encntr', '2020-09-24', '2021-05-02', 85, 'Tampflex'),
(3, 'Fanoodle', 2, '2020-05-16', NULL, '0 Dottie Lane', 'Gastric contents in larynx causing asphyxiation, init encntr', '2021-05-08', '2021-06-03', 35, 'Opela'),
(4, 'Browsebug', 2, '2020-04-27', NULL, '836 Mcbride Court', 'Poisoning by angiotens-convert-enzyme inhibitors, assault', '2020-11-10', '2021-03-28', 69, 'Bitchip'),
(5, 'Yakidoo', 2, '2020-11-18', NULL, '450 Marquette Plaza', 'Struck by falling object on other powered watercraft', '2021-05-09', '2021-02-23', 14, 'Keylex'),
(6, 'Yakijo', 4, '2021-04-17', NULL, '665 Badeau Park', 'Sprain of interphalangeal joint of right middle finger, subs', '2020-08-09', '2021-08-08', 62, 'Opela'),
(7, 'Eadel', 4, '2020-06-05', NULL, '2 Claremont Alley', 'Wheezing', '2021-04-25', '2020-10-26', 62, 'Prodder'),
(8, 'Fiveclub', 8, '2020-05-31', NULL, '4 Macpherson Junction', 'Laceration of popliteal artery, unspecified leg, sequela', '2020-08-15', '2021-09-28', 22, 'Cardify'),
(9, 'Blogtag', 9, '2021-04-06', NULL, '17933 Linden Junction', 'Nondisp artic fx head of l femr, 7thM', '2021-01-23', '2021-02-12', 74, 'Transcof'),
(10, 'Kazu', 10, '2021-02-24', NULL, '574 Springs Lane', 'Traum rupt of volar plate of r rng fngr at MCP/IP jt, sqla', '2021-04-25', '2021-11-20', 55, 'Cardify'),
(11, 'Cogidoo', 11, '2020-07-04', NULL, '3321 3rd Road', 'Hallucinogen abuse with hallucinogen-induced mood disorder', '2021-11-20', '2020-09-16', 45, 'Cardguard'),
(12, 'Zoombox', 11, '2021-04-22', NULL, '02 Mayer Place', 'Crushing injury of head, part unspecified, initial encounter', '2021-03-14', '2021-03-22', 97, 'Span'),
(13, 'Skipfire', 11, '2020-11-09', NULL, '59 Lotheville Place', 'Asphyxiation due to hanging', '2021-04-06', '2020-07-09', 72, 'Zontrax'),
(14, 'Tazz', 14, '2021-01-18', NULL, '250 Shelley Court', 'Underdosing of drug/meds/biol subst, subs', '2020-10-27', '2021-02-24', 65, 'Job'),
(15, 'Oozz', 15, '2020-05-03', NULL, '61397 Rockefeller Lane', 'Osteitis deformans of ankle and foot', '2021-09-04', '2021-07-28', 47, 'Aerified'),
(16, 'Leexo', 16, '2021-01-12', NULL, '560 Bayside Point', 'Nondisp fx of greater trochanter of r femr, 7thM', '2021-03-12', '2021-04-09', 20, 'Redhold'),
(17, 'Twitterbridge', 17, '2020-09-07', NULL, '78152 Lakeland Court', 'Supravesical fissure of urinary bladder', '2021-10-20', '2022-01-10', 16, 'Alphazap'),
(18, 'Roombo', 17, '2021-02-05', NULL, '1442 Stuart Pass', 'Laceration with foreign body of right upper arm', '2020-08-12', '2021-04-24', 24, 'Sub-Ex'),
(19, 'Meemm', 19, '2020-10-24', NULL, '0323 Loeprich Place', 'Nondisp transverse fx shaft of r femr, 7thR', '2021-07-04', '2022-01-17', 13, 'Zathin'),
(20, 'Jabbercube', 21, '2020-11-07', NULL, '81 Mcbride Court', 'Contusion of right breast, subsequent encounter', '2021-05-26', '2020-08-21', 6, 'Viva'),
(21, 'Twiyo', 21, '2020-05-12', NULL, '34658 Warbler Trail', 'Unsp fracture of T9-T10 vertebra, subs for fx w routn heal', '2021-07-08', '2021-05-10', 5, 'Regrant'),
(22, 'Aibox', 22, '2020-05-19', NULL, '5818 Drewry Way', 'Intraop hemor/hemtom of a GU sys org comp a procedure', '2021-10-22', '2021-02-20', 32, 'Voyatouch'),
(23, 'Kwimbee', 22, '2021-03-27', NULL, '13 Dovetail Drive', 'Nondisp fx of medial phalanx of unspecified finger', '2020-07-20', '2021-03-20', 85, 'Alpha'),
(24, 'Mynte', 24, '2021-02-26', NULL, '101 Mariners Cove Drive', 'Adult sexual abuse, confirmed, initial encounter', '2020-08-05', '2020-08-11', 52, 'Tresom'),
(25, 'Dabjam', 25, '2021-01-17', NULL, '5 Homewood Crossing', 'Sltr-haris Type II physl fx upper end rad, right arm, init', '2020-12-02', '2020-12-28', 62, 'Otcom');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `friends`
--

CREATE TABLE `friends` (
  `user_id` int(20) NOT NULL,
  `user_id_friend` int(20) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `friends`
--

INSERT INTO `friends` (`user_id`, `user_id_friend`, `status`) VALUES
(4, 15, 0),
(4, 18, 1),
(5, 25, 1),
(6, 21, 1),
(7, 4, 1),
(8, 4, 0),
(8, 17, 0),
(12, 11, 1),
(14, 15, 0),
(15, 2, 0),
(15, 9, 0),
(16, 14, 1),
(16, 18, 1),
(17, 5, 1),
(17, 24, 0),
(21, 17, 0),
(22, 4, 1),
(22, 6, 1),
(24, 10, 0),
(24, 21, 1),
(27, 12, 1),
(27, 13, 0),
(27, 22, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(20) NOT NULL,
  `content` varchar(350) NOT NULL,
  `user_id_send` int(20) NOT NULL,
  `user_id_recived` int(20) NOT NULL,
  `timeStamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `content`, `user_id_send`, `user_id_recived`, `timeStamp`) VALUES
(1, 'Displ seg fx shaft of r tibia, init for opn fx type 3A/B/C', 2, 16, '2021-04-20 09:47:56'),
(2, 'Subluxation of T1/T2 thoracic vertebra, subsequent encounter', 11, 16, '2021-04-20 09:47:56'),
(3, 'Open wound of unspecified buttock', 8, 2, '2021-04-20 09:47:56'),
(4, 'Fracture of anterior process of calcaneus', 2, 3, '2021-04-20 09:47:56'),
(5, 'Hang-glider collision injuring occupant, initial encounter', 12, 5, '2021-04-20 09:47:56'),
(6, 'Complications of genitourinary prosth dev/grft', 9, 7, '2021-04-20 09:47:56'),
(7, 'Nondisplaced fracture of fourth metatarsal bone, left foot', 15, 17, '2021-04-20 09:47:56'),
(8, 'Subluxation of L3/L4 lumbar vertebra, sequela', 14, 8, '2021-04-20 09:47:56'),
(9, 'Unsp fx shaft of l rad, subs for opn fx type I/2 w nonunion', 23, 15, '2021-04-20 09:47:56'),
(10, 'Unspecified aircraft accident injuring occupant, subs encntr', 7, 18, '2021-04-20 09:47:56'),
(11, 'Scombroid fish poisoning, accidental (unintentional)', 25, 19, '2021-04-20 09:47:56'),
(12, 'Nondisp midcervical fx l femr, subs for clos fx w delay heal', 19, 2, '2021-04-20 09:47:56'),
(13, 'Maternal care for chromosomal abnormality in fetus, fetus 3', 14, 19, '2021-04-20 09:47:57'),
(14, 'Sltr-haris Type III physl fx lower end ulna, right arm, init', 14, 3, '2021-04-20 09:47:57'),
(15, 'Other chronic osteomyelitis, unspecified hand', 11, 24, '2021-04-20 09:47:57'),
(16, 'Encounter for screening for other metabolic disorders', 12, 9, '2021-04-20 09:47:57'),
(17, 'Car passenger injured in clsn w ped/anml nontraf, sequela', 4, 5, '2021-04-20 09:47:57'),
(18, 'Burn of unsp degree of left hand, unsp site, init encntr', 11, 16, '2021-04-20 09:47:57'),
(19, 'Breakdown of int fix of bones of foot and toes, sequela', 6, 5, '2021-04-20 09:47:57'),
(20, 'Labor and delivery complicated by short cord, fetus 3', 12, 4, '2021-04-20 09:47:57'),
(21, 'Fx unsp part of neck of left femur, init for opn fx type I/2', 20, 25, '2021-04-20 09:47:57'),
(22, 'Unspecified acquired deformity of lower leg', 22, 24, '2021-04-20 09:47:57'),
(23, 'Injury of external jugular vein', 4, 24, '2021-04-20 09:47:57'),
(24, 'Colostomy hemorrhage', 22, 4, '2021-04-20 09:47:57'),
(25, 'Unsp inj intrns musc/fasc/tend thmb at wrs/hnd lv, sequela', 14, 18, '2021-04-20 09:47:57'),
(26, 'Mech compl of implanted penile prosthesis, initial encounter', 20, 6, '2021-04-20 09:47:57'),
(27, 'Displaced fracture of anterior process of left calcaneus', 23, 19, '2021-04-20 09:47:57'),
(28, 'Poisoning by unsp psychotropic drug, intentional self-harm', 10, 13, '2021-04-20 09:47:57'),
(29, 'Hepatorenal syndrome', 1, 15, '2021-04-20 09:47:57'),
(30, 'Disp fx of dist pole of navic bone of l wrs, 7thK', 21, 21, '2021-04-20 09:47:57'),
(31, 'Hi!', 1, 27, '2021-04-21 18:44:35'),
(32, 'Hi!', 1, 27, '2021-04-21 18:45:06'),
(33, 'Hi!', 1, 27, '2021-04-21 18:46:27'),
(34, 'Hi!', 1, 27, '2021-04-21 18:46:34'),
(35, 'Hi!', 2, 27, '2021-04-21 18:49:22'),
(36, 'Hi!', 3, 27, '2021-04-21 18:49:51'),
(37, 'Hi!', 27, 1, '2021-04-21 18:56:10'),
(38, 'Hi!', 27, 1, '2021-04-21 18:56:13'),
(39, 'Hi!', 27, 1, '2021-04-21 18:56:14'),
(40, 'Hi!', 1, 27, '2021-04-21 18:56:22'),
(41, 'Hi!', 27, 3, '2021-04-23 10:21:01'),
(42, 'Hi again!', 27, 15, '2021-04-25 09:55:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `image`, `name`, `last_name`, `email`, `password`) VALUES
(1, NULL, 'Ron', 'Bumphries', 'rbumphries0@nhs.uk', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(2, NULL, 'Alana', 'Zimmerman', 'azimmerman1@narod.ru', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(3, NULL, 'Julian', 'Hovenden', 'jhovenden2@xrea.com', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(4, NULL, 'Inness', 'Varvara', 'ivarvara3@ow.ly', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(5, NULL, 'Isiahi', 'Naerup', 'inaerup4@usda.gov', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(6, NULL, 'Lura', 'Sogg', 'lsogg5@wp.com', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(7, NULL, 'Matt', 'Hazeldine', 'mhazeldine6@telegraph.co.uk', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(8, NULL, 'Phylis', 'Cleatherow', 'pcleatherow7@samsung.com', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(9, NULL, 'Yanaton', 'Godly', 'ygodly8@noaa.gov', '$2b$10$mTNVCl9UMvGwRKy1xoTGYOyEFpMsBeEYwo9PmWPoXOb'),
(10, NULL, 'Xerxes', 'Glasbey', 'xglasbey9@sina.com.cn', '46.85.217.36'),
(11, NULL, 'Klarrisa', 'Stegel', 'kstegela@intel.com', '14.5.137.200'),
(12, NULL, 'Sig', 'de Keep', 'sdekeepb@dmoz.org', '122.226.156.123'),
(13, NULL, 'Camile', 'Gerge', 'cgergec@salon.com', '156.98.63.249'),
(14, NULL, 'Yule', 'Burgon', 'yburgond@instagram.com', '77.250.194.238'),
(15, NULL, 'Jeremie', 'Rhys', 'jrhyse@blogspot.com', '138.147.57.218'),
(16, NULL, 'Elizabet', 'Oluwatoyin', 'eoluwatoyinf@quantcast.com', '24.212.118.118'),
(17, NULL, 'Nichole', 'Siddall', 'nsiddallg@sphinn.com', '209.56.215.44'),
(18, NULL, 'Shalom', 'Golsby', 'sgolsbyh@ucoz.ru', '197.133.101.236'),
(19, NULL, 'Gaston', 'Martindale', 'gmartindalei@t.co', '21.167.187.103'),
(20, NULL, 'Darcy', 'Dymick', 'ddymickj@imageshack.us', '179.145.153.82'),
(21, NULL, 'George', 'Atterley', 'gatterleyk@sitemeter.com', '72.72.187.110'),
(22, NULL, 'Harmonia', 'Peckitt', 'hpeckittl@mozilla.com', '9.181.135.33'),
(23, NULL, 'Louis', 'Kyston', 'lkystonm@phoca.cz', '143.151.133.188'),
(24, NULL, 'Janos', 'Abade', 'jabaden@cloudflare.com', '109.246.252.217'),
(25, NULL, 'Orion', 'McClements', 'omcclementso@github.com', '15.214.175.4'),
(27, NULL, 'John', 'Doe', 'jonh.doe@doe.com', '$2b$10$cxe65sY9MNnvOWtGmykRK.XOEABZzwj7Mgv5P8UrsezmCqsUQrZkm');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `assistance`
--
ALTER TABLE `assistance`
  ADD PRIMARY KEY (`user_id`,`event_id`),
  ADD KEY `fk_event` (`event_id`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_owner` (`owner_id`);

--
-- Indices de la tabla `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`user_id`,`user_id_friend`),
  ADD KEY `fk_amic` (`user_id_friend`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`,`user_id_send`,`user_id_recived`),
  ADD KEY `fk_user_send` (`user_id_send`),
  ADD KEY `fk_user_recived` (`user_id_recived`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_unic` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `assistance`
--
ALTER TABLE `assistance`
  ADD CONSTRAINT `fk_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `fk_amic` FOREIGN KEY (`user_id_friend`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_usuari` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_user_recived` FOREIGN KEY (`user_id_recived`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_send` FOREIGN KEY (`user_id_send`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
