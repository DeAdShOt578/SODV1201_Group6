const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const jsonfile = require('jsonfile')
let request = require('request');
var ejs = require('ejs');
var sql = require("mssql");
var partials = require('express-partials');
var formidable = require('formidable');

app.set('view engine', 'ejs');
app.use(partials());


// config for your database
var config = {
    user: 'sa',
    password: 'chahal144313k',
    server: 'localhost',
    database: 'harsimrandb'
};

var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/'));

app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

router.post('/updateproperty', function (req, res) {
 
    var query = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where propertyid="+ req.body.pid;

    var finalrecords = "";
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query(query, function (err, rows) {
           
            res.render('index', {
                users: rows.recordset
            });
            });

        });

        });

   



router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    
});

router.get('/addpropertyfile', function (req, res) {
    res.sendFile(path.join(__dirname + '/addpropertyfile.html'));
    
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/loginfile.html'));
    
});
router.get('/addpropertyfile', function (req, res) {
    res.sendFile(path.join(__dirname + '/addpropertyfile.html'));
    
});


router.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + '/registerfile.html'));
});

//Showing Properties 
router.get('/showproperty', function (req, res) {
    var query = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master";

    var finalrecords = "";
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query(query, function (err, data) {
            
            res.write('<html>');
            res.write('<body bgcolor="#c9eafd">');
            if (err) console.log(err)
            for (i = 0; i < data.recordset.length; i++) {
                finalrecords += "<tr>";
                finalrecords += "<td>" + data.recordset[i].propertyid + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertytype + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertydesc + "</td>";
                finalrecords += "<td>" + data.recordset[i].area + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertyrent + "</td>";
                finalrecords += "<td>" + data.recordset[i].phoneno + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertyaddress + "</td>";
                finalrecords += "<td>" + data.recordset[i].neighbourhood + "</td>";
                finalrecords += "<td>" + data.recordset[i].sqfeet + "</td>";
                finalrecords += "<td>" + data.recordset[i].parking + "</td>";
                finalrecords += "<td>" + data.recordset[i].reachable + "</td>";
                finalrecords += "<td>" + data.recordset[i].rating + "</td>";
                finalrecords += "</tr>";

            }
            res.write('<center><table border=1 width="90%" bgcolor="yellow">');
            res.write('<caption><h1>List of Properties</h1></caption>');
            res.write("<tr><th>Id</th><th>Property Type</th><th>Description</th><th>Area</th><th>Rent</th><th>Phone</th><th>Address</th><th>Neighbourhood</th><th>sqfeet</th><th>Parking?</th><th>Reachable?</th><th>Rating</th></tr>")
            res.write(finalrecords);
            res.write('</table >');
            res.write('<br><a href="/">Home</a>');
            res.write(' <center></body>');
            res.write('</html>');
            res.end()

        });

    });
    
});

//Showing users
router.get('/showusersfile', function (req, res) {
    var query = "select ownerid,onwername,gender,owneraddress,ownerphone,owneruname,ownerpwd,usertype from addowner_master";

    var finalrecords = "";
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query(query, function (err, data) {

            res.write('<html>');
            res.write('<body  bgcolor="#c9eafd">');
            if (err) console.log(err)
            for (i = 0; i < data.recordset.length; i++) {
                finalrecords += "<tr>";
                finalrecords += "<td>" + data.recordset[i].ownerid + "</td>";
                finalrecords += "<td>" + data.recordset[i].onwername + "</td>";
                finalrecords += "<td>" + data.recordset[i].gender + "</td>";
                finalrecords += "<td>" + data.recordset[i].owneraddress + "</td>";
                finalrecords += "<td>" + data.recordset[i].ownerphone + "</td>";
                finalrecords += "<td>" + data.recordset[i].owneruname + "</td>";
                finalrecords += "<td>" + data.recordset[i].usertype + "</td>";
                finalrecords += "</tr>";

            }
            res.write('<center><table border=1 width="50%" bgcolor="yellow">');
            res.write('<caption><h1>List of Users</h1></caption>');
            res.write("<tr><th>Id</th><th>Name</th><th>Gender</th><th>Address</th><th>Phone No.</th><th>Username</th><th>usertype</th></tr>")
            res.write(finalrecords);
            res.write('</table >');
            res.write('<br><a href="/">Home</a>');
            res.write(' <center></body>');
            res.write('</html>');
            res.end()

        });

    });

});

// urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Open Add Property Page from login 


//save Rating Post
router.post('/openaddproperty', urlencodedParser, function (req, res) {
    global.temp = req.body.uid;
    res.sendFile(path.join(__dirname + '/addpropertyfile.html'));

});

//Add property Post
router.post('/addproperty', urlencodedParser, function (req, res) {
    var query = "insert into property_master(propertytype,propertydesc,area,propertyrent,phoneno,propertyaddress,neighbourhood,sqfeet,parking,reachable,ownerid) values('" + req.body.propertytype + "','" + req.body.propertydesc + "','" + req.body.propertyarea + "'," + req.body.propertyrent + ",'" + req.body.contact + "','" + req.body.propertyaddress + "','" + req.body.neighbourhood + "'," + req.body.sqfeet + ",'" + req.body.parking + "','" + req.body.reachable + "'," + global.temp +")";
  
    addRecord(query);
	res.sendFile(path.join(__dirname + '/success.html'));
});

//Upadate property Post
router.post('/updatepropertysave', urlencodedParser, function (req, res) {
    var query = "update property_master set propertytype='" + req.body.propertytype + "',propertydesc='" + req.body.propertydesc + "',area='" + req.body.propertyarea + "',propertyrent=" + req.body.propertyrent + ",phoneno='" + req.body.contact + "',propertyaddress='" + req.body.propertyaddress + "',neighbourhood='" + req.body.neighbourhood + "',sqfeet=" + req.body.sqfeet + ",parking='" + req.body.parking + "',reachable='" + req.body.reachable + "' where propertyid="+ req.body.pid;
    
    addRecord(query);
    res.sendFile(path.join(__dirname + '/success.html'));
});

//Upload property Image
router.post('/uploadphoto', urlencodedParser, function (req, res) {
    global.pid = req.body.pid;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html>');
    res.write('<style>.upload-btn{background-color:gray;color:#fff;font-weight:bold;border:none;border-radius:8px;padding:8px 15px;font-size:1.3em;margin-top:10px;}');
    res.write('</style>');
    res.write('<body  bgcolor="#c9eafd">');
    res.write('<center>');
    res.write('<h1>Upload Picture For Property</h1>');
    res.write('<div style="background-color:#ffacac;border-radius:8px; display:inline-block;padding:30px 50px">');
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit" class="upload-btn">');
    res.write('</form>');
    res.write('</div>');
    res.write('<br><br><button onclick="history.back();">Back</button>');
    res.write('</center>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
});

//Upload property Image
router.post('/fileupload', urlencodedParser, function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
      
        var newpath = path.join(__dirname + '/images/' + global.pid+".jpg")
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                res.sendFile(path.join(__dirname + '/success.html'));
           
            });
        })
    });
});


