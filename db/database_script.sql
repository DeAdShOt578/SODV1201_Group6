create schema coworking;
use coworking;

CREATE TABLE `usermaster` (
  `ownerid` int(11) NOT NULL,
  `onwername` varchar(200) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `owneraddress` varchar(500) DEFAULT NULL,
  `ownerphone` varchar(100) DEFAULT NULL,
  `owneruname` varchar(100) DEFAULT NULL,
  `ownerpwd` varchar(100) DEFAULT NULL,
  `usertype` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

ALTER TABLE `usermaster`
  ADD PRIMARY KEY (`ownerid`);

--
-- Indexes for table `property_master`
--
ALTER TABLE `property_master`
  ADD PRIMARY KEY (`propertyid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usermaster`
--
ALTER TABLE `usermaster`
  MODIFY `ownerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `property_master`
--
ALTER TABLE `property_master`
  MODIFY `propertyid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;