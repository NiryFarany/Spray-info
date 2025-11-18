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
-- Database: `order_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_amount` float NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `user_id`, `total_amount`, `status`, `created_at`) VALUES
(1, 1, 200000, 'pending', '2025-11-08 16:03:56'),
(2, 1, 200000, 'pending', '2025-11-08 16:05:49'),
(3, 1, 180000, 'pending', '2025-11-08 16:09:25'),
(4, 1, 150000, 'pending', '2025-11-08 16:10:18'),
(5, 1, 180000, 'pending', '2025-11-08 16:11:36');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_amount` float NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `status`, `created_at`) VALUES
(1, 1, 220000, 'paid', '2025-11-08 13:23:12'),
(2, 1, 150000, 'pending', '2025-11-08 14:42:55'),
(5, 1, 180000, 'paid', '2025-11-10 06:19:19'),
(6, 1, 200000, 'pending', '2025-11-10 06:46:48'),
(8, 1, 800000, 'cancelled', '2025-11-10 07:56:58'),
(9, 1, 800000, 'pending', '2025-11-10 15:19:45'),
(10, 1, 800000, 'pending', '2025-11-13 11:01:00'),
(11, 1, 800000, 'pending', '2025-11-13 11:05:28'),
(12, 1, 150000, 'pending', '2025-11-14 07:48:56'),
(13, 2, 150000, 'paid', '2025-11-15 07:15:31'),
(14, 2, 800000, 'paid', '2025-11-15 07:52:48'),
(15, 7, 800000, 'paid', '2025-11-18 12:05:52');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `formation_id` int NOT NULL,
  `formation_name` varchar(100) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `formation_id`, `formation_name`, `price`) VALUES
(1, 1, 8, 'Reseau Pro', 220000),
(2, 2, 9, 'Dev Pro', 150000),
(5, 5, 12, 'data', 180000),
(6, 6, 13, 'robot', 200000),
(8, 8, 15, 'Reseau Pro', 800000),
(9, 9, 15, 'Reseau Pro', 800000),
(10, 10, 11, 'DevOps Pro', 800000),
(11, 11, 11, 'DevOps Pro', 800000),
(12, 12, 9, 'Dev Pro', 150000),
(13, 13, 9, 'Dev Pro', 150000),
(14, 14, 11, 'DevOps Pro', 800000),
(15, 15, 11, 'DevOps Pro', 800000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
