-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2025 at 05:51 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bloomzon`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachment_table`
--

CREATE TABLE `attachment_table` (
  `id` int(11) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachment_table`
--

INSERT INTO `attachment_table` (`id`, `attachment`, `created_at`) VALUES
(3, 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540fynally%252Fglopilot/ImagePicker/0c38749f-410a-4dc8-a42e-558eb1003cab.jpeg', '2025-05-31 08:23:10'),
(4, 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540fynally%252Fglopilot/ImagePicker/0c38749f-410a-4dc8-a42e-558eb1003cab.jpeg', '2025-05-31 08:26:26');

-- --------------------------------------------------------

--
-- Table structure for table `attributes_table`
--

CREATE TABLE `attributes_table` (
  `id` int(11) NOT NULL,
  `layout_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `label` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attributes_table`
--

INSERT INTO `attributes_table` (`id`, `layout_id`, `name`, `label`, `created_at`, `updated_at`) VALUES
(1, 3, 'color', 'Choose a color', '2025-05-24 12:35:27', '2025-05-25 13:14:36'),
(2, 1, 'size', 'Choose a size', '2025-05-24 12:36:07', '2025-05-24 12:36:07'),
(3, 1, 'ram', 'Choose a RAM size', '2025-05-24 12:36:41', '2025-05-24 12:36:41'),
(4, 2, 'Storage', 'Choose a storage capacity', '2025-05-24 12:42:48', '2025-05-25 13:22:27');

-- --------------------------------------------------------

--
-- Table structure for table `capabilities_table`
--

CREATE TABLE `capabilities_table` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `capabilities_table`
--

INSERT INTO `capabilities_table` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'r&d capabilities', 'the ability to conduct research and development (r&d)\n to innovate, improve products, and develop new solutions.\n\nthis includes investment in technology, prototyping, testing,\n and continuous improvement to stay competitive in the market.', '2025-03-21 11:26:34', '2025-03-21 11:26:34'),
(2, 'full customization', 'the ability to provide fully customized products tailored to client specifications.\nthis includes modifying design, materials, features, branding, packaging,\nand other elements to meet unique customer requirements.\n\nwith full customization, businesses can offer exclusive, made-to-order products,\nensuring differentiation in the market and enhanced customer satisfaction.', '2025-03-21 12:06:13', '2025-03-21 12:06:13'),
(3, 'quality assurance', 'the ability to ensure that products meet established quality standards\nthrough rigorous testing, inspection, and compliance measures.\n\nthis includes implementing quality control processes, certifications,\nand continuous monitoring to maintain consistency, reliability,\nand customer satisfaction.', '2025-03-21 12:28:34', '2025-03-21 12:28:34'),
(4, 'finished production inspection', 'the ability to inspect and verify finished products before shipment\n to ensure they meet required specifications and quality standards.\n\nthis includes conducting thorough inspections, functional testing,\nand adherence to industry regulations to prevent defects and\nensure customer satisfaction.', '2025-03-21 12:31:26', '2025-03-21 12:31:26'),
(5, 'agile supply chain', 'the ability to rapidly adapt to market changes and customer demands\nthrough flexible production, efficient logistics, and real-time data insights.\n\nthis includes optimizing inventory management, reducing lead times,\nand enhancing collaboration with suppliers to ensure seamless operations\nand timely delivery of products.', '2025-03-21 13:09:34', '2025-03-21 13:09:34'),
(6, 'oem for well-known brands', 'the capability to manufacture products for established brands under\noriginal equipment manufacturer (oem) agreements.\n\nthis includes adhering to strict quality standards, meeting brand specifications,\nand leveraging advanced manufacturing processes to produce high-quality goods\nthat align with the reputation and expectations of renowned brands.', '2025-03-21 13:13:05', '2025-03-21 13:13:05'),
(7, 'end-to-end manufacturing', 'the ability to manage the entire production process from raw materials\nprocurement to final product assembly and packaging.\n\nthis includes efficient resource utilization, process optimization,\nand quality control measures to ensure seamless production and\ndelivery of high-quality products.', '2025-03-21 13:18:41', '2025-03-21 13:18:41'),
(8, 'private label production', 'the ability to manufacture and brand products exclusively for retailers\nor businesses under their own private labels.\n\nthis includes offering customized formulations, packaging solutions,\nand quality assurance to help businesses establish unique, market-ready products.', '2025-03-21 13:18:54', '2025-03-21 13:18:54'),
(9, 'eco-friendly manufacturing', 'the capability to produce goods using sustainable materials,\nenergy-efficient processes, and environmentally responsible practices.\n\nthis includes reducing carbon footprints, minimizing waste,\nand ensuring compliance with environmental regulations\nto promote a greener future.', '2025-03-21 13:19:11', '2025-03-21 13:19:11'),
(10, 'just-in-time (jit) production', 'the ability to optimize production efficiency by manufacturing\nproducts based on demand rather than stockpiling inventory.\n\nthis includes reducing waste, improving cost-effectiveness,\nand enhancing supply chain responsiveness to market needs.', '2025-03-21 13:19:21', '2025-03-21 13:19:21'),
(11, 'advanced prototyping & 3d printing', 'the capability to rapidly design, prototype, and iterate products\nusing cutting-edge technologies such as 3d printing.\n\nthis includes reducing development time, enhancing customization,\nand enabling cost-effective product innovation.', '2025-03-21 13:19:37', '2025-03-21 13:19:37'),
(12, 'custom packaging solutions', 'the ability to design and produce tailored packaging solutions\nthat enhance product appeal, protection, and branding.\n\nthis includes using sustainable materials, innovative designs,\nand efficient packaging processes to meet diverse market requirements.', '2025-03-21 13:19:52', '2025-03-21 13:19:52'),
(13, 'multi-channel distribution', 'the capability to efficiently distribute products through multiple\nsales channels, including retail, e-commerce, and wholesale.\n\nthis includes logistics optimization, inventory management,\nand seamless integration with various platforms for maximum market reach.', '2025-03-21 13:20:03', '2025-03-21 13:20:03'),
(14, 'regulatory compliance & certification', 'the ability to ensure that products and manufacturing processes comply\nwith industry regulations, safety standards, and certification requirements.\n\nthis includes rigorous testing, documentation, and adherence to\nglobal and local compliance measures.', '2025-03-21 13:20:12', '2025-03-21 13:20:12'),
(15, 'high-volume production', 'the capability to scale production efficiently to meet large orders\nwithout compromising on quality or delivery timelines.\n\nthis includes optimizing supply chain logistics, utilizing\nadvanced automation, and maintaining cost-effective production methods.', '2025-03-21 13:20:23', '2025-03-21 13:20:23'),
(16, 'smart manufacturing & automation', 'the ability to leverage iot, ai, and robotics to enhance\nmanufacturing efficiency, precision, and scalability.\n\nthis includes implementing data-driven production,\nreal-time monitoring, and automated quality control for optimal performance.', '2025-03-21 13:20:33', '2025-03-21 13:20:33');

-- --------------------------------------------------------

--
-- Table structure for table `carts_table`
--

CREATE TABLE `carts_table` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `carts_table`
--

INSERT INTO `carts_table` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(15, 3, '2025-06-09 19:55:36', '2025-06-09 19:55:36');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variation_id` int(11) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `attribute_key` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `weight` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `store_id`, `product_id`, `variation_id`, `sku`, `attribute_key`, `quantity`, `price`, `weight`, `created_at`, `updated_at`) VALUES
(45, 15, 3, 49, 67, '1166-ASUSTU-BLA-1519', '377e3cfaf9bf396906241171c4ea12efc32a55e7', 5, '899.00', '2.30', '2025-06-12 14:43:45', '2025-06-12 15:45:50');

-- --------------------------------------------------------

--
-- Table structure for table `cart_item_attributes`
--