//Show uploaded Photo
router.post('/showphoto', urlencodedParser, function (req, res) {
    global.pid = req.body.pid;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html>');
    res.write('<style>.upload-btn{background-color:gray;color:#fff;font-weight:bold;border:none;border-radius:8px;padding:8px 15px;font-size:1.3em;margin-top:10px;}');
    res.write('</style>');
    res.write('<body  bgcolor="#c9eafd">');
    res.write('<center>');
    res.write('<h1>Uploaded Photo For Property Id:'+global.pid+'</h1>');
    res.write('<div style="background-color:#ffacac;border-radius:8px; display:inline-block;padding:30px 50px">');
    res.write('<img width="300px" src="images/' + global.pid + '.jpg" > ');
    res.write('</div>');
    res.write('<br><br><button onclick="history.back();">Back</button>');
    res.write('</center>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
});




//Delete Property Post
router.post('/deleteproperty', urlencodedParser, function (req, res) {
    var query = "delete from property_master where propertyid=" + req.body.pid;
    addRecord(query);
    res.sendFile(path.join(__dirname + '/success.html'));
});

router.get('/updatepropertysave', urlencodedParser, function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/search', urlencodedParser, function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//logout 
router.get('/logout', urlencodedParser, function (req, res) {
    global.uid = 0;
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Search property Post
router.post('/search', urlencodedParser, function (req, res) {

    var area = req.body.city;
    var facility = req.body.facility;
    var sqfeet = req.body.sqfeet;
    var neighbourhood = req.body.neighbourhood;
    var address = req.body.address;
    var parking = req.body.parking;
    var query = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where area='" + area + "' and reachable like'" + facility + "%' and parking like'" + parking + "%' and neighbourhood like'" + neighbourhood + "%' and propertyaddress like'" + address + "%'";

    console.log(query);
    var finalrecords = "";
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query(query, function (err, data) {

            res.write('<html>');
            res.write('<body  bgcolor="#c9eafd">');
            if (err) console.log(err)
            for (i = 0; i < data.recordset.length; i++) {
                finalrecords += "<tr>";
                finalrecords += "<td>" + data.recordset[i].propertyid + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertytype + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertydesc + "</td>";
                finalrecords += "<td>" + data.recordset[i].area + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertyrent + "</td>";
                finalrecords += "<td>" + data.recordset[i].phoneno + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertyaddress + "</td>";
                finalrecords += "<td>" + data.recordset[i].neighbourhood + "</td>";
                finalrecords += "<td>" + data.recordset[i].sqfeet + "</td>";
                finalrecords += "<td>" + data.recordset[i].parking + "</td>";
                finalrecords += "<td>" + data.recordset[i].reachable + "</td>";
                finalrecords += "<td>" + data.recordset[i].rating + "</td>";
                finalrecords += "</tr>";

            }
            res.write('<center><table border=1 width="50%" bgcolor="yellow">');
            res.write('<caption><h1>List of Searched Properties</h1></caption>');
            res.write("<tr><th>Id</th><th>Property Type</th><th>Description</th><th>Area</th><th>Rent</th><th>Phone</th><th>Address</th><th>Neighbourhood</th><th>sqfeet</th><th>Parking?</th><th>Reachable?</th><th>Rating</th></tr>")
            res.write(finalrecords);
            res.write('</table >');
            res.write('<br><a href="/">Home</a>');
            res.write(' <center></body>');
            res.write('</html>');
            res.end()

        });

    });
});

//Add addowner/register Post
router.post('/addowner', urlencodedParser, function (req, res) {
	var query = "insert into addowner_master(onwername,gender,owneraddress,ownerphone,owneruname,ownerpwd,usertype) values('"+req.body.onwername+"','"+req.body.gender+"','"+req.body.owneraddress+"','"+req.body.ownerphone+"','"+req.body.owneruname+"','"+req.body.ownerpwd+"','"+req.body.usertype+"')";
  
    addRecord(query);
	res.sendFile(path.join(__dirname + '/success.html'));
});

router.get('/rate', urlencodedParser, function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Rate Now Post
router.post('/rate', urlencodedParser, function (req, res) {
    var pid = req.body.pid;
    
    var query = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where propertyid=" + pid;

    var finalrecords = "";
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query(query, function (err, data) {

            res.write('<html>');
            res.write('<body  bgcolor="#c9eafd">');
            if (err) console.log(err)
            for (i = 0; i < data.recordset.length; i++) {
                finalrecords += "<tr>";
                finalrecords += "<td>" + data.recordset[i].propertyid + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertytype + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertydesc + "</td>";
                finalrecords += "<td>" + data.recordset[i].area + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertyrent + "</td>";
                finalrecords += "<td>" + data.recordset[i].phoneno + "</td>";
                finalrecords += "<td>" + data.recordset[i].propertyaddress + "</td>";
                finalrecords += "<td>" + data.recordset[i].neighbourhood + "</td>";
                finalrecords += "<td>" + data.recordset[i].sqfeet + "</td>";
                finalrecords += "<td>" + data.recordset[i].parking + "</td>";
                finalrecords += "<td>" + data.recordset[i].reachable + "</td>";
                finalrecords += "<td>" + data.recordset[i].rating + "</td>";
                finalrecords += "</tr>";

            }
            res.write('<center><table border=1 width="90%" bgcolor="yellow">');
            res.write('<caption><h1>Rate Property</h1></caption>');
            res.write("<tr><th>Id</th><th>Property Type</th><th>Description</th><th>Area</th><th>Rent</th><th>Phone</th><th>Address</th><th>Neighbourhood</th><th>sqfeet</th><th>Parking?</th><th>Reachable?</th><th>Rating</th></tr>")
            res.write(finalrecords);
            res.write('</table >');
            res.write('<form action="/saverating" method="post">');
            res.write('<label><h2>Select Star Rating</h2></label>');
            res.write('<select name="rating">');
            res.write('<option>1</option>');
            res.write('<option>2</option>');
            res.write('<option>3</option>');
            res.write('<option>4</option>');
            res.write('<option>5</option>');
            res.write('</select>');
            res.write("&nbsp;&nbsp;&nbsp;<input type='hidden' name='pid' value='" + data.recordset[0].propertyid  +"'/>");
            res.write('<input type="submit" value="Save">');
            res.write('</form>');
            res.write('<br><a href="/">Home</a>');
            res.write(' <center></body>');
            res.write('</html>');
            res.end()

        });

    });
});



//save Rating Post
router.post('/saverating', urlencodedParser, function (req, res) {
    var query = "update property_master set rating=" + req.body.rating + " where propertyid=" + req.body.pid ;
   
    addRecord(query);
    res.sendFile(path.join(__dirname + '/success.html'));
});



//Add login Post
router.post('/login', urlencodedParser, function (req, res) {
    var uname = req.body.uname;
    var pwd = req.body.pwd;
    
    var query = "select * from addowner_master where owneruname='" + uname + "' and ownerpwd='" + pwd + "'";

    sql.connect(config, function (err) {
        finalrecords = "";
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query(query, function (err, data) {

            
            
            if (err) console.log(err)
            var numrows = data.rowsAffected
            if (data.rowsAffected == 0) {
                res.sendFile(path.join(__dirname + '/loginfile.html'));
            }
            else {
                //Start of co-worker display in login
                if (data.recordset[0].usertype == 'Co-Worker')               
                { 
                    var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master ";

                var finalrecords = "";
                // connect to your database
                sql.connect(config, function (err) {

                    if (err) console.log(err);

                    // create Request object
                    var request1 = new sql.Request();

                    request1.query(query1, function (err, coworkerdata) {

                        res.write('<html>');
                        res.write('<body  bgcolor="#c9eafd">');
                        if (err) console.log(err)
                        for (i = 0; i < coworkerdata.recordset.length; i++) {
                            finalrecords += "<tr>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].propertyid + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].propertytype + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].propertydesc + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].area + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].propertyrent + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].phoneno + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].propertyaddress + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].neighbourhood + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].sqfeet + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].parking + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].reachable + "</td>";
                            finalrecords += "<td>" + coworkerdata.recordset[i].rating + "</td>";
                            finalrecords += "<td><form action='/rate' method='post'><input type='hidden' name='pid' value='" + coworkerdata.recordset[i].propertyid  +"'/><button type='submit'>Rate Now</button></form></td>";
                            finalrecords += "</tr>";

                        }
                        res.write('<center><table border=1 width="90%" bgcolor="yellow">');
                        res.write('<caption><h1>List of Properties (Co-Worker)</h1></caption>');
                        res.write("<tr><th>Id</th><th>Property Type</th><th>Description</th><th>Area</th><th>Rent</th><th>Phone</th><th>Address</th><th>Neighbourhood</th><th>sqfeet</th><th>Parking?</th><th>Reachable?</th><th>Rating</th><th>Rate Now</th></tr>")
                        res.write(finalrecords);
                        res.write('</table >');
                        res.write('<br><a href="/">Home</a>');
                        res.write(' <center></body>');
                        res.write('</html>');
                        res.end()

                    });

                });
                //End of co-worker display in login
                }
                //Start Of Owner Display in Login
                else
                {
                    var query2 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where ownerid=" + data.recordset[0].ownerid;

                    var finalrecords = "";
                    // connect to your database
                    sql.connect(config, function (err) {

                        if (err) console.log(err);

                        // create Request object
                        var request2 = new sql.Request();

                        request2.query(query2, function (err, ownerdata) {

                            res.write('<html>');
                            res.write('<body  bgcolor="#c9eafd">');
                            if (err) console.log(err)
                            for (i = 0; i < ownerdata.recordset.length; i++) {
                                finalrecords += "<tr>";
                                finalrecords += "<td>" + ownerdata.recordset[i].propertyid + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].propertytype + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].propertydesc + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].area + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].propertyrent + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].phoneno + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].propertyaddress + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].neighbourhood + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].sqfeet + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].parking + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].reachable + "</td>";
                                finalrecords += "<td>" + ownerdata.recordset[i].rating + "</td>";
                                finalrecords += "<td><form action='/updateproperty' method='post'><input type='hidden' name='pid' value='" + ownerdata.recordset[i].propertyid + "'/><button type='submit'>Update</button></form></td>";
                                finalrecords += "<td><form action='/deleteproperty' method='post'><input type='hidden' name='pid' value='" + ownerdata.recordset[i].propertyid + "'/><button type='submit'>Delete</button></form></td>";
                                finalrecords += "<td><form action='/uploadphoto' method='post'><input type='hidden' name='pid' value='" + ownerdata.recordset[i].propertyid + "'/><button type='submit'>Upload</button></form></td>";
                                finalrecords += "<td><form action='/showphoto' method='post'><input type='hidden' name='pid' value='" + ownerdata.recordset[i].propertyid + "'/><button type='submit'>Show</button></form></td>";
                                finalrecords += "</tr>";

                            }
                            res.write('<center><table border=1 width="100%" bgcolor="yellow">');
                            res.write('<caption><h1>List of Properties (Owner)</h1></caption>');
                            res.write("<tr><th>Id</th><th>Property Type</th><th>Description</th><th>Area</th><th>Rent</th><th>Phone</th><th>Address</th><th>Neighbourhood</th><th>sqfeet</th><th>Parking?</th><th>Reachable?</th><th>Rating</th><th colspan='4'>Action</th></tr>")
                            res.write(finalrecords);
                            res.write('</table >');
                            res.write("<br> <form action='/openaddproperty' method='post'><input type='hidden' name='uid' value='" + data.recordset[0].ownerid + "'/><button type='submit'>Add Property</button></form>");
                            res.write('<br><a href="/">Home</a>');
                            res.write(' <center></body>');
                            res.write('</html>');
                            res.end()

                        });

                    });
                    
                }
                //End of co-worker display in login
        }
            //End of Owner display in login
        });

    });
	//res.sendFile(path.join(__dirname + '/success.html'));

});

//add the router
app.use('/', router);

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');


function addRecord(query) {
    

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();


        request.query(query, function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            //res.send(recordset);

        });
    });

}