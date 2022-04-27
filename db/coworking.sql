

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `addowner_master` (
  `ownerid` int(11) NOT NULL,
  `onwername` varchar(200) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `owneraddress` varchar(500) DEFAULT NULL,
  `ownerphone` varchar(100) DEFAULT NULL,
  `owneruname` varchar(100) DEFAULT NULL,
  `ownerpwd` varchar(100) DEFAULT NULL,
  `usertype` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `addowner_master` (`ownerid`, `onwername`, `gender`, `owneraddress`, `ownerphone`, `owneruname`, `ownerpwd`, `usertype`) VALUES
(1, 'Jashanpreet Kaur', 'Female', 'Toronto', '655-565-8989', 'jashan', '1234', 'Owner'),
(2, 'Jayant Sharma', 'Male', 'Calgary', '123-456-7890', 'jayant', 'abcd.', 'Owner'),
(3, 'Patryk Blach', 'Male', 'Brampton', '898989', 'patryk', '12ab', 'Owner'),
(4, 'a', 'Male', 'a', '1', 'a', '1', 'Co-Worker');


CREATE TABLE `property_master` (
  `propertyid` int(11) NOT NULL,
  `propertytype` varchar(200) DEFAULT NULL,
  `propertydesc` varchar(500) DEFAULT NULL,
  `area` varchar(500) DEFAULT NULL,
  `propertyrent` int(11) DEFAULT NULL,
  `phoneno` varchar(100) DEFAULT NULL,
  `ownerid` smallint(6) DEFAULT NULL,
  `propertyaddress` varchar(1000) DEFAULT NULL,
  `neighbourhood` varchar(500) DEFAULT NULL,
  `sqfeet` int(11) DEFAULT NULL,
  `parking` varchar(10) DEFAULT NULL,
  `reachable` varchar(10) DEFAULT NULL,
  `rating` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `property_master` (`propertyid`, `propertytype`, `propertydesc`, `area`, `propertyrent`, `phoneno`, `ownerid`, `propertyaddress`, `neighbourhood`, `sqfeet`, `parking`, `reachable`, `rating`) VALUES
(4, 'Apartment', 'a', 'Brampton', 1, '1', 0, 'a', 'a', 1, 'Yes', 'Yes', 5),
(5, 'Apartment', 'One room Flat', 'Brampton', 500, '8989898', 2, '1234', 'Downtown', 100, 'No', 'No', 3),
(6, 'Apartment', 'Two bed room', 'Brampton', 200, '8989889', 2, '67676', 'Downtown', 200, 'Yes', 'Yes', 0),
(7, 'Apartment', 'Two Bedroom', 'Calgary', 1, '8989898', 1, 'Hno.2345', 'Downtown', 1, 'Yes', 'Yes', 0),
(8, 'Apartment', 'One room Flat', 'Brampton', 500, '8989898', 0, '1234', 'Downtown', 100, 'No', 'No', 0),
(9, 'Apartment', 'One room Flat', 'Calgary', 500, '8989898', 0, '1234', 'Downtown', 100, 'No', 'No', 0);

ALTER TABLE `addowner_master`
  ADD PRIMARY KEY (`ownerid`);


ALTER TABLE `property_master`
  ADD PRIMARY KEY (`propertyid`);

ALTER TABLE `addowner_master`
  MODIFY `ownerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `property_master`
  MODIFY `propertyid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