CREATE TABLE `cart_item_attributes` (
  `id` int(11) NOT NULL,
  `cart_item_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_item_attributes`
--

INSERT INTO `cart_item_attributes` (`id`, `cart_item_id`, `name`, `value`, `created_at`) VALUES
(130, 45, 'color', 'black', '2025-06-12 14:43:45');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `_name` longtext NOT NULL,
  `_maincategory` int(11) DEFAULT NULL,
  `_image` longtext NOT NULL,
  `_status` longtext NOT NULL,
  `_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `_name`, `_maincategory`, `_image`, `_status`, `_date`) VALUES
(1, 'Toys', 1, '', '1', '2025-02-08 14:53:53'),
(2, 'Action figures and collections', 1, '', '1', '2025-02-08 15:00:08'),
(3, 'Doll and accessories', 1, '', '1', '2025-02-08 15:00:27'),
(4, 'Outdoor toys', 1, '', '1', '2025-02-08 15:00:40'),
(5, 'Electronic and interactive toys', 1, '', '1', '2025-02-08 15:06:41'),
(6, 'Stuffed Animals and plush Toys', 1, '', '1', '2025-02-08 15:06:59'),
(7, 'Games and puzzle', 1, '', '1', '2025-02-08 15:07:15'),
(8, 'Card games', 1, '', '1', '2025-02-08 15:07:39'),
(9, 'Puzzles', 1, '', '1', '2025-02-08 15:08:02'),
(10, 'Electronic Games', 1, '', '1', '2025-02-08 15:08:09'),
(11, 'Gifts for kids', 1, '', '1', '2025-02-08 15:08:24'),
(12, 'Seasonal Gifts', 1, '', '1', '2025-02-08 15:08:39'),
(13, 'Keep sakes', 1, '', '1', '2025-02-08 15:08:51'),
(14, 'Gifts for adults', 1, '', '1', '2025-02-08 15:09:02'),
(15, 'Novelty Gifts', 1, '', '1', '2025-02-08 15:09:18'),
(16, 'Beauty body set', 1, '', '1', '2025-02-08 15:09:34'),
(17, 'Food and Drink Gift', 1, '', '1', '2025-02-08 15:09:44'),
(18, 'DIY Gift kits', 1, '', '1', '2025-02-08 15:10:06'),
(19, 'Party supplies', 1, '', '1', '2025-02-08 15:10:17'),
(20, 'Holiday party supplies', 1, '', '1', '2025-02-08 15:10:26'),
(21, 'Wrapping and cards', 1, '', '1', '2025-02-08 15:10:36'),
(22, 'Women active', 2, '', '1', '2025-02-08 15:19:06'),
(23, 'Men Active', 2, '', '1', '2025-02-08 15:19:16'),
(24, 'Women plus active wear', 2, '', '1', '2025-02-08 15:19:27'),
(25, 'Girl\'s Clothing', 3, '', '1', '2025-02-08 15:20:27'),
(26, 'Boy\'s Clothing', 3, '', '1', '2025-02-08 15:20:51'),
(27, 'Maternity and baby item', 3, '', '1', '2025-02-08 15:21:02'),
(28, 'Cameras', 4, '', '1', '2025-02-08 15:29:46'),
(29, 'Lenses', 4, '', '1', '2025-02-08 15:29:54'),
(30, 'Camera Accesssories', 4, '', '1', '2025-02-08 15:30:10'),
(31, 'Lighting and studio Equipment', 4, '', '1', '2025-02-08 15:30:19'),
(32, 'Drones and Aerial imaging', 4, '', '1', '2025-02-08 15:30:43'),
(33, 'Video Equipment', 4, '', '1', '2025-02-08 15:35:19'),
(34, 'Film and Darkroom Supplies', 4, '', '1', '2025-02-08 15:35:29'),
(35, 'Memory and storage', 4, '', '1', '2025-02-08 15:35:40'),
(36, 'Batteries and chargers', 4, '', '1', '2025-02-08 15:35:59'),
(37, 'Photo Albums and Frames', 4, '', '1', '2025-02-08 15:36:28'),
(38, 'Beddings', 6, '', '1', '2025-02-08 15:38:37'),
(39, 'Kitchen and dinning linens', 6, '', '1', '2025-02-08 15:38:54'),
(40, 'Bathroom textiles', 6, '', '1', '2025-02-08 15:39:08'),
(41, 'Sewing supplies', 6, '', '1', '2025-02-08 15:39:21'),
(42, 'Fabrics', 6, '', '1', '2025-02-08 15:39:31'),
(43, 'Necklaces', 8, '', '1', '2025-02-08 15:40:50'),
(44, 'Earrings', 8, '', '1', '2025-02-08 15:40:58'),
(45, 'Bracelet', 8, '', '1', '2025-02-08 15:41:07'),
(46, 'Rings', 8, '', '1', '2025-02-08 15:41:15'),
(47, 'Brooches and pins', 8, '', '1', '2025-02-08 15:41:25'),
(48, 'Jewelry’s storage and care', 8, '', '1', '2025-02-08 15:41:38'),
(49, 'Office Supplies', 9, '', '1', '2025-02-08 15:43:52'),
(50, 'Industrial Equipment', 9, '', '1', '2025-02-08 15:44:09'),
(51, 'Safety and security', 9, '', '1', '2025-02-08 15:44:26'),
(52, 'Janitorial and cleaning supplies', 9, '', '1', '2025-02-08 15:44:37'),
(53, 'Packaging and shipping', 9, '', '1', '2025-02-08 15:45:00'),
(54, 'Storage and shelving', 9, '', '1', '2025-02-08 15:45:12'),
(55, 'Electrical and lighting', 9, '', '1', '2025-02-08 15:45:48'),
(56, 'HVAC and Plumbing', 9, '', '1', '2025-02-08 15:45:58'),
(57, 'Machinery parts and accessories', 9, '', '1', '2025-02-08 15:46:08'),
(58, 'Office Furniture', 9, '', '1', '2025-02-08 15:46:17'),
(59, 'Office Supplies', 10, '', '1', '2025-02-08 15:48:00'),
(60, 'Writing and correction supplies', 10, '', '1', '2025-02-08 15:48:16'),
(61, 'Notebooks and writing pads', 10, '', '1', '2025-02-08 15:48:28'),
(62, 'Papers', 10, '', '1', '2025-02-08 15:48:44'),
(63, 'Office binding supplies', 10, '', '1', '2025-02-08 15:48:52'),
(64, 'Office desk accessories', 10, '', '1', '2025-02-08 15:49:00'),
(65, 'Tapes, adhesives and Fasteners', 10, '', '1', '2025-02-08 15:49:09'),
(66, 'Health supplements', 11, '', '1', '2025-02-08 15:51:01'),
(67, 'Skincare cleansers', 11, '', '1', '2025-02-08 15:51:34'),
(68, 'Skincare Moisturizers', 11, '', '1', '2025-02-08 15:51:51'),
(69, 'Treatments', 11, '', '1', '2025-02-08 15:52:05'),
(70, 'Suncare products', 11, '', '1', '2025-02-08 15:53:10'),
(71, 'Eye care products', 11, '', '1', '2025-02-08 15:53:28'),
(72, 'Cosmetics face makeups', 11, '', '1', '2025-02-08 15:53:50'),
(73, 'Eye makeups', 11, '', '1', '2025-02-08 15:54:05'),
(74, 'Lip makeups', 11, '', '1', '2025-02-08 15:54:29'),
(75, 'Beauty tools and Accessories', 11, '', '1', '2025-02-08 15:54:42'),
(76, 'Body care cleansers', 11, '', '1', '2025-02-08 15:54:56'),
(77, 'Body treatments', 11, '', '1', '2025-02-08 15:57:02'),
(78, 'Hand and foot care', 11, '', '1', '2025-02-08 15:57:29'),
(79, 'Men’s grooming- shaving products', 11, '', '1', '2025-02-08 15:57:42'),
(80, 'Beard care', 11, '', '1', '2025-02-08 15:57:56'),
(81, 'Men’s skincare', 11, '', '1', '2025-02-08 15:58:12'),
(82, 'Medical supplies', 11, '', '1', '2025-02-08 15:58:41'),
(83, 'Men watches', 12, '', '1', '2025-02-08 16:26:10'),
(84, 'Ladies watches', 12, '', '1', '2025-02-08 16:28:23'),
(85, 'Kiddies wrist watches', 12, '', '1', '2025-02-08 16:28:48'),
(86, 'Wrist watches set', 12, '', '1', '2025-02-08 16:29:08'),
(87, 'Men\'s Bag', 14, '', '1', '2025-02-08 16:32:10'),
(88, 'Ladies Bags', 14, '', '1', '2025-02-08 16:32:32'),
(89, 'Kiddies bags', 14, '', '1', '2025-02-08 16:32:52'),
(90, 'Luggages', 14, '', '1', '2025-02-08 16:33:07'),
(91, 'Other bags', 14, '', '1', '2025-02-08 16:33:22'),
(92, 'Living Room Furniture', 15, '', '1', '2025-02-08 16:41:12'),
(93, 'Bedroom Furniture', 15, '', '1', '2025-02-08 16:41:52'),
(94, 'Kitchen and Dinning Furniture', 15, '', '1', '2025-02-08 16:42:04'),
(95, 'Office Furniture', 15, '', '1', '2025-02-08 16:42:23'),
(96, 'Entry and Mudroom furniture', 15, '', '1', '2025-02-08 16:42:35'),
(97, 'Outdoor and Patio Furniture', 15, '', '1', '2025-02-08 16:42:47'),
(98, 'Baby and Kids furniture', 15, '', '1', '2025-02-08 16:43:44'),
(99, 'Bathroom Furniture', 15, '', '1', '2025-02-08 16:43:55'),
(100, 'Custom Furniture', 15, '', '1', '2025-02-08 16:44:31'),
(101, 'Games Table & Game Room Furniture', 15, '', '1', '2025-02-08 16:44:47'),
(102, 'Women\'s perfume', 16, '', '1', '2025-02-08 16:49:09'),
(103, 'Eau de parfum', 16, '', '1', '2025-02-08 16:49:28'),
(104, 'Parfums', 16, '', '1', '2025-02-08 16:49:37'),
(105, 'Eau de Toilette', 16, '', '1', '2025-02-08 16:49:48'),
(106, 'Perfume sets', 16, '', '1', '2025-02-08 16:50:01'),
(107, 'Men\'s perfume', 16, '', '1', '2025-02-08 16:50:12'),
(108, 'Plus size Tops', 17, '', '1', '2025-02-08 16:55:36'),
(109, 'Plus size Bottoms', 17, '', '1', '2025-02-08 16:55:48'),
(110, 'Plus size dresses', 17, '', '1', '2025-02-08 16:56:12'),
(111, 'Plus size two-piece sets', 17, '', '1', '2025-02-08 16:56:26'),
(112, 'Bridal gown by style', 18, '', '1', '2025-02-08 16:57:27'),
(113, 'Bridal gown by sleeve style', 18, '', '1', '2025-02-08 16:57:36'),
(114, 'Bridal gowns by fabrics', 18, '', '1', '2025-02-08 16:57:45'),
(115, 'Bridal gown by length', 18, '', '1', '2025-02-08 16:57:55'),
(116, 'Bridal veils', 18, '', '1', '2025-02-08 16:58:05'),
(117, 'Bridal Accessories', 18, '', '1', '2025-02-08 16:58:14'),
(118, 'Hair Bundles', 19, '', '1', '2025-02-08 16:59:31'),
(119, 'Closure and frontal', 19, '', '1', '2025-02-08 16:59:58'),
(120, 'Hats', 20, '', '1', '2025-02-08 17:01:09'),
(121, 'Caps', 20, '', '1', '2025-02-08 17:01:37'),
(122, 'Scarves', 20, '', '1', '2025-02-08 17:01:47'),
(123, 'Men\'s Sunglasses', 21, '', '1', '2025-02-08 17:02:48'),
(124, 'Women’s Sunglasses', 21, '', '1', '2025-02-08 17:03:00'),
(125, 'Unisex sunglasses', 21, '', '1', '2025-02-08 17:03:15'),
(126, 'Women\'s muslim clothing', 22, '', '1', '2025-02-08 17:04:45'),
(127, 'Men\'s muslim clothing', 22, '', '1', '2025-02-08 17:04:54'),
(128, 'Modest muslim wears', 22, '', '1', '2025-02-08 17:05:06'),
(129, 'Prayer wears', 22, '', '1', '2025-02-08 17:05:18'),
(130, 'Muslim Accessories', 22, '', '1', '2025-02-08 17:05:29'),
(131, 'Video Games', 23, '', '1', '2025-02-08 17:06:24'),
(132, 'Gaming Console', 23, '', '1', '2025-02-08 17:06:32'),
(133, 'Game Accesssories', 23, '', '1', '2025-02-08 17:06:43'),
(134, 'PC Gaming Gear', 23, '', '1', '2025-02-08 17:06:53'),
(135, 'Board Games & card Games', 23, '', '1', '2025-02-08 17:07:14'),
(136, 'Puzzles', 23, '', '1', '2025-02-08 17:07:25'),
(137, 'Outdoor and physical Games', 23, '', '1', '2025-02-08 17:07:36'),
(138, 'VR and VA Accessories', 23, '', '1', '2025-02-08 17:07:46'),
(139, 'Dress Shoe', 24, '', '1', '2025-02-08 17:09:25'),
(140, 'Men casual shoe', 24, '', '1', '2025-02-08 17:09:44'),
(141, 'Men Boot', 24, '', '1', '2025-02-08 17:10:04'),
(142, 'Men luxury shoes', 24, '', '1', '2025-02-08 17:10:23'),
(143, 'Tops', 25, '', '1', '2025-02-08 17:12:14'),
(144, 'Blazers and suits', 25, '', '1', '2025-02-08 17:12:35'),
(145, 'Jacket and Coats', 25, '', '1', '2025-02-08 17:12:45'),
(146, 'Men two-piece set', 25, '', '1', '2025-02-08 17:13:04'),
(147, 'Pants', 25, '', '1', '2025-02-08 17:13:13'),
(148, 'Jeans', 25, '', '1', '2025-02-08 17:14:08'),
(149, 'Men\'s Underwear', 25, '', '1', '2025-02-08 17:14:29'),
(150, 'Uniform-Men', 25, '', '1', '2025-02-08 17:14:39'),
(151, 'Popular Clothing Tops', 26, '', '1', '2025-02-08 17:15:32'),
(152, 'Bottom', 26, '', '1', '2025-02-08 17:15:45'),
(153, 'Dresses', 26, '', '1', '2025-02-08 17:15:57'),
(154, 'Special occassion dresses', 26, '', '1', '2025-02-08 17:16:51'),
(155, 'Two-piece set', 26, '', '1', '2025-02-08 17:17:00'),
(156, 'Swim wears', 26, '', '1', '2025-02-08 17:17:26'),
(157, 'Lingeries, Underwears and Pajamas', 26, '', '1', '2025-02-08 17:17:38'),
(158, 'Uniforms', 26, '', '1', '2025-02-08 17:17:56'),
(159, 'Dance Wears', 26, '', '1', '2025-02-08 17:18:08'),
(160, 'Cultural clothing', 26, '', '1', '2025-02-08 17:18:19'),
(161, 'Hand tools', 27, '', '1', '2025-02-10 03:56:59'),
(162, 'Power tools', 27, '', '1', '2025-02-10 03:57:20'),
(163, 'Measuring tools', 27, '', '1', '2025-02-10 03:57:33'),
(164, 'Testing tools', 27, '', '1', '2025-02-10 03:57:43'),
(165, 'Gardening tools', 27, '', '1', '2025-02-10 03:57:52'),
(166, 'Plumbing', 27, '', '1', '2025-02-10 03:58:00'),
(167, 'Building material', 27, '', '1', '2025-02-10 03:58:13'),
(168, 'Christmas Tree and Declaration', 29, '', '1', '2025-02-10 03:59:38'),
(169, 'Indoor decoration', 29, '', '1', '2025-02-10 03:59:47'),
(170, 'Outdoors decoration', 29, '', '1', '2025-02-10 03:59:57'),
(171, 'Christmas Apparels', 29, '', '1', '2025-02-10 04:00:16'),
(172, 'Gift wrap and packaging', 29, '', '1', '2025-02-10 04:00:28'),
(173, 'Holiday party supplies', 29, '', '1', '2025-02-10 04:00:39'),
(174, 'Religious Décor', 29, '', '1', '2025-02-10 04:00:48'),
(175, 'Baking and kitchen essential', 29, '', '1', '2025-02-10 04:00:58'),
(176, 'Music and entertainment', 29, '', '1', '2025-02-10 04:01:22'),
(177, 'Intimate Care', 30, '', '1', '2025-02-10 04:03:25'),
(178, 'Contraceptive', 30, '', '1', '2025-02-10 04:03:45'),
(179, 'Sexual Health Supplements', 30, '', '1', '2025-02-10 04:03:56'),
(180, 'Massagers and Devices', 30, '', '1', '2025-02-10 04:04:07'),
(181, 'Education and Resources', 30, '', '1', '2025-02-10 04:04:20'),
(182, 'Discreer Storage and Travel', 30, '', '1', '2025-02-10 04:04:49'),
(183, 'Adult costumes', 31, '', '1', '2025-02-10 04:12:28'),
(184, 'Kids Costumes', 31, '', '1', '2025-02-10 04:12:40'),
(185, 'Costumes Accessories', 31, '', '1', '2025-02-10 04:12:51'),
(186, 'Heels', 32, '', '1', '2025-02-10 04:14:19'),
(187, 'Flat shoes', 32, '', '1', '2025-02-10 04:14:27'),
(188, 'Women Boots', 32, '', '1', '2025-02-10 04:14:35'),
(189, 'Luxury and glamorous shoes', 32, '', '1', '2025-02-10 04:14:43'),
(190, 'Infant and toddlers shoes', 33, '', '1', '2025-02-10 04:16:08'),
(191, 'Casual shoes', 33, '', '1', '2025-02-10 04:16:18'),
(192, 'Formal Shoes', 33, '', '1', '2025-02-10 04:16:28'),
(193, 'Children Outdoor shoes', 33, '', '1', '2025-02-10 04:16:40'),
(194, 'Children Athletic Shoes', 33, '', '1', '2025-02-10 04:16:46'),
(195, 'Children Dance Shoes', 33, '', '1', '2025-02-10 04:16:55'),
(196, 'Special Occassions Shoes', 33, '', '1', '2025-02-10 04:17:05'),
(197, 'Children Shoes Accessories', 33, '', '1', '2025-02-10 04:17:14'),
(198, 'Smartphones', 34, '', '1', '2025-02-10 04:18:47'),
(199, 'Other Phones', 34, '', '1', '2025-02-10 04:19:03'),
(200, 'Phone accessories', 34, '', '1', '2025-02-10 04:19:17'),
(201, 'Curtains and Blinds', 35, '', '1', '2025-02-10 04:20:06'),
(202, 'Parlor and Bedroom Decor', 35, '', '1', '2025-02-10 04:20:19'),
(203, 'Gas, ovens and Stoves', 37, '', '1', '2025-02-10 04:21:56'),
(204, 'Food equipments and supplies', 37, '', '1', '2025-02-10 04:22:12'),
(205, 'Kitchen utensils', 37, '', '1', '2025-02-10 04:22:28'),
(206, 'Glassware', 37, '', '1', '2025-02-10 04:22:37'),
(207, 'Cookwares', 37, '', '1', '2025-02-10 04:22:57'),
(208, 'Kitchen Accessories', 37, '', '1', '2025-02-10 04:23:11'),
(209, 'Laundry Appliances', 37, '', '1', '2025-02-10 04:23:33'),
(210, 'Cleaning Appliances', 37, '', '1', '2025-02-10 04:23:47'),
(211, 'Home Comfort Appliances', 38, '', '1', '2025-02-10 04:25:40'),
(212, 'Laundry Appliances', 38, '', '1', '2025-02-10 04:25:47'),
(213, 'Cleaning Appliances', 38, '', '1', '2025-02-10 04:25:55'),
(214, 'Entertainment Appliances', 38, '', '1', '2025-02-10 04:26:10'),
(215, 'Outdoor Appliances', 38, '', '1', '2025-02-10 04:26:19'),
(216, 'Business book', 39, '', '1', '2025-02-10 04:27:50'),
(217, 'Health, Fitness and Dieting Books', 39, '', '1', '2025-02-10 04:28:00'),
(218, 'Computer and Technology', 39, '', '1', '2025-02-10 04:28:11'),
(219, 'Novels', 39, '', '1', '2025-02-10 04:28:18'),
(220, 'Christian Books', 39, '', '1', '2025-02-10 04:28:26'),
(221, 'Children education', 39, '', '1', '2025-02-10 04:28:33'),
(222, 'Music', 39, '', '1', '2025-02-10 04:28:53'),
(223, 'Movies', 39, '', '1', '2025-02-10 04:29:00'),
(224, 'Automobile', 40, '', '1', '2025-02-10 04:30:42'),
(225, 'Tires and Wheels', 40, '', '1', '2025-02-10 04:30:51'),
(226, 'Maintenance and tools', 40, '', '1', '2025-02-10 04:30:58'),
(227, 'Car exterior', 40, '', '1', '2025-02-10 04:31:20'),
(228, 'Motorcycle', 40, '', '1', '2025-02-10 04:31:28'),
(229, 'Motorcycle parts', 40, '', '1', '2025-02-10 04:31:43'),
(230, 'Motorcycle tires and wheels', 40, '', '1', '2025-02-10 04:32:27'),
(231, 'Motorcycle electronics', 40, '', '1', '2025-02-10 04:32:51'),
(232, 'Bicycle', 40, '', '1', '2025-02-10 04:33:00'),
(233, 'Bicycle accessories', 40, '', '1', '2025-02-10 04:33:14'),
(234, 'Bicycle parts', 40, '', '1', '2025-02-10 04:33:27'),
(235, 'Bicycle maintenance', 40, '', '1', '2025-02-10 04:33:35'),
(236, 'Pet food', 41, '', '1', '2025-02-10 04:34:38'),
(237, 'Other pet food', 41, '', '1', '2025-02-10 04:35:09'),
(238, 'Pet accessories', 41, '', '1', '2025-02-10 04:35:20'),
(239, 'Pet Grooming', 41, '', '1', '2025-02-10 04:35:31'),
(240, 'Grooming tools', 41, '', '1', '2025-02-10 04:35:49'),
(241, 'Hygiene products', 41, '', '1', '2025-02-10 04:35:57'),
(242, 'Pet Health', 41, '', '1', '2025-02-10 04:36:20'),
(243, 'Flea and tick control', 41, '', '1', '2025-02-10 04:36:29'),
(244, 'First Aid', 41, '', '1', '2025-02-10 04:36:41'),
(245, 'Pet toys', 41, '', '1', '2025-02-10 04:36:49'),
(246, 'Other pet toys', 41, '', '1', '2025-02-10 04:37:00'),
(247, 'Pet travel', 41, '', '1', '2025-02-10 04:37:10'),
(248, 'Travel accessories', 41, '', '1', '2025-02-10 04:37:18'),
(249, 'Home Appliances', 5, '', '1', '2025-05-22 12:44:01'),
(250, 'Computers', 13, '', '1', '2025-05-22 13:17:01');

-- --------------------------------------------------------

--
-- Table structure for table `chat_table`
--

CREATE TABLE `chat_table` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_type` enum('user','store') NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `receiver_type` enum('user','store') NOT NULL,
  `attachment_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_product` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_table`
--

INSERT INTO `chat_table` (`id`, `sender_id`, `sender_type`, `receiver_id`, `receiver_type`, `attachment_id`, `message`, `is_product`, `status`, `created_at`) VALUES
(1, 1, 'user', 1, 'user', NULL, '💔', 0, 2, '2025-06-13 12:33:19'),
(2, 1, 'user', 1, 'user', NULL, 'Hellp', 0, 2, '2025-06-13 12:38:53'),
(3, 1, 'user', 1, 'user', NULL, 'Gggg', 0, 2, '2025-06-13 12:39:25'),
(4, 1, 'user', 1, 'user', NULL, 'Boo', 0, 2, '2025-06-13 12:55:45'),
(5, 1, 'user', 1, 'user', NULL, 'Good morning sir ', 0, 2, '2025-06-13 13:03:02'),
(6, 1, 'user', 1, 'user', NULL, 'Good ', 0, 2, '2025-06-13 13:03:10');

-- --------------------------------------------------------

--
-- Table structure for table `collections_table`
--

CREATE TABLE `collections_table` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collections_table`
--

INSERT INTO `collections_table` (`id`, `store_id`, `subcategory_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(2, 2, 619, 'Men\'s Polos', 1, '2025-03-21 12:36:45', '2025-06-10 10:48:49'),
(10, 3, 1166, 'HP Laptops', 1, '2025-05-22 13:32:09', '2025-06-10 10:40:49'),
(11, 3, 1166, 'Gaming laptops', 1, '2025-06-09 13:13:42', '2025-06-10 10:40:56'),
(12, 2, 620, 'Men\'s Sport Set', 1, '2025-06-15 08:20:42', '2025-06-15 08:22:08'),
(13, 2, 592, 'Casual wears', 1, '2025-06-15 20:50:18', '2025-06-15 20:50:18'),
(14, 2, 635, 'Unisex Tops', 1, '2025-06-15 22:00:50', '2025-06-15 22:00:50');

-- --------------------------------------------------------

--
-- Table structure for table `customizations_table`
--

CREATE TABLE `customizations_table` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `variation_id` int(11) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `attr_key` varchar(255) NOT NULL,
  `customization_type` enum('text','logo','image') NOT NULL,
  `source` enum('order','cart') NOT NULL,
  `customization_id` int(11) DEFAULT NULL,
  `value` text NOT NULL,
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`settings`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customizations_table`
--

INSERT INTO `customizations_table` (`id`, `product_id`, `store_id`, `user_id`, `variation_id`, `sku`, `attr_key`, `customization_type`, `source`, `customization_id`, `value`, `settings`, `created_at`, `updated_at`) VALUES
(4, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', 'color_green_materia_type_ankara_size_m', 'text', 'order', 1, 'Kingdom of Grace ', '{\"fontSize\":12,\"color\":\"#000080\",\"fontFamily\":\"Lato_400Regular\"}', '2025-06-07 05:38:26', '2025-06-07 05:49:34'),
(5, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', 'color_green_materia_type_ankara_size_m', 'logo', 'order', 2, 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540fynally%252Fglopilot/ImagePicker/529cbbc7-9d9e-4c0d-a5a4-044c5e466215.png', '{\"width\":50,\"height\":50,\"borderRadius\":0}', '2025-06-07 05:38:26', '2025-06-07 05:49:34'),
(6, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', 'color_green_materia_type_ankara_size_m', 'image', 'order', NULL, 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540fynally%252Fglopilot/ReactNative-snapshot-image9017130249010816481.png', '{\"width\":200,\"height\":200}', '2025-06-07 05:38:26', '2025-06-07 05:49:34'),
(10, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', '6acd2ed43f8c104f2afb6c925a1d321afb821f55', 'text', 'order', 1, 'Amsterdam Vodka ', '{\"color\":\"#5F9EA0\",\"letterSpacing\":1,\"fontSize\":13}', '2025-06-07 23:12:45', '2025-06-07 23:12:45'),
(11, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', '6acd2ed43f8c104f2afb6c925a1d321afb821f55', 'logo', 'order', 2, 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540fynally%252Fglopilot/ImagePicker/363d7c3e-512e-443c-80ef-533f06f749d3.jpeg', '{\"width\":50,\"height\":50,\"borderRadius\":9}', '2025-06-07 23:12:46', '2025-06-07 23:12:46'),
(12, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', '6acd2ed43f8c104f2afb6c925a1d321afb821f55', 'image', 'order', NULL, 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540fynally%252Fglopilot/ReactNative-snapshot-image7725551954460227036.png', '{\"width\":200,\"height\":200}', '2025-06-07 23:12:46', '2025-06-07 23:12:46'),
(13, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', '6a3a0a649f86d5cc1c92a16f1f1bbadcda55fa67', 'text', 'order', 1, 'NY City ', '{\"letterSpacing\":2,\"fontSize\":12}', '2025-06-07 23:12:47', '2025-06-07 23:12:47'),
(14, 48, 2, 3, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', '6a3a0a649f86d5cc1c92a16f1f1bbadcda55fa67', 'image', 'order', NULL, 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540fynally%252Fglopilot/ReactNative-snapshot-image6566082630277090286.png', '{\"width\":200,\"height\":200}', '2025-06-07 23:12:47', '2025-06-07 23:12:47');

-- --------------------------------------------------------

--
-- Table structure for table `filters_table`
--

CREATE TABLE `filters_table` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `filters_table`
--

INSERT INTO `filters_table` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'new arrivals', 'product was added within the last 30 days', 1, '2025-03-23 21:47:23', '2025-03-23 21:47:23'),
(2, 'hot', 'product has high engagement', 1, '2025-03-23 21:48:47', '2025-03-23 21:48:47'),
(3, 'recommended', 'based on high user ratings', 1, '2025-03-23 21:49:36', '2025-03-23 21:49:36'),
(4, 'best selling', 'product has the highest sales in a last 7 days', 1, '2025-03-23 21:50:48', '2025-03-24 06:08:08'),
(5, 'low price', 'products are sorted by price', 1, '2025-03-23 21:51:17', '2025-03-23 21:51:17');

-- --------------------------------------------------------

--
-- Table structure for table `inquiry_table`
--

CREATE TABLE `inquiry_table` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `attachment_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiry_table`
--

INSERT INTO `inquiry_table` (`id`, `user_id`, `store_id`, `attachment_id`, `message`, `created_at`) VALUES
(1, 3, 2, 3, 'Hi\nI am interested in your product, I would like a more details. \nI look forward for your response. \n\n\nRegards \nChris', '2025-05-31 08:23:10'),
(2, 3, 2, 4, 'Hi\nI am interested in your product, I would like a more details. \nI look forward for your response. \n\n\nRegards \nChris', '2025-05-31 08:26:26');

-- --------------------------------------------------------

--
-- Table structure for table `interactions`
--

CREATE TABLE `interactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `target_type` enum('store','product') NOT NULL,
  `target_id` int(11) NOT NULL,
  `action` enum('like','follow') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interactions`
--

INSERT INTO `interactions` (`id`, `user_id`, `target_type`, `target_id`, `action`, `created_at`) VALUES
(21, 2, 'store', 2, 'like', '2025-06-09 06:15:42');

-- --------------------------------------------------------

--
-- Table structure for table `layouts_table`
--

CREATE TABLE `layouts_table` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `priority` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `layouts_table`
--

INSERT INTO `layouts_table` (`id`, `name`, `description`, `priority`, `status`, `created_at`) VALUES
(1, 'inline', 'Attribute title/label is in horizonatal view.', '1', 1, '2025-05-24 12:24:31'),
(2, 'vertical', 'Values a arranged vertically with the title/label as main header view.', '3', 1, '2025-05-24 12:26:13'),
(3, 'default', 'Attribute title/label is positioned at the top of it\'s values.', '2', 1, '2025-05-24 12:40:07');

-- --------------------------------------------------------

--
-- Table structure for table `live_table`
--

CREATE TABLE `live_table` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `stream_url` text DEFAULT NULL,
  `recorded_video_url` text DEFAULT NULL,
  `is_live` tinyint(1) DEFAULT 1,
  `started_at` datetime DEFAULT current_timestamp(),
  `ended_at` datetime DEFAULT NULL,
  `viewers_count` int(11) DEFAULT 0,
  `likes_count` int(11) DEFAULT 0,
  `thumbnail_url` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `live_table`
--

INSERT INTO `live_table` (`id`, `store_id`, `product_id`, `title`, `description`, `stream_url`, `recorded_video_url`, `is_live`, `started_at`, `ended_at`, `viewers_count`, `likes_count`, `thumbnail_url`, `created_at`, `updated_at`) VALUES
(5, 2, 48, 'quality short sleeve for men drops live!', 'Exploring the new men\'s polo collection 🔥', 'https://play.video.alibaba.com/global/play/6000282226885.mp4', NULL, 1, '2025-06-12 15:49:42', NULL, 0, 0, NULL, '2025-06-12 15:49:42', '2025-06-12 15:49:42');

-- --------------------------------------------------------

--
-- Table structure for table `maincategory`
--

CREATE TABLE `maincategory` (
  `id` int(11) NOT NULL,
  `name` longtext NOT NULL,
  `image` longtext NOT NULL,
  `status` longtext NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maincategory`
--

INSERT INTO `maincategory` (`id`, `name`, `image`, `status`, `createdAt`) VALUES
(1, 'Toys & Gift Items', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724117618/tzhywz8j2znff5e00sb7.png', '1', '2025-02-08 06:04:41'),
(2, 'Sports & Outdoors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723740951/qpkfdmhtaf1evk8195nx.png', '1', '2025-02-08 06:05:24'),
(3, 'Babies, Kids & Maternity Clothing', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723552684/o9kk57xr3i16ctn15exk.png', '1', '2025-02-08 06:06:45'),
(4, 'Cameras & Photos', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723573216/hepirknrjfiai1b99s11.png', '1', '2025-02-08 06:07:22'),
(5, 'Electronics & Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723738219/uuppwoaxnaqtw1yusc7c.png', '1', '2025-02-08 06:07:55'),
(6, 'Home Textile & Sewing', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723559980/al07uhsyzyigqblq9u8a.png', '1', '2025-02-08 06:08:16'),
(7, 'Lights & Lighting Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723772291/ywssieo7ku67u48jcvnp.png', '1', '2025-02-08 06:08:39'),
(8, 'Jewelries & Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723554696/xy2szeydlwmlcwy0cq1u.png', '1', '2025-02-08 06:09:07'),
(9, 'Business & Industrial Supplies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723742878/rp6hozip8m0o24u2mcdm.png', '1', '2025-02-08 06:10:44'),
(10, 'Educational & Office Supplies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724203799/nupj31getyaxfahsveml.png', '1', '2025-02-08 06:11:19'),
(11, 'Health, Beauty and Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731080880/x32preappgaq1zrnhgcw.jpg', '1', '2025-02-08 06:11:51'),
(12, 'Wrist watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724159096/wsavvutsjlgxkm7gbvdq.png', '1', '2025-02-08 06:12:45'),
(13, 'Computer & Networking', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723512319/jn9daozdi6cgjhxwm3re.png', '1', '2025-02-08 06:13:07'),
(14, 'Bags, luggage and accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723763027/he921shznpjgalgrduml.png', '1', '2025-02-08 06:13:32'),
(15, 'Furniture & Fittings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723740465/ma1qxlkbyztyxvtzontu.png', '1', '2025-02-08 06:13:56'),
(16, 'Perfumes & Cologne', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723901443/qbpp3pvhs1r8vyqu76h8.png', '1', '2025-02-08 06:14:29'),
(17, 'Plus size fashion', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724765522/qkhulyhoixtsi7m3r56n.png', '1', '2025-02-08 06:15:35'),
(18, 'Wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726259008/y90cyz7slguqumaconcq.png', '1', '2025-02-08 06:15:57'),
(19, 'Hair, Wigs & Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723637474/mcxqq5nxc1hkah0jn4sf.png', '1', '2025-02-08 06:16:24'),
(20, 'Cap, Hats & Scarves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723903313/x6yg8d4u5gposyfhsvki.png', '1', '2025-02-08 06:16:49'),
(21, 'Eye Wares', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723739276/gk7ftkzexvr4lmwxqs3h.png', '1', '2025-02-08 06:18:16'),
(22, 'Muslim Fashion', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723555001/bcjfp67wwrguvg3uodjw.png', '1', '2025-02-08 06:19:07'),
(23, 'Games & Accessoriess', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726153941/azbaige08agks5523gnu.png', '1', '2025-02-08 06:19:33'),
(24, 'Men\'s Shoes & Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723900356/qrnuneb0tnzmdxw8naak.png', '1', '2025-02-08 06:20:00'),
(25, 'Men\'s Fashion', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723471266/jnwy2bvck7rbkjaenklg.png', '1', '2025-02-08 06:20:47'),
(26, 'Women\'s Fashion', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723659845/qq4iagrtkjpktkwlm4x7.png', '1', '2025-02-08 06:50:40'),
(27, 'Tools & Home Improvements', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723555046/y6mzfdfhfzuyxgvsqcrk.png', '1', '2025-02-08 06:51:01'),
(28, 'Arts & Crafts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723742485/btb4z5vrw6elke9hpxzs.png', '1', '2025-02-08 06:51:22'),
(29, 'Christmas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723732245/qkvjy1nm22rg0vp2dbio.png', '1', '2025-02-08 06:51:53'),
(30, 'Sexual Wellness', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723710524/w3ung2cdu26yrqzf3nci.png', '1', '2025-02-08 06:52:18'),
(31, 'Costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723746492/dm2lrz9lb9rx5my9awv6.png', '1', '2025-02-08 06:52:45'),
(32, 'Women\'s shoes & accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723900440/wg1vhn3rb9k76wbkwfnn.png', '1', '2025-02-08 06:53:03'),
(33, 'Children shoes & accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723900847/sdqmujal09zpjfbtrex2.png', '1', '2025-02-08 06:53:27'),
(34, 'Phones  & accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731668086/ohl9q8ffbgx4y5t6mvdx.png', '1', '2025-02-08 06:54:27'),
(35, 'Home decorations', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724201700/qfd1bu3ya00zjvxfsxpa.png', '1', '2025-02-08 06:54:45'),
(36, 'Gift cards', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724515018/rixvrv5jto0ptzuomftj.png', '1', '2025-02-08 06:55:02'),
(37, 'kitchen Appliances', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731385719/ul6znt68xn9i14otmwi6.png', '1', '2025-02-08 06:56:32'),
(38, 'Home Appliances and Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731064438/ieoprrow8iyhh5burrxv.jpg', '1', '2025-02-08 07:03:05'),
(39, 'Books, Movies and music', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728377322/ov853kvxrqk2hnibw5qc.jpg', '1', '2025-02-08 07:03:26'),
(40, 'Automobile, Motorcycle and Bicycle', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731081393/ug1d9cjthiym0zl67xvh.jpg', '1', '2025-02-08 07:03:46'),
(41, 'Pet Supplies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731386462/qgbr9rvrnwjz5dqgfmly.png', '1', '2025-02-08 07:04:17'),
(42, 'Cryptocurrency', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738141835/bwniyzymjtzbx21396ft.png', '1', '2025-02-08 07:04:35');

-- --------------------------------------------------------

--
-- Table structure for table `media_table`
--

CREATE TABLE `media_table` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variation_id` int(11) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL,
  `url` text NOT NULL,
  `type` enum('image','video') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media_table`
--

INSERT INTO `media_table` (`id`, `product_id`, `variation_id`, `attribute_id`, `url`, `type`, `created_at`, `updated_at`) VALUES
(17, 46, 64, 136, 'https://s.alicdn.com/@sc04/kf/H36fc389d4d724f8dbab32e47f9909ca7b.png_720x720q50.jpg', 'image', '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(19, 48, 66, 152, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1742642535/products/short_bzqyh3.jpg', 'image', '2025-05-29 19:17:09', '2025-05-29 19:17:09'),
(20, 49, 67, 159, 'https://i.ebayimg.com/images/g/U~wAAOSwAIFniLms/s-l1600.webp', 'image', '2025-06-09 13:19:52', '2025-06-09 13:19:52'),
(21, 50, 68, 160, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1742617673/products/ts_zylmhl.jpg', 'image', '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(22, 50, 68, 161, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1742617673/products/ts3_cl0lhj.jpg', 'image', '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(23, 50, 68, 162, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1742617672/products/ts1_bpubvl.jpg', 'image', '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(36, 54, 72, 206, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1741275563/products/clothe_green_aaqoz5.png', 'image', '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(37, 54, 72, 207, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1741275563/products/clothe_grey_arpyij.png', 'image', '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(38, 54, 72, 208, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1741275567/products/clothe_blue_ngkqfh.png', 'image', '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(39, 54, 72, 209, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1741275564/products/clothe_red_m8fswy.png', 'image', '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(42, 56, 74, 228, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1742617231/products/slv2_yalsde.jpg', 'image', '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(43, 56, 74, 229, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1742617231/products/slv1_x9cide.jpg', 'image', '2025-06-15 22:18:52', '2025-06-15 22:18:52');

-- --------------------------------------------------------

--
-- Table structure for table `orders_table`
--

CREATE TABLE `orders_table` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `logistic_id` int(11) NOT NULL,
  `delivery_address` int(11) NOT NULL,
  `order_status` enum('pending','processing','completed','cancelled','refunded') NOT NULL DEFAULT 'pending',
  `order_ref` varchar(100) NOT NULL,
  `tracking_id` varchar(100) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `delivery_status` enum('pending','shipped','delivered','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders_table`
--

INSERT INTO `orders_table` (`id`, `user_id`, `logistic_id`, `delivery_address`, `order_status`, `order_ref`, `tracking_id`, `total_amount`, `payment_status`, `delivery_status`, `created_at`, `updated_at`) VALUES
(47, 3, 3, 7, 'pending', 'sad4lz8slceaq6z', 'TRK-7e4b6268-5f2d-4249-be84-a024f385c6b1', '29.00', 'paid', 'pending', '2025-06-07 05:49:33', '2025-06-07 05:49:33'),
(48, 3, 3, 7, 'pending', 'xg6595fx2otve77', 'TRK-b321ae69-93cc-4e64-90d1-d79245ac5af5', '422.00', 'paid', 'pending', '2025-06-07 23:12:45', '2025-06-07 23:12:45'),
(49, 3, 3, 7, 'pending', '1k089xgrwt64t7m', 'TRK-83336878-6060-4f39-b41e-9b8c0e37f2d2', '28.00', 'paid', 'pending', '2025-06-11 19:05:28', '2025-06-11 19:05:28'),
(50, 3, 3, 7, 'pending', 'k0sbrq98fb5bdqp', 'TRK-b6aecefd-74da-4b47-85cb-a69dd9eceac3', '133.00', 'paid', 'pending', '2025-06-15 22:34:16', '2025-06-15 22:34:16');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variation_id` int(11) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `is_sample` tinyint(4) DEFAULT 0,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `store_id`, `product_id`, `variation_id`, `sku`, `color`, `size`, `quantity`, `is_sample`, `price`) VALUES
(79, 47, 2, 48, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', NULL, NULL, 1, 0, '16.04'),
(80, 48, 2, 48, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', NULL, NULL, 2, 0, '14.70'),
(81, 48, 2, 48, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', NULL, NULL, 2, 0, '16.46'),
(82, 49, 2, 48, 66, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', NULL, NULL, 1, 0, '14.70'),
(83, 50, 2, 56, 74, '635-CLASSI-WHI-GRA-S-M-L-XXL-100-RAY-VIS-SPA-9504', NULL, NULL, 3, 0, '28.11');

-- --------------------------------------------------------

--
-- Table structure for table `order_item_attributes`
--

CREATE TABLE `order_item_attributes` (
  `id` int(11) NOT NULL,
  `order_item_id` int(11) NOT NULL,
  `attribute_name` varchar(100) NOT NULL,
  `attribute_value` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_item_attributes`
--

INSERT INTO `order_item_attributes` (`id`, `order_item_id`, `attribute_name`, `attribute_value`, `created_at`, `updated_at`) VALUES
(231, 79, 'color', 'green', '2025-06-07 05:49:34', '2025-06-07 05:49:34'),
(232, 79, 'size', 'm', '2025-06-07 05:49:34', '2025-06-07 05:49:34'),
(233, 79, 'materia type', 'ankara', '2025-06-07 05:49:34', '2025-06-07 05:49:34'),
(234, 80, 'color', 'white', '2025-06-07 23:12:45', '2025-06-07 23:12:45'),
(235, 80, 'size', 'm', '2025-06-07 23:12:45', '2025-06-07 23:12:45'),
(236, 80, 'materia type', 'ankara', '2025-06-07 23:12:45', '2025-06-07 23:12:45'),
(237, 81, 'color', 'white', '2025-06-07 23:12:47', '2025-06-07 23:12:47'),
(238, 81, 'size', 'm', '2025-06-07 23:12:47', '2025-06-07 23:12:47'),
(239, 81, 'materia type', 'chekas', '2025-06-07 23:12:47', '2025-06-07 23:12:47'),
(240, 82, 'color', 'white', '2025-06-11 19:05:28', '2025-06-11 19:05:28'),
(241, 82, 'size', 'm', '2025-06-11 19:05:28', '2025-06-11 19:05:28'),
(242, 82, 'materia type', 'ankara', '2025-06-11 19:05:28', '2025-06-11 19:05:28'),
(243, 83, 'color', 'white', '2025-06-15 22:34:17', '2025-06-15 22:34:17'),
(244, 83, 'size', 'm', '2025-06-15 22:34:18', '2025-06-15 22:34:18'),
(245, 83, 'materia', '100% cotton', '2025-06-15 22:34:18', '2025-06-15 22:34:18');

-- --------------------------------------------------------

--
-- Table structure for table `payment_gateways`
--

CREATE TABLE `payment_gateways` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `provider` varchar(100) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `sandbox_mode` tinyint(1) DEFAULT 0,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`config`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `payment_gateways`
--

INSERT INTO `payment_gateways` (`id`, `name`, `logo`, `provider`, `is_active`, `sandbox_mode`, `config`, `created_at`, `updated_at`) VALUES
(1, 'card', 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747201334/logos/pngfind.com-credit-png-4153789_uljj4c.png', 'Paystack', 1, 1, '{\"secret_key\":\"sk_test_abc\",\"public_key\":\"pk_test_xyz\",\"webhook_secret\":\"whsec_123\"}', '2025-05-09 05:51:48', '2025-05-14 11:04:35'),
(2, 'paypal', 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747201337/logos/paypal-3384015_1280_jyn1pk.png', 'Paypal', 0, 1, '{\"secret_key\":\"pp_test_abc\",\"public_key\":\"pp_test_xyz\",\"webhook_secret\":\"whsec_456\"}', '2025-05-14 16:15:09', '2025-05-14 16:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `products_table`
--

CREATE TABLE `products_table` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `description` longtext NOT NULL,
  `customizable` tinyint(1) NOT NULL DEFAULT 0,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `weight` decimal(10,2) DEFAULT 0.00,
  `stock` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products_table`
--

INSERT INTO `products_table` (`id`, `store_id`, `subcategory_id`, `collection_id`, `product_code`, `name`, `description`, `customizable`, `price`, `discount`, `weight`, `stock`, `status`, `created_at`, `updated_at`) VALUES
(46, 3, 1166, 10, '70c18228-b6c0-4a53-a2f8-65d25119bb9d', 'Intel Core I9-12900H RTX4060/4090 8GB Dedicated Graphics 165Hz Screen DDR5RAM Gaming Laptop PC Portable Computer Notebook', 'High Performance]Dive into unparalleled performance with the HP Victus Gaming Laptop, driven by the mighty Intel Core i7-13700HX(featuring 16 cores, 24 threads, up to 5 GHz) processor.\n\nThis high-performance CPU delivers exceptional speed and responsiveness, making it ideal for demanding gaming, content creation, and multitasking scenarios.', 0, '68.00', '8.00', '3.11', 200, 1, '2025-05-29 17:53:46', '2025-06-09 19:37:21'),
(48, 2, 619, 2, '41fa16ba-abbf-4f25-b087-9d92fa850142', 'Men\'s Graphic Print Short Sleeve T-Shirt & Shorts Set', 'Upgrade your casual style with this premium men\'s short-sleeve T-shirt and shorts set. Designed for comfort and versatility, this set features a stylish graphic print with a relaxed fit, perfect for lounging or casual outings.', 1, '14.70', '0.00', '1.11', 500, 1, '2025-05-29 19:16:26', '2025-05-29 20:51:09'),
(49, 3, 1166, 11, '68c4c78d-cabe-4f72-8374-b0375566e01f', 'ASUS TUF Gaming Laptop (Model TS) - Intel Core i7/AMD Ryzen 7 | NVIDIA RTX 40 Series | 144Hz Display | DDR5 RAM | RGB Backlit Keyboard', 'Military-grade durability meets elite gaming performance with the ASUS TUF Gaming Laptop. Featuring up to Intel Core i7-13650HX or AMD Ryzen 7 7735HS processor, NVIDIA GeForce RTX 4050/4060 graphics, and a high-refresh rate display for ultra-smooth gameplay. TUF\'s signature robust chassis houses intelligent cooling technology for sustained performance during marathon sessions.', 0, '899.00', '12.00', '2.30', 150, 1, '2025-06-09 13:14:28', '2025-06-09 13:14:28'),
(50, 2, 620, 12, '2b5a06c1-2037-4acf-b0a7-b4be6d834a18', 'Men\'s Premium Cotton Sweatshirt & Jogger Set', 'Ultra-soft cotton-blend sweatshirt and matching joggers. Designed for comfort and style, ideal for lounging or workouts. Machine washable.', 0, '34.10', '15.00', '0.85', 200, 1, '2025-06-15 08:22:52', '2025-06-15 08:22:52'),
(54, 2, 592, 13, 'd36d6e25-25dd-4600-b39d-723b4c31466b', 'Men\'s Classic Cotton Polo Shirt', 'Stylish and comfortable men\'s polo shirt in different colors. Features a two-button placket, ribbed collar and sleeves with contrast stripe detail. Perfect for casual outings or semi-formal occasions. Breathable cotton fabric keeps you cool all day.', 1, '18.75', '10.00', '0.35', 150, 1, '2025-06-15 21:17:27', '2025-06-15 21:17:27'),
(56, 2, 635, 14, '7a506a7e-a4a2-4ea1-b918-8c98cfd81b4e', 'Classic V-Neck Unisex Sleeveless', 'Soft, breathable V-neck tank top perfect for layering or wearing solo. Lightweight and smooth finish for all-day comfort.', 0, '28.11', '4.00', '0.50', 100, 1, '2025-06-15 22:18:35', '2025-06-15 22:18:35');

-- --------------------------------------------------------

--
-- Table structure for table `product_filters`
--

CREATE TABLE `product_filters` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `filter_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_moq`
--

CREATE TABLE `product_moq` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `min_qty` int(11) NOT NULL,
  `ppu` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_moq`
--

INSERT INTO `product_moq` (`id`, `product_id`, `min_qty`, `ppu`, `created_at`, `updated_at`) VALUES
(121, 46, 4, '65.89', '2025-05-29 17:53:46', '2025-05-29 17:53:46'),
(122, 46, 10, '52.70', '2025-05-29 17:53:46', '2025-05-29 17:53:46'),
(123, 46, 20, '44.99', '2025-05-29 17:53:46', '2025-05-29 17:53:46'),
(127, 48, 5, '9.24', '2025-05-29 19:16:26', '2025-05-29 19:16:26'),
(128, 48, 10, '7.05', '2025-05-29 19:16:26', '2025-05-29 19:16:26'),
(129, 48, 20, '5.99', '2025-05-29 19:16:26', '2025-05-29 19:16:26'),
(130, 49, 5, '849.00', '2025-06-09 13:14:29', '2025-06-09 13:14:29'),
(131, 49, 10, '799.00', '2025-06-09 13:14:30', '2025-06-09 13:14:30'),
(132, 49, 20, '749.00', '2025-06-09 13:14:31', '2025-06-09 13:14:31'),
(133, 50, 5, '20.37', '2025-06-15 08:22:53', '2025-06-15 15:28:02'),
(134, 50, 10, '22.05', '2025-06-15 08:22:53', '2025-06-15 08:22:53'),
(135, 50, 20, '17.99', '2025-06-15 08:22:53', '2025-06-15 08:22:53'),
(145, 54, 5, '19.50', '2025-06-15 21:17:28', '2025-06-15 21:17:28'),
(146, 54, 10, '16.20', '2025-06-15 21:17:29', '2025-06-15 21:17:29'),
(147, 54, 25, '13.80', '2025-06-15 21:17:29', '2025-06-15 21:17:29'),
(151, 56, 10, '20.90', '2025-06-15 22:18:35', '2025-06-15 22:18:35'),
(152, 56, 50, '16.20', '2025-06-15 22:18:35', '2025-06-15 22:18:35'),
(153, 56, 100, '14.99', '2025-06-15 22:18:35', '2025-06-15 22:18:35');

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` decimal(2,1) NOT NULL CHECK (`rating` between 1.0 and 5.0),
  `review_text` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `user_ip` varchar(45) DEFAULT NULL,
  `modified_by_admin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_sample`
--

CREATE TABLE `product_sample` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `ppu` decimal(10,2) NOT NULL,
  `min_qty` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_sample`
--

INSERT INTO `product_sample` (`id`, `store_id`, `product_id`, `ppu`, `min_qty`, `created_at`, `updated_at`) VALUES
(13, 3, 46, '100.12', 1, '2025-05-29 17:53:46', '2025-05-29 17:53:46'),
(15, 2, 48, '48.99', 1, '2025-05-29 19:16:26', '2025-05-29 19:16:26'),
(16, 3, 49, '949.00', 1, '2025-06-09 13:14:29', '2025-06-09 13:14:29'),
(17, 2, 50, '55.39', 3, '2025-06-15 08:22:52', '2025-06-15 08:22:52'),
(21, 2, 54, '22.90', 2, '2025-06-15 21:17:28', '2025-06-15 21:17:28'),
(23, 2, 56, '47.20', 1, '2025-06-15 22:18:35', '2025-06-15 22:18:35');

-- --------------------------------------------------------

--
-- Table structure for table `product_specifications`
--

CREATE TABLE `product_specifications` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_specifications`
--

INSERT INTO `product_specifications` (`id`, `product_id`, `name`, `value`, `created_at`) VALUES
(422, 46, 'display ratio', '16:09', '2025-05-29 17:53:46'),
(423, 46, 'display resolution', '1920 x 1080', '2025-05-29 17:53:46'),
(424, 46, 'port', 'HDMI', '2025-05-29 17:53:46'),
(425, 46, 'hard drive type', 'SSD', '2025-05-29 17:53:46'),
(426, 46, 'operating system', 'windows 11 pro', '2025-05-29 17:53:46'),
(427, 46, 'processor main frequency', '4.7 GHz', '2025-05-29 17:53:46'),
(428, 46, 'screen size', '15.6', '2025-05-29 17:53:46'),
(429, 46, 'graphics card brand', 'Intel', '2025-05-29 17:53:46'),
(430, 46, 'processor type', 'Intel I7', '2025-05-29 17:53:46'),
(431, 46, 'panel type', 'IPS', '2025-05-29 17:53:46'),
(432, 46, 'processor core', '12 Core', '2025-05-29 17:53:46'),
(433, 46, 'WLAN', 'WiFi 802.11', '2025-05-29 17:53:46'),
(434, 46, 'refresh rate', '60HZ', '2025-05-29 17:53:46'),
(435, 46, 'brand name', 'HP', '2025-05-29 17:53:46'),
(445, 48, 'Material', 'Polyester & Cotton Blend', '2025-05-29 19:16:26'),
(446, 48, 'Fit', 'Regular Fit', '2025-05-29 19:16:26'),
(447, 48, 'Sleeve Length', 'Short Sleeve', '2025-05-29 19:16:26'),
(448, 48, 'Collar Type', 'Round Neck', '2025-05-29 19:16:26'),
(449, 48, 'Pattern', 'Graphic Print', '2025-05-29 19:16:26'),
(450, 48, 'Closure Type', 'Elastic Waistband with Drawstring', '2025-05-29 19:16:26'),
(451, 48, 'Fabric Care', 'Machine Washable', '2025-05-29 19:16:26'),
(452, 48, 'Available Sizes', 'M, L, XL', '2025-05-29 19:16:26'),
(453, 48, 'Available Colors', 'white, green', '2025-05-29 19:16:26'),
(454, 49, 'brand', 'ASUS', '2025-06-09 13:14:31'),
(455, 49, 'series', 'TUF Gaming TS', '2025-06-09 13:14:32'),
(456, 49, 'processor', 'Intel Core i7-13650HX (up to 4.9GHz) / AMD Ryzen 7 7735HS', '2025-06-09 13:14:32'),
(457, 49, 'graphics', 'NVIDIA GeForce RTX 4050/4060 (6GB GDDR6)', '2025-06-09 13:14:32'),
(458, 49, 'display', '15.6\" FHD (1920x1080) IPS-level, 144Hz', '2025-06-09 13:14:32'),
(459, 49, 'memory', '16GB DDR5 4800MHz (Expandable to 32GB)', '2025-06-09 13:14:32'),
(460, 49, 'storage', '512GB PCIe NVMe SSD (1x M.2 Slot available)', '2025-06-09 13:14:32'),
(461, 49, 'keyboard', 'RGB Backlit, 1.7mm key travel', '2025-06-09 13:14:32'),
(462, 49, 'cooling', 'Arc Flow Fans with Anti-Dust Technology', '2025-06-09 13:14:32'),
(463, 49, 'ports', '1x USB 3.2 Type-C, 2x USB 3.2 Type-A, 1x HDMI 2.1, 1x RJ45', '2025-06-09 13:14:32'),
(464, 49, 'wireless', 'Wi-Fi 6 (802.11ax) + Bluetooth 5.2', '2025-06-09 13:14:32'),
(465, 49, 'battery', '90WHr, up to 6 hours', '2025-06-09 13:14:32'),
(466, 49, 'os', 'Windows 11 Home', '2025-06-09 13:14:32'),
(467, 49, 'dimensions', '35.4 x 25.1 x 2.24 ~ 2.49 cm', '2025-06-09 13:14:32'),
(468, 49, 'color', 'Metal Black', '2025-06-09 13:14:32'),
(469, 49, 'military_standard', 'MIL-STD-810H compliant', '2025-06-09 13:14:32'),
(470, 50, 'Fit Type', 'Regular Fit', '2025-06-15 08:22:53'),
(471, 50, 'Set Includes', '1 Crewneck Sweatshirt + 1 Jogger Pants', '2025-06-15 08:22:53'),
(472, 50, 'Care Instructions', 'Machine wash cold, tumble dry low', '2025-06-15 08:22:53'),
(491, 54, 'Material', '100% Cotton', '2025-06-15 21:17:29'),
(492, 54, 'Fit Type', 'Regular Fit', '2025-06-15 21:17:31'),
(493, 54, 'Sleeve', 'Short Sleeve', '2025-06-15 21:17:31'),
(494, 54, 'Closure', 'Two-Button Placket', '2025-06-15 21:17:31'),
(495, 54, 'Collar', 'Ribbed Collar with Contrast Stripe', '2025-06-15 21:17:31'),
(496, 54, 'Care Instructions', 'Machine wash cold, do not bleach, tumble dry low', '2025-06-15 21:17:31'),
(505, 56, 'Material', '100% Polyester', '2025-06-15 22:18:35'),
(506, 56, 'Fit Type', 'Loose Fit', '2025-06-15 22:18:35'),
(507, 56, 'Sleeve', 'Sleeveless', '2025-06-15 22:18:35'),
(508, 56, 'Neck', 'V-Neck', '2025-06-15 22:18:35'),
(509, 56, 'Gender', 'Unisex', '2025-06-15 22:18:35'),
(510, 56, 'Style', 'Casual / Minimalist', '2025-06-15 22:18:35'),
(511, 56, 'Fabric Properties', 'Lightweight, Breathable, Quick-Dry', '2025-06-15 22:18:35'),
(512, 56, 'Care Instructions', 'Machine wash cold, hang dry, do not bleach', '2025-06-15 22:18:35');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_methods`
--

INSERT INTO `shipping_methods` (`id`, `name`, `description`, `icon`, `status`, `created_at`) VALUES
(1, 'ocean', 'shipping products through the sea route', 'ship', 1, '2025-03-31 12:31:58'),
(2, 'express', 'shipping products using motorable routes', 'shipping-fast', 1, '2025-03-31 12:32:21'),
(3, 'air freight', 'shipping products using motorable routes', 'plane', 1, '2025-03-31 12:32:32');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_providers`
--

CREATE TABLE `shipping_providers` (
  `id` int(11) NOT NULL,
  `method_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration_from` int(11) NOT NULL,
  `duration_to` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `offered_by` varchar(255) NOT NULL,
  `notice` varchar(255) NOT NULL,
  `is_guaranteed` tinyint(1) DEFAULT 0,
  `price` decimal(10,2) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_providers`
--

INSERT INTO `shipping_providers` (`id`, `method_id`, `name`, `duration_from`, `duration_to`, `class`, `offered_by`, `notice`, `is_guaranteed`, `price`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'mashal sea ltd', 60, 90, 0, 'mashal sea ltd', '', 0, '18.00', 1, '2025-03-31 11:26:10', '2025-03-31 11:26:10'),
(2, 2, 'royal zeal limited', 10, 25, 1, 'bloomzon.com', '', 1, '15.30', 1, '2025-03-31 11:39:22', '2025-03-31 11:39:22'),
(3, 2, 'solid space', 5, 12, 0, 'bloomzon.com', '', 0, '12.10', 1, '2025-03-31 11:55:50', '2025-03-31 11:55:50'),
(4, 3, 'air man', 1, 6, 2, 'bloomzon.com', '', 1, '30.70', 1, '2025-03-31 11:59:38', '2025-03-31 11:59:38'),
(5, 3, 'lite flight groups', 3, 10, 2, 'lite flight groups', '', 1, '27.95', 1, '2025-03-31 12:02:13', '2025-03-31 12:02:13');

-- --------------------------------------------------------

--
-- Table structure for table `stores_table`
--

CREATE TABLE `stores_table` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `country` varchar(100) NOT NULL,
  `banner` text DEFAULT NULL,
  `picture` text DEFAULT NULL,
  `net_worth` int(11) NOT NULL DEFAULT 0,
  `logo` text DEFAULT NULL,
  `wallet` longtext NOT NULL,
  `staff_count` int(11) DEFAULT 0,
  `address` varchar(255) NOT NULL,
  `floor_space` int(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `verified_date` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores_table`
--

INSERT INTO `stores_table` (`id`, `vendor_id`, `name`, `slogan`, `country`, `banner`, `picture`, `net_worth`, `logo`, `wallet`, `staff_count`, `address`, `floor_space`, `code`, `is_verified`, `verified_date`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 'Fashion Allien global LTD', 'Fashion with store steez', 'ng', 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1679748366/samples/imagecon-group.jpg', 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1679748383/cld-sample-5.jpg', 544721, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1737541386/logos/Blue_And_Orange_Modern_Company_design_Logo_slenmg.png', '', 133, 'No 344B fashion line, lekki, lagos', 1400, '9aa07eab-ec48-4fcc-9fc7-f6208bb71236', 1, '2023-12-03 14:40:10', 1, '2025-03-21 12:18:46', '2025-03-31 16:12:28'),
(3, 1, 'Matt Zhang Electronics', 'For your quality home and office appliances', 'ng', 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1679748361/samples/bike.jpg', 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1679748358/samples/people/kitchen-bar.jpg', 4771459, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1737541018/logos/2_tqjfvc.png', '', 300, 'No 222 shenzhen avenu, Abuja', 2200, '4fd6e889-1bd5-4285-a4ff-b9934cd0c210', 1, '2025-10-22 13:29:37', 1, '2025-03-22 13:24:28', '2025-05-22 11:48:23');

-- --------------------------------------------------------

--
-- Table structure for table `store_capabilities`
--

CREATE TABLE `store_capabilities` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `capability_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store_capabilities`
--

INSERT INTO `store_capabilities` (`id`, `store_id`, `capability_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2025-03-21 12:18:46', '2025-03-21 12:18:46'),
(2, 2, 2, '2025-03-21 12:18:46', '2025-03-21 12:18:46'),
(3, 3, 3, '2025-03-22 13:24:29', '2025-03-22 13:24:29'),
(4, 3, 5, '2025-03-22 13:24:29', '2025-03-22 13:24:29'),
(5, 3, 6, '2025-03-22 13:24:29', '2025-03-22 13:24:29');

-- --------------------------------------------------------

--
-- Table structure for table `store_gallery`
--

CREATE TABLE `store_gallery` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `url` text NOT NULL,
  `type` enum('image','video') NOT NULL,
  `position` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_gallery`
--

INSERT INTO `store_gallery` (`id`, `store_id`, `url`, `type`, `position`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 2, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747601342/gallery/image-from-rawpixel-id-13066586-jpeg_epnez7.jpg', 'image', 'slide', 'Production room', 'Overview of our production space', '2025-05-18 08:52:37', '2025-05-18 20:50:34'),
(2, 2, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747601386/gallery/image-from-rawpixel-id-11987457-jpeg_kbr8sc.jpg', 'image', 'slide', 'Production room', 'Overview of our production space', '2025-05-18 20:51:54', '2025-05-18 20:51:54'),
(3, 2, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747633102/gallery/image-from-rawpixel-id-13830810-jpeg_qjtxgs.jpg', 'image', 'slide', 'The production team manager', 'Meet the team leader', '2025-05-19 05:42:20', '2025-05-19 05:42:20'),
(4, 2, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747633092/gallery/image-from-rawpixel-id-3306805-jpeg_qkbahv.jpg', 'image', 'slide', 'The 2 of 5 product storage space', 'our product warehouse', '2025-05-19 05:44:03', '2025-05-19 05:44:03'),
(5, 2, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747633933/gallery/image-from-rawpixel-id-13831632-jpeg_v1nwrs.jpg', 'image', 'slide', 'Product packaging process', 'our product warehouse', '2025-05-19 05:50:39', '2025-05-19 05:54:45'),
(6, 2, 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1747634899/gallery/image-from-rawpixel-id-13828776-jpeg_mmxl6f.jpg', 'image', 'slide', 'Products ready for shipping', 'packaged products', '2025-05-19 06:11:19', '2025-05-19 06:11:19');

-- --------------------------------------------------------

--
-- Table structure for table `store_reviews`
--

CREATE TABLE `store_reviews` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` decimal(2,1) NOT NULL CHECK (`rating` between 1.0 and 5.0),
  `product_quality` tinyint(1) DEFAULT NULL,
  `supplier_service` tinyint(1) DEFAULT NULL,
  `on_time_shipment` tinyint(1) DEFAULT NULL,
  `review_text` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `user_ip` varchar(45) DEFAULT NULL,
  `modified_by_admin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store_reviews`
--

INSERT INTO `store_reviews` (`id`, `store_id`, `user_id`, `rating`, `product_quality`, `supplier_service`, `on_time_shipment`, `review_text`, `status`, `user_ip`, `modified_by_admin`, `created_at`, `updated_at`) VALUES
(1, 2, 2, '4.5', 5, 5, 5, 'Great quality products and fast shipping. Customer service was helpful.', 1, '::1', 0, '2025-03-30 12:03:19', '2025-03-30 12:03:19'),
(2, 2, 3, '2.6', 3, 3, 2, 'Seller doent\'t deliver on time.', 1, '::1', 0, '2025-03-30 12:08:18', '2025-03-30 12:08:18');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `_category` int(11) DEFAULT NULL,
  `_name` longtext NOT NULL,
  `_image` longtext NOT NULL,
  `_status` longtext NOT NULL,
  `_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `_category`, `_name`, `_image`, `_status`, `_date`) VALUES
(1, 1, 'Educational Toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728385704/fon4vudxymqquqrhibe0.jpg', '1', '2025-02-10 05:37:54'),
(2, 1, 'Stem toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728385729/be19ifo1kmlrzhhnohow.jpg', '1', '2025-02-10 05:40:26'),
(3, 1, 'Puzzle games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728385753/zesyx2kmcqcte2tjysgl.jpg', '1', '2025-02-10 05:40:48'),
(4, 1, 'Learning Tablets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728385784/peoxq7x671ymgwmxavtp.jpg', '1', '2025-02-10 05:41:05'),
(5, 1, 'Building blocks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728385836/b7gvzirrobzdjznaftk9.jpg', '1', '2025-02-10 05:41:22'),
(6, 2, 'Superhero Action figures', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728400777/gw2dedkajrrwif4jatsj.jpg', '1', '2025-02-10 06:13:55'),
(7, 2, 'Movies collectibles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728400227/oswhtmjdnfw6pqxoannv.jpg', '1', '2025-02-10 06:14:16'),
(8, 2, 'Animie figures', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728400280/xobnhdwuwyetc5juxh4o.jpg', '1', '2025-02-10 06:14:36'),
(9, 3, 'Fashion Dolls', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477126/mmffmecoxv83bwptht46.jpg', '1', '2025-02-10 06:19:03'),
(10, 3, 'Doll house', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477148/imklvhi9a0hesoxpn5di.jpg', '1', '2025-02-10 06:24:54'),
(11, 3, 'Doll clothing and accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477176/va1wi1r1vlq7dxxwopla.jpg', '1', '2025-02-10 06:25:22'),
(12, 3, 'Baby Dolls', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477201/pjyaerv0wojoasjxvwwi.jpg', '1', '2025-02-10 06:25:44'),
(13, 4, 'Bicycles and scooters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477665/fvphjjldy7fyxawxzgqp.jpg', '1', '2025-02-10 06:30:38'),
(14, 4, 'Sand and water bow', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477690/etnchsj9mjg322qrelz6.jpg', '1', '2025-02-10 06:41:44'),
(15, 4, 'Trampolines', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477761/kwtppna9ohzmytxgflvr.jpg', '1', '2025-02-10 06:46:19'),
(16, 4, 'Playhouses and tents', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728477793/fyvibvarnkmfmchhxonl.jpg', '1', '2025-02-10 06:46:41'),
(17, 5, 'Robots and Drones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728489249/mokuj69otb7gdbepmlbb.jpg', '1', '2025-02-10 06:48:32'),
(18, 5, 'Romote control and cars', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728551749/q3crjyrka2nzq10jacij.jpg', '1', '2025-02-10 06:49:29'),
(19, 5, 'Interactive pets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728551788/ao7ncjnphdth5vsnmhwf.jpg', '1', '2025-02-10 06:49:53'),
(20, 5, 'Light and sound toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728551897/ohpdbt4w8ywc6k7cfu6z.jpg', '1', '2025-02-10 06:50:14'),
(21, 6, 'Animal plush toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728552517/jbuvskrr7cwrnvuqiz1t.jpg', '1', '2025-02-10 06:54:02'),
(22, 6, 'Teddy Bears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728552463/tfx8mcvn4cf4zo4w8ga6.jpg', '1', '2025-02-10 06:54:21'),
(23, 6, 'Character plushes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728552552/pzmbohztzq0k2c8ghcoh.jpg', '1', '2025-02-10 06:54:38'),
(24, 6, 'Giant plush toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728552586/riohzutikipcfzyxqjcv.jpg', '1', '2025-02-10 06:54:58'),
(25, 7, 'Board Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728568013/pujqnow6ewlyz3v02gzs.jpg', '1', '2025-02-10 07:01:05'),
(26, 7, 'Strategy Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728568054/bqoher2qrnrkp62hm9lt.jpg', '1', '2025-02-10 07:02:34'),
(27, 7, 'Family Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728568089/sultu5r4jf78iqpbtfvb.jpg', '1', '2025-02-10 07:03:03'),
(28, 7, 'Party games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728572719/vwtnjlpqlmqzpedkbsw3.jpg', '1', '2025-02-10 07:03:22'),
(29, 7, 'Classic Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728572767/sbllfukjwrjigfullb9t.jpg', '1', '2025-02-10 07:03:40'),
(30, 8, 'Traditional card games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728572835/rcuaoqtlwm729hfp1zyj.jpg', '1', '2025-02-10 07:04:44'),
(31, 8, 'Collective card games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728572865/gseqnqtvq7wk4uipdarg.jpg', '1', '2025-02-10 07:14:18'),
(32, 8, 'Party card games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728572896/szsrnedcxk84rurucgx0.jpg', '1', '2025-02-10 07:14:35'),
(33, 8, 'Educational card games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728572924/shzwk92swgovgkvirsx9.jpg', '1', '2025-02-10 07:15:00'),
(34, 9, 'Jigsaw puzzle', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728573117/dggu6zfwytj3m8qmbgpn.jpg', '1', '2025-02-10 10:46:17'),
(35, 9, '3D puzzle', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728573220/xrrimybdewkiefic6lm2.jpg', '1', '2025-02-10 10:46:17'),
(36, 9, 'Brain teaser', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728573847/dz4mobodiidwfkcthzag.png', '1', '2025-02-10 10:46:17'),
(37, 9, 'Wooden puzzles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574114/agcqwosq8rsihcwsmjcn.jpg', '1', '2025-02-10 10:46:17'),
(38, 10, 'Handheld electronic Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574231/g8j4yotvqhhn6nbpwequ.jpg', '1', '2025-02-10 10:48:52'),
(39, 10, 'Interactive gaming console', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574489/wgrnrnadtso5faiksjsn.jpg', '1', '2025-02-10 10:48:52'),
(40, 10, 'Learning Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574517/h6wh7vz1ag8njabpkm0v.jpg', '1', '2025-02-10 10:48:52'),
(41, 11, 'Birthday Gifts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574574/lf97t2e8sgauwm3nxpee.jpg', '1', '2025-02-10 10:52:50'),
(42, 11, 'Age specific Gifts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574621/h6cgxey9xmm2l2temeim.jpg', '1', '2025-02-10 10:52:50'),
(43, 11, 'DIY craft kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574644/vgyvdmeg5x4adamgjfsf.jpg', '1', '2025-02-10 10:52:50'),
(44, 11, 'Personalized Gifts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728574706/p7oblm1ar4odi3lxndpq.jpg', '1', '2025-02-10 10:52:50'),
(45, 12, 'Holidays Gift sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728650286/sz4vrwrncxfvevtqky7a.jpg', '1', '2025-02-10 10:56:11'),
(46, 12, 'Advent calendar', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728650393/t5razy4l6nnyy7ctvigb.jpg', '1', '2025-02-10 10:56:12'),
(47, 12, 'Easter Toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728650432/djadlrcjvx2qaoohyqmx.jpg', '1', '2025-02-10 10:56:12'),
(48, 12, 'Halloween Toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728650884/znveuujcinnsbxu3a1vo.jpg', '1', '2025-02-10 10:56:12'),
(49, 13, 'Memory Books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728653586/vgcoh9z367awm6r3wv13.jpg', '1', '2025-02-10 10:57:21'),
(50, 13, 'Personalized toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728653649/n48iboucsha25oroqlm0.jpg', '1', '2025-02-10 10:57:21'),
(51, 13, 'Handprints kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728653689/akd8veby5cezr0jxehun.jpg', '1', '2025-02-10 10:57:21'),
(52, 14, 'Personalized Gifts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728653794/djzmnurmj5medupsdkhj.jpg', '1', '2025-02-10 11:06:26'),
(53, 14, 'Custom Jewelry', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728655262/pu6hzrqhayasxey2wvbf.jpg', '1', '2025-02-10 11:06:26'),
(54, 14, 'Engraved items', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728655297/gghfwaf7geoqg5b1qylh.jpg', '1', '2025-02-10 11:06:27'),
(55, 14, 'Personalized mugs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728655346/qbtb7scpocduebxrdnrh.jpg', '1', '2025-02-10 11:06:27'),
(56, 14, 'Customized wall Art', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728655383/vxq1iezxcex1zzzjgmx1.jpg', '1', '2025-02-10 11:06:27'),
(57, 15, 'Funny Mugs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728656355/hfybndv3wj4zaefcs1ww.jpg', '1', '2025-02-10 11:08:16'),
(58, 15, 'Quirky T-Shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728656393/attqebtwkdurh5mwtdfr.jpg', '1', '2025-02-10 11:08:16'),
(59, 15, 'Crag Gifts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728656489/se3mmi1bbrjk07ypzpwk.jpg', '1', '2025-02-10 11:08:16'),
(60, 15, 'Pop culture Merchandise', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728656541/vbg0cz33lcintqzivw5n.jpg', '1', '2025-02-10 11:08:16'),
(61, 16, 'Skin care sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728656604/mbmg9rtp2ajzfratk4dm.jpg', '1', '2025-02-10 11:09:37'),
(62, 16, 'Perfume set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728656701/xlif3k2wnse0ygxkbl7k.jpg', '1', '2025-02-10 11:09:37'),
(63, 16, 'Makeup Gift Boxes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728656749/r697mphrgyby15u3dzb1.jpg', '1', '2025-02-10 11:09:37'),
(64, 17, 'Tea and coffee sampler', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728657050/uy3zgpcpdf6ngosneopd.jpg', '1', '2025-02-10 11:12:27'),
(65, 17, 'Wine and cheese basket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728657083/b72ewshzjop5abloeya4.jpg', '1', '2025-02-10 11:12:27'),
(66, 17, 'Snack boxes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728662182/tatmv5o52bluhwinnyy5.jpg', '1', '2025-02-10 11:12:27'),
(67, 17, 'Gourmet chocolate', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728897079/nquyywfzijp9ozewyzkh.jpg', '1', '2025-02-10 11:12:27'),
(68, 17, 'DIY Gift kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728897157/nx5eht4qlotpo4ly4f5p.jpg', '1', '2025-02-10 11:12:27'),
(69, 18, 'Craft kit', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728897252/rdoh6v15n0wsu1uvjbms.jpg', '1', '2025-02-10 11:14:00'),
(70, 18, 'Cooking kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728897328/ewzorqcvfxwdyr29slot.jpg', '1', '2025-02-10 11:14:00'),
(71, 18, 'DIY home decor kit', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728897367/qr5nuss56dfib4ma64ht.jpg', '1', '2025-02-10 11:14:01'),
(72, 19, 'Birthday party supplies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728898197/bycea6azmgmeauzxchlp.jpg', '1', '2025-02-10 11:15:31'),
(73, 19, 'Party facors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728898232/palodomzq9wl6cwiuptt.jpg', '1', '2025-02-10 11:15:31'),
(74, 19, 'Balloons and decorations', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728898260/k0szylaeh26c9bygtakm.jpg', '1', '2025-02-10 11:15:32'),
(75, 19, 'Themed table ware', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728898294/ecl5nijdvzvp8h9x0l0g.jpg', '1', '2025-02-10 11:15:32'),
(76, 19, 'Invitation and banners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728898387/jxtmcogcj30bgbbqqy6y.jpg', '1', '2025-02-10 11:15:32'),
(77, 20, 'Christmas decorations', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728898831/euuwxbcqvegbktqg2xbd.jpg', '1', '2025-02-21 01:02:31'),
(78, 20, 'Halloween props', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728899593/ozuahtqv6lqk9m9pl83a.jpg', '1', '2025-02-21 01:02:32'),
(79, 20, 'Easter Baskets and decorations', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728899630/ukfktkn0vdla5e6aarat.jpg', '1', '2025-02-21 01:02:32'),
(80, 20, 'New year’s Eve party sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728899662/ersckaujvx6sddkvkixn.jpg', '1', '2025-02-21 01:02:32'),
(81, 21, 'Wrapping paper', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728904595/tmnat5lwslouquacoq7w.jpg', '1', '2025-02-21 01:07:33'),
(82, 21, 'Goft bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728904618/k8jxerj9gtmq9qlbzqob.jpg', '1', '2025-02-21 01:07:33'),
(83, 21, 'Greeting cards', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728904718/z642mw3p3oxs7v5kaob1.jpg', '1', '2025-02-21 01:07:33'),
(84, 21, 'Ribbons and Bows', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728904750/rlsoisvv13rlargzcuva.jpg', '1', '2025-02-21 01:07:34'),
(85, 22, 'Wear', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725882832/kh7htkfob2hcslg1lefc.jpg', '1', '2025-02-21 01:11:32'),
(86, 22, 'Active top', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725882870/duu7uztxaitmiogr3cbj.jpg', '1', '2025-02-21 01:11:32'),
(87, 22, 'Active sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725882916/z7vhavdmfynchboha0cr.jpg', '1', '2025-02-21 01:11:32'),
(88, 22, 'Active bra', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725884049/bix8mgsav23qzxkkwmgv.jpg', '1', '2025-02-21 01:11:33'),
(89, 22, 'Active Jacket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725884088/d32s9pejlgrg6fsixego.jpg', '1', '2025-02-21 01:11:33'),
(90, 22, 'Sport Short', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725884167/pr4c0m9f2wthpbu6wo25.jpg', '1', '2025-02-21 01:11:33'),
(91, 23, 'Active bottom', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725894130/lsyjdnmiittna3owa54b.jpg', '1', '2025-02-21 01:14:27'),
(92, 23, 'Sports pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725894207/synpg2xetuldpcoxadcz.jpg', '1', '2025-02-21 01:14:27'),
(93, 23, 'Sports Jacket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725894376/yydxnxnlsi9jdf4dwnd1.jpg', '1', '2025-02-21 01:14:27'),
(94, 23, 'Sports short', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726222981/sjiaxq1pssuggooojkmw.jpg', '1', '2025-02-21 01:14:28'),
(95, 23, 'Active tops', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726223563/shlsmmvjw1mt8fgo4yhu.jpg', '1', '2025-02-21 01:14:28'),
(96, 23, 'Active set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726223587/ffe03bicqv7c82priiju.jpg', '1', '2025-02-21 01:14:28'),
(97, 24, 'Plus active tops', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726223746/c23iriy49jxrccigbgd1.jpg', '1', '2025-02-21 01:16:49'),
(98, 24, 'Plus active bottom', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726223779/qi7wl8na4jaepbyptzjc.jpg', '1', '2025-02-21 01:16:49'),
(99, 24, 'Plus active jacket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726223830/ivolbpkbznark1isbitq.jpg', '1', '2025-02-21 01:16:50'),
(100, 25, 'T-Shirt', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723712203/fwl9knvjdinhtfnertn4.jpg', '1', '2025-02-21 01:31:28'),
(101, 25, 'Girls Blouse', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723629273/bkzcliol0iuzd7l8om0w.png', '1', '2025-02-21 01:31:28'),
(102, 25, 'Pants and leggings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723473854/ncutk6udk3rkv3lgtlmj.jpg', '1', '2025-02-21 01:31:28'),
(103, 25, 'Jumpsuits and Romper', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723712614/drepsndwiilv9vcryimq.jpg', '1', '2025-02-21 01:31:28'),
(104, 25, 'Dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724079171/nr03ahsciqgu2y0z27u5.jpg', '1', '2025-02-21 01:31:28'),
(105, 25, 'Bodysuit one-pieces', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723714649/aoi2bkwwmzikavhyt3ot.jpg', '1', '2025-02-21 01:31:28'),
(106, 25, 'Baby girl sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723474266/pjhvys8djdjevszubsvo.jpg', '1', '2025-02-21 01:31:28'),
(107, 25, 'Skirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723629213/g5opym5yoo7tjab0zujk.jpg', '1', '2025-02-21 01:31:29'),
(108, 25, 'Swim wear', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723844558/d0rc1wmzgtlwbnadoglj.png', '1', '2025-02-21 01:31:29'),
(109, 25, 'Girls pajama', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723743171/tvooyrfeq2nkm8zdyyil.jpg', '1', '2025-02-21 01:31:29'),
(110, 25, 'Girls tank top', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724320001/zzqcfh2mdsaiy0ye0ds7.jpg', '1', '2025-02-21 01:31:29'),
(111, 25, 'Shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724319815/d8vnusujkctydbc727ab.jpg', '1', '2025-02-21 01:31:29'),
(112, 25, 'Hoodies abd sweater', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723630932/shfa5kxnbp5ailyfrxvn.jpg', '1', '2025-02-21 01:31:29'),
(113, 25, 'Girls Underwears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724319741/dj2z9b34ix9huzjzephw.jpg', '1', '2025-02-21 01:31:29'),
(114, 26, 'T-Shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723712287/b2ocjye8b5rk2amavvrj.jpg', '1', '2025-02-21 02:33:25'),
(115, 26, 'Shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724094740/lbjrzceyueoh5gg9zrcq.jpg', '1', '2025-02-21 02:33:25'),
(116, 26, 'Straight pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723840121/ubzfnbsbybggxossnfcl.jpg', '1', '2025-02-21 02:33:25'),
(117, 26, 'Jeans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723553033/c6knrf7mz21hqcqstbex.jpg', '1', '2025-02-21 02:33:25'),
(118, 26, 'Knitwears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723562022/gtpccbs2iibdglpelcte.jpg', '1', '2025-02-21 02:33:25'),
(119, 26, 'Hoodies and sweaters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723553750/t6zeeaviz9crovje4guu.png', '1', '2025-02-21 02:33:25'),
(120, 26, 'Boys outerwear', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723555934/ztdqorgk97hrs7inp7zl.jpg', '1', '2025-02-21 02:33:26'),
(121, 26, 'Boys clothing set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723745327/bl85urrab9bgznbzvshz.jpg', '1', '2025-02-21 02:33:26'),
(122, 26, 'Bodysuit and one-pieces', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723843497/elwddcxco7mvehrgec88.jpg', '1', '2025-02-21 02:33:26'),
(123, 26, 'Baby rompers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723844684/esqrzq9wy6ayf2jfrbnz.jpg', '1', '2025-02-21 02:33:26'),
(124, 26, 'Suit and Blazer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724252279/jnh3b7tpalvidth3igyf.jpg', '1', '2025-02-21 02:33:26'),
(125, 27, 'Hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723646451/yaeilhaumeu7bzpjl79x.png', '1', '2025-02-21 02:35:41'),
(126, 27, 'Gloves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723720909/uq0kqexs4mod9suq0wh3.jpg', '1', '2025-02-21 02:35:42'),
(127, 27, 'Bips', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723721712/jox3cea73bsxu2uwkkel.jpg', '1', '2025-02-21 02:35:42'),
(128, 27, 'Burps cloths', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723721751/iomegrduvh1vqxs722el.jpg', '1', '2025-02-21 02:35:42'),
(129, 27, 'Babies and kids bag', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723721915/tb92ow6dbbquenoaw4t2.jpg', '1', '2025-02-21 02:35:42'),
(130, 27, 'Head Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723722197/flxqeylnowpanl9vq3vd.jpg', '1', '2025-02-21 02:35:42'),
(131, 27, 'Socks and leg warmers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723722365/tjdkdsgrb5fx6ejl66ac.jpg', '1', '2025-02-21 02:35:42'),
(132, 27, 'Pregnant pillows', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723725832/jqom0jscoz7xrh7evmxp.jpg', '1', '2025-02-21 02:35:42'),
(133, 38, 'Bed sheets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732005962/egcu7bvmonaddov2x3vg.jpg', '1', '2025-02-21 09:17:46'),
(134, 38, 'Comforter and Duvet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732012608/o7zkhdo0ued7xvlh4gjp.jpg', '1', '2025-02-21 09:17:46'),
(135, 38, 'Pillowcases', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732012813/gvteokfhhydpj7znhw1m.png', '1', '2025-02-21 09:17:46'),
(136, 38, 'Mattresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732012886/mscleiqnerhelomxo2kc.png', '1', '2025-02-21 09:17:46'),
(137, 38, 'Mattress protector', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732013095/e8hbnmpjik2fqaw52td5.jpg', '1', '2025-02-21 09:17:46'),
(138, 39, 'Table clothes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732013318/msyszg2u3gjqfkadzlut.jpg', '1', '2025-02-21 09:20:25'),
(139, 39, 'Napkins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732013410/egzjyetrkocoghubueor.jpg', '1', '2025-02-21 09:20:25'),
(140, 39, 'Dish towels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732013570/at50hetfkufiarlvjrex.jpg', '1', '2025-02-21 09:20:25'),
(141, 40, 'Bath towels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732013753/gynytsw20q85agknh3xg.png', '1', '2025-02-21 09:22:40'),
(142, 40, 'Shower curtain', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732014077/yrd6rpdeaz1vhyghiljh.png', '1', '2025-02-21 09:22:40'),
(143, 40, 'Robes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732014210/a3ayzzao5eews31qdt29.jpg', '1', '2025-02-21 09:22:40'),
(144, 41, 'Needle and pins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732017200/vxqibdy6cqcnxkowvsri.jpg', '1', '2025-02-21 09:25:28'),
(145, 41, 'Threads', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732017309/rxlukorhxwza56qacocp.png', '1', '2025-02-21 09:25:28'),
(146, 41, 'Fabric scissors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732018983/la2kmukisqksazupniyr.jpg', '1', '2025-02-21 09:25:28'),
(147, 41, 'Measuring tapes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732019050/tmvljodh6na9wltw3civ.jpg', '1', '2025-02-21 09:25:28'),
(148, 41, 'Sewing yarns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732019196/gelbwmvqoy4cuiafukbh.jpg', '1', '2025-02-21 09:25:29'),
(149, 41, 'Embroidery hoops', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732019295/szrmzfgtnkclnwcai220.jpg', '1', '2025-02-21 09:25:29'),
(150, 41, 'Thimbles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732019363/dl6bw9cinkqmlfz7wssc.png', '1', '2025-02-21 09:25:29'),
(151, 41, 'Sewing gauges', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732019480/vzi1hcl9vgkieigijtbe.png', '1', '2025-02-21 09:25:29'),
(152, 42, 'Cotton fabric', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732280883/gjr5wi9p4juxvs1nmn65.jpg', '1', '2025-02-21 09:54:08'),
(153, 42, 'Linen fabrics', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732281032/rwfwfh9d0etvmzxulf6k.jpg', '1', '2025-02-21 09:54:08'),
(160, 43, 'Pendant Necklaces', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731071987/twevcgc60rgoolvjeg1b.png', '1', '2025-02-21 10:16:50'),
(161, 43, 'Plain chain necklaces', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731072079/slbouq01fwmypylzoq7k.png', '1', '2025-02-21 10:16:50'),
(162, 43, 'Choker necklaces', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731072185/ph4kxkkul3gzaakxekd7.jpg', '1', '2025-02-21 10:16:51'),
(163, 43, 'Statement necklaces', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731072666/zt0coehpzsbiwefkc9qb.jpg', '1', '2025-02-21 10:16:51'),
(164, 43, 'Pear necklace', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731074046/vrvsyenl5e4britv8cz9.jpg', '1', '2025-02-21 10:16:51'),
(165, 44, 'Studs earrings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731073604/exk81p8izg0exj9urrfw.jpg', '1', '2025-02-21 10:19:18'),
(166, 44, 'Hoop earrings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731073716/nplabvq41v9pz25fhfpk.jpg', '1', '2025-02-21 10:19:18'),
(167, 44, 'Drop earrings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731073801/yhfvt5hhhshtczvzcjmg.png', '1', '2025-02-21 10:19:18'),
(168, 44, 'Ear cuff earrings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731073925/n48uzjhgqizoyfwway9n.jpg', '1', '2025-02-21 10:19:18'),
(169, 45, 'Chain bangles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731074328/mbcxdtzc6saegdw60iog.jpg', '1', '2025-02-21 10:20:51'),
(170, 45, 'Cuff bracelet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731076202/yrsnemztckrmgvhnnyyq.jpg', '1', '2025-02-21 10:20:51'),
(171, 45, 'Beaded bracelet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731076307/qwf7262n4epfifyvmhlk.jpg', '1', '2025-02-21 10:20:51'),
(172, 45, 'Leather strap bracelet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731076566/qgsmfdlq59rywzbwxmht.jpg', '1', '2025-02-21 10:20:52'),
(173, 45, 'Charm bracelet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731076776/pvldinid2lh9jts502gr.jpg', '1', '2025-02-21 10:20:52'),
(174, 46, 'Statement rings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731077094/pgjwbfzzad0tfztso29b.jpg', '1', '2025-02-21 10:22:04'),
(175, 46, 'Stackable rings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731077265/btnd8puhcuquwoxxvxaj.jpg', '1', '2025-02-21 10:22:04'),
(176, 46, 'Engagement rings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731077535/hbpmdge2k7afj76skxlg.png', '1', '2025-02-21 10:22:04'),
(177, 46, 'Wedding rings 3 pieces set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731077753/edpoqvys20pjdwzcbjh8.jpg', '1', '2025-02-21 10:22:04'),
(178, 46, 'Unisex  rings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731077905/sjahr94sny1ggxg6yxwq.png', '1', '2025-02-21 10:22:04'),
(179, 47, 'Fashion brooches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731078193/levbjdzogl9c8yiyiffm.jpg', '1', '2025-02-21 10:24:45'),
(180, 47, 'Lapel pins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731078442/g5xf6aa739xrriksayws.jpg', '1', '2025-02-21 10:24:46'),
(181, 47, 'Badge pins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731078503/bnvyhmahipkd4kzav470.jpg', '1', '2025-02-21 10:24:46'),
(182, 47, 'Decorative brooches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731078952/j8jmjn5sicezwcpiqn3u.png', '1', '2025-02-21 10:24:46'),
(183, 47, 'Cuflinks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731079084/gw3fuavyjk5fsp7azjsj.jpg', '1', '2025-02-21 10:24:46'),
(184, 47, 'Tie clips', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731079164/lgtdaxxh1ypxhlvzpie9.png', '1', '2025-02-21 10:24:46'),
(185, 48, 'Jewelry’s boxes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731079506/tm8z2f4yrfzdh8vgqasa.jpg', '1', '2025-02-21 10:26:13'),
(186, 48, 'Jewelry’s stand', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731079979/jtkliq59fu2lmvlvhvmd.jpg', '1', '2025-02-21 10:26:13'),
(187, 48, 'Jewelry cleaning cloth', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731080111/nc7xjt9zzbsbqppzdbin.jpg', '1', '2025-02-21 10:26:13'),
(188, 49, 'Pens and Pencils', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731512233/f2aqgoaxwqlazoypl6cy.jpg', '1', '2025-02-21 10:28:08'),
(189, 49, 'Notebooks and paper', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731512264/irz5jamkhndu06zjmggl.jpg', '1', '2025-02-21 10:28:08'),
(190, 49, 'Staplers and Hole punches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731574531/ejq7epklu451gbm4xamx.jpg', '1', '2025-02-21 10:28:08'),
(191, 49, 'Desk Organizer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731575087/bxnfvmi2x83hbhjpaumu.jpg', '1', '2025-02-21 10:28:08'),
(192, 50, 'Power Toole', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731575169/kxh6lj9hbmeajudsynaf.jpg', '1', '2025-02-21 10:29:39'),
(193, 50, 'Air compressor', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731575212/uw6qm7wvwldsy6lfrjma.jpg', '1', '2025-02-21 10:29:39'),
(194, 50, 'Generator', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731575242/tzdvkvvmo8amqhvkpvpf.jpg', '1', '2025-02-21 10:29:39'),
(195, 50, 'Welding machine', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731575596/qrzcbxepynkddrm9kz9d.jpg', '1', '2025-02-21 10:29:40'),
(196, 51, 'Personal Protective Equipment', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731576632/guxjjbzqvzflnhbzzsas.jpg', '1', '2025-02-21 10:31:01'),
(197, 51, 'Fire Extinguishers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731576686/ypwq4yhwtnwdzp8pfbgd.jpg', '1', '2025-02-21 10:31:01'),
(198, 51, 'Security cameras', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731576725/cttjqmafiya7mkmaevq2.jpg', '1', '2025-02-21 10:31:01'),
(199, 51, 'Safety signs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731576751/mkpvho4v73gk2be9ijxd.jpg', '1', '2025-02-21 10:31:01'),
(200, 52, 'Cleaning chemical', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731576836/abosril4txz3tckvm632.jpg', '1', '2025-02-21 10:32:22'),
(201, 52, 'Brooms and mops', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731576877/eicmi97qit2l3wqogp9o.jpg', '1', '2025-02-21 10:32:22'),
(202, 52, 'Trash bags and bins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731576988/yyipvpggolruyy5sd0kw.jpg', '1', '2025-02-21 10:32:23'),
(203, 52, 'Disinfectant wipes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731577087/hugahhkjjpafkerpf1jv.jpg', '1', '2025-02-21 10:32:23'),
(204, 53, 'Boxes and Envelopes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731581439/n8ugimmljgfd7upygi60.jpg', '1', '2025-02-21 10:35:56'),
(205, 53, 'Packing tape', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731581465/lbdyozlw3nquhstqapux.jpg', '1', '2025-02-21 10:35:56'),
(206, 53, 'Bubble Wrap', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731581510/e5yq7uagzrjgbgjgcp01.jpg', '1', '2025-02-21 10:35:56'),
(207, 53, 'Shipping Labels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731581593/tyyvsv4myaengx4mfzym.jpg', '1', '2025-02-21 10:35:57'),
(208, 54, 'Warehouse shelving', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731581771/xq5rbgfzmoxdvvusmcs0.jpg', '1', '2025-02-21 10:36:55'),
(209, 54, 'Storage Bins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731588976/gw4nfxflufjzxhsgbzam.jpg', '1', '2025-02-21 10:36:55'),
(210, 54, 'Tool storage', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731589000/ekwrns1d2hhcwv6knofs.jpg', '1', '2025-02-21 10:36:55'),
(211, 54, 'Pallet Racks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731589035/gijpwcyw9rauzivh1agl.jpg', '1', '2025-02-21 10:36:55'),
(212, 55, 'Circuit Breakers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731589088/jz7b1douxtq6xkgku0lg.jpg', '1', '2025-02-21 10:38:14'),
(213, 55, 'Industrial lighting', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731589121/y8qgoqntbjwoe9utbnui.jpg', '1', '2025-02-21 10:38:14'),
(214, 55, 'Extension cords', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731589154/m3qohbcoynhlqn0uhtug.jpg', '1', '2025-02-21 10:38:14'),
(215, 55, 'Wiring and cable management', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731589182/c89xpewhh6rpaftbijom.jpg', '1', '2025-02-21 10:38:15'),
(216, 56, 'Air conditional units', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591356/halq8u19xozvma1l1tpy.jpg', '1', '2025-02-21 10:39:58'),
(217, 56, 'Water pumps', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591381/jewu7buwtfhpd4zynx1i.jpg', '1', '2025-02-21 10:39:58'),
(218, 56, 'Industrial fans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591412/ic984vsvyqqmt524dfmo.jpg', '1', '2025-02-21 10:39:58'),
(219, 56, 'Pipes and fittings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591452/tllt1ycqi4vvetyhiybq.jpg', '1', '2025-02-21 10:39:58'),
(220, 57, 'Bearings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591510/jup7apjoioesndvy7bkp.jpg', '1', '2025-02-21 10:41:15'),
(221, 57, 'Gears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591529/tygifpok4k4or8kw1lap.jpg', '1', '2025-02-21 10:41:15'),
(222, 57, 'Hydraulic parts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591562/syjb6zu8fdhqxpr6hitb.jpg', '1', '2025-02-21 10:41:15'),
(223, 57, 'Conveyor belts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591594/k9lxxz0x1umxhmdnpejx.jpg', '1', '2025-02-21 10:41:15'),
(224, 58, 'Desks and workstation', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591653/mrsnhd1hqd9e3beixioi.jpg', '1', '2025-02-21 10:42:38'),
(225, 58, 'Office Chair', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591677/eyjpcun78hi6venievfi.jpg', '1', '2025-02-21 10:42:38'),
(226, 58, 'Filing Cabinet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591703/ymup5frjjzhicwghdcrd.jpg', '1', '2025-02-21 10:42:38'),
(227, 58, 'Conferences Tables', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731591747/lgi9ieeitsvv7cm6h3qj.jpg', '1', '2025-02-21 10:42:38'),
(228, 59, 'Filling products', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724862921/cee3hsc5fq4m4jzah6nz.jpg', '1', '2025-02-21 10:46:37'),
(229, 59, 'Cutting supplies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724863191/mohlldnbrjwgqo9t0lgq.jpg', '1', '2025-02-21 10:46:37'),
(230, 59, 'Calenders and cards', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724863438/wbd7bmtwxqzash3hrj7l.jpg', '1', '2025-02-21 10:46:37'),
(231, 59, 'Office calculators', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724920527/j76kfh8bvfmpykswryji.jpg', '1', '2025-02-21 10:46:37'),
(232, 60, 'Multifunction pen', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724863832/l1siwrnxnqgu5roefxmr.jpg', '1', '2025-02-21 10:47:33'),
(233, 60, 'Pen cover and pen grip', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724865090/sto8mzc2thrifwfmz6lj.jpg', '1', '2025-02-21 10:47:33'),
(234, 60, 'High lighters pencils and markers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724865279/gdyj3e4hireeedcdxgbf.jpg', '1', '2025-02-21 10:47:33'),
(235, 60, 'Pencil sharpeners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724881498/ddgls5h9ksow7gio9xyw.jpg', '1', '2025-02-21 10:47:33'),
(236, 60, 'Erasers and Correction products', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724882176/tgoscaantbukxxmplv9w.jpg', '1', '2025-02-21 10:47:34'),
(237, 60, 'Pens and refills', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724882583/x3g3wtudlekvdnempnef.jpg', '1', '2025-02-21 10:47:34'),
(238, 61, 'Sticky notes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724882727/ixk4w3r172glzatzarot.jpg', '1', '2025-02-21 10:48:41'),
(239, 61, 'Memo pads', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724882816/tebsdfn37saxd7uwwtxf.jpg', '1', '2025-02-21 10:48:42'),
(240, 61, 'Notebooks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724882893/stfkivnxlenaqdeh9zln.jpg', '1', '2025-02-21 10:48:42'),
(241, 61, 'Planners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724883283/sqkfg0f8tqpcnipwafm0.jpg', '1', '2025-02-21 10:48:42'),
(242, 61, 'Binders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724883397/yi037nkrmbg3vjqgb2yk.jpg', '1', '2025-02-21 10:48:42'),
(243, 62, 'Cards and card stocks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724883697/ovjdxfsd0ygsocday0nc.jpg', '1', '2025-02-21 10:49:54'),
(244, 62, 'Multipurpose paper', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724883864/gyfv4fdutd3rwmjg5hlw.jpg', '1', '2025-02-21 10:49:54'),
(245, 62, 'Self-adhesive paper', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724884014/h1fcfhjjh6w9tvhhtyrg.jpg', '1', '2025-02-21 10:49:54'),
(246, 62, 'Printing and writing papers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724887711/rpqud1cp39iefeo8edlb.jpg', '1', '2025-02-21 10:49:54'),
(247, 62, 'Letter headed paper', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724888223/ngeutbpv5dvlihthpn8l.jpg', '1', '2025-02-21 10:49:54'),
(248, 63, 'Clips', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724884160/r65mwhofvt8ygarheb59.jpg', '1', '2025-02-21 10:50:57'),
(249, 63, 'Staplers and staple pins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724884246/iw77harmmnjswsqurfxj.jpg', '1', '2025-02-21 10:50:57'),
(250, 63, 'Book rings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724884381/bnyiit4ragriha0zrtl9.jpg', '1', '2025-02-21 10:50:57'),
(251, 63, 'Leaf binders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724884510/lrrzlkimdou1sipyvw7b.jpg', '1', '2025-02-21 10:50:57'),
(252, 63, 'Hole punchers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724884944/f25a4iwvaauq5zyycy16.jpg', '1', '2025-02-21 10:50:57'),
(253, 63, 'Pins and tacks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724885074/h5vywzingyum17gun4qs.jpg', '1', '2025-02-21 10:50:57'),
(254, 64, 'Stationery boxes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724885940/vn5ycb84pwy0mhkomxnt.jpg', '1', '2025-02-21 10:52:01'),
(255, 64, 'Bookend and book stands', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724886350/to1fgfv8qs1heswbtgru.jpg', '1', '2025-02-21 10:52:01'),
(256, 64, 'Key holder and key chain organizer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724886471/lqwceqfj26uooqxdoux9.jpg', '1', '2025-02-21 10:52:01'),
(257, 64, 'Mouse mat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724886548/dvspx9oyf05hunn1qsc1.jpg', '1', '2025-02-21 10:52:01'),
(258, 64, 'Business card holders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724886675/nt0rkd55rwetpinhtkfs.jpg', '1', '2025-02-21 10:52:01'),
(259, 64, 'File trays', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724887033/ufllxjuwrp7d3icfpv5b.jpg', '1', '2025-02-21 10:52:01'),
(260, 65, 'Masking tape', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725199097/gdog9q3jyyzgxdgnelwt.jpg', '1', '2025-02-21 10:52:50'),
(261, 66, 'Protein powder', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731489939/ggkeee7dzevbc6wgnvns.png', '1', '2025-02-21 10:56:36'),
(262, 66, 'Herbal supplements', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731490712/sksctn0wjac0mwrkvvor.jpg', '1', '2025-02-21 10:56:37'),
(263, 66, 'Vitamins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731491223/lr1iu11antnkrpa5ehin.jpg', '1', '2025-02-21 10:56:37'),
(264, 66, 'Immune support supplements', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731491679/c5yrw2srh74rmsavt5ys.jpg', '1', '2025-02-21 10:56:37'),
(265, 67, 'Cleansing balm', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727961267/vn3fdpgpusetufnnydg7.jpg', '1', '2025-02-21 10:59:16'),
(266, 67, 'Facial cleansers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727961633/bkgjrvfc1lwcbh2h5zdm.jpg', '1', '2025-02-21 10:59:16'),
(267, 67, 'Makeup remover', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727961684/fgiparfdbmfnnsysldyj.jpg', '1', '2025-02-21 10:59:16'),
(268, 68, 'Day creams', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727961863/u4bkbq0nxb3ybeaoexgi.jpg', '1', '2025-02-21 11:03:16'),
(269, 68, 'Night creams', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727961923/foprzogghpidcbtuiqxf.jpg', '1', '2025-02-21 11:03:17'),
(270, 68, 'Face oils', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727962129/asxq2trxxdvdoknsum9w.jpg', '1', '2025-02-21 11:03:17'),
(271, 68, 'Hand and body lotion', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727962357/z9jcymyamaq4k050fcbz.jpg', '1', '2025-02-21 11:03:17'),
(272, 69, 'Serums', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727962670/twthtaijguueml3wws1e.jpg', '1', '2025-02-21 11:05:26'),
(273, 69, 'Face masks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727963993/iysy5cpvj3ukdolybpig.jpg', '1', '2025-02-21 11:05:27'),
(274, 69, 'Ance treatment', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727964351/l38p1tf0g14nfe5vuvsf.png', '1', '2025-02-21 11:05:27'),
(275, 69, 'Anti ageing treatments', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727964679/gz2xlpc2mnmykbgtvwvf.jpg', '1', '2025-02-21 11:05:27'),
(276, 70, 'Sunscreens', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727965516/snb4xbuohabn6u3cfyps.jpg', '1', '2025-02-21 11:47:43'),
(277, 70, 'Tanning lotion', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727965922/hhj6c9pmqzgpkudagqfq.jpg', '1', '2025-02-21 11:47:43'),
(278, 70, 'After sun care', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727966059/nnsp4iu52wkkb4ynjrqb.jpg', '1', '2025-02-21 11:47:43'),
(279, 71, 'Eye creams', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727966406/mksu56or0yvfrpbiozzy.jpg', '1', '2025-02-21 11:48:55'),
(280, 71, 'Under eye masks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727966924/kiwr3odu752wjgge5hxy.jpg', '1', '2025-02-21 11:48:55'),
(281, 72, 'Foundations', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727967096/sh09idci6pati7ntjxcf.jpg', '1', '2025-02-21 11:50:52'),
(282, 72, 'Concealers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727967186/qi7lfczvgnvp4a6wsurc.jpg', '1', '2025-02-21 11:50:52'),
(283, 72, 'Primers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727967347/vjo0tdcqw2xppufxrain.jpg', '1', '2025-02-21 11:50:52'),
(284, 72, 'Blushers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727967443/vnmamnk08wtb7rgaeqgy.png', '1', '2025-02-21 11:50:52'),
(285, 72, 'Facial highlighters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727967596/ezaeodocnl4j9jxxe5e8.jpg', '1', '2025-02-21 11:50:52'),
(286, 73, 'Eye shadows', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727967929/dfmbsobhdpnrwkftlm2y.png', '1', '2025-02-21 11:52:22'),
(287, 73, 'Eye liners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727968062/xfq7ae4evhoo5omutwih.jpg', '1', '2025-02-21 11:52:23'),
(288, 73, 'Mascaras', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727968178/kn3yor43potjnh1d6kbj.jpg', '1', '2025-02-21 11:52:23'),
(289, 73, 'Eyebrow pencils', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728294415/a3gbypujavqbvwzwshfs.jpg', '1', '2025-02-21 11:52:23'),
(290, 74, 'Lipsticks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728294863/f46tk2lxynkleu7lwzeg.jpg', '1', '2025-02-21 11:54:11'),
(291, 74, 'Lip glosses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728295011/tfvya7n0xnb4h2fpjbyd.jpg', '1', '2025-02-21 11:54:11'),
(292, 74, 'Lip liners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728295190/htryzgt06uxzcomqkvcq.jpg', '1', '2025-02-21 11:54:12'),
(293, 74, 'Lip balms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728295302/lnlgqswc6es8oboedrrh.jpg', '1', '2025-02-21 11:54:12'),
(294, 75, 'Makeup somges', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728295830/jsa5pfyxdi3mkmyyzid4.jpg', '1', '2025-02-21 11:56:48'),
(295, 75, 'Eye lash curlers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728296833/adkflli5qgkgaazzxpvn.jpg', '1', '2025-02-21 11:56:48'),
(296, 75, 'Brushes and applicators', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728296901/vem96nazlhh49avviyt0.jpg', '1', '2025-02-21 11:56:48'),
(297, 75, 'Hair dryers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731492482/ywtxeaw1pjyrkiqmtzum.jpg', '1', '2025-02-21 11:56:48'),
(298, 75, 'Facial Rollers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731661207/oxg18pj230o970rnnsm4.jpg', '1', '2025-02-21 11:56:48'),
(299, 75, 'Curling iron', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731661287/pw5bsxc1jprns633qzgz.png', '1', '2025-02-21 11:56:49'),
(300, 76, 'Shower gels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728296266/hjdmczlggewn1hwlyllk.jpg', '1', '2025-02-21 11:58:05'),
(301, 76, 'Body scrubs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728297042/p5l58pb5l7t8wwhiswka.jpg', '1', '2025-02-21 11:58:05'),
(302, 76, 'Bar soap', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728297144/vnsj8nfy3fggoffhxwan.jpg', '1', '2025-02-21 11:58:05'),
(303, 77, 'Cellulite cream', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298000/ttmm0jzwe7ygrv5qrcer.jpg', '1', '2025-02-21 15:14:57'),
(304, 77, 'Firming cream', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298039/z1n64yihufa2wql7krpw.jpg', '1', '2025-02-21 15:14:57'),
(305, 77, 'Body oil', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728374752/fe11sfxhybskj1d1xghm.jpg', '1', '2025-02-21 15:14:57'),
(306, 78, 'Hand creams', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728375012/ovyni4bdecuhobwv2ciz.jpg', '1', '2025-02-21 15:16:17'),
(307, 78, 'Foot creams', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728375133/p0bmn7fiasvqx0rctmf6.jpg', '1', '2025-02-21 15:16:17'),
(308, 78, 'Nail care product', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728375170/drc5vc9mmzij1asttzcv.jpg', '1', '2025-02-21 15:16:17'),
(309, 79, 'Shaving foam', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728375392/s3nlgwo3as9csqaq75fu.jpg', '1', '2025-02-21 15:17:46'),
(310, 79, 'Shaving cream', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728375603/dgrnwr63hws7pxfdt8r0.jpg', '1', '2025-02-21 15:17:46'),
(311, 79, 'Shaving blades', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728375761/cuokem4svdqurdfcteo9.jpg', '1', '2025-02-21 15:17:46'),
(312, 79, 'After shave lotion', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728375861/yrjjoupge36enftw6x1i.png', '1', '2025-02-21 15:17:46'),
(313, 80, 'Beard oils', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728376238/mbbqfcvha4jxonrxajd6.jpg', '1', '2025-02-21 15:19:02'),
(314, 80, 'Beard balm', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728376268/ep0dhdahno8smjbtpujr.jpg', '1', '2025-02-21 15:19:02'),
(315, 80, 'Beard trimmers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728376300/pl5wg8iyxc0nkgrcbcgj.png', '1', '2025-02-21 15:19:02'),
(316, 81, 'Facial cleansers for men', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728376634/mytuciyt896znczrsmtk.jpg', '1', '2025-02-21 15:20:38'),
(317, 81, 'Men’s creams and  moisturizers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728376928/dct2yhk6yiflp6ssbasd.png', '1', '2025-02-21 15:20:38'),
(318, 81, 'Men’s suncreen', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728376870/fibyeu5nhcm0enrj4d4s.jpg', '1', '2025-02-21 15:20:38'),
(319, 82, 'First aid kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731491896/jz2fduvmvtl5fvvc4p62.jpg', '1', '2025-02-21 15:22:14'),
(320, 82, 'Thermometers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731492002/exx13fqu3342mfqhe39v.png', '1', '2025-02-21 15:22:14'),
(321, 82, 'Bandages', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731492073/nsl0gixvi90setrmd1sp.png', '1', '2025-02-21 15:22:14'),
(322, 82, 'Sanitizers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731492172/u5of5svvk5xpucuwkp6w.png', '1', '2025-02-21 15:22:14'),
(323, 83, 'Leather Dress watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726766997/v1f9uhs4tsgcqeqf35jb.jpg', '1', '2025-02-21 15:24:20'),
(324, 83, 'Smart watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726766506/nnba6gdyh94bocd59rgv.jpg', '1', '2025-02-21 15:24:20'),
(325, 83, 'Gold chronograph watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726766887/nfzqtcxvbjylnvwmzmaa.jpg', '1', '2025-02-21 15:24:20'),
(326, 83, 'Silver men watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726768979/wepob5nhu9v2ucydkmte.jpg', '1', '2025-02-21 15:24:20'),
(327, 83, 'Casual men watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726769086/zrrb68dn7cgm1fgv49vr.jpg', '1', '2025-02-21 15:24:20'),
(328, 83, 'Men’s sport watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727180494/tn7kctavvz8fgpo7lsay.jpg', '1', '2025-02-21 15:24:20'),
(329, 84, 'Ladies smart watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727181702/arlo1e6x4lgk3276tpdu.jpg', '1', '2025-02-21 15:25:53'),
(330, 84, 'Ladies fashion watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727181816/bioajq6qxhwhakfdjlhf.jpg', '1', '2025-02-21 15:25:53'),
(331, 84, 'Ladies gold watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727181921/p9iwyw06oolry43qp21d.jpg', '1', '2025-02-21 15:25:53'),
(332, 84, 'Casual Ladies watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727182254/abldcho2qh2ywisacy8a.jpg', '1', '2025-02-21 15:25:53'),
(333, 84, 'Ladies silver watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727182653/hvplnnhtrrki9zakvvkc.jpg', '1', '2025-02-21 15:25:53'),
(334, 84, 'Ladies Bracelet watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727182804/bquaxejvekpcbea7x2ci.jpg', '1', '2025-02-21 15:25:54'),
(335, 84, 'Ladies sport watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186272/iydboqpyjjoer5gbrcnl.jpg', '1', '2025-02-21 15:25:54'),
(336, 85, 'Kiddies character watchers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186908/lbwvqf6fbgbbazig1b0e.jpg', '1', '2025-02-21 15:28:35'),
(337, 85, 'Kiddies smart watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187077/na5rchxugbsomn0ic56c.jpg', '1', '2025-02-21 15:28:35'),
(338, 85, 'Kiddies digital watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187123/xjzdphh1lx50yoejiir6.jpg', '1', '2025-02-21 15:28:35'),
(339, 85, 'Kiddies Sports watches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187489/eidgayp5aqportjny3bg.jpg', '1', '2025-02-21 15:28:35'),
(340, 85, 'Kiddies wrist watch set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727190100/lunl1s3qp5nxxozdexyz.jpg', '1', '2025-02-21 15:28:35'),
(341, 86, 'Gold wrist watches set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727188319/vmtxqbt6d5py0degcsn8.jpg', '1', '2025-02-21 15:30:46'),
(342, 86, 'Silver wrist watch set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727188378/ii3gcwjv7ab9zmta7tli.jpg', '1', '2025-02-21 15:30:46'),
(343, 86, 'Leather wrist watch set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727188427/ivcxkjh6tvuyguhlog5l.jpg', '1', '2025-02-21 15:30:46'),
(344, 87, 'Messenger Bag', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726739087/q5webzibvxbniqv4kgh3.jpg', '1', '2025-02-21 15:57:53'),
(345, 87, 'Briefcase', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726761468/c0nfdgpysqdtljn19ga2.jpg', '1', '2025-02-21 15:57:53'),
(346, 87, 'Men’s cross bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726757310/q5mzyyjevrtodpbmtgzs.jpg', '1', '2025-02-21 15:57:53'),
(347, 87, 'Waist bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726757766/djvabmrlxhrdmzaxepyt.jpg', '1', '2025-02-21 15:57:53'),
(348, 87, 'Men’s backpack', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726759933/s6kfvuuxejijhtk7ptdt.jpg', '1', '2025-02-21 15:57:53');
INSERT INTO `subcategory` (`id`, `_category`, `_name`, `_image`, `_status`, `_date`) VALUES
(349, 87, 'Men’s wallet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726760041/dlczfi2fmou4s4aytcvj.jpg', '1', '2025-02-21 15:57:53'),
(350, 87, 'Men toiletry bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726760455/jw4evvdozqzrdssbvzpc.jpg', '1', '2025-02-21 15:57:53'),
(351, 88, 'Fashion hand bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726126852/ufr5q1adtlelrmeao9d2.png', '1', '2025-02-21 15:59:58'),
(352, 88, 'Ladies clutche bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726053812/weoy6cttnaoxz1njskua.jpg', '1', '2025-02-21 15:59:58'),
(353, 88, 'Ladies evening bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726054022/mmgpihotcwvgt6flppcx.jpg', '1', '2025-02-21 15:59:59'),
(354, 88, 'Ladies Designers bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726757933/qaceukyg1icbs8keqvlc.png', '1', '2025-02-21 15:59:59'),
(355, 88, 'Wedding bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726055375/eo70fi3kbwiabdpfraoz.png', '1', '2025-02-21 15:59:59'),
(356, 88, 'Ladies cross bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726055411/d5ttzgjmolpmkfhtu9o0.jpg', '1', '2025-02-21 15:59:59'),
(357, 88, 'Ladies wallet purse', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726131843/btya7nzrqthcsceetlrs.jpg', '1', '2025-02-21 15:59:59'),
(358, 88, 'Ladies tote bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726139878/flghsxelmzwmj61tbuq7.jpg', '1', '2025-02-21 15:59:59'),
(359, 88, 'Ladies sling bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726140337/fhmkuycumlythwatdttr.jpg', '1', '2025-02-21 15:59:59'),
(360, 88, 'Ladiest bag sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726506116/sc3jj9hycktlb3bapyb3.jpg', '1', '2025-02-21 15:59:59'),
(361, 88, 'Ladies backpack', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726762212/ngngrrch1sx2g3vyjbfw.jpg', '1', '2025-02-21 15:59:59'),
(362, 88, 'Cosmetics bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726762705/p7ctegudilza4hbiunbe.jpg', '1', '2025-02-21 15:59:59'),
(363, 89, 'Trolley and backpack', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726132843/gqve2idlephl3s8ipupn.png', '1', '2025-02-21 16:01:32'),
(364, 89, 'Kiddies luggage', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726137232/n9ql0v3um5ddn2ybo5do.jpg', '1', '2025-02-21 16:01:32'),
(365, 89, 'Kiddies two-piece trolley set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726139313/lo3s1x98usmvu66eifb0.jpg', '1', '2025-02-21 16:01:32'),
(366, 89, 'School bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726139156/qvaotxvmferj43whgv36.png', '1', '2025-02-21 16:01:32'),
(367, 89, 'Lunch bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726139359/x8vv8qmi1ehspgqtvw6v.jpg', '1', '2025-02-21 16:01:32'),
(368, 89, 'Kiddies sling bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726139572/cu4qbmequqnsi9enrsol.jpg', '1', '2025-02-21 16:01:33'),
(369, 89, 'Kiddies toy storage bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726139405/yyofhtrvhmlki9rdckwt.jpg', '1', '2025-02-21 16:01:33'),
(370, 89, 'Kiddies fashion bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726496585/dfsy7hcdakdhxviagrfw.jpg', '1', '2025-02-21 16:01:33'),
(371, 89, 'Kiddies fancy bag', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726506904/uinvslaol5wyh2s6xnk7.jpg', '1', '2025-02-21 16:01:33'),
(372, 90, 'Travel bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726757708/soragukoxbyyjboojxpi.jpg', '1', '2025-02-21 16:04:03'),
(373, 90, 'Duffle bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726758571/fvvypy60lxkgulsyt3ko.jpg', '1', '2025-02-21 16:04:03'),
(374, 90, 'Carry-on bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726759823/rli7hgi5vm96mm9g0nix.jpg', '1', '2025-02-21 16:04:03'),
(375, 90, 'Suitcases', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726759468/gwuqk2zgwrtzmqkwovmo.jpg', '1', '2025-02-21 16:04:03'),
(376, 90, 'Trolley bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726758902/lxvnsd9s2pjrgajckuw6.jpg', '1', '2025-02-21 16:04:04'),
(377, 90, 'Suitcases sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726759594/gwyalld9qhelkkq2pvkx.png', '1', '2025-02-21 16:04:04'),
(378, 91, 'Laptop bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726761501/xjgvdknvrerqmvchxtg6.jpg', '1', '2025-02-21 16:05:38'),
(379, 91, 'Tools bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726761545/i8o2iko4liopj0nxjw99.jpg', '1', '2025-02-21 16:05:38'),
(380, 91, 'Mother care bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726763378/d9dtf25rl12ggygmsybi.jpg', '1', '2025-02-21 16:05:38'),
(381, 91, 'Hiking bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1726763737/aogx1yhuiwiyzcubggs3.jpg', '1', '2025-02-21 16:05:38'),
(382, 92, 'Storage Furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805282/z00z7oun77q9rnootkvb.jpg', '1', '2025-02-21 16:10:15'),
(383, 92, 'Loveseat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805361/bfprb7m04yqk3gpzfahq.jpg', '1', '2025-02-21 16:10:15'),
(384, 92, 'Coffee Tables and End Tables', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805587/pxkv4vi3rkt9dneadvqe.jpg', '1', '2025-02-21 16:10:15'),
(385, 92, 'Caninets and chests', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805706/i0winmz7wyx3rzmifv81.jpg', '1', '2025-02-21 16:10:15'),
(386, 92, 'Consols Table', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805773/mz5hvo9veuselm3oukgg.jpg', '1', '2025-02-21 16:10:15'),
(387, 92, 'Ottomans and poufs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805869/urnzqtqhwe0ouusklplx.jpg', '1', '2025-02-21 16:10:15'),
(388, 92, 'Small space furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805940/boxm6io2h6pau3qrxvrj.jpg', '1', '2025-02-21 16:10:15'),
(389, 92, 'Bookcases', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723805994/hkj8gcmjralnedqrsqwc.jpg', '1', '2025-02-21 16:10:15'),
(390, 92, 'Futons and Daybeds', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806082/cs9ft7bh0g5jjlgcwqe7.jpg', '1', '2025-02-21 16:10:16'),
(391, 92, 'Fireplace and Stove', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806167/yguzjwzgg5vbrtgclxgb.jpg', '1', '2025-02-21 16:10:16'),
(392, 93, 'Beds and Headboards', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806317/j33lu3iyyvnggiaayqqi.jpg', '1', '2025-02-21 16:13:33'),
(393, 93, 'Bedroom sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806419/x6aeev2ly0wsixlrfwjl.jpg', '1', '2025-02-21 16:13:33'),
(394, 93, 'Dressers and chests', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806481/ygvjcaqfjtvht0umszqg.jpg', '1', '2025-02-21 16:13:33'),
(395, 93, 'Night stands', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806581/sjxtyl79lgr3bwtbxney.jpg', '1', '2025-02-21 16:13:33'),
(396, 93, 'Daybeds', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806681/hzlpqipzy5xwoi6zwov6.jpg', '1', '2025-02-21 16:13:33'),
(397, 93, 'Mattresses and foundations', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806763/a4yfulxoinm85cnl0ywc.jpg', '1', '2025-02-21 16:13:33'),
(398, 93, 'Armories and wardrobes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806901/ypixy4srvzha6ohsfurw.jpg', '1', '2025-02-21 16:13:33'),
(399, 93, 'Bedroom Benches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723806983/dhri8dhdlhxxekzoinod.jpg', '1', '2025-02-21 16:13:33'),
(400, 93, 'Small space bedrooms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723807090/jwiktrjzju1eoaij3cur.jpg', '1', '2025-02-21 16:13:33'),
(401, 93, 'Makeup vanities', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723807149/uybvixpvmvmfqwhhuvvq.jpg', '1', '2025-02-21 16:13:33'),
(402, 93, 'Jewelry Armoires', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723807228/m2lte6mz3op63dbbwkul.jpg', '1', '2025-02-21 16:13:33'),
(403, 93, 'Vanity stools', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723807315/alvq7u0riqr5ku4vxsqp.jpg', '1', '2025-02-21 16:13:34'),
(404, 94, 'Dinning table and seating', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723807642/ysziap8ftcnx3om9u26x.jpg', '1', '2025-02-21 16:15:22'),
(405, 94, 'Kitchen island and carts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808009/iek781gs5myh6imxxc16.jpg', '1', '2025-02-21 16:15:22'),
(406, 94, 'Sideboards and Buffets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808123/zpcqwp36z6ph0ljbw19a.jpg', '1', '2025-02-21 16:15:22'),
(407, 94, 'Bar furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808266/zg5nifwqnroowwvgqhea.jpg', '1', '2025-02-21 16:15:22'),
(408, 94, 'Display and china cabinet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808427/xslkuqx8efbaqxb4u9e8.jpg', '1', '2025-02-21 16:15:22'),
(409, 94, 'Small space kitchen', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808649/mueg3zqfu5y090gfdgmz.jpg', '1', '2025-02-21 16:15:22'),
(410, 94, 'Food pantries', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808716/q2j4dq4q7ests0kgzd9o.jpg', '1', '2025-02-21 16:15:22'),
(411, 94, 'Bakers racks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808770/ctkfxqhajwk1ewj81ztj.jpg', '1', '2025-02-21 16:15:22'),
(412, 94, 'Wine Racks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723808815/dniunu1scxwr7wwxyapi.jpg', '1', '2025-02-21 16:15:22'),
(413, 95, 'Desk', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723809618/yvqpdnggqfnzroklfcxl.jpg', '1', '2025-02-21 16:16:57'),
(414, 95, 'Official Chairs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723809706/nidzviogqivetouon98w.jpg', '1', '2025-02-21 16:16:58'),
(415, 95, 'Home office furniture sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723809783/eurgnp4iq71aksu47ddq.jpg', '1', '2025-02-21 16:16:58'),
(416, 95, 'Bookcases', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723809842/yaqgvluxlbf6r8eafzqx.jpg', '1', '2025-02-21 16:16:58'),
(417, 95, 'Filling cabinets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723809924/jt9wy3lnegxacbw19kix.jpg', '1', '2025-02-21 16:16:58'),
(418, 95, 'Craft and sewing table', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723810062/kxq5pu4as9tcvsngle0z.jpg', '1', '2025-02-21 16:16:58'),
(419, 95, 'Small space office', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723810131/day9rqveubndfccvhflm.jpg', '1', '2025-02-21 16:16:58'),
(420, 95, 'Priter stand', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723810369/jjpce3s5axh4gulnpru7.jpg', '1', '2025-02-21 16:16:58'),
(421, 95, 'Laptop carts and stands', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723810506/nqnjkwfvyhyu8ahy4rjr.jpg', '1', '2025-02-21 16:16:58'),
(422, 95, 'Office stool', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723810791/ivmfcnb6wsw17yqhlshl.jpg', '1', '2025-02-21 16:16:59'),
(423, 95, 'Office chair Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723812085/pifjkohl9o6zmykw7quo.jpg', '1', '2025-02-21 16:16:59'),
(424, 95, 'Chair mats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723812330/s6gppbezxpnmosgvpvd5.jpg', '1', '2025-02-21 16:16:59'),
(425, 96, 'Console Table', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724058173/jjjbb82mawz7csdythw2.jpg', '1', '2025-02-21 16:18:42'),
(426, 96, 'Cabinets and Chests', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724058216/kjmjrlaqaytbmtzdoswa.jpg', '1', '2025-02-21 16:18:42'),
(427, 96, 'Storage Benches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724058272/wpaoss1puphnoomrctk4.jpg', '1', '2025-02-21 16:18:42'),
(428, 96, 'Shoe Storage', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724058302/nizlnz59zcbr3s0oxtfa.jpg', '1', '2025-02-21 16:18:42'),
(429, 96, 'Wall Hooks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724058324/x7imchm49ilbbmkrafvw.jpg', '1', '2025-02-21 16:18:43'),
(430, 96, 'Umbrella Stands and Holders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724058356/n5ny82kg4vrcnmxsjf9g.jpg', '1', '2025-02-21 16:18:43'),
(431, 97, 'Patio Furniture Sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724060787/u2iaguytylmm6jexzowd.jpg', '1', '2025-02-21 16:19:54'),
(432, 97, 'Outdoor Seating', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724060889/vkrtzkd1epzpzdujzeiv.jpg', '1', '2025-02-21 16:19:54'),
(433, 97, 'Patio Chairs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724060943/spkb62p3mch0wysvafuh.jpg', '1', '2025-02-21 16:19:54'),
(434, 97, 'Small space patio', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724061034/jecxfouxhndrvoaz4xxt.jpg', '1', '2025-02-21 16:19:55'),
(435, 97, 'Outdoor tables', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724061108/pyvgdnxs79outkmkl6uy.jpg', '1', '2025-02-21 16:19:55'),
(436, 97, 'Patio Bar Furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724061155/znsakvyaoznpzcutk737.jpg', '1', '2025-02-21 16:19:55'),
(437, 97, 'Outdoor Pillow and cushions', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724068002/lzmfs0grd0w6eb4mgngz.jpg', '1', '2025-02-21 16:19:55'),
(438, 97, 'Outdoor Umbrellas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724068152/dpmsoyqnz5usm2ailv6v.jpg', '1', '2025-02-21 16:19:55'),
(439, 98, 'Toddler and Kids playroom', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724067495/kpxgbdzddybd1pe0ow1m.jpg', '1', '2025-02-21 16:21:31'),
(440, 98, 'Toddler and Kids bedroom furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724067537/ppj668vxietjqofklqxe.jpg', '1', '2025-02-21 16:21:31'),
(441, 98, 'Nursery Furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724067633/fi92n49ptqoupwdhzrb7.jpg', '1', '2025-02-21 16:21:31'),
(442, 98, 'Teens Bedroom furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724067679/pfsfvnloxvgnbl6vldwo.jpg', '1', '2025-02-21 16:21:31'),
(443, 98, 'Teen Lounge Furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724067734/cr26rrhktqmspmogdejj.jpg', '1', '2025-02-21 16:21:32'),
(444, 99, 'Bathroom vanities', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724070868/digkhqulm4yblcdtb73l.jpg', '1', '2025-02-21 16:23:12'),
(445, 99, 'Bathroom cabinet and shelving', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724070907/vpmcu9nryh09xhparwps.jpg', '1', '2025-02-21 16:23:12'),
(446, 99, 'Medicine Cabinet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724070936/narqkl9kbx9o0dpdhfzk.jpg', '1', '2025-02-21 16:23:12'),
(447, 100, 'Custome Headboards', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724082096/rejwmeyhqlrkj28mxdy3.jpg', '1', '2025-02-21 16:28:46'),
(448, 100, 'Custom Bar Stools', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724082137/w33rcdi6o2qkblhbujgb.jpg', '1', '2025-02-21 16:28:46'),
(449, 100, 'Custom Bar Stool', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724082184/e42s8s0ekxefyrvwpbzz.jpg', '1', '2025-02-21 16:28:46'),
(450, 100, 'Custom Dinning Chairs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724082220/q4huqqthv4rhjxdr2lje.jpg', '1', '2025-02-21 16:28:47'),
(451, 101, 'Game', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724153401/jnlv7dwtijxjnfmpatgt.jpg', '1', '2025-02-21 16:30:03'),
(452, 101, 'Games Table', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724153431/llao1kizivbpde4gqh4g.jpg', '1', '2025-02-21 16:30:03'),
(453, 101, 'Gaming Chair', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724153463/vwtaodwdvoqfh06gaqyv.jpg', '1', '2025-02-21 16:30:03'),
(454, 101, 'Gaming Desk', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724153543/yxpfo3cy9dffdytixast.jpg', '1', '2025-02-21 16:30:03'),
(455, 101, 'Theater Seating', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724153605/xhjxrio4cudnmgllihzf.jpg', '1', '2025-02-21 16:30:03'),
(456, 101, 'Beanbag chairs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724153636/imn4pk32j9lo4jeilqls.jpg', '1', '2025-02-21 16:30:03'),
(457, 103, 'Floral fragrances', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728921633/r3iowt62cjrkc7u6l0vh.jpg', '1', '2025-02-21 16:34:28'),
(458, 103, 'Fruity fragrance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728983180/sbnu1qumodgg78qekgux.jpg', '1', '2025-02-21 16:34:28'),
(459, 104, 'Floral fragrances', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728984195/xwgk40bepvbwj5ehdgli.jpg', '1', '2025-02-21 16:35:45'),
(460, 104, 'Oriental Fragrances', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728984476/okrmoxd3fwbrsvkujrnx.jpg', '1', '2025-02-21 16:35:45'),
(461, 104, 'Fruity Fragrance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728984523/stzcquphwnimukq54hlb.jpg', '1', '2025-02-21 16:35:45'),
(462, 105, 'Powdery Scents', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728987236/xie7830c7twhqteffbha.png', '1', '2025-02-21 16:37:31'),
(463, 105, 'Citrus Scent', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728986849/ze9myxu8zcbuwmh1x5qq.png', '1', '2025-02-21 16:37:31'),
(464, 105, 'Floral fragrance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728985542/uridzc5gk1zkwendsuao.jpg', '1', '2025-02-21 16:37:32'),
(465, 105, 'Sweet and Gourmand', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728986542/gld9ve6yinab1x9l5ewh.jpg', '1', '2025-02-21 16:37:32'),
(466, 105, 'Woody Fragrances', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728985716/bugnvliucifu0wzzx34m.jpg', '1', '2025-02-21 16:37:32'),
(467, 105, 'Fresh scent', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728986171/jxjjppbmf2cbuoqeqadg.png', '1', '2025-02-21 16:37:32'),
(468, 106, 'Gift sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728999735/miosuooe2sensjop1t8w.jpg', '1', '2025-02-22 08:01:24'),
(469, 106, 'Travel size sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728999770/m6urrvtvlsoqoom2rcxj.jpg', '1', '2025-02-22 08:01:24'),
(470, 106, 'Mini perfume collection', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1729000208/s6x1p4auldvvwxqs0x4k.jpg', '1', '2025-02-22 08:01:24'),
(471, 108, 'Blouse', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724080446/swtyw7qoanv3lyetzxo3.jpg', '1', '2025-02-22 08:39:20'),
(472, 108, 'Sweaters and cardigans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724250655/y3jcdcrriyr2xhgrluvt.jpg', '1', '2025-02-22 08:39:20'),
(473, 108, 'Outerwears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724080885/e6wd4b3e1vopyhuuaaus.jpg', '1', '2025-02-22 08:39:20'),
(474, 108, 'Bodysuits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724080987/v8sii3w0jcn50cxjczkh.jpg', '1', '2025-02-22 08:39:20'),
(475, 108, 'T-shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724081360/jfrhq29ztkmxvqrbzt4j.jpg', '1', '2025-02-22 08:39:21'),
(476, 109, 'Skirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724081514/jtwdkkvp71ki6zfzslt7.jpg', '1', '2025-02-22 08:43:44'),
(477, 109, 'Straight pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724250743/bbgvtzt0amjjb85fwpow.jpg', '1', '2025-02-22 08:43:44'),
(478, 110, 'Short dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724248439/xw8xdktkichuyuoyfor5.jpg', '1', '2025-02-22 09:37:19'),
(479, 110, 'Long dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724248472/an7q2s235ocahdqrxwjp.jpg', '1', '2025-02-22 09:37:19'),
(480, 110, 'Party dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724248527/lrtvbhu7rpzpwiskefzg.jpg', '1', '2025-02-22 09:37:19'),
(481, 110, 'Special occassion dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724251342/jqdnv11fjfwyfc8bmnld.jpg', '1', '2025-02-22 09:37:19'),
(482, 111, 'Pant set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724248746/lnhev0lx8nxnz6lefpwm.jpg', '1', '2025-02-22 09:38:24'),
(483, 111, 'Short set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724248782/bru5w7seg0fvzj5zw36p.jpg', '1', '2025-02-22 09:38:24'),
(484, 111, 'Skirt set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724248829/xchn3pqtisxt1tvq8sey.jpg', '1', '2025-02-22 09:38:24'),
(485, 111, 'Leggings Sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724249043/ghd42nktunxc5f2hjarg.jpg', '1', '2025-02-22 09:38:24'),
(486, 112, 'A-Line gown', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737018428/tvg1wbs1aw2wid61zcel.jpg', '1', '2025-02-22 09:53:28'),
(487, 112, 'Ball gown dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737018562/zjzxu0rk4iztkm9qujp9.jpg', '1', '2025-02-22 09:53:28'),
(488, 112, 'Mermaid Dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737024949/oyq1qnamtodkeyepruhr.jpg', '1', '2025-02-22 09:53:28'),
(489, 112, 'Sheath wedding dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737025128/bjqrassxvk96qqftnole.jpg', '1', '2025-02-22 09:53:28'),
(490, 113, 'Sleeveless gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737025283/grox1tgyjn6cjt2whpbo.jpg', '1', '2025-02-22 09:54:40'),
(491, 113, 'Long sleeve wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737025391/uysxjqfooxxihwovy9tg.jpg', '1', '2025-02-22 09:54:40'),
(492, 113, 'Off shoulder wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737025495/fuuuywvfzncb4d8y99pc.jpg', '1', '2025-02-22 09:54:40'),
(493, 113, 'Cap sleeve wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737025834/iini8agqrugdux9w6ulp.jpg', '1', '2025-02-22 09:54:40'),
(494, 114, 'Lace wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737026908/iacfabpuyt3zhdfqq2qm.jpg', '1', '2025-02-22 09:55:45'),
(495, 114, 'Satin wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737026989/xpymsclugm3ro7mbbco1.jpg', '1', '2025-02-22 09:55:45'),
(496, 114, 'Tulle wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737027104/xgwwhjiz3yns5014c6ja.jpg', '1', '2025-02-22 09:55:45'),
(497, 114, 'Chiffon wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737027273/c2jqzu5ue782xeba23ct.jpg', '1', '2025-02-22 09:55:45'),
(498, 115, 'Floor-Length wedding gown', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737028074/iesfsmkivcb5cvdlxc0o.jpg', '1', '2025-02-22 09:56:51'),
(499, 115, 'Tea Length wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737028295/lr6rqbeiarfwhbmguoms.jpg', '1', '2025-02-22 09:56:51'),
(500, 115, 'High-low wedding gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737028378/twgw8ym20cecdskuvjkl.jpg', '1', '2025-02-22 09:56:51'),
(501, 115, 'Mini Bridal gowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737028491/f5w6pl7avi2texf4h54r.jpg', '1', '2025-02-22 09:56:51'),
(502, 116, 'Cathedral veils', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737028634/wnoyqmn5utxlgzj6cdqa.jpg', '1', '2025-02-22 09:58:05'),
(503, 116, 'Fingertip veils', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737030176/ayn6wisjejx0j8nt79rz.jpg', '1', '2025-02-22 09:58:05'),
(504, 116, 'Blushers veil', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737029161/bcy1vmc0ioj5rplis3h2.jpg', '1', '2025-02-22 09:58:05'),
(505, 116, 'Birdcage veil', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737029260/pkzpfiztyf4koqxy9qd7.jpg', '1', '2025-02-22 09:58:05'),
(506, 117, 'Bridal Belts and Sashes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737029507/ufez01jy0r5fxh1hqcqg.jpg', '1', '2025-02-22 09:59:03'),
(507, 117, 'Bridal gloves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737029567/ro2ptygekkuphrxc06t5.jpg', '1', '2025-02-22 09:59:03'),
(508, 117, 'Wedding Jewelry', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737029708/benvomfxfzrbhginq47b.jpg', '1', '2025-02-22 09:59:03'),
(509, 117, 'Wedding jewelry', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737029814/ohkgr0gqlndlinxpt6gv.jpg', '1', '2025-02-22 09:59:03'),
(510, 117, 'Weddind Hair Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737029918/l4jefg5evv4teusot4so.jpg', '1', '2025-02-22 09:59:04'),
(511, 120, 'Cowboy hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727202125/dgouwddjmyswbokygeqz.png', '1', '2025-02-22 10:01:41'),
(512, 120, 'Bowler hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192042/cdg2brqfsuwzqnmostlx.jpg', '1', '2025-02-22 10:01:41'),
(513, 120, 'Bucket hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192124/mcbylbwymrjdss5p9qlo.jpg', '1', '2025-02-22 10:01:41'),
(514, 120, 'Beach hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192269/vyibz3hyv3ihh9hlhkkb.jpg', '1', '2025-02-22 10:01:42'),
(515, 120, 'Panama Hat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192400/emcmam96yryx5fugt4ki.jpg', '1', '2025-02-22 10:01:42'),
(516, 120, 'Fedora hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727200368/nzofjemlvvsdtdodptss.png', '1', '2025-02-22 10:01:42'),
(517, 120, 'Top hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727203264/h9r8syr1htooyuibc23n.jpg', '1', '2025-02-22 10:01:42'),
(518, 120, 'Sun hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727202825/e7cujbso6hgfymncfdei.jpg', '1', '2025-02-22 10:01:42'),
(519, 120, 'Ladies hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727203552/rbrmdzjyenpyc7krpxxx.jpg', '1', '2025-02-22 10:01:42'),
(520, 120, 'Ladies party hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727203736/zcwxtdwutfblz905nq8t.jpg', '1', '2025-02-22 10:01:43'),
(521, 121, 'Baseball caps', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727190285/tr40agiq5n2by14cm2py.jpg', '1', '2025-02-22 10:04:29'),
(522, 121, 'Trucker caps', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727190575/ei47tpbk2ca7orbgft2a.jpg', '1', '2025-02-22 10:04:29'),
(523, 121, 'Sports caps', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191187/dhqfk7deopgdodqipqau.jpg', '1', '2025-02-22 10:04:29'),
(524, 121, 'Brim caps', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191249/ak5u9lm9cszn4iesacq5.jpg', '1', '2025-02-22 10:04:29'),
(525, 121, 'Sailors cap', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727202573/dedrobvh0sousfjyo6ug.jpg', '1', '2025-02-22 10:04:29'),
(526, 122, 'Wool scarf', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727200597/ffnoim6ej1ccila2ornb.png', '1', '2025-02-22 10:05:25'),
(527, 122, 'Silk scarf', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727201138/kagpz7bmx5bf9owir1bq.jpg', '1', '2025-02-22 10:05:25'),
(528, 122, 'Cotton scarves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727200814/yw3yznadygzdhlrov1uv.jpg', '1', '2025-02-22 10:05:26'),
(529, 122, 'Polyester scarves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727201078/boybnbevjobsrgtytcq5.jpg', '1', '2025-02-22 10:05:26'),
(530, 122, 'Faux fur scarves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727201561/xmdcxsgji1fbrgozryas.jpg', '1', '2025-02-22 10:05:26'),
(531, 122, 'Knitted scarves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727201896/r7ogxiddetmoiwfxmzom.jpg', '1', '2025-02-22 10:05:26'),
(532, 122, 'Tassel scarves', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727202011/skxwt9bbghpcd6zeljm5.jpg', '1', '2025-02-22 10:05:26'),
(533, 123, 'Aviator sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728379419/lslook2yb1rqqfe6vfzk.jpg', '1', '2025-02-22 10:08:04'),
(534, 123, 'Polarized sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728379484/f1vc0vupoaznjwq7fhbi.jpg', '1', '2025-02-22 10:08:04'),
(535, 123, 'Wayfarer sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728380009/qczjxenjobxkp6gbx7sl.jpg', '1', '2025-02-22 10:08:04'),
(536, 123, 'Sports sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728380305/v7vhxf6l7e9op9nvkumy.jpg', '1', '2025-02-22 10:08:04'),
(537, 124, 'Cat-eye sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728469264/z3hqpvfa5yey9a5agmux.jpg', '1', '2025-02-22 10:10:45'),
(538, 124, 'Oversize sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728469434/qipqtcyds1ufreu8p2tu.jpg', '1', '2025-02-22 10:10:45'),
(539, 124, 'Round sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728469783/ktm5jleogvrr88lxztil.jpg', '1', '2025-02-22 10:10:45'),
(540, 124, 'Fashion sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728470447/tzgkscc9igf3zbd8eyaj.png', '1', '2025-02-22 10:10:45'),
(541, 125, 'Retro frames', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728470823/l2q1lokjic7hmpdb0xj4.png', '1', '2025-02-22 10:12:05'),
(542, 125, 'Mirrored sunglasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728472724/bpiyhrifoybyje8vhus1.jpg', '1', '2025-02-22 10:12:05'),
(543, 126, 'Women Abayas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737463176/x9txn0rzc5upbsspdz0m.jpg', '1', '2025-02-22 11:44:40'),
(544, 126, 'Women Kaftans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737459068/go8bwpf6r1ne8lhjzclp.jpg', '1', '2025-02-22 11:44:40'),
(545, 126, 'Jilbabs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737459608/r3xa6ovyigcqeiywh5ty.jpg', '1', '2025-02-22 11:44:40'),
(546, 126, 'Maxi muslim dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737459987/xxbfxjvqt6hfudra4dj0.jpg', '1', '2025-02-22 11:44:40'),
(547, 127, 'Thobes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737460116/o5y1uzelxzx6dlr94gib.png', '1', '2025-02-22 11:56:11'),
(548, 127, 'Kurtas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737460251/yopezb66c8glt4j6vayn.jpg', '1', '2025-02-22 11:56:12'),
(549, 127, 'Salwar kameez', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737460726/f1uyaldbvtcnai2hw7dr.jpg', '1', '2025-02-22 11:56:12'),
(550, 128, 'Women\'s  Tunics', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737461100/nzwnbaywf5cmaysv68jl.jpg', '1', '2025-02-22 11:57:46'),
(551, 128, 'Maxi muslim skirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737461381/v3qmyy7dmnvpjtzmumsx.jpg', '1', '2025-02-22 11:57:46'),
(552, 129, 'Prayer garment (women)', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737462080/hwdbdkkm8l32addl3juf.jpg', '1', '2025-02-22 11:58:47'),
(553, 129, 'Ihram (Men)', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737462257/opnit0lk6ziw01kjqwnc.jpg', '1', '2025-02-22 11:58:47'),
(554, 129, 'Prayer mats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737462348/xz02pgi5fd1ntun1ufqn.jpg', '1', '2025-02-22 11:58:47'),
(555, 129, 'Tabesh (Prayer beads)', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737462494/qzh59yxrbxhwf8c3xxe9.png', '1', '2025-02-22 11:58:47'),
(556, 130, 'Kufi hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737463040/bizpyxtfwt8zlqigobjr.png', '1', '2025-02-22 11:59:43'),
(557, 130, 'Hijab pins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737462636/ow1llem3q08msmrotpas.jpg', '1', '2025-02-22 11:59:43'),
(558, 130, 'Niqabs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737462746/ws8xito1zjauwtadr1gw.jpg', '1', '2025-02-22 11:59:44'),
(559, 130, 'Islamic jewelry', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737463003/rhngryvhq9yzh2jbybvx.jpg', '1', '2025-02-22 11:59:44'),
(560, 131, 'Xbox Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731316657/cbwqkzr2fjl8285f1mzn.jpg', '1', '2025-02-22 12:05:56'),
(561, 131, 'Nintendo Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731317697/zzg0njywng1jbxsdjkeq.jpg', '1', '2025-02-22 12:05:56'),
(562, 131, 'PC Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731317781/zs6otbrtq1sgrduytarv.jpg', '1', '2025-02-22 12:05:56'),
(563, 131, 'PlayStation Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731320551/h2scpvmx8jvldwffgyxz.jpg', '1', '2025-02-22 12:05:56'),
(564, 132, 'PlayStation Consoles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731320611/mtzjbadplzxpriw0sdbf.jpg', '1', '2025-02-22 12:07:37'),
(565, 132, 'Xbox consoles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731320657/vzktpgzk76hlpibjbedn.jpg', '1', '2025-02-22 12:07:37'),
(566, 132, 'Nintendo Console', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731320716/lzbiwyp97lheyjxjcjyc.jpg', '1', '2025-02-22 12:07:37'),
(567, 132, 'Handheld consoles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731320846/bpumekthj4sw1ydg1yyg.jpg', '1', '2025-02-22 12:07:37'),
(568, 133, 'Controller', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731323256/cuykseeiohygji1ye9bx.jpg', '1', '2025-02-22 12:16:24'),
(569, 133, 'Headset', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731323285/vuinwudzhpvvctadgaot.jpg', '1', '2025-02-22 12:16:24'),
(570, 133, 'Game storage', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731323314/yvch5vs4iqdefyofcw64.jpg', '1', '2025-02-22 12:16:24'),
(571, 133, 'Charging Docks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731323680/t3t2s6ggtqxibdowggsb.jpg', '1', '2025-02-22 12:16:24'),
(572, 134, 'Gaming Keywords', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731337988/tpwvqylgnpyr0makrhrg.jpg', '1', '2025-02-22 12:18:21'),
(573, 134, 'Gaming Mouse', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731338085/soimcrvjtvzqjwpnniaq.jpg', '1', '2025-02-22 12:18:22'),
(574, 134, 'Gaming chairs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731338124/zwnjfsffiwbxqvhoikdk.jpg', '1', '2025-02-22 12:18:22'),
(575, 134, 'Gaming mice', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731338975/yvx63xicuwhmz2ezqc5i.jpg', '1', '2025-02-22 12:18:22'),
(576, 135, 'Strategy Board Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409371/groei720wmz15nwbns19.jpg', '1', '2025-02-22 12:19:15'),
(577, 135, 'Family Board Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409401/fmax1vtxkx8fwpregvlm.jpg', '1', '2025-02-22 12:19:15'),
(578, 135, 'card games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409536/z43t1h0j6iius8w2s3e7.jpg', '1', '2025-02-22 12:19:15'),
(579, 135, 'Party Game', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409612/fwu93esze2kpixodehvn.jpg', '1', '2025-02-22 12:19:15'),
(580, 136, 'Jigsaw puzzles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409677/k3xdefq7kzc0nhzpkt2i.jpg', '1', '2025-02-22 12:20:05'),
(581, 136, '3D Puzzles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409711/qnli6qsaab6ekiwpqsre.jpg', '1', '2025-02-22 12:20:05'),
(582, 136, 'Brain Teasers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409790/w4skwmzf0nnsrhzywqjz.jpg', '1', '2025-02-22 12:20:05'),
(583, 136, 'Educational Puzzle', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409853/phihrshguhvtsajnyw0h.jpg', '1', '2025-02-22 12:20:06'),
(584, 137, 'Sport Equipment', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409911/fjphadwgfdnwv1mthjzf.jpg', '1', '2025-02-22 12:21:00'),
(585, 137, 'Lawn Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409944/irc5sa0cnqimmraocwac.jpg', '1', '2025-02-22 12:21:00'),
(586, 137, 'Darts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731409997/pcggfqfl3g2rvlinncnf.jpg', '1', '2025-02-22 12:21:00'),
(587, 137, 'Arcade Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731410033/vaacybx6tu3je6b7rkjt.jpg', '1', '2025-02-22 12:21:00'),
(588, 138, 'VR Headsets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731410121/chktoyfjcybozeciq48z.jpg', '1', '2025-02-22 12:21:48'),
(589, 138, 'Motion Controllers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731410154/n3amo4qyuuzuedtiqmwb.jpg', '1', '2025-02-22 12:21:48'),
(590, 138, 'VR Compatible Games', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731410196/zdbsvgez3ywisjce0qik.jpg', '1', '2025-02-22 12:21:48'),
(591, 138, 'VR Headset Storage', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731410231/efhoysthplsny7bssav0.jpg', '1', '2025-02-22 12:21:48'),
(592, 143, 'T-Shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724085830/ytzrlboyqfrfrjtxage5.jpg', '1', '2025-02-22 12:30:18'),
(593, 143, 'Polo', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724091114/pxcq7ftxd4rpuzb05qt8.jpg', '1', '2025-02-22 12:30:18'),
(594, 143, 'Denim shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724090252/evdmnvsshs9llh9ckncz.jpg', '1', '2025-02-22 12:30:19'),
(595, 143, 'Formal shirt', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724091181/mximbbwzbkm5gc8tsv94.jpg', '1', '2025-02-22 12:30:19'),
(596, 143, 'Checked shirt', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724094852/cjopnjojpbeykmfj2xrw.jpg', '1', '2025-02-22 12:30:19'),
(597, 143, 'Slim-fit shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724091277/fnusn3cllhbsackmjg6k.jpg', '1', '2025-02-22 12:30:19'),
(598, 143, 'Cotton shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724091411/dwco4eh1u761v4nkq4vo.jpg', '1', '2025-02-22 12:30:19'),
(599, 143, 'Long polo', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724093310/zbzi1812ntmod8ubnexs.jpg', '1', '2025-02-22 12:30:19'),
(600, 143, 'Printed shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724093464/zmcdmvh03uiihl7fzwva.jpg', '1', '2025-02-22 12:30:19'),
(601, 143, 'Shirt Jackets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724093718/aknka4wuhv00vrdfjjxv.jpg', '1', '2025-02-22 12:30:19'),
(602, 143, 'Printed T-Shirt', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724095035/kv0tsgibpplgvof28udn.jpg', '1', '2025-02-22 12:30:19'),
(603, 144, 'Single Breasted suit', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724319209/afsxma3brl9lm6brhym0.jpg', '1', '2025-02-22 12:31:36'),
(604, 144, 'Double Breasted suit', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724319254/dyqp2uago1t5xahnl3nd.jpg', '1', '2025-02-22 12:31:36'),
(605, 144, 'Blazer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724319333/cgkgob7h0235phsodcgc.jpg', '1', '2025-02-22 12:31:36'),
(606, 144, 'Suit Jacket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724319425/ingtmft27yjvhhzpo1uk.jpg', '1', '2025-02-22 12:31:37'),
(607, 144, 'Suits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724325824/ipilgzepcspmbnm51sfj.jpg', '1', '2025-02-22 12:31:37'),
(608, 145, 'Skin Coat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724323179/gbstewo6als2rllp9i4u.jpg', '1', '2025-02-22 12:33:05'),
(609, 145, 'Woolen Coat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724324506/paowqnuif3smxhegkqrc.jpg', '1', '2025-02-22 12:33:05'),
(610, 145, 'Vest', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724324627/ehxhv6xxeyhym3rqvqjz.jpg', '1', '2025-02-22 12:33:06'),
(611, 145, 'Aviator Jacket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724326163/grwk4gmgpcxlkpqvoand.jpg', '1', '2025-02-22 12:33:06'),
(612, 145, 'Denim Jacket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724328018/wbqq9aslmext8bnrhklx.jpg', '1', '2025-02-22 12:33:06'),
(613, 145, 'Woolen Jacket', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724328134/tbwtbfkqlxuawztxnxza.jpg', '1', '2025-02-22 12:33:06'),
(614, 145, 'Leather Coat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724328164/qshpxjtol52khxsuxkfb.jpg', '1', '2025-02-22 12:33:06'),
(615, 145, 'Short Parkas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724339584/mm24mfkbid8dhspkuvgf.jpg', '1', '2025-02-22 12:33:06'),
(616, 145, 'Hooded parkas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724339662/upwozulixy97n1hmfprh.jpg', '1', '2025-02-22 12:33:06'),
(617, 145, 'Long parkas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724339695/g5jdxcs5qkxgarfjnrjn.jpg', '1', '2025-02-22 12:33:06'),
(618, 145, 'Short parkas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724404026/kqmohhkjiw5ffps0retr.jpg', '1', '2025-02-22 12:33:06'),
(619, 146, 'Short Sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724341272/quno2fjcdpdi8vk07iie.jpg', '1', '2025-02-22 12:36:12'),
(620, 146, 'Sport sets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724410027/trivfgj4auyitcl0vmjw.jpg', '1', '2025-02-22 12:36:12'),
(621, 147, 'Pants set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724436499/r0rsiqkaclfuqg1xiud8.jpg', '1', '2025-02-22 12:38:18'),
(622, 147, 'Gym shorts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724416854/l8cqwc3odhhzwqgfc8fc.jpg', '1', '2025-02-22 12:38:19'),
(623, 147, 'Straight pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724416930/qrnbu7ndtzlq7patt7d2.jpg', '1', '2025-02-22 12:38:19'),
(624, 147, 'Board Shorts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724417470/otyqfxovz7imbcznive9.jpg', '1', '2025-02-22 12:38:19'),
(625, 147, 'Cotton linen shorts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724417521/zjru6sjhqkkokgwtg3q1.jpg', '1', '2025-02-22 12:38:19'),
(626, 147, 'Casual Shorts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724417548/ekltivrt1qxrxjghdzvr.jpg', '1', '2025-02-22 12:38:19'),
(627, 147, 'Baggy pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724421312/ddwyqbsnhvwekbe5mrr5.jpg', '1', '2025-02-22 12:38:19'),
(628, 147, 'Leather pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724421340/ztspk5wklwpahzfvhbhf.jpg', '1', '2025-02-22 12:38:19'),
(629, 148, 'Baggy Jeans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724661640/jpfzkkn5tbsw9aohp1yc.jpg', '1', '2025-02-22 12:39:26'),
(630, 148, 'Tapered jeans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724661695/hvoemr1h3kplwi87uxmp.jpg', '1', '2025-02-22 12:39:26'),
(631, 148, 'Ripped jeans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724661728/gkj2mgbmf6kruf478krx.jpg', '1', '2025-02-22 12:39:26'),
(632, 148, 'Washed Jeans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724661759/wezuqkp1qplc9re7iwx4.jpg', '1', '2025-02-22 12:39:26'),
(633, 148, 'Slim jeans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724661784/b3y5qgflcqwafe7ntmd6.jpg', '1', '2025-02-22 12:39:26'),
(634, 149, 'Boxers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724668022/idmn1um6pisuyggqgow3.jpg', '1', '2025-02-22 12:43:28'),
(635, 149, 'Singlets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724668321/u58gis1ijmdoo0u38rdu.jpg', '1', '2025-02-22 12:43:28'),
(636, 149, 'Socks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724789994/qsbsnf6mk7iiuypwnvmj.jpg', '1', '2025-02-22 12:43:28'),
(637, 150, 'Hotel Uniform', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724682179/mhaxikgacreaywhhelg8.jpg', '1', '2025-02-22 12:46:25'),
(638, 150, 'Worshop Uniform', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724682624/ekjmzxnnbgt8bqrly7o8.png', '1', '2025-02-22 12:46:25'),
(639, 150, 'Waiters Uniform', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724682731/zs5mprw2xkswr9dkhjfo.jpg', '1', '2025-02-22 12:46:25'),
(640, 150, 'Food service uniform', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724791143/owkiuwt8b1iq3ui04wn4.jpg', '1', '2025-02-22 12:46:25'),
(641, 150, 'Medical uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724682897/tjcb6lqtxec81usenbez.jpg', '1', '2025-02-22 12:46:25'),
(642, 150, 'Engineering Uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724683028/pbui7bq6lhtbrrfqwc27.jpg', '1', '2025-02-22 12:46:25'),
(643, 150, 'Lawyer’s uniform', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724790878/vdezp3mqxugtl5vw2cll.jpg', '1', '2025-02-22 12:46:26'),
(644, 151, 'T-Shirt', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723712396/cmtzvxo2tfgrug0icoh3.png', '1', '2025-02-22 12:49:11'),
(645, 151, 'Office Shirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723473747/vhqcrfk9icxmwbzrlax6.jpg', '1', '2025-02-22 12:49:11'),
(646, 151, 'Hoodies & Sweatshirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723473664/waarriol7msiadd3s1ry.jpg', '1', '2025-02-22 12:49:11'),
(647, 151, 'Sweaters & Cardigans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723743746/iphmqtyvte99ihfglots.jpg', '1', '2025-02-22 12:49:11'),
(648, 151, 'Tank tops', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723474431/bawrz67wdml3c2l3dcxi.jpg', '1', '2025-02-22 12:49:11'),
(649, 151, 'Bodysuits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723474751/byxr44i6jgmrcorhvwsc.jpg', '1', '2025-02-22 12:49:11'),
(650, 151, 'Graphic Sweatshirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723718554/ldseqj2qxyqqz7uhatpv.jpg', '1', '2025-02-22 12:49:11'),
(651, 151, 'Cropped Sweater', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723486223/ubixlxnt5tuplrjbjfvj.jpg', '1', '2025-02-22 12:49:11'),
(652, 151, 'Outerwears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723486747/ecwwidaupfsdhvtmtjtm.jpg', '1', '2025-02-22 12:49:11'),
(653, 151, 'Blouse', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724320248/b9wz38loxwpvul4z5xbp.jpg', '1', '2025-02-22 12:49:11'),
(654, 152, 'Straight pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723744240/rnfkky7mxtmtpg22wudp.jpg', '1', '2025-02-22 13:06:08'),
(655, 152, 'Shorts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723743227/xibim7fttyqpgyckjnob.jpg', '1', '2025-02-22 13:06:08'),
(656, 152, 'Leggings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723743089/e6npowvfvcrlcodsxrl9.jpg', '1', '2025-02-22 13:06:08'),
(657, 152, 'Skirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723743326/kxowejkxstsxgwrxfv5v.jpg', '1', '2025-02-22 13:06:08'),
(658, 152, 'Baggy pants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723489897/x621wpjwojxzjqefnvb7.jpg', '1', '2025-02-22 13:06:08'),
(659, 152, 'Jumpsuit', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723841276/k0fq5tyuasvoewknlgs3.jpg', '1', '2025-02-22 13:06:08'),
(660, 152, 'Jean', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723843103/umwa2ni6ryltdanj3gem.jpg', '1', '2025-02-22 13:06:08'),
(661, 152, 'Bootcut', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723717647/qrhbbocbeeesmpheosce.jpg', '1', '2025-02-22 13:06:08'),
(662, 153, 'Long Dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723743380/hhhtgwqa0vbh9l9klapf.jpg', '1', '2025-02-22 13:07:41'),
(663, 153, 'Midi Dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723843230/xyrte5kr8mqtqttryj7k.jpg', '1', '2025-02-22 13:07:41'),
(664, 153, 'Knitted Dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723843270/lek4nrlqjs4d4hmxaetm.jpg', '1', '2025-02-22 13:07:41'),
(665, 153, 'Short Dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723743453/dvhgzhhkydme7tdqsgjr.jpg', '1', '2025-02-22 13:07:42'),
(666, 153, 'Formal dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723718613/xuajhguj0zkstsdqkual.jpg', '1', '2025-02-22 13:07:42'),
(667, 154, 'Party Dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723920944/vvswkh6ixkd1p2cv0la6.jpg', '1', '2025-02-22 13:09:32'),
(668, 154, 'Cocktail dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723920980/dvs7i2lcxx3aiktautbf.jpg', '1', '2025-02-22 13:09:32'),
(669, 154, 'Bespoke occassion dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723744420/ekc42hhb5jbqjstgwh7w.jpg', '1', '2025-02-22 13:09:32'),
(670, 154, 'Wedding dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723921007/v8opgscs1anpjnwh5q3y.jpg', '1', '2025-02-22 13:09:32'),
(671, 154, 'Dinner dresses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723921032/cnfxxqmpaxdsvccu4hhr.jpg', '1', '2025-02-22 13:09:32'),
(672, 155, 'Pants set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723576421/w27mu7v4xupu5azcgho3.jpg', '1', '2025-02-22 13:10:41'),
(673, 155, 'Skirt set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723921117/el6xolc8fzbvqouvqvh8.jpg', '1', '2025-02-22 13:10:41'),
(674, 155, 'Short set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723921177/tux5linh3ysqofh0lbvu.jpg', '1', '2025-02-22 13:10:41'),
(675, 156, 'Bikinis', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723719106/h5dig8kdhyprupwoks27.jpg', '1', '2025-02-22 13:18:44'),
(676, 156, 'Tankinis', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723716424/qk91jc1vovxcsob6brer.jpg', '1', '2025-02-22 13:18:45'),
(677, 156, 'Cover up', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723716487/f7el412cuqacxri26nye.jpg', '1', '2025-02-22 13:18:45'),
(678, 156, 'One-piece', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723716542/udnyagdeosdoi5dlskoo.jpg', '1', '2025-02-22 13:18:45'),
(679, 157, 'Pajama set', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723723031/ovmac3jadvz35vhfx7eu.jpg', '1', '2025-02-22 13:20:00'),
(680, 157, 'Sexy lingeries', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723744780/b9x5erc67ml4vcamfazr.jpg', '1', '2025-02-22 13:20:00'),
(681, 157, 'Seamless Bra', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723745839/auku1uwt0vos2vkysyxr.png', '1', '2025-02-22 13:20:00'),
(682, 157, 'Bras', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723746558/mf7u7qpkplwn8hirpmwf.jpg', '1', '2025-02-22 13:20:00'),
(683, 157, 'Push up bras', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723746297/pqudf0vc2zkvkbitlr9a.jpg', '1', '2025-02-22 13:20:00'),
(684, 157, 'Shape wears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723747929/vwz13od4wltjsrqsqxvc.jpg', '1', '2025-02-22 13:20:00'),
(685, 157, 'Panty hose', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723748116/o9zgfbgunwrrx5bizb8w.jpg', '1', '2025-02-22 13:20:00'),
(686, 157, 'Sexy panty hose', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723748845/lugadwhgoh3hdy2pjcdu.jpg', '1', '2025-02-22 13:20:00'),
(687, 157, 'Two-piece Bra and Brief', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723907079/r6yfhqb8y24ezadvpsng.jpg', '1', '2025-02-22 13:20:01'),
(688, 157, 'Lingerie Nightwear’s', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723907211/ajj3mazhjegjzeeulbuo.jpg', '1', '2025-02-22 13:20:01'),
(689, 157, 'Inner Singlet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723907569/deadbdagzklf0n2bxbx4.jpg', '1', '2025-02-22 13:20:01');
INSERT INTO `subcategory` (`id`, `_category`, `_name`, `_image`, `_status`, `_date`) VALUES
(690, 157, 'Camisole', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723907677/gcdh8sfannvf7jl06ak8.jpg', '1', '2025-02-22 13:20:01'),
(691, 157, 'Seamless panties', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723908168/hpwlivfgkiiudyplkv1r.jpg', '1', '2025-02-22 13:20:01'),
(692, 157, 'G-Strings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723908201/kxpfd5gtszofeg5xtvvu.jpg', '1', '2025-02-22 13:20:01'),
(693, 157, 'Lace panties', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723908865/byldgyyxjabmd2immhdw.jpg', '1', '2025-02-22 13:20:01'),
(694, 157, 'Cover up panties', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1723908927/u6k3t8k2bxarkn5i0kfb.jpg', '1', '2025-02-22 13:20:01'),
(695, 157, 'Cotton panties', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724066649/qkdfmitr5nkkhcosssje.jpg', '1', '2025-02-22 13:20:01'),
(696, 158, 'Hotel Uniform', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724065504/lrgma1oleaelp6otrkxl.jpg', '1', '2025-02-22 13:22:37'),
(697, 158, 'Workshop Uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724065671/oxtr2b9whtcg1ltt8lnu.jpg', '1', '2025-02-22 13:22:37'),
(698, 158, 'Food service uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724065848/tmm6y1vpyemxytzd1to6.jpg', '1', '2025-02-22 13:22:37'),
(699, 158, 'Medical Uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724065947/xa20590yw4kv3zgseedu.jpg', '1', '2025-02-22 13:22:37'),
(700, 158, 'Engineering Uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724066058/wzvuwymvgqza9r3d4t88.jpg', '1', '2025-02-22 13:22:37'),
(701, 158, 'Fire Service Uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724066104/gurxhqynae7v4n1uarux.jpg', '1', '2025-02-22 13:22:37'),
(702, 158, 'Lawyers uniforms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724790174/vopqphhcx8mqawxo59uk.jpg', '1', '2025-02-22 13:22:37'),
(703, 159, 'Ballet dance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724073621/r5q29uo67m9y30wsiarr.jpg', '1', '2025-02-22 13:24:25'),
(704, 159, 'Latin Dance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724077942/ezfltfosedgcrb0o41qk.jpg', '1', '2025-02-22 13:24:25'),
(705, 159, 'Flamenco wears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724078000/ny8ffqo9qgly8fxikql1.jpg', '1', '2025-02-22 13:24:26'),
(706, 159, 'Modern dance wear', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724078066/bio40ggsdhkvhbwd50xl.jpg', '1', '2025-02-22 13:24:26'),
(707, 159, 'Salsa dance wears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724078108/buhvup75huwidtld3aa5.jpg', '1', '2025-02-22 13:24:26'),
(708, 160, 'African wears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724078357/ccfttatgxzf6qxgn8sgv.jpg', '1', '2025-02-22 13:25:32'),
(709, 160, 'Indian and Pakistan wears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724078852/ylqllfvbx1s2kj1hhp3r.jpg', '1', '2025-02-22 13:25:32'),
(710, 161, 'Pliers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727204867/oqrbo90rxjvkc3yop3do.jpg', '1', '2025-02-22 13:30:48'),
(711, 161, 'Wrenches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727204991/avi2bh6kjiyunw1tchug.jpg', '1', '2025-02-22 13:30:48'),
(712, 161, 'Screwdrivers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727205353/wraixj3b4xinanzfcb9s.jpg', '1', '2025-02-22 13:30:48'),
(713, 161, 'Hammers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727205257/lcbb0h44qztoyyhaoz4q.jpg', '1', '2025-02-22 13:30:48'),
(714, 162, 'Drills', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727205663/gabjs5rchlwglm1cacw4.jpg', '1', '2025-02-22 13:31:32'),
(715, 162, 'Saws', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727205769/ewjyhq6smyed6mfebwj1.jpg', '1', '2025-02-22 13:31:32'),
(716, 162, 'Sanders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727342992/pmpb0xx9ekc7co6gvloi.jpg', '1', '2025-02-22 13:31:32'),
(717, 162, 'Grinder', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727343266/a4pyflmthaomyaatfvua.jpg', '1', '2025-02-22 13:31:32'),
(718, 163, 'Tape measure', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727343511/hvvu1faufarawuth6jmt.jpg', '1', '2025-02-22 13:32:51'),
(719, 163, 'Calipers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727343623/a3kv2ptuhyb2qlo3vft6.jpg', '1', '2025-02-22 13:32:51'),
(720, 163, 'Level tool', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727343796/icunulj2zeskjwibupem.jpg', '1', '2025-02-22 13:32:51'),
(721, 163, 'Stud finder', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727343931/tcvyl3jh33zdyqy6oyhy.png', '1', '2025-02-22 13:32:52'),
(722, 164, 'Multimeters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727344224/io8cs1wce8dmpdu9m28p.jpg', '1', '2025-02-22 13:33:52'),
(723, 164, 'Circuit testers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727344345/ze2tpcujpsnm8wsba1pd.jpg', '1', '2025-02-22 13:33:52'),
(724, 164, 'Socket testers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727344517/m2rnwsfffo2zckolm8fu.png', '1', '2025-02-22 13:33:52'),
(725, 165, 'Rakes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727428385/vhwwv7eao8jfy9zbstvk.png', '1', '2025-02-22 13:34:43'),
(726, 165, 'Garden hoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727428460/ag70zrjal1qwtjgesspe.jpg', '1', '2025-02-22 13:34:43'),
(727, 165, 'Trowels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727428591/ayaxvctf5hxrcrpbt2t1.jpg', '1', '2025-02-22 13:34:43'),
(728, 165, 'Pruning shears', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727428704/zxplos9qaizvs4lozqf8.png', '1', '2025-02-22 13:34:43'),
(729, 165, 'Watering cans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727429141/wiy4vc0qjozneuwtrpzn.jpg', '1', '2025-02-22 13:34:43'),
(730, 166, 'Pipes and fittings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727429317/wx4p9iv58y0sgx6awwp2.jpg', '1', '2025-02-22 13:35:30'),
(731, 166, 'Water faucets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727955489/dqsmjy2nh1cmhcbeqxio.png', '1', '2025-02-22 13:35:30'),
(732, 166, 'Toilets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727429548/oq7zfodqtgflhmss72wq.jpg', '1', '2025-02-22 13:35:30'),
(733, 166, 'Sinks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727955538/py23frfp49o5rp54ltsk.jpg', '1', '2025-02-22 13:35:30'),
(734, 166, 'Water heater', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727956303/xcwtykbqlydk68erbndc.jpg', '1', '2025-02-22 13:35:30'),
(735, 167, 'Flooring materials', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727956795/ojy1rw7wqqrsl9ywferi.jpg', '1', '2025-02-22 13:36:44'),
(736, 167, 'Home paints', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727956917/amxvtmqstz3semaellws.jpg', '1', '2025-02-22 13:36:45'),
(737, 167, 'Plaster wall sheets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727957131/wp4wbxyrnr2npylwaua1.jpg', '1', '2025-02-22 13:36:45'),
(738, 168, 'Artificial Christmas Tree', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165073/sy6vrfhvq7putdnkzzee.jpg', '1', '2025-02-22 13:38:58'),
(739, 168, 'Tree ornaments', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165144/ehrthlhvslubibevbt4o.jpg', '1', '2025-02-22 13:38:58'),
(740, 168, 'String light', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165166/ionrzw4keudgbbtlyv26.jpg', '1', '2025-02-22 13:38:58'),
(741, 168, 'Tree skirts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165211/mvfedziwyqz3vmtbfl3q.jpg', '1', '2025-02-22 13:38:58'),
(742, 169, 'Wreaths', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165329/cnygarsoo55dunxfbizq.jpg', '1', '2025-02-23 05:53:32'),
(743, 169, 'Garlands', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165398/hxp0oisiwi5amxm3xg2r.jpg', '1', '2025-02-23 05:53:32'),
(744, 169, 'Christmas stockings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165444/v9mc2toxszopdyuuueth.jpg', '1', '2025-02-23 05:53:32'),
(745, 169, 'Table centerpiece', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165485/utcyaaf9avinoznh0gbl.jpg', '1', '2025-02-23 05:53:32'),
(746, 170, 'Inflatable decoration', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165755/sy3r315xvfrbnrbnz9ek.jpg', '1', '2025-02-23 05:54:38'),
(747, 170, 'Outdoor string light', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165782/xvjjtprhyan8vrbriumu.jpg', '1', '2025-02-23 05:54:39'),
(748, 170, 'Lawn ornaments', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165820/tybrp1d39ds73qr07y0v.jpg', '1', '2025-02-23 05:54:39'),
(749, 170, 'Christmas projectors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732165875/yn3chw02hieprgknbpn4.jpg', '1', '2025-02-23 05:54:39'),
(750, 171, 'Santa Suits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732167939/b66lzeb9ndxmbnjzddrz.jpg', '1', '2025-02-23 05:55:51'),
(751, 171, 'Christmas Sweaters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732177867/zeozcf06ren9xzelkz4h.jpg', '1', '2025-02-23 05:55:51'),
(752, 171, 'Christmas pajama', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732177997/doek2m5d6ddwco1zecas.jpg', '1', '2025-02-23 05:55:51'),
(753, 171, 'Holiday Accesssories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178028/ivkslw26gjck4eaqidkm.jpg', '1', '2025-02-23 05:55:51'),
(754, 172, 'Wrapping paper', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178094/kazedair6jh9gmbkczgl.jpg', '1', '2025-02-23 05:56:44'),
(755, 172, 'Gift bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178124/wtfrvajjnm5ffcbaetzu.jpg', '1', '2025-02-23 05:56:44'),
(756, 172, 'Ribbons and bows', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178178/oyjoewrbxmbfui6extr3.jpg', '1', '2025-02-23 05:56:44'),
(757, 172, 'Gitft tags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178206/ofcswttwmtsgarmx43sr.jpg', '1', '2025-02-23 05:56:44'),
(758, 173, 'Christmas tableware', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178275/bupx7rsu9khj1bclzkon.jpg', '1', '2025-02-23 05:57:35'),
(759, 173, 'Party Hats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178306/uhtvizslk7rj59prrwzk.jpg', '1', '2025-02-23 05:57:36'),
(760, 173, 'Holiday Napkins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178341/swu13fp8w3hu8hnq8r0t.jpg', '1', '2025-02-23 05:57:36'),
(761, 173, 'Christmas crackers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732178371/gxngcbme6mbffjcf1jku.jpg', '1', '2025-02-23 05:57:36'),
(762, 174, 'Nativity scenes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732179713/zmu4sdexse1bw6xybpc6.jpg', '1', '2025-02-23 05:58:43'),
(763, 174, 'Angel Figurines', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732179739/ypj5oskmem76cwteg2ak.jpg', '1', '2025-02-23 05:58:43'),
(764, 174, 'Advent calendar', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732179765/bca6uxkt5fqbfzrdfdnp.jpg', '1', '2025-02-23 05:58:43'),
(765, 174, 'Cross ornaments', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732179793/rjgop7o2sa4gdy9hgogv.jpg', '1', '2025-02-23 05:58:43'),
(766, 175, 'Cookie cutters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732179860/fx9rlna3bsfpb0vsf02g.jpg', '1', '2025-02-23 05:59:48'),
(767, 175, 'Christmas molds', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732179952/csw8qqbegbaun8eprcqw.jpg', '1', '2025-02-23 05:59:48'),
(768, 175, 'Festive tablecloth', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732180009/lhwuyq9mdgxopqzst8uo.jpg', '1', '2025-02-23 05:59:48'),
(769, 175, 'Holiday Aprons', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732180039/uibodn8cmfb577pmg58l.jpg', '1', '2025-02-23 05:59:48'),
(770, 176, 'Christmas CDs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732180108/xeueb0faubsyshlgw1xm.jpg', '1', '2025-02-23 06:00:55'),
(771, 176, 'Holiday Movies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732180133/bqdyamtpwicsbyijwrnl.jpg', '1', '2025-02-23 06:00:56'),
(772, 176, 'Festive Books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732180387/mpp8e0mjhhhkgeurezga.jpg', '1', '2025-02-23 06:00:56'),
(773, 176, 'Karaoke Machines', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732180423/scmhdeciscfrzutd4x2m.jpg', '1', '2025-02-23 06:00:56'),
(774, 177, 'Personal Lubricants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731061069/k99igel7uyarudg7sqzd.jpg', '1', '2025-02-23 06:03:05'),
(775, 177, 'Intimate Washes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731061119/lo0grwr1ng0stgfwlehl.jpg', '1', '2025-02-23 06:03:05'),
(776, 177, 'Moisturizer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731061154/d9gbvgty2dufgg9efnbf.jpg', '1', '2025-02-23 06:03:05'),
(777, 177, 'Wipe', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731061181/xu6b0ilmpr9xkgdkhuah.jpg', '1', '2025-02-23 06:03:05'),
(778, 178, 'Condoms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731061285/bttdnm7uzplkcssuxgrc.jpg', '1', '2025-02-23 06:04:02'),
(779, 178, 'Spermicide', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731061334/bpibcuq0y1fxd5nby3wc.jpg', '1', '2025-02-23 06:04:02'),
(780, 178, 'Female Condoms', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731061432/lqu8w9x8rrla5nmscd59.jpg', '1', '2025-02-23 06:04:02'),
(781, 178, 'Contraceptive Sponges', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731063332/dwffrj8fbhatahffduph.jpg', '1', '2025-02-23 06:04:02'),
(782, 179, 'Libido Enhancers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731063409/soyjky7cvkrk8magmsxg.jpg', '1', '2025-02-23 06:05:03'),
(783, 179, 'Fertility Supplements', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731063441/jozac4xqdutwmx7v7usv.jpg', '1', '2025-02-23 06:05:03'),
(784, 179, 'Energu Boosters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731063539/vdvf9x82yx0jzcachbyy.jpg', '1', '2025-02-23 06:05:03'),
(785, 179, 'Hotmone Balance Supplements', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731063582/vxtibv2njcxsdqedz51z.jpg', '1', '2025-02-23 06:05:03'),
(786, 180, 'Personal Massagers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731068543/u0ml6uqi5z8bgfrj5qrd.jpg', '1', '2025-02-23 06:06:25'),
(787, 180, 'Couples’ Massagers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731068592/vzxpczghiugliuuspofc.jpg', '1', '2025-02-23 06:06:25'),
(788, 180, 'Vibrators', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731068683/xomqbufzwa2ya36oozim.jpg', '1', '2025-02-23 06:06:25'),
(789, 180, 'Dildos', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731068708/zqpteckkbi3jf4d0abxn.jpg', '1', '2025-02-23 06:06:25'),
(790, 180, 'Rings', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731068735/qlstlqonusr2kg4cut9u.jpg', '1', '2025-02-23 06:06:25'),
(791, 181, 'Books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731068800/ovxijtpykhqhdwabsjxm.jpg', '1', '2025-02-23 06:07:20'),
(792, 181, 'Informational Guides', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731069296/zmnuseejfc4qyik2yvom.jpg', '1', '2025-02-23 06:07:20'),
(793, 181, 'Sexual Health Kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731069329/zqrzxogtqfkronkzcnhf.jpg', '1', '2025-02-23 06:07:20'),
(794, 181, 'Online Courses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731069363/nohnk5r0t4irwrbydbgi.jpg', '1', '2025-02-23 06:07:20'),
(795, 182, 'Travel Cases', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731069436/jdhzq7yyjrmmlv4cdqli.jpg', '1', '2025-02-23 06:08:16'),
(796, 182, 'Lockable storage bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731069469/jwwebuz9hvlxnexx2wwt.jpg', '1', '2025-02-23 06:08:16'),
(797, 182, 'Discreet pouches', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731069514/uufipejzm6fi6px5u7g4.jpg', '1', '2025-02-23 06:08:16'),
(798, 182, 'Organizers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731069545/ukgyzbb1sta6hiza6jux.jpg', '1', '2025-02-23 06:08:16'),
(799, 183, 'Historic Costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738649669/gnucisevvod6fleyutrz.png', '1', '2025-02-23 06:12:18'),
(800, 183, 'Super Hero Costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738649778/he4thfjiqfbewfp3y17z.jpg', '1', '2025-02-23 06:12:18'),
(801, 183, 'Movie and TV costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738650101/xzzqeotqfotpyle5791p.jpg', '1', '2025-02-23 06:12:18'),
(802, 183, 'Horror Costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738651086/ucawaq9sd4zjfyqtypxs.png', '1', '2025-02-23 06:12:18'),
(803, 183, 'Ritro and vintage costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738652079/rsb3k0jsgw5wokzn10ua.jpg', '1', '2025-02-23 06:12:18'),
(804, 184, 'Kids superhero costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738652219/qlunwrwfuknatbevydq8.jpg', '1', '2025-02-23 06:13:14'),
(805, 184, 'Prince costume', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738652454/wqtiq4bt9aoowchsxpuk.png', '1', '2025-02-23 06:13:15'),
(806, 184, 'Princess costume', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738652490/ny1jqtuc0bappnih1bgi.jpg', '1', '2025-02-23 06:13:15'),
(807, 184, 'Kids Animal Costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738652642/pgjiswtuxk8czxkrk3nq.png', '1', '2025-02-23 06:13:15'),
(808, 184, 'Kids career costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738652820/liaufreiggt4mrtbkg6d.png', '1', '2025-02-23 06:13:15'),
(809, 184, 'Kids Disney character costumes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738653067/movv567a4b1a6bw9uiix.jpg', '1', '2025-02-23 06:13:15'),
(810, 185, 'Crowns', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738653504/xmuyliqrkjxcboduzv39.png', '1', '2025-02-23 06:14:30'),
(811, 185, 'Eye masks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738653703/znw4nuzp9uvofpzlrghe.png', '1', '2025-02-23 06:14:30'),
(812, 185, 'Costume Helmet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738653888/jamz7kv81no3zlaosklt.jpg', '1', '2025-02-23 06:14:30'),
(813, 186, 'Stilettos', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724419137/lslj3v7lzzntipu6g4u5.jpg', '1', '2025-02-23 06:16:36'),
(814, 186, 'Sandal heels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724330297/awkbrs89hyi9xubdoqy6.jpg', '1', '2025-02-23 06:16:36'),
(815, 186, 'Kitten heels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724330327/jxh29altc3msk7lu96xe.jpg', '1', '2025-02-23 06:16:36'),
(816, 186, 'Block heels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724419209/v5p4on4usitaeqekne8i.jpg', '1', '2025-02-23 06:16:36'),
(817, 186, 'Platform', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724331849/sk5ioupz8palkpaoyt26.jpg', '1', '2025-02-23 06:16:36'),
(818, 186, 'Wedge shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724343262/iaqv7i8wgyx1l48pwiir.jpg', '1', '2025-02-23 06:16:36'),
(819, 186, 'Slingback shoe', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724346460/c8ie8sjkgigcbxrwkfpl.jpg', '1', '2025-02-23 06:16:36'),
(820, 187, 'Ballet flat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724342649/o1khli9jvty59p1a2v88.png', '1', '2025-02-23 06:17:35'),
(821, 187, 'Sneakers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724344351/wkvzhrpetlk1wuaigmey.jpg', '1', '2025-02-23 06:17:35'),
(822, 187, 'Slip-ons', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724528603/aw2ggds7udecraubcngi.png', '1', '2025-02-23 06:17:35'),
(823, 187, 'Flip-flops', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724347589/bnmifuaghzk2q0mu3ag9.jpg', '1', '2025-02-23 06:17:35'),
(824, 188, 'Kneel boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724333315/r2fdauaam0ovb8mva3ba.jpg', '1', '2025-02-23 06:18:47'),
(825, 188, 'Hiking boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724333625/hkvbarzxnn1vn8fy9jdu.jpg', '1', '2025-02-23 06:18:47'),
(826, 188, 'Ankle boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724520194/mx4bsfmsuykxzp6o0n94.jpg', '1', '2025-02-23 06:18:47'),
(827, 188, 'Rain boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724345899/u6imtxtorqwyicchrgn0.jpg', '1', '2025-02-23 06:18:47'),
(828, 189, 'Sequined Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724334775/kjao2almpl5efnhszyos.jpg', '1', '2025-02-23 06:19:48'),
(829, 189, 'Embelished shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724335011/ky1tpwjcle5b4qhcchdz.jpg', '1', '2025-02-23 06:19:48'),
(830, 189, 'Exotic Skin Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724335387/ineo7jpcnzxesyt7qjtq.jpg', '1', '2025-02-23 06:19:48'),
(831, 190, 'Soft soled shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737542443/lnpnctygerm0mkfofdz8.jpg', '1', '2025-02-23 06:21:24'),
(832, 190, 'Booties', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737542735/xzdvxxuswbv1oanpgg7t.jpg', '1', '2025-02-23 06:21:24'),
(833, 190, 'Slip-on socks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737542840/spos8gnfv3jqaiupottl.jpg', '1', '2025-02-23 06:21:24'),
(834, 190, 'Toddlers Sandals', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737543117/nsztwoyvnlembygsxtrd.jpg', '1', '2025-02-23 06:21:24'),
(835, 190, 'Toddlers fashion shoe', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738646276/dajjop0pe3te5d9warvo.jpg', '1', '2025-02-23 06:21:25'),
(836, 190, 'Toddlers Dress Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738646377/mnlqz8sl6mhpciclyo8e.jpg', '1', '2025-02-23 06:21:25'),
(837, 191, 'Children sneakers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737543620/mpnn3cpkz69cv6x5zitx.jpg', '1', '2025-02-23 06:22:28'),
(838, 191, 'Children loafers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737543747/nwbp3jbnnzcopxglq9gf.jpg', '1', '2025-02-23 06:22:28'),
(839, 191, 'Children slip-on', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737543895/kyhnznerh92arpsr9yyg.jpg', '1', '2025-02-23 06:22:28'),
(840, 191, 'Children mocassino', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737544020/l6rsbc7hjf7sa7vi7x1u.jpg', '1', '2025-02-23 06:22:28'),
(841, 192, 'Dress shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737544197/qecqxxs9hdw9opswxg9f.jpg', '1', '2025-02-23 06:23:17'),
(842, 192, 'Oxford shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1737544343/nuldetfhsngtuturpdsw.jpg', '1', '2025-02-23 06:23:17'),
(843, 192, 'Brogues shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738645176/ytu6pcuxavtnct4igbuk.jpg', '1', '2025-02-23 06:23:17'),
(844, 192, 'Patent leather shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738645300/sb09fdyszvjvuam1go7l.jpg', '1', '2025-02-23 06:23:18'),
(845, 193, 'Children Hiking Boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738645528/pla0x8sxjuio9fntg0nf.jpg', '1', '2025-02-23 06:24:13'),
(846, 193, 'Children Rain Boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738645604/py4ultog63qx6k0iawje.jpg', '1', '2025-02-23 06:24:13'),
(847, 193, 'Snow Boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738645707/nc6o85tg4u0e3ahc3hox.jpg', '1', '2025-02-23 06:24:13'),
(848, 193, 'Children Sandals', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738645842/vqj3luph7wu9cvqy97wq.png', '1', '2025-02-23 06:24:13'),
(849, 194, 'Children Running Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738646840/aom3x6nlj8wphky6ieev.jpg', '1', '2025-02-23 06:27:23'),
(850, 194, 'Basketball Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738646977/hv8fgrn140p39dqp19dj.jpg', '1', '2025-02-23 06:27:23'),
(851, 194, 'Children Soccer cleats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738647067/oe4x55m1yswrcplrzoie.jpg', '1', '2025-02-23 06:27:23'),
(852, 194, 'Children Tennis Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738647148/h4jabl8sd0gcmgefzmwd.jpg', '1', '2025-02-23 06:27:24'),
(853, 195, 'Ballet Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738647273/tg0dfkob7y1mdxglktz7.jpg', '1', '2025-02-23 06:28:38'),
(854, 195, 'Children Tap Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738647370/izcce7ktcnjmue1hvyfv.jpg', '1', '2025-02-23 06:28:39'),
(855, 195, 'Children Jazz Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738647449/ka1gntm0gfu30wguzorf.jpg', '1', '2025-02-23 06:28:39'),
(856, 196, 'Party shoes for girls', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738648148/bbh4xmzsoaacom7koodd.jpg', '1', '2025-02-23 06:30:40'),
(857, 196, 'Prom Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738647905/dqp9rzvx3wwev42vkmus.jpg', '1', '2025-02-23 06:30:40'),
(858, 196, 'Party shoes for boys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738648242/ynzjscuv9eeoh6dq312h.png', '1', '2025-02-23 06:30:41'),
(859, 197, 'Shoes insoles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738649013/woi6drqw8qql6eevx5tn.png', '1', '2025-02-23 06:31:30'),
(860, 197, 'Spring Shoes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738648841/f6krsi1kkgi5inpyftt2.jpg', '1', '2025-02-23 06:31:30'),
(861, 197, 'Shoes Lace', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738649128/eeu7jxymldjysgoidhcl.jpg', '1', '2025-02-23 06:31:30'),
(862, 197, 'Shoes Rhinestone clips', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1738649225/asiaeh9hxu1k1tkse5gy.png', '1', '2025-02-23 06:31:30'),
(863, 198, 'Apple phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725885376/ke7c8i52953a0czxy6nf.jpg', '1', '2025-02-23 06:33:13'),
(864, 198, 'Samsung phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725887374/e3zxuqd02rgtogbrqbkv.jpg', '1', '2025-02-23 06:33:13'),
(865, 198, 'Google pixel phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725888621/ivrvs2ktnrgb9fyuaq83.jpg', '1', '2025-02-23 06:33:13'),
(866, 198, 'Oneplus phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725886702/oix9pj8sfcy4irqig3am.jpg', '1', '2025-02-23 06:33:13'),
(867, 198, 'Huawei phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725888794/htschfkn2qzz9xcsqq7y.jpg', '1', '2025-02-23 06:33:13'),
(868, 198, 'Xiaomi phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725887644/l6nfusy9v2sihemlzrzn.jpg', '1', '2025-02-23 06:33:13'),
(869, 198, 'Oppo phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725887921/sqmjjecr8fdxik0e92c0.jpg', '1', '2025-02-23 06:33:13'),
(870, 198, 'Vivo phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725889383/brt9qxpvlrcz692i22cs.png', '1', '2025-02-23 06:33:13'),
(871, 198, 'Nokia phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725889447/nba3nsvlxlynlpqqd7ij.jpg', '1', '2025-02-23 06:33:13'),
(872, 198, 'Infinix phpnes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725890060/cmm0ym5c6emlsuto68us.jpg', '1', '2025-02-23 06:33:13'),
(873, 198, 'Tecno phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1725891102/sl3opofkiltuaaagounq.jpg', '1', '2025-02-23 06:33:14'),
(874, 199, 'Feature phones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731662088/xopitvbldb3glgbt4kr5.jpg', '1', '2025-02-23 06:34:16'),
(875, 200, 'Phone cases', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731668326/p1pbu2ftsn3zjzjobos4.jpg', '1', '2025-02-23 06:36:27'),
(876, 200, 'Screen protectors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731668476/a9bg2jqeb5o9kjja80un.png', '1', '2025-02-23 06:36:27'),
(877, 200, 'Phone chargers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731668559/omcin8bwrabonqabfaka.jpg', '1', '2025-02-23 06:36:27'),
(878, 200, 'Phone charging cables', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731668653/eqvfoyoqtdsatf2fi8j0.png', '1', '2025-02-23 06:36:27'),
(879, 200, 'Headphones', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731668897/cfr6hi5agna4qwzk9eif.jpg', '1', '2025-02-23 06:36:27'),
(880, 200, 'Earbuds', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731668972/arhcbdkcunfp1enfqsxs.jpg', '1', '2025-02-23 06:36:27'),
(881, 200, 'Power banks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731669033/pzepn8mpz2funjkckfjp.png', '1', '2025-02-23 06:36:27'),
(882, 200, 'Selfie sticks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731669120/hlbqbza18tgckkykrgcp.png', '1', '2025-02-23 06:36:27'),
(883, 200, 'Phones wallet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731669228/jjaup2chvggzh45bag5q.png', '1', '2025-02-23 06:36:27'),
(884, 200, 'Lens caps', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731679016/f1is3rlundfwtmhbxv6c.jpg', '1', '2025-02-23 06:36:27'),
(885, 201, 'Chain curtains', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724232098/k3azabyfve4j2f0q38cq.jpg', '1', '2025-02-23 06:38:41'),
(886, 201, 'Blinds', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724232129/icgdztppo8xlbooqtkwx.jpg', '1', '2025-02-23 06:38:41'),
(887, 201, 'Curtain Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724232159/wpuqhxjmyxan865uzwuj.jpg', '1', '2025-02-23 06:38:42'),
(888, 202, 'Wall Clocks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234355/pkru3tmm8guxgsze3jhx.png', '1', '2025-02-23 06:39:31'),
(889, 202, 'Picture frames', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234397/jtq0oloxp7sqmmike3th.jpg', '1', '2025-02-23 06:39:31'),
(890, 202, 'Wall decor items', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234443/qdchgbxwfqk6grakzdz8.jpg', '1', '2025-02-23 06:39:31'),
(891, 202, 'Candles', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234476/dkeuf6rqyd6umjjwiy9u.jpg', '1', '2025-02-23 06:39:31'),
(892, 202, 'Candle holder', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234548/cdi2ypvzn0ood84znd8o.jpg', '1', '2025-02-23 06:39:31'),
(893, 202, 'Rugs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234577/er0nzauuwfknw4a54fcy.jpg', '1', '2025-02-23 06:39:31'),
(894, 202, 'Mats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234692/muirvp7ffsajdqky1d9u.jpg', '1', '2025-02-23 06:39:31'),
(895, 202, 'Pot plant stand', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234736/e0rynrwcngvxhqqago5w.jpg', '1', '2025-02-23 06:39:31'),
(896, 202, 'Mirror', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234760/cojzytls4aavkz0uyypd.jpg', '1', '2025-02-23 06:39:32'),
(897, 202, 'Artificial Flower and vases', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234801/jm4t4yhgdyxonqo7bkyf.jpg', '1', '2025-02-23 06:39:32'),
(898, 202, 'Diffuser', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234911/sokpgx2kzemwqvvpry7o.jpg', '1', '2025-02-23 06:39:32'),
(899, 202, 'Book Racks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234962/cpo1qhe43lnyhwsweghb.jpg', '1', '2025-02-23 06:39:32'),
(900, 202, 'Shelving', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724234993/jp3n7u07k7agnhf8mm67.jpg', '1', '2025-02-23 06:39:32'),
(901, 202, 'Home fragrance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1724235027/vaqoucwdql8x2gi5izlf.jpg', '1', '2025-02-23 06:39:32'),
(902, 203, 'Microwave', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186232/mswfe1rogzvnqbcsmyj5.jpg', '1', '2025-02-23 06:43:33'),
(903, 203, 'Infrared and induction cooker', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186301/kcv2bv0frbvpcqjzado0.jpg', '1', '2025-02-23 06:43:33'),
(904, 203, 'standing and table top gas cooker', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186355/jhyesrxuasbbgfyouchn.jpg', '1', '2025-02-23 06:43:33'),
(905, 203, 'Electric cookers and hot plates', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186400/ibb0hkyev15qfxqpnn72.jpg', '1', '2025-02-23 06:43:33'),
(906, 203, 'Electric Built-in-oven gas', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186574/qhuoncakhcsinhrjlokg.jpg', '1', '2025-02-23 06:43:33'),
(907, 203, 'Charcoal stove', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727186506/mhafy0b3tixdd42ezuyc.jpg', '1', '2025-02-23 06:43:33'),
(908, 204, 'Juicer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187376/bjmpuxgimu2ilie19hgo.jpg', '1', '2025-02-23 06:44:51'),
(909, 204, 'Foodscale', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187411/gvultjxmnveypjewqmsj.jpg', '1', '2025-02-23 06:44:51'),
(910, 204, 'Waffle maker', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187442/rbipfarmwarhubzckcfg.jpg', '1', '2025-02-23 06:44:51'),
(911, 204, 'Bread mixer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187491/ef6emeq9fywctdakefm9.jpg', '1', '2025-02-23 06:44:51'),
(912, 204, 'Blender', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187547/jtdlnmin9ulcrohhxthm.jpg', '1', '2025-02-23 06:44:51'),
(913, 204, 'Coffee grinder', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187914/r5v5slj7moepb99tdeop.jpg', '1', '2025-02-23 06:44:51'),
(914, 204, 'Pasta making', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187959/bgmz4nur1qy0o5g38niy.jpg', '1', '2025-02-23 06:44:51'),
(915, 204, 'Deep fryer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727187991/r6mlbdxduxl5oqptsqkn.jpg', '1', '2025-02-23 06:44:51'),
(916, 204, 'Hand mixer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727188021/ng9ngrqnyxiq01lv6kyc.jpg', '1', '2025-02-23 06:44:52'),
(917, 204, 'Sandwich maker', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727188061/jfflmfdw9wumtlj7l6yq.jpg', '1', '2025-02-23 06:44:52'),
(918, 204, 'Dish washer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727188087/metxzqtw8azw8hibdeqn.jpg', '1', '2025-02-23 06:44:52'),
(919, 204, 'Toaster', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727188123/xcn4yvz2cqwfoc6ev0ow.jpg', '1', '2025-02-23 06:44:52'),
(920, 204, 'Pot holders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727203123/vwpjh3doxjimdjumdmwj.jpg', '1', '2025-02-23 06:44:52'),
(921, 205, 'Can opener', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727190894/wekorgmtbjvx7hb7vayi.jpg', '1', '2025-02-23 06:46:14'),
(922, 205, 'Peeler', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727190943/thxnhtkfeu4yyqzfmwqc.jpg', '1', '2025-02-23 06:46:14'),
(923, 205, 'Grater', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727190971/n5uopn9lnqumhm9cf7o4.jpg', '1', '2025-02-23 06:46:14'),
(924, 205, 'Cutting board', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191002/nax8t4mzvfchuuz8wbtt.jpg', '1', '2025-02-23 06:46:14'),
(925, 205, 'Knives, spoons and forks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191030/gbk9hwp9fghlknjxkhro.jpg', '1', '2025-02-23 06:46:14'),
(926, 205, 'Spatula', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191057/z59qvmkqibsrdvrlqxqu.jpg', '1', '2025-02-23 06:46:15'),
(927, 205, 'Kitchen scale', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191122/eh6njra3qxl6d9ukjyl8.jpg', '1', '2025-02-23 06:46:15'),
(928, 205, 'Pastry brush', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191147/a0epkhxvdvrg361hu2gv.jpg', '1', '2025-02-23 06:46:15'),
(929, 205, 'Potatoes masher', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191286/euhktubeo1tb1ywybbag.jpg', '1', '2025-02-23 06:46:15'),
(930, 205, 'Slicers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191313/hdlzbmm6m9bc935ggtvl.jpg', '1', '2025-02-23 06:46:15'),
(931, 205, 'Steel bowls', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191337/hlac2hcmnbdpkljw3526.jpg', '1', '2025-02-23 06:46:15'),
(932, 205, 'Egg whisk', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191459/evmzpsmhhylklztky6gi.jpg', '1', '2025-02-23 06:46:15'),
(933, 205, 'Food flasks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191534/kuvvykgvpvsekvjzjz7c.jpg', '1', '2025-02-23 06:46:15'),
(934, 205, 'Baking tools and Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727191564/cpoqau6riscmch8isriz.jpg', '1', '2025-02-23 06:46:15'),
(935, 206, 'Cocktail glasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192253/oqi6fgrax1iktebjvps1.jpg', '1', '2025-02-23 06:47:12'),
(936, 206, 'Wine glasses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192285/slqkusuuzcenygvp2tmg.jpg', '1', '2025-02-23 06:47:12'),
(937, 206, 'Beer mug', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192315/bkpa8xgkzupxsq03znpw.jpg', '1', '2025-02-23 06:47:12'),
(938, 206, 'Cooking pot stand', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192340/bd7w2puvbgfelt99meot.jpg', '1', '2025-02-23 06:47:12'),
(939, 206, 'Decanters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192373/xvb0o5lgfupsnfw1etna.jpg', '1', '2025-02-23 06:47:12'),
(940, 206, 'Storage trolley cart', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192397/wejycom9xsex3w9rwjvn.jpg', '1', '2025-02-23 06:47:12'),
(941, 206, 'Plastic fridge organizer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727192432/tlt179du5lsqtsd3u46q.jpg', '1', '2025-02-23 06:47:13'),
(942, 207, 'Cooking pots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727258718/rjc3m9ehbxtjmfjcqdvs.jpg', '1', '2025-02-23 06:48:47'),
(943, 207, 'Pressure pots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727258749/agfouu6hhp1fhgwywmvc.jpg', '1', '2025-02-23 06:48:47'),
(944, 207, 'Frypan', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727258794/mfc3h4eodg8pui7o0hjd.jpg', '1', '2025-02-23 06:48:47'),
(945, 207, 'Casserole', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727258826/cawh4oztw48at8bqykcj.jpg', '1', '2025-02-23 06:48:47'),
(946, 207, 'Grill pan', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727258854/yw9jwlesz65lhzuz5cfa.jpg', '1', '2025-02-23 06:48:47'),
(947, 208, 'Plastic cereal containers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727260928/jsvkkwycd7mjbiydqqdp.jpg', '1', '2025-02-23 06:49:41'),
(948, 208, 'Plate rack', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261005/vtsq8izhaz2x4hevqtjt.jpg', '1', '2025-02-23 06:49:42'),
(949, 208, 'Food storage box', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261039/dk4xessor0kaw5sgxvbq.jpg', '1', '2025-02-23 06:49:42'),
(950, 208, 'Egg container', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261079/q204hj3sej3muyfkmesh.jpg', '1', '2025-02-23 06:49:42'),
(951, 208, 'Cutlery organizers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261115/bvnuhq0tigik6lij0gbh.jpg', '1', '2025-02-23 06:49:42'),
(952, 208, 'Kitchen towels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261151/k7aimhk45motnzqzae4x.jpg', '1', '2025-02-23 06:49:42'),
(953, 208, 'Wall mounted cutlery holder rack', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261219/pueiuoisfygdpscm9cpt.jpg', '1', '2025-02-23 06:49:42'),
(954, 208, 'Kitchen mat', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261247/bbnj98cfwhjoxpq2oemo.jpg', '1', '2025-02-23 06:49:42'),
(955, 208, 'Pot holders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261303/djddwldbxj0ob6cbqdhj.jpg', '1', '2025-02-23 06:49:42'),
(956, 208, 'plastic cups', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261336/zl7bnycgnve5lspbu7oi.jpg', '1', '2025-02-23 06:49:42'),
(957, 208, 'Dinner plates', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727261371/cyt5xthw422w4jduldog.jpg', '1', '2025-02-23 06:49:42'),
(958, 209, 'Washing Machines', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727263223/mxcz4pjybohbh3klob6i.jpg', '1', '2025-02-23 06:50:26'),
(959, 209, 'Dryers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727263260/kmpng7ekphdtcjvbpsox.jpg', '1', '2025-02-23 06:50:26'),
(960, 209, 'Irons', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727263288/jivkc1gvsugzxtptqemx.jpg', '1', '2025-02-23 06:50:26'),
(961, 209, 'Garment Steamers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727263312/lsazpiyid0ovurg1ab0p.jpg', '1', '2025-02-23 06:50:26'),
(962, 210, 'Vacuum Cleaners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727264466/yrrmcid8r1myjs3dctcy.jpg', '1', '2025-02-23 06:51:20'),
(963, 210, 'Steam Cleaners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727264597/ujksdjjoijmgbz8zizvw.jpg', '1', '2025-02-23 06:51:20'),
(964, 210, 'Sweepers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727277705/pogihgpqlupe7fjdus3x.jpg', '1', '2025-02-23 06:51:20'),
(965, 211, 'Air Conditioners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727278388/kccn1g1dohjnldv55bgz.jpg', '1', '2025-02-23 06:52:35'),
(966, 211, 'Freezers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727278505/aeruavznx1k5focx0rue.jpg', '1', '2025-02-23 06:52:35'),
(967, 211, 'Refrigerators', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727278552/hrgej7ynwkqcl6zefjnq.jpg', '1', '2025-02-23 06:52:35'),
(968, 211, 'Heaters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731081847/vsjbge8uqoilsa2npng6.png', '1', '2025-02-23 06:52:35'),
(969, 211, 'Fans', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731081778/jsk44mebc2rrhv53mk4x.jpg', '1', '2025-02-23 06:52:35'),
(970, 211, 'Humidifiers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731081904/pswk3skn8ox150wcrtzw.jpg', '1', '2025-02-23 06:52:36'),
(971, 212, 'Washing Machines', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279189/tpfog3fsanmslkle6fur.jpg', '1', '2025-02-23 06:53:32'),
(972, 212, 'Dryers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279243/f4gyrgszuk8gvkelckhl.jpg', '1', '2025-02-23 06:53:32'),
(973, 212, 'Irons', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279275/tunbm6owtgwrwsseo0ts.jpg', '1', '2025-02-23 06:53:32'),
(974, 212, 'Garment Steamers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279306/zit3onhttij2vvacsntw.jpg', '1', '2025-02-23 06:53:32'),
(975, 213, 'Vacuum Cleaners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279375/owcvx5edwupnxltynxuy.jpg', '1', '2025-02-23 06:54:36'),
(976, 213, 'Sweepers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279414/z3r9hqjumerqteuno7mm.jpg', '1', '2025-02-23 06:54:37'),
(977, 213, 'Steam Cleaners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279519/sgc4persdvnj0rji3dvx.jpg', '1', '2025-02-23 06:54:37'),
(978, 214, 'Television', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1731065196/ntbdwoynz9gdnhgraiol.jpg', '1', '2025-02-23 06:55:45'),
(979, 214, 'Sound Systems', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279810/cf9cldgrcqy37579lgk4.jpg', '1', '2025-02-23 06:55:45'),
(980, 214, 'DVD Players', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279840/f9o8hbdwscmnnemsw5in.jpg', '1', '2025-02-23 06:55:45'),
(981, 215, 'Patio Heaters', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279898/kdn8wr2lh2u6k5mzu6wy.jpg', '1', '2025-02-23 06:56:50'),
(982, 215, 'Outdoor Speakers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279928/oyjsc30vau1ninp0leju.jpg', '1', '2025-02-23 06:56:50'),
(983, 215, 'Pool Cleaners', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727279957/ai976ugnsiwgdfxmlaii.jpg', '1', '2025-02-23 06:56:50'),
(984, 216, 'Account Books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727443018/tyzaadecjzvflt6lspgn.jpg', '1', '2025-02-23 06:58:56'),
(985, 216, 'Business development', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727443061/pqwzkhxemks2cygt7rjh.jpg', '1', '2025-02-23 06:58:56'),
(986, 216, 'Finance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727443092/ll1dabsvtrfiu1iq3jnh.jpg', '1', '2025-02-23 06:58:56'),
(987, 216, 'Human Resources', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727443126/kgfitlw5ds7ye02jhtre.jpg', '1', '2025-02-23 06:58:57'),
(988, 216, 'Insurance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727687040/bbg3dboj2b5ofs1g3arg.jpg', '1', '2025-02-23 06:58:57'),
(989, 216, 'International Business and Investing', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727687652/fftjkohq4fdcyc8hbpmm.jpg', '1', '2025-02-23 06:58:57'),
(990, 216, 'Marketing', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727687686/oqh8jo4e8rr4pcxnfxu9.jpg', '1', '2025-02-23 06:58:57'),
(991, 216, 'Real Estate', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727687732/k3rd4qvgio6zziwpwgnu.jpg', '1', '2025-02-23 06:58:57'),
(992, 216, 'Law Books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727689397/eqpebr6rzv7zgu1xeqgk.jpg', '1', '2025-02-23 06:58:57'),
(993, 216, 'Taxation books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727688451/nr2lm2zzjddpztbrfipf.jpg', '1', '2025-02-23 06:58:57'),
(994, 216, 'Economy books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727688484/rbtaelumlo19zi9mdl4h.jpg', '1', '2025-02-23 06:58:57'),
(995, 216, 'Medical book', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727694943/zzphjjrdskuhkttvyxld.jpg', '1', '2025-02-23 06:58:57'),
(996, 216, 'Technology book', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727694967/lf3aleimh25awzjgu1ye.jpg', '1', '2025-02-23 06:58:57'),
(997, 216, 'Science and mathematics book', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727694996/xvc2vqd9lw8iyyhjgkyl.jpg', '1', '2025-02-23 06:58:57'),
(998, 217, 'Psychology', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727696678/dr4v68wxz0yfpdxmtvuz.jpg', '1', '2025-02-23 06:59:55'),
(999, 217, 'Safety abd first aids', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727696871/jl9zkdmycww38totie2i.jpg', '1', '2025-02-23 06:59:55'),
(1000, 217, 'Health', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727696904/ajpdsiyvzfboixz8setp.jpg', '1', '2025-02-23 06:59:55'),
(1001, 217, 'Diett and  weight loss', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727696963/yiyexncqqzvhykfrv3zc.jpg', '1', '2025-02-23 06:59:55'),
(1002, 217, 'Children’s Health', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727697003/yvnk3njeko9tb56w41yb.jpg', '1', '2025-02-23 06:59:55'),
(1003, 218, 'Computer programming', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727700630/sbb0giotd66p0rehwzuy.jpg', '1', '2025-02-23 07:00:44'),
(1004, 218, 'Computer', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727701403/ivrq8bzvklbbvuabb0he.jpg', '1', '2025-02-23 07:00:44'),
(1005, 218, 'Internet and social media', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727701453/lxeywznh6uucj1jfltvm.jpg', '1', '2025-02-23 07:00:44'),
(1006, 218, 'Networking books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727701489/ktbrwh5pgankyexbju3e.jpg', '1', '2025-02-23 07:00:44'),
(1007, 218, 'Web development and design', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727701518/a406u2yzynajlhlv8h7r.jpg', '1', '2025-02-23 07:00:45'),
(1008, 219, 'Actions and adventure', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727705737/xkizgwsiavbtohlpm1f5.jpg', '1', '2025-02-23 07:01:52'),
(1009, 219, 'Arts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727705822/dwcbbjr6n5zgag5uynnr.jpg', '1', '2025-02-23 07:01:52'),
(1010, 219, 'Science fiction novels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727705931/ecszwwadpbyqy4izh74m.jpg', '1', '2025-02-23 07:01:53'),
(1011, 219, 'Romance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727706085/qo3jl6kxcv4ir7bagv3d.jpg', '1', '2025-02-23 07:01:53'),
(1012, 219, 'Action and Adventure', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727706140/cxlbgcmayvfjbvmxx5qk.jpg', '1', '2025-02-23 07:01:53'),
(1013, 219, 'Best seller', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727882827/e0jhh8fcgbr2k4xo2oj2.jpg', '1', '2025-02-23 07:01:53'),
(1014, 220, 'Bible', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727864519/vzubihiaysuqxvupsxni.jpg', '1', '2025-02-23 07:02:58'),
(1015, 220, 'Children and teens Christian books', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727864559/rylozztdlbkbmakhr0w2.jpg', '1', '2025-02-23 07:02:58'),
(1016, 220, 'Christain worship and devotional', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727864595/ib5rqrbnowptuivx2bsc.jpg', '1', '2025-02-23 07:02:58'),
(1017, 221, 'Learning Shapes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727865210/msvmr0mghxdhv65pnv8u.jpg', '1', '2025-02-23 07:06:10'),
(1018, 221, 'Learning numbers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727865246/hqvtgwhlzld4wmlacmrr.jpg', '1', '2025-02-23 07:06:10'),
(1019, 221, 'Learning colors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727865562/xqpzruen4ylfmxwgkkep.jpg', '1', '2025-02-23 07:06:11'),
(1020, 221, 'Learning Alphabet', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727865602/o5kwjy0jtriuei2c6c4r.jpg', '1', '2025-02-23 07:06:11'),
(1021, 222, 'Classical Music', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727876826/k1o33c42gnk69dca2mws.jpg', '1', '2025-02-23 07:07:19'),
(1022, 222, 'Jazz Music', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727876924/zylbbbqlhqmal9tatlk5.jpg', '1', '2025-02-23 07:07:19'),
(1023, 222, 'Rock Music', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727876947/n0mjscazvl58alllmy6b.jpg', '1', '2025-02-23 07:07:19'),
(1024, 222, 'Pop', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727876971/u9eeosfpsmch49wpv9h8.jpg', '1', '2025-02-23 07:07:19'),
(1025, 222, 'Hip-Hop / Rap', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727877003/hldrhbovgdse06epfvkc.jpg', '1', '2025-02-23 07:07:19'),
(1026, 222, 'Country music', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727877032/ghvqqrg8kv8s2shzhpfw.jpg', '1', '2025-02-23 07:07:19'),
(1027, 222, 'R and B Soul', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727877083/xmk4ojef4ekwxfv8aoqb.jpg', '1', '2025-02-23 07:07:19'),
(1028, 222, 'Mysic video', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727877117/vqfpscpo4bkprvy7uvuo.jpg', '1', '2025-02-23 07:07:19'),
(1029, 222, 'Concert', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727877153/tjr3e3d6raujpbqezmqb.jpg', '1', '2025-02-23 07:07:19'),
(1030, 222, 'Music documentaries', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727877192/c3ukgv3trxzqewv9obzo.jpg', '1', '2025-02-23 07:07:20');
INSERT INTO `subcategory` (`id`, `_category`, `_name`, `_image`, `_status`, `_date`) VALUES
(1031, 222, 'Christian music video', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727877414/tijpqgw3xjgq2ygbnpsw.jpg', '1', '2025-02-23 07:07:20'),
(1032, 223, 'Action Movie', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727879767/pfrktbt3nzkwxcrkprwl.jpg', '1', '2025-02-23 07:08:19'),
(1033, 223, 'Adventure movies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727879798/qnjcrgr1zhc0cxxk5b73.jpg', '1', '2025-02-23 07:08:19'),
(1034, 223, 'Comedy', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727879824/bvzdqxaljnzkndy5ogyt.jpg', '1', '2025-02-23 07:08:20'),
(1035, 223, 'Drama', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727879851/fwej4d46xjnsfd2a2qul.jpg', '1', '2025-02-23 07:08:20'),
(1036, 223, 'Horror Movies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727879881/f7wbb26c6qmamf1mvgqt.jpg', '1', '2025-02-23 07:08:20'),
(1037, 223, 'Romance', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727879910/jxq9bwzojxgbvzqir6f2.jpg', '1', '2025-02-23 07:08:20'),
(1038, 223, 'Thriller', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1732280457/fcs5t1ubm3q7pcy79uy6.jpg', '1', '2025-02-23 07:08:20'),
(1039, 223, 'Christian Movies', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727879952/mhkhsi2qammd4tlacwjp.jpg', '1', '2025-02-23 07:08:20'),
(1040, 224, 'Car Accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727951908/eux6rjgogv0d2ycheh6k.jpg', '1', '2025-02-23 07:11:38'),
(1041, 224, 'Car mats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727951937/kh8nxj6pjek6wgyqhvcq.jpg', '1', '2025-02-23 07:11:38'),
(1042, 224, 'Seat covers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727951975/tcfeika3nj5b664dahfl.jpg', '1', '2025-02-23 07:11:38'),
(1043, 224, 'Dashboard accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952049/jrrnuvvhgkpfqhevkx16.jpg', '1', '2025-02-23 07:11:38'),
(1044, 224, 'Car cleaning products', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952074/kgijxdpdhenkw99cy2ag.jpg', '1', '2025-02-23 07:11:39'),
(1045, 224, 'Car parts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952142/bgwlyhmlvirjta6n3a5q.jpg', '1', '2025-02-23 07:11:39'),
(1046, 224, 'Engine parts', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952180/mbzk8n7clqewmqana310.jpg', '1', '2025-02-23 07:11:39'),
(1047, 224, 'Transmission system', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952214/fqjm9uoqvkbxbxebtsg8.jpg', '1', '2025-02-23 07:11:39'),
(1048, 224, 'Car Brake components', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952286/t5jr3uptfq2kld79tm3t.jpg', '1', '2025-02-23 07:11:39'),
(1049, 224, 'Suspension system', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952322/o8orunw4aao9bfce13re.jpg', '1', '2025-02-23 07:11:39'),
(1050, 224, 'Car electronics', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952367/sw7gdqyqnwpnvqgxom6q.jpg', '1', '2025-02-23 07:11:39'),
(1051, 224, 'Car GPS and Navigation', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952421/us9oiypkhcemjsxntzx5.jpg', '1', '2025-02-23 07:11:39'),
(1052, 224, 'Car audio systems', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952459/vdl3h4ljdqew35jpoltg.jpg', '1', '2025-02-23 07:11:39'),
(1053, 224, 'Dash camera', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952493/hqx8q0ckqe8vino6esdn.jpg', '1', '2025-02-23 07:11:39'),
(1054, 224, 'Parking sensors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727952528/yu0crhfctvxqjr9gshpt.jpg', '1', '2025-02-23 07:11:39'),
(1055, 225, 'Car tires', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727958812/txw9vnuddubpccruiksf.jpg', '1', '2025-02-23 07:12:52'),
(1056, 225, 'Alley wheels', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727958841/gjirqb6gg0zarvocmfw1.jpg', '1', '2025-02-23 07:12:52'),
(1057, 225, 'Tire maintenance kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727958868/ouu1t0hfa8zkmopim64h.jpg', '1', '2025-02-23 07:12:52'),
(1058, 226, 'Engine oil', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727958924/mf3qb6zvehthnqntnad7.jpg', '1', '2025-02-23 07:13:59'),
(1059, 226, 'Car repair tools', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727958959/oif2wuyw8msioyhei1ay.jpg', '1', '2025-02-23 07:13:59'),
(1060, 226, 'Jack stands', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727958989/uzjfgdugfeuq1yrknjj8.jpg', '1', '2025-02-23 07:14:00'),
(1061, 226, 'Wipers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727959009/cj0xd9yynvjsfdmbnw5t.jpg', '1', '2025-02-23 07:14:00'),
(1062, 227, 'Bumoers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727963857/bkwhuthyhj2mqpcyqsbp.jpg', '1', '2025-02-23 07:15:19'),
(1063, 227, 'Car covers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727963882/zce72fgnnipoa5utt5n0.jpg', '1', '2025-02-23 07:15:19'),
(1064, 227, 'Body kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727963924/xnp0dmth3xoap6lbgyuw.jpg', '1', '2025-02-23 07:15:19'),
(1065, 227, 'Spoiler', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727963990/o2qjolaebi79iygnxo5l.jpg', '1', '2025-02-23 07:15:19'),
(1066, 228, 'Motorcycle accessories', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727965015/srvz2uoofhugmhp1uj9a.jpg', '1', '2025-02-23 07:16:09'),
(1067, 228, 'Helmets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727965525/ahdxgxpuuvisxvzt8hcc.jpg', '1', '2025-02-23 07:16:09'),
(1068, 228, 'Riding gear', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727965555/hf5rzzkte4to9tujkdol.jpg', '1', '2025-02-23 07:16:09'),
(1069, 228, 'Saddle bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727965582/vhxvt8cc5k9texqgxgqn.jpg', '1', '2025-02-23 07:16:09'),
(1070, 228, 'Motorcycle cover', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1727965610/pocdtnrlus7bsqjgtgfb.jpg', '1', '2025-02-23 07:16:09'),
(1071, 229, 'Motorcycle Exhaust system', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036211/qw02myjzjgiqavtzcrnn.jpg', '1', '2025-02-23 07:18:30'),
(1072, 229, 'Handle bar Grips', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036242/m4yu3grhuk1w42ue6n1p.jpg', '1', '2025-02-23 07:18:30'),
(1073, 229, 'Foot pegs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036279/hndkfbcqvitidvnwalxz.jpg', '1', '2025-02-23 07:18:30'),
(1074, 229, 'Brake and clutch', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036323/amgdhg6feshklqajhxo7.jpg', '1', '2025-02-23 07:18:30'),
(1075, 230, 'Motorcycle tires', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036398/hvclg4grnf6ftaoolhem.jpg', '1', '2025-02-23 07:19:22'),
(1076, 230, 'Motorcycle rims', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036434/yszbghlb5qtjqe8u9pbv.jpg', '1', '2025-02-23 07:19:22'),
(1077, 230, 'Motorcycle repair kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036503/qdg3yswjrcuh3rundbhy.jpg', '1', '2025-02-23 07:19:23'),
(1078, 231, 'Headlights', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728036578/r8r3n9g8sp0c2sncx5f7.jpg', '1', '2025-02-23 07:20:15'),
(1079, 231, 'Turn signals', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728037385/bucgnskpufhv7gjt2hmc.jpg', '1', '2025-02-23 07:20:15'),
(1080, 231, 'Motorcycle Battery charhers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728037422/tvgnsf8phxdqji4wfart.jpg', '1', '2025-02-23 07:20:15'),
(1081, 231, 'Motorcycle GPS Device', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728037478/zc5kgwqt8pbdytr45yih.jpg', '1', '2025-02-23 07:20:15'),
(1082, 232, 'Bicycle type', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041098/nbnhidrchmndgbrlqhvr.jpg', '1', '2025-02-23 07:21:06'),
(1083, 232, 'Road bicycle', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041126/dnd2l7u0ycsmisqjgvhj.jpg', '1', '2025-02-23 07:21:06'),
(1084, 232, 'Mountain bikes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041254/ksc0eca8ug9gmobn837z.jpg', '1', '2025-02-23 07:21:06'),
(1085, 232, 'Hybrid bikes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041300/jeq7kwkwtmaierrtmko7.jpg', '1', '2025-02-23 07:21:06'),
(1086, 232, 'Electric bikes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041335/x4lrnryeujbe4xlmxbp8.jpg', '1', '2025-02-23 07:21:06'),
(1087, 232, 'Children bikes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041360/cfzhcojs8uoibttijtp6.jpg', '1', '2025-02-23 07:21:07'),
(1088, 233, 'Helmets', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041408/ajyqyrp6er2jyqrdvjsi.jpg', '1', '2025-02-23 07:22:12'),
(1089, 233, 'Lights and Reflectors', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041461/tizd50he6ncsngsoagxw.jpg', '1', '2025-02-23 07:22:12'),
(1090, 233, 'Bikes locks', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041690/miivap1lewzdffrwolx5.jpg', '1', '2025-02-23 07:22:12'),
(1091, 233, 'Water bottle holders', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041716/an0brra4atdjj8qt7drg.jpg', '1', '2025-02-23 07:22:12'),
(1092, 234, 'Gears and chains', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041790/qpnjntp90b5mqoznmhqc.jpg', '1', '2025-02-23 07:23:11'),
(1093, 234, 'Pedals', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041943/imthy5mkwu9ztrhqngcz.jpg', '1', '2025-02-23 07:23:11'),
(1094, 234, 'Sadals', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728041981/dtpgmxr4dxxzmtangoau.jpg', '1', '2025-02-23 07:23:11'),
(1095, 234, 'Handle bars', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728042019/lir6mxusch3yxgo4xbxv.jpg', '1', '2025-02-23 07:23:11'),
(1096, 235, 'Tire pumps', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728042545/zo2qwca8z4ospcjtyfhr.jpg', '1', '2025-02-23 07:24:14'),
(1097, 235, 'Repair kits', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728042572/p4weij4a7ndudwgm6sfh.jpg', '1', '2025-02-23 07:24:15'),
(1098, 235, 'Lubricants', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728042612/hn2deudgnvazwwqqv9xp.jpg', '1', '2025-02-23 07:24:15'),
(1099, 235, 'Multi-tools', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728042661/bixvvarpyphg2huoxcty.jpg', '1', '2025-02-23 07:24:15'),
(1100, 236, 'Dog food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728052066/knjmbd550aphyrs9vip9.jpg', '1', '2025-02-23 07:27:21'),
(1101, 236, 'Dry dog food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728053462/ble8blhuxvgxrcjd9m57.jpg', '1', '2025-02-23 07:27:21'),
(1102, 236, 'Wet dog food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728053531/o5zuejfaaref4pmxu7bv.jpg', '1', '2025-02-23 07:27:21'),
(1103, 236, 'Puppy food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728053559/jpwmiobmnwbjkkrxoyqq.jpg', '1', '2025-02-23 07:27:22'),
(1104, 236, 'Dog treats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728053752/n1lim4eim1yrpy9uythg.jpg', '1', '2025-02-23 07:27:22'),
(1105, 236, 'Dry cat food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728053857/buu067dqeazmqbfl9rbe.jpg', '1', '2025-02-23 07:27:22'),
(1106, 236, 'Wet cat food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728296099/tpgoll76a1xn3ttnxsyg.jpg', '1', '2025-02-23 07:27:22'),
(1107, 236, 'Kitten food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728053910/tcmchyvhie7ftqpcvu0p.jpg', '1', '2025-02-23 07:27:22'),
(1108, 236, 'Car treats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728296142/xyqsemef4xijiyhdu0ri.jpg', '1', '2025-02-23 07:27:22'),
(1109, 237, 'Bird feed', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728055077/a8y1khisyu666i5jw4tw.jpg', '1', '2025-02-23 07:28:56'),
(1110, 237, 'Fish food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728055129/mbvpmymvdu4nwhbp7ixq.jpg', '1', '2025-02-23 07:28:56'),
(1111, 237, 'Rabbit food', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728055152/yrochlampjouwqcnfjnj.jpg', '1', '2025-02-23 07:28:56'),
(1112, 238, 'Collars, leashes and harnesses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728297290/zo6pnwasb54iadkmqk34.jpg', '1', '2025-02-23 07:31:01'),
(1113, 238, 'Dog collars', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728297332/xswpu1ekjjwbkwch7mf4.jpg', '1', '2025-02-23 07:31:02'),
(1114, 238, 'Dog leashes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728297375/brfklecn5jjhwgyimtay.jpg', '1', '2025-02-23 07:31:02'),
(1115, 238, 'Cat collars', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728297405/j6kteqkpadxzphra3e6x.jpg', '1', '2025-02-23 07:31:02'),
(1116, 238, 'Harnesses', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728297436/e6jhr0mpg0awomodvbe2.jpg', '1', '2025-02-23 07:31:02'),
(1117, 238, 'Pet beds and furniture', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298628/e2xsoehayz8ueexdv6gb.jpg', '1', '2025-02-23 07:31:02'),
(1118, 238, 'Dog beds', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298656/disxjgqt1narul3kupwk.jpg', '1', '2025-02-23 07:31:02'),
(1119, 238, 'Cat beds', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298687/filxskojnkygyh7wvhkz.jpg', '1', '2025-02-23 07:31:02'),
(1120, 238, 'Pet crates', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298767/mblzrm21u7idqvpzj6al.jpg', '1', '2025-02-23 07:31:02'),
(1121, 238, 'Cat trees and towers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728376565/cxt3cg3yrymlzpvkevx2.jpg', '1', '2025-02-23 07:31:02'),
(1122, 238, 'Pet clothing', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298841/yixrswlbf8vayuyu0jqf.jpg', '1', '2025-02-23 07:31:02'),
(1123, 238, 'Dog coats', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298873/z8ywlxueshmebd4dsdpv.jpg', '1', '2025-02-23 07:31:02'),
(1124, 238, 'Pet Sweatees', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298914/l1agkrf20nno90u7kco0.jpg', '1', '2025-02-23 07:31:02'),
(1125, 238, 'Pet boots', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298939/nfgedvpphribpls7y1oc.jpg', '1', '2025-02-23 07:31:02'),
(1126, 238, 'Pet Costume', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728298970/ev9suutpuuisddwdmyz2.jpg', '1', '2025-02-23 07:31:02'),
(1127, 239, 'Cat shampoos and conditioner', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728301827/gbppmxks7upmrj4nd4nn.jpg', '1', '2025-02-23 07:33:17'),
(1128, 239, 'Dog shampoo', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728301853/xiiuwax7tn19abdhdri6.jpg', '1', '2025-02-23 07:33:17'),
(1129, 239, 'Cat shampoo', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728302385/zhrtmti6a7smocq1yqtw.jpg', '1', '2025-02-23 07:33:17'),
(1130, 239, 'Flea and tuck shampoo', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728302435/pu4kawsvuop4xgr85w1q.jpg', '1', '2025-02-23 07:33:18'),
(1131, 240, 'Brushes and combs', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728302731/vlbnojeqogkcwcdcjpar.jpg', '1', '2025-02-23 07:34:36'),
(1132, 240, 'Nail clippers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728302757/zs0nly8asq4psz3yzuu9.jpg', '1', '2025-02-23 07:34:36'),
(1133, 240, 'Grooming glove', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728302782/rrifhwpppcopeq7fafiv.jpg', '1', '2025-02-23 07:34:36'),
(1134, 241, 'Ear cleaner', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728305611/yfiwas9qha0gbembz591.jpg', '1', '2025-02-23 07:35:55'),
(1135, 241, 'Dental care products', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728305860/dypol3rm8yprdgnh7bqj.jpg', '1', '2025-02-23 07:35:56'),
(1136, 241, 'Pet wipes', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728305899/v8qb8u8x84c7nqj6hcah.jpg', '1', '2025-02-23 07:35:56'),
(1137, 242, 'Pet supplements and vitamins', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728305973/kqcilpbeovgkyazxl4nt.jpg', '1', '2025-02-23 07:36:59'),
(1138, 242, 'Joint supplements', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728306007/wqrzpl6rzxaoptp8s12y.jpg', '1', '2025-02-23 07:36:59'),
(1139, 242, 'Skin and coat supplement', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728306071/mvuwgcsqb7xkmwhiahnq.jpg', '1', '2025-02-23 07:36:59'),
(1140, 242, 'Degestive health', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728307445/miqdwuv9pmtdla3wpuew.jpg', '1', '2025-02-23 07:36:59'),
(1141, 243, 'Flea collars', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728308977/ysvdwimg7d7t7ejynwqv.jpg', '1', '2025-02-23 07:38:10'),
(1142, 243, 'Topical Treatments', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309069/perks7dkfhtzwjqiriqi.jpg', '1', '2025-02-23 07:38:10'),
(1143, 243, 'Flea sprays', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309125/ycsp2tql5xqdeiti9dph.jpg', '1', '2025-02-23 07:38:10'),
(1144, 244, 'Pet bandages', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309195/cbdnv9kw7zsdhd7gswdj.jpg', '1', '2025-02-23 07:39:04'),
(1145, 244, 'Wound care', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309226/lmwyg5qkd39hkq9byaff.jpg', '1', '2025-02-23 07:39:04'),
(1146, 244, 'Recovery collars', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309324/qgy8qhh8curukbbbgq9m.jpg', '1', '2025-02-23 07:39:04'),
(1147, 245, 'Recovery collars', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309733/wpom43wri5bf7kil2git.jpg', '1', '2025-02-23 07:40:24'),
(1148, 245, 'Dog toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309810/pqpz07jpky23ro2qmoxu.jpg', '1', '2025-02-23 07:40:24'),
(1149, 245, 'Chew toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309851/xbrj3dwnfzhvloqyujns.jpg', '1', '2025-02-23 07:40:24'),
(1150, 245, 'Squeaky toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309887/mxqvqrtrsb4oki9go6b2.jpg', '1', '2025-02-23 07:40:24'),
(1151, 245, 'Fetch toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309932/rftcwbxpv2nde82f8ign.jpg', '1', '2025-02-23 07:40:24'),
(1152, 245, 'Cat toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728309965/pjhx6dbz2npa1slg62e0.jpg', '1', '2025-02-23 07:40:24'),
(1153, 245, 'Catnip toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728310009/lftufn7nimbfrgrtjv44.jpg', '1', '2025-02-23 07:40:24'),
(1154, 245, 'Teaser toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728310044/n895yccyzhejn9bhdx5v.jpg', '1', '2025-02-23 07:40:24'),
(1155, 245, 'Scratching toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728310085/rmhuo5op8e4m7xiaeivr.jpg', '1', '2025-02-23 07:40:24'),
(1156, 246, 'Bird toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311205/er0cnaulyrjbcvs9wxau.jpg', '1', '2025-02-23 07:41:40'),
(1157, 246, 'Small animal toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311231/vcqn37vpihiqdlv6gorz.jpg', '1', '2025-02-23 07:41:40'),
(1158, 246, 'Interactive toys', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311257/dxomu4al7auhux57jphy.jpg', '1', '2025-02-23 07:41:40'),
(1159, 247, 'Carriers and crate', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311362/fxblbvwuqrq6fgspmdc7.jpg', '1', '2025-02-23 07:45:10'),
(1160, 247, 'Soft-sided carriers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311394/rjthhidl3ig4mlhs84kw.jpg', '1', '2025-02-23 07:45:10'),
(1161, 247, 'Hard-sided crates', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311424/z0893hlwhlarz1qxq89q.jpg', '1', '2025-02-23 07:45:10'),
(1162, 247, 'Travel bags', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311448/cczyj1xcffqgab2thyqr.jpg', '1', '2025-02-23 07:45:10'),
(1163, 248, 'Tracel water bowls', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311534/gkkddatkpcntuwk1gxss.jpg', '1', '2025-02-23 07:46:19'),
(1164, 248, 'Pet Seat covers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311564/yjxlqc7bceewfrmlrtc2.jpg', '1', '2025-02-23 07:46:19'),
(1165, 248, 'Pet strollers', 'https://res.cloudinary.com/deqrm6ki6/image/upload/v1728311588/rasjfpazfkflp7hjdxmz.jpg', '1', '2025-02-23 07:46:19'),
(1166, 250, 'Laptops', 'https://s.alicdn.com/@sc04/kf/He8f8fee7d14244bb9f846255de967ec9m.png_720x720q50.jpg', '1', '2025-05-22 13:21:43');

-- --------------------------------------------------------

--
-- Table structure for table `users_table`
--

CREATE TABLE `users_table` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` text DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_table`
--

INSERT INTO `users_table` (`id`, `first_name`, `last_name`, `email`, `phone`, `nationality`, `password`, `picture`, `is_verified`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Abuchi', 'Jasman', 'justinekassy1@gmail.com', '2347033052336', 'ng', '$2b$10$LnxQPcWTKW7oNDT404pEwejO80zi24g.OXgz/bKcXZGBjPSdT9NC6', NULL, 1, 1, '2025-03-24 16:59:15', '2025-06-01 16:39:56'),
(3, 'Chris', 'Mayor', 'mayor@gmail.com', '2349130448819', 'ng', '$2b$10$x66V34qB6aBRlr8MeihLTuFVSwB8Q62gvlipduqhcD6bcvr9PkZfq', NULL, 1, 1, '2025-03-30 12:06:32', '2025-03-30 12:06:32');

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `label` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_addresses`
--

INSERT INTO `user_addresses` (`id`, `user_id`, `label`, `name`, `phone`, `address`, `city`, `state`, `postal_code`, `country`, `is_default`, `created_at`, `updated_at`) VALUES
(4, 3, NULL, 'Bloomzon Office', '7055632888', 'Joseph street, off Osho street, adjacent people\'s club eatery. Opebi, Lagos state.', NULL, 'Lagos', '321789', 'Nigeria', 1, '2025-05-11 06:24:05', '2025-05-11 06:24:05'),
(7, 3, NULL, 'Abuchi Jasman ', '7066685215', 'Unnamed Road, Ogijo/ Likosi 121102, Ogun State, Nigeria', NULL, 'Ogun', '121102', 'Nigeria', 0, '2025-05-11 06:34:17', '2025-05-11 06:34:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_payment_methods`
--

CREATE TABLE `user_payment_methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `method` varchar(50) DEFAULT NULL,
  `gateway_id` int(11) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `last4` varchar(4) NOT NULL,
  `exp_month` varchar(10) NOT NULL,
  `exp_year` varchar(10) NOT NULL,
  `token` varchar(255) NOT NULL,
  `is_default` tinyint(4) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_payment_methods`
--

INSERT INTO `user_payment_methods` (`id`, `user_id`, `method`, `gateway_id`, `brand`, `last4`, `exp_month`, `exp_year`, `token`, `is_default`, `created_at`, `updated_at`) VALUES
(95, 3, NULL, 1, 'unknown', '6666', '05', '2026', 'k0sbrq98fb5bdqp', 0, '2025-06-15 22:34:15', '2025-06-15 22:34:15');

-- --------------------------------------------------------

--
-- Table structure for table `variations_table`
--

CREATE TABLE `variations_table` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variations_table`
--

INSERT INTO `variations_table` (`id`, `product_id`, `sku`, `status`, `created_at`, `updated_at`) VALUES
(64, 46, '1166-INTELC-GRE-8GB-16G-32G-64G-120-256-512-1TB-6626', 1, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(66, 48, '619-MENSG-WHI-GRE-M-L-XXL-ANK-CHE-8540', 1, '2025-05-29 19:17:09', '2025-05-29 19:17:09'),
(67, 49, '1166-ASUSTU-BLA-1519', 1, '2025-06-09 13:19:50', '2025-06-09 13:19:50'),
(68, 50, '620-MENSP-GRE-BLU-GRE-S-M-L-XXL-ANK-CHE-SHI-1955', 1, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(72, 54, '592-MENSC-GRE-GRE-BLU-RED-S-M-L-XXL-100-COT-ORG-SUP-2751', 1, '2025-06-15 21:18:20', '2025-06-15 21:18:20'),
(74, 56, '635-CLASSI-WHI-GRA-S-M-L-XXL-100-RAY-VIS-SPA-9504', 1, '2025-06-15 22:18:51', '2025-06-15 22:18:51');

-- --------------------------------------------------------

--
-- Table structure for table `variation_attributes`
--

CREATE TABLE `variation_attributes` (
  `id` int(11) NOT NULL,
  `variation_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT 0.00,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variation_attributes`
--

INSERT INTO `variation_attributes` (`id`, `variation_id`, `attribute_id`, `label`, `value`, `price`, `stock`, `weight`, `image`, `created_at`, `updated_at`) VALUES
(136, 64, 1, 'color', 'grey', '0.00', NULL, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(137, 64, 3, 'ram', '8gb', '0.00', NULL, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(138, 64, 3, 'ram', '16gb', '5.00', NULL, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(139, 64, 3, 'ram', '32gb', '7.00', NULL, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(140, 64, 3, 'ram', '64gb', '11.00', NULL, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(141, 64, 3, 'ram', '120gb', '16.00', 50, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(142, 64, 4, 'hard drive capacity', '256gb', '8.00', 20, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(143, 64, 4, 'hard drive capacity', '512gb', '16.00', 100, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(144, 64, 4, 'hard drive capacity', '1tb', '22.00', NULL, '0.00', NULL, '2025-05-29 17:54:52', '2025-05-29 17:54:52'),
(152, 66, 1, 'color', 'white', '0.00', 400, '0.00', NULL, '2025-05-29 19:17:09', '2025-05-29 19:17:09'),
(153, 66, 1, 'color', 'green', '1.34', NULL, '0.00', NULL, '2025-05-29 19:17:09', '2025-05-29 19:17:09'),
(154, 66, 2, 'size', 'm', '0.00', NULL, '0.00', NULL, '2025-05-29 19:17:09', '2025-05-29 19:17:09'),
(155, 66, 2, 'size', 'l', '0.00', NULL, '0.00', NULL, '2025-05-29 19:17:09', '2025-05-29 19:17:09'),
(156, 66, 2, 'size', 'xxl', '0.00', 32, '0.00', NULL, '2025-05-29 19:17:09', '2025-05-29 19:17:09'),
(157, 66, 1, 'materia type', 'ankara', '0.00', NULL, '0.00', NULL, '2025-05-29 19:17:09', '2025-05-29 19:31:31'),
(158, 66, 1, 'materia type', 'chekas', '1.76', 150, '1.50', NULL, '2025-05-29 19:17:09', '2025-05-29 19:31:37'),
(159, 67, 1, 'color', 'black', '0.00', NULL, '0.00', NULL, '2025-06-09 13:19:51', '2025-06-09 14:01:30'),
(160, 68, 1, 'color', 'green', '0.00', NULL, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(161, 68, 1, 'color', 'blue', '1.34', NULL, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(162, 68, 1, 'color', 'grey', '1.34', 1, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(163, 68, 4, 'size', 's', '0.00', NULL, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(164, 68, 4, 'size', 'm', '0.00', NULL, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(165, 68, 4, 'size', 'l', '0.00', NULL, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(166, 68, 4, 'size', 'xxl', '0.00', NULL, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(167, 68, 1, 'materia type', 'ankara', '0.00', NULL, '0.00', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(168, 68, 1, 'materia type', 'chekas', '1.76', NULL, '1.50', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(169, 68, 1, 'materia type', 'Shinos', '2.00', NULL, '1.50', NULL, '2025-06-15 08:43:00', '2025-06-15 08:43:00'),
(206, 72, 1, 'color', 'green', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:20', '2025-06-15 21:18:20'),
(207, 72, 1, 'color', 'grey', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(208, 72, 1, 'color', 'blue', '2.11', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(209, 72, 1, 'color', 'red', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(210, 72, 1, 'size', 's', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(211, 72, 1, 'size', 'm', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(212, 72, 1, 'size', 'l', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(213, 72, 1, 'size', 'xxl', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(214, 72, 4, 'materia type', '100% cotton', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(215, 72, 4, 'materia type', 'Cotton-Polyster Blend', '1.14', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(216, 72, 4, 'materia type', 'Organic cotton', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(217, 72, 4, 'materia type', 'Supima cotton', '0.00', NULL, '0.00', NULL, '2025-06-15 21:18:21', '2025-06-15 21:18:21'),
(228, 74, 1, 'color', 'white', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(229, 74, 1, 'color', 'gray', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(230, 74, 4, 'size', 's', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(231, 74, 4, 'size', 'm', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(232, 74, 4, 'size', 'l', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(233, 74, 4, 'size', 'xxl', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(234, 74, 1, 'materia', '100% cotton', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(235, 74, 1, 'materia', 'Rayon', '2.10', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(236, 74, 1, 'materia', 'Viscose', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52'),
(237, 74, 1, 'materia', 'Spandex (Elastane)', '0.00', NULL, '0.00', NULL, '2025-06-15 22:18:52', '2025-06-15 22:18:52');

-- --------------------------------------------------------

--
-- Table structure for table `vendors_table`
--

CREATE TABLE `vendors_table` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` text DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors_table`
--

INSERT INTO `vendors_table` (`id`, `first_name`, `last_name`, `email`, `phone`, `nationality`, `password`, `picture`, `is_verified`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Chris', 'Amuzie', 'khrise8@gmail.com', '{\"_s\":\"33f6bb044cd81', 'ng', '$2b$10$FBqAqxr3HlEMgks02DYMVO0D/I0US7Qs2gnrQtvovGXmmBLg9/lXS', 'https://res.cloudinary.com/dqx4lnxtn/image/upload/v1679748383/cld-sample-5.jpg', 1, 1, '2025-03-18 00:18:26', '2025-03-18 00:18:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachment_table`
--
ALTER TABLE `attachment_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attributes_table`
--
ALTER TABLE `attributes_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `layout_id` (`layout_id`);

--
-- Indexes for table `capabilities_table`
--
ALTER TABLE `capabilities_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `carts_table`
--
ALTER TABLE `carts_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_unique` (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variation_id` (`variation_id`);

--
-- Indexes for table `cart_item_attributes`
--
ALTER TABLE `cart_item_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_item_id` (`cart_item_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `_maincategory` (`_maincategory`);

--
-- Indexes for table `chat_table`
--
ALTER TABLE `chat_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attachment_id` (`attachment_id`);

--
-- Indexes for table `collections_table`
--
ALTER TABLE `collections_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `fk_collection_subcategory` (`subcategory_id`);

--
-- Indexes for table `customizations_table`
--
ALTER TABLE `customizations_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_customization` (`product_id`,`attr_key`,`customization_type`,`source`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `variation_id` (`variation_id`);

--
-- Indexes for table `filters_table`
--
ALTER TABLE `filters_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `inquiry_table`
--
ALTER TABLE `inquiry_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `attachment_id` (`attachment_id`);

--
-- Indexes for table `interactions`
--
ALTER TABLE `interactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`target_type`,`target_id`,`action`);

--
-- Indexes for table `layouts_table`
--
ALTER TABLE `layouts_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `live_table`
--
ALTER TABLE `live_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `maincategory`
--
ALTER TABLE `maincategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media_table`
--
ALTER TABLE `media_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variation_id` (`variation_id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `orders_table`
--
ALTER TABLE `orders_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_ref` (`order_ref`),
  ADD UNIQUE KEY `tracking_id` (`tracking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `logistic_id` (`logistic_id`),
  ADD KEY `delivery_address` (`delivery_address`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variation_id` (`variation_id`);

--
-- Indexes for table `order_item_attributes`
--
ALTER TABLE `order_item_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_item_id` (`order_item_id`);

--
-- Indexes for table `payment_gateways`
--
ALTER TABLE `payment_gateways`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `logo` (`logo`),
  ADD UNIQUE KEY `provider` (`provider`);

--
-- Indexes for table `products_table`
--
ALTER TABLE `products_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `subcategory_id` (`subcategory_id`),
  ADD KEY `collection_id` (`collection_id`);

--
-- Indexes for table `product_filters`
--
ALTER TABLE `product_filters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`,`filter_id`),
  ADD KEY `filter_id` (`filter_id`);

--
-- Indexes for table `product_moq`
--
ALTER TABLE `product_moq`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product_sample`
--
ALTER TABLE `product_sample`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_providers`
--
ALTER TABLE `shipping_providers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `method_id` (`method_id`);

--
-- Indexes for table `stores_table`
--
ALTER TABLE `stores_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `store_capabilities`
--
ALTER TABLE `store_capabilities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `store_id` (`store_id`,`capability_id`),
  ADD KEY `capability_id` (`capability_id`);

--
-- Indexes for table `store_gallery`
--
ALTER TABLE `store_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `store_reviews`
--
ALTER TABLE `store_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `store_id` (`store_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `_category` (`_category`);

--
-- Indexes for table `users_table`
--
ALTER TABLE `users_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `gateway_id` (`gateway_id`);

--
-- Indexes for table `variations_table`
--
ALTER TABLE `variations_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `variation_attributes`
--
ALTER TABLE `variation_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variation_id` (`variation_id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `vendors_table`
--
ALTER TABLE `vendors_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachment_table`
--
ALTER TABLE `attachment_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `attributes_table`
--
ALTER TABLE `attributes_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `capabilities_table`
--
ALTER TABLE `capabilities_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `carts_table`
--
ALTER TABLE `carts_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `cart_item_attributes`
--
ALTER TABLE `cart_item_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- AUTO_INCREMENT for table `chat_table`
--
ALTER TABLE `chat_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `collections_table`
--
ALTER TABLE `collections_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `customizations_table`
--
ALTER TABLE `customizations_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `filters_table`
--
ALTER TABLE `filters_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inquiry_table`
--
ALTER TABLE `inquiry_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `interactions`
--
ALTER TABLE `interactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `layouts_table`
--
ALTER TABLE `layouts_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `live_table`
--
ALTER TABLE `live_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `maincategory`
--
ALTER TABLE `maincategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `media_table`
--
ALTER TABLE `media_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `orders_table`
--
ALTER TABLE `orders_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `order_item_attributes`
--
ALTER TABLE `order_item_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT for table `payment_gateways`
--
ALTER TABLE `payment_gateways`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products_table`
--
ALTER TABLE `products_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `product_filters`
--
ALTER TABLE `product_filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_moq`
--
ALTER TABLE `product_moq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_sample`
--
ALTER TABLE `product_sample`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `product_specifications`
--
ALTER TABLE `product_specifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=513;

--
-- AUTO_INCREMENT for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shipping_providers`
--
ALTER TABLE `shipping_providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stores_table`
--
ALTER TABLE `stores_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store_capabilities`
--
ALTER TABLE `store_capabilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `store_gallery`
--
ALTER TABLE `store_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `store_reviews`
--
ALTER TABLE `store_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1167;

--
-- AUTO_INCREMENT for table `users_table`
--
ALTER TABLE `users_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `variations_table`
--
ALTER TABLE `variations_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `variation_attributes`
--
ALTER TABLE `variation_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- AUTO_INCREMENT for table `vendors_table`
--
ALTER TABLE `vendors_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attributes_table`
--
ALTER TABLE `attributes_table`
  ADD CONSTRAINT `attributes_table_ibfk_1` FOREIGN KEY (`layout_id`) REFERENCES `layouts_table` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_4` FOREIGN KEY (`variation_id`) REFERENCES `variations_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_item_attributes`
--
ALTER TABLE `cart_item_attributes`
  ADD CONSTRAINT `cart_item_attributes_ibfk_1` FOREIGN KEY (`cart_item_id`) REFERENCES `cart_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`_maincategory`) REFERENCES `maincategory` (`id`);

--
-- Constraints for table `chat_table`
--
ALTER TABLE `chat_table`
  ADD CONSTRAINT `chat_table_ibfk_1` FOREIGN KEY (`attachment_id`) REFERENCES `attachment_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `collections_table`
--
ALTER TABLE `collections_table`
  ADD CONSTRAINT `collections_table_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_collection_subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customizations_table`
--
ALTER TABLE `customizations_table`
  ADD CONSTRAINT `customizations_table_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customizations_table_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customizations_table_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customizations_table_ibfk_4` FOREIGN KEY (`variation_id`) REFERENCES `variations_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inquiry_table`
--
ALTER TABLE `inquiry_table`
  ADD CONSTRAINT `inquiry_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inquiry_table_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inquiry_table_ibfk_3` FOREIGN KEY (`attachment_id`) REFERENCES `attachment_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `interactions`
--
ALTER TABLE `interactions`
  ADD CONSTRAINT `interactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `live_table`
--
ALTER TABLE `live_table`
  ADD CONSTRAINT `live_table_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `live_table_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media_table`
--
ALTER TABLE `media_table`
  ADD CONSTRAINT `media_table_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_table_ibfk_2` FOREIGN KEY (`variation_id`) REFERENCES `variations_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_table_ibfk_3` FOREIGN KEY (`attribute_id`) REFERENCES `variation_attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders_table`
--
ALTER TABLE `orders_table`
  ADD CONSTRAINT `orders_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_table_ibfk_2` FOREIGN KEY (`logistic_id`) REFERENCES `shipping_providers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_table_ibfk_3` FOREIGN KEY (`delivery_address`) REFERENCES `user_addresses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_4` FOREIGN KEY (`variation_id`) REFERENCES `variations_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_item_attributes`
--
ALTER TABLE `order_item_attributes`
  ADD CONSTRAINT `order_item_attributes_ibfk_1` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products_table`
--
ALTER TABLE `products_table`
  ADD CONSTRAINT `products_table_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_table_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_table_ibfk_3` FOREIGN KEY (`collection_id`) REFERENCES `collections_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_filters`
--
ALTER TABLE `product_filters`
  ADD CONSTRAINT `product_filters_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_filters_ibfk_2` FOREIGN KEY (`filter_id`) REFERENCES `filters_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_moq`
--
ALTER TABLE `product_moq`
  ADD CONSTRAINT `product_moq_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sample`
--
ALTER TABLE `product_sample`
  ADD CONSTRAINT `product_sample_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_sample_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD CONSTRAINT `product_specifications_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shipping_providers`
--
ALTER TABLE `shipping_providers`
  ADD CONSTRAINT `shipping_providers_ibfk_1` FOREIGN KEY (`method_id`) REFERENCES `shipping_methods` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stores_table`
--
ALTER TABLE `stores_table`
  ADD CONSTRAINT `stores_table_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `store_capabilities`
--
ALTER TABLE `store_capabilities`
  ADD CONSTRAINT `store_capabilities_ibfk_1` FOREIGN KEY (`capability_id`) REFERENCES `capabilities_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `store_capabilities_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `store_reviews`
--
ALTER TABLE `store_reviews`
  ADD CONSTRAINT `store_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `store_reviews_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`_category`) REFERENCES `category` (`id`);

--
-- Constraints for table `variations_table`
--
ALTER TABLE `variations_table`
  ADD CONSTRAINT `variations_table_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products_table` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variation_attributes`
--
ALTER TABLE `variation_attributes`
  ADD CONSTRAINT `variation_attributes_ibfk_1` FOREIGN KEY (`variation_id`) REFERENCES `variations_table` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `variation_attributes_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attributes_table` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
