use harsimrandb

--drop table property_master
create table property_master(propertyid  smallint IDENTITY(1,1)PRIMARY KEY CLUSTERED,propertytype varchar (200),propertydesc varchar(500),
area varchar (500), propertyrent int, phoneno varchar(100), ownerid smallint, propertyaddress varchar (1000), neighbourhood varchar(500)
, sqfeet int, parking varchar(10), reachable varchar(10), rating int default 0 )



create table addowner_master(ownerid smallint IDENTITY(1,1)PRIMARY KEY CLUSTERED,onwername varchar (200), 
gender varchar(10), owneraddress varchar (500),ownerphone varchar (100), owneruname varchar(100), ownerpwd varchar(100), usertype varchar(100))


