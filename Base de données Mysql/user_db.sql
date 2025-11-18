-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2025 at 03:07 PM
-- Server version: 8.0.43-0ubuntu0.24.04.2
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password_hash`, `is_admin`, `created_at`, `phone`) VALUES
(1, 'Admin', 'admin@sprayinfo.com', 'scrypt:32768:8:1$QTy7KFxhVoF6hfU4$cdaeed4202546ffd486ffbaded164d2775e9ab112f9b9daf4214a229a7ee8ac563a12006e07dc44e13fe1086e81bb01ff2bc7d1c1a1f3b840bbff6eb0479ef8d', 1, '2025-11-13 07:09:55', NULL),
(2, 'Fenotoky', 'fenotoky@gmail.com', 'scrypt:32768:8:1$7WpbvfuPhy9FxuRt$7fa05df86f17efa04c00e5d5aea34ce64a833504f817e166a323e3ad4d483e2c1d0b30b05f66de543512d274c8de32bda5c9a4cad42959d75094926319d3e9df', 0, '2025-11-13 08:21:03', '0349954043397108'),
(4, 'feno', 'feno@gmail.com', 'scrypt:32768:8:1$X7hBPBnYeVETWn7M$7da2449cd31d6f37ed19d8348a7256fe61174edf10d1d0b622967e6c05d5b627308aa312c8c3a4bf3dbeeff27602590df8c7ed06aaee1ac3bec69c248bdbe7f0', 0, '2025-11-15 09:02:57', NULL),
(6, 'Aina', 'aina@gmail.com', 'scrypt:32768:8:1$Y51PgW2WtZf3YMGf$1a4eca5e64f29b1cfd05a7a9309a616dc8f01f635386fce65a5b235b34119756dfdbb9e710bf310eb0a309ccc91c4f459067f1e65d2c65a64c019bd580b6e74b', 0, '2025-11-15 12:25:29', '0349954048'),
(7, 'Noblettee', 'noblette.tsimihanta@gmail.com', 'scrypt:32768:8:1$7E7J7UB0hY3IZCnx$ccb4ebdc8d762a33645fa03666e63ff5f8acc9f06e0009724b7a28ccb816d31266a2020458d3cf78a5c37cdfa6e973cd110caab6765998feebcc89354a15a8e2', 0, '2025-11-18 10:26:12', '0349954043');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
