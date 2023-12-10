-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2023 a las 00:52:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `creart`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `codigo` int(11) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo`, `nombre`, `autor`, `imagen`) VALUES
(3816, 'Ornamental Panel With Two Lovers', 'Israhel van Meckenem, the younger', 'default_1701874308.jpg'),
(21977, 'Melon-Shaped Ewer with Stylized Flowers', 'null', 'default_1701874970.jpg'),
(11723, 'Woman at Her Toilette', 'Berthe Morisot', 'default_1701875000.jpg'),
(3752, 'The Madonna of the Rosary', 'Israhel van Meckenem, the younger', 'default_1701875004.jpg'),
(7122, 'Seated Boy', 'Max Beckmann', 'default_1701875009.jpg'),
(9505, 'Two Studies of a Roma Woman and a Roma Boy in a La', 'Jacob de Gheyn, II', 'default_1701875014.jpg'),
(20199, 'Final Study for \"Bathers at Asnières\"', 'Georges Seurat', 'default_1701875023.jpg'),
(13096, 'The Baptism of the Eunuch', 'Rembrandt van Rijn', 'default_1701875028.jpg'),
(11294, 'Half-Length Female Nude', 'Pablo Picasso', 'default_1701875125.jpg'),
(23700, 'The Praying Jew', 'Marc Chagall', 'default_1701875132.jpg'),
(27281, 'Madam Pompadour', 'Amedeo Modigliani', 'default_1701875161.jpg'),
(32587, 'Toy', 'John Angus Chamberlain', 'default_1701875165.jpg'),
(33098, 'Cong', 'null', 'default_1701875171.jpg'),
(32349, 'City', 'Ed Ruscha', 'default_1701875179.jpg'),
(41441, 'Manhattan Dawn', 'Lyonel Feininger', 'default_1701875192.jpg'),
(27987, 'Jacques and Berthe Lipchitz', 'Amedeo Modigliani', 'default_1701875198.jpg'),
(26715, 'Seated Nude', 'Édouard Manet', 'default_1701875221.jpg'),
(61073, 'Jeanne Bécu, Comtesse Du Barry, and her servant Za', 'Jean Baptiste André Gautier d\'Agoty', 'default_1701875260.jpg'),
(43060, 'Incense Burner in the Form of a Duck', 'null', 'default_1701875266.jpg'),
(61612, 'Nude with a Pitcher', 'Pablo Picasso', 'default_1701875272.jpg'),
(59944, 'The Laundress', 'Pierre-Auguste Renoir', 'default_1701875290.jpg'),
(50116, 'Self-Portrait', 'Max Beckmann', 'default_1701875294.jpg'),
(62176, 'Carnival in Naples', 'Max Beckmann', 'default_1701875313.jpg'),
(62371, 'Madame Cezanne in a Yellow Chair', 'Paul Cezanne', 'default_1701875325.jpg'),
(64714, 'Portrait of Reinhard Piper', 'Max Beckmann', 'default_1701875340.jpg'),
(64352, 'Portrait of I. B. Neumann', 'Max Beckmann', 'default_1701875347.jpg'),
(61616, 'Oil Sketch for \"A Sunday on La Grande Jatte — 1884', 'Georges Seurat', 'default_1701875353.jpg'),
(76810, 'European Banquet Scene (or The Marriage Feast at C', 'Mughal', 'default_1701875622.jpg'),
(79586, 'Portrait of Mme Lisle and Mme Loubens', 'Hilaire Germain Edgar Degas', 'default_1701875628.jpg'),
(65479, 'Cottages with a Woman Working in the Middle Ground', 'Vincent van Gogh', 'default_1701875641.jpg'),
(81533, 'The Races at Longchamp', 'Édouard Manet', 'default_1701875648.jpg'),
(71479, 'Daoist God Zhenwu (Perfected Warrior), Supreme Emp', 'Chen Yanqing', 'default_1701875668.jpg'),
(75361, 'The Peach Blossom Spring 桃花源圖', 'Qiu Ying', 'default_1701875674.jpg'),
(86265, 'St. Luke Portraying the Madonna', 'Israhel van Meckenem, the younger', 'default_1701875779.jpg'),
(81485, 'Combat of Two Wild Men on Horseback', 'Israhel van Meckenem, the younger', 'default_1701875796.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
