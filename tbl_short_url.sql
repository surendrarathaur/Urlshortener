-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2020 at 12:35 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `urlshortner`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_short_url`
--

CREATE TABLE `tbl_short_url` (
  `id` int(11) NOT NULL,
  `originalUrl` varchar(255) NOT NULL,
  `shortUrl` varchar(255) NOT NULL,
  `urlCode` varchar(255) NOT NULL,
  `urlClick` int(11) NOT NULL,
  `ipaddress` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_short_url`
--

INSERT INTO `tbl_short_url` (`id`, `originalUrl`, `shortUrl`, `urlCode`, `urlClick`, `ipaddress`, `country`, `createdAt`) VALUES
(1, 'https://www.flipkart.com/poco-m2-oi65-gf23-store?otracker=clp_bannerads_1_2.bannerAdCard.BANNERADS_POCO%2BM2_mobile-phones-store_GKEH4NZUBDUV', 'http://localhost:4000/h14VtScUo', 'h14VtScUo', 16, '::1', '', '2020-08-01 14:54:20'),
(2, 'https://www.flipkart.com/poco-m2-brick-red-128-gb/p/itm4a652f8f061c0?pid=MOBFV9V9KMAHY3AJ&lid=LSTMOBFV9V9KMAHY3AJLPSTVP&marketplace=FLIPKART&srno=b_1_1&otracker=clp_banner_1_1.banner.BANNER_poco-m2-oi65-gf23-store_PVGCZ4BWXVQ6&fm=neo%2Fmerchandising&iid=f', 'http://localhost:4000/xs2FqGsb4', 'xs2FqGsb4', 1, '::1', '', '2020-09-12 15:22:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_short_url`
--
ALTER TABLE `tbl_short_url`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_short_url`
--
ALTER TABLE `tbl_short_url`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
