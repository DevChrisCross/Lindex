-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2017 at 04:21 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lindex`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE IF NOT EXISTS `answer` (
`ans_id` int(10) NOT NULL,
  `ans_det` text NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`ans_id`, `ans_det`) VALUES
(1, 'sample answer'),
(2, '[value-1],[value-2]');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE IF NOT EXISTS `course` (
  `crs_id` varchar(10) NOT NULL,
  `crs_det` varchar(50) NOT NULL,
  `crs_code` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `explanation`
--

CREATE TABLE IF NOT EXISTS `explanation` (
  `e_id` varchar(10) NOT NULL,
  `q_id` varchar(10) NOT NULL,
  `e_det` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `history_activity`
--

CREATE TABLE IF NOT EXISTS `history_activity` (
  `prof_id` varchar(8) NOT NULL,
  `his_date` varchar(10) NOT NULL,
  `his_time` varchar(8) NOT NULL,
  `his_details` varchar(31) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history_activity`
--

INSERT INTO `history_activity` (`prof_id`, `his_date`, `his_time`, `his_details`) VALUES
('asd', '2017-01-24', '01:43:52', 'Deleted a question.'),
('asd', '2017-01-25', '12:18:47', 'Added questions.'),
('asd', '2017-01-25', '12:19:37', 'Added questions.'),
('asd', '2017-01-25', '01:29:04', 'Added questions.'),
('asd', '2017-01-25', '01:29:27', 'Added questions.'),
('asd', '2017-01-25', '01:30:57', 'Updated a question.'),
('asd', '2017-01-26', '09:40:49', 'Deleted a question.'),
('asd', '2017-01-26', '09:40:59', 'Deleted a question.'),
('asd', '2017-01-26', '09:41:22', 'Deleted a question.'),
('asd', '2017-01-26', '09:41:31', 'Deleted a question.'),
('asd', '2017-01-26', '09:41:32', 'Deleted a question.');

-- --------------------------------------------------------

--
-- Table structure for table `prof_class`
--

CREATE TABLE IF NOT EXISTS `prof_class` (
  `class_id` varchar(15) NOT NULL,
  `block_code` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `prof_det`
--

CREATE TABLE IF NOT EXISTS `prof_det` (
  `prof_id` varchar(8) NOT NULL,
  `last` varchar(15) NOT NULL,
  `first` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prof_det`
--

INSERT INTO `prof_det` (`prof_id`, `last`, `first`) VALUES
('03-0387', 'Molino', 'Wellanie');

-- --------------------------------------------------------

--
-- Table structure for table `prof_login`
--

CREATE TABLE IF NOT EXISTS `prof_login` (
  `prof_id` varchar(10) NOT NULL,
  `pass` varchar(15) NOT NULL,
  `last_log` date NOT NULL,
  `enail` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE IF NOT EXISTS `quiz` (
  `quiz_id` varchar(5) NOT NULL,
  `quiz_det` varchar(51) NOT NULL,
  `class_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quiz_id`, `quiz_det`, `class_id`) VALUES
('00001', 'Sample details of quiz_1', 10274161),
('00002', 'Sample details of quiz_1', 10273161);

-- --------------------------------------------------------

--
-- Table structure for table `q_bank`
--

CREATE TABLE IF NOT EXISTS `q_bank` (
  `q_id` int(11) NOT NULL,
  `categ` varchar(12) NOT NULL,
  `sub_code` varchar(6) NOT NULL,
  `subj` varchar(12) NOT NULL,
  `q_det` varchar(101) NOT NULL,
  `q_points` varchar(5) NOT NULL,
  `a_id` varchar(10) NOT NULL,
  `prof_id` varchar(8) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_bank`
--

INSERT INTO `q_bank` (`q_id`, `categ`, `sub_code`, `subj`, `q_det`, `q_points`, `a_id`, `prof_id`, `status`) VALUES
(1, '', '', '', 'Sample Question. Ano name mo?', '5', '20001', '03-0387', '1'),
(2, '', '', '', 'Nagbago ba part 2?', '10', 'smpID', '00-0000', '1');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE IF NOT EXISTS `section` (
  `sec_id` varchar(10) NOT NULL,
  `sec_det` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `stud_id` varchar(10) NOT NULL,
  `crs_code` varchar(3) NOT NULL,
  `section_det` varchar(1) NOT NULL,
  `stud_last` varchar(15) NOT NULL,
  `stud_first` varchar(15) NOT NULL,
  `stud_email` varchar(31) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`stud_id`, `crs_code`, `section_det`, `stud_last`, `stud_first`, `stud_email`) VALUES
('13-027-027', '027', 'A', 'Babida', 'Gillian', 'gbabida@live.com.ph'),
('13-027-039', '027', 'A', 'Celis', 'Emmanuel', 'ecelis@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `sub_code` varchar(6) NOT NULL,
  `sub_description` varchar(51) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`sub_code`, `sub_description`) VALUES
('CSE4', 'Puto shop XDD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
 ADD PRIMARY KEY (`ans_id`);

--
-- Indexes for table `prof_class`
--
ALTER TABLE `prof_class`
 ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `prof_det`
--
ALTER TABLE `prof_det`
 ADD PRIMARY KEY (`prof_id`);

--
-- Indexes for table `prof_login`
--
ALTER TABLE `prof_login`
 ADD PRIMARY KEY (`prof_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
 ADD PRIMARY KEY (`stud_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
MODIFY `ans_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
