'use strict';
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
let request = require('request');
var ejs = require('ejs');
var sql = require('mysql');
var partials = require('express-partials');
var formidable = require('formidable');
let alert = require('alert'); 


app.set('view engine', 'ejs');
app.use(partials());


// config for your database
var con  = sql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'coworking'
  });
  
  

var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/'));

app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// body parser
app.use(bodyParser.json())

//storing userid and property id
var ownerid=0;
var pid=0;


router.get('/updateproperty/:id', function (req, res) {
 
    var query = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where propertyid="+ req.params.id;
    con.query(query, function (error, records, fields) {
        if (error) throw error;
    
        res.render('updateproperty',{data:records,msg:""});
    });

    

 });

   
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    
});


router.get('/login', function (req, res) {
    res.render('loginfile',{msg:''});
    
});
router.get('/addproperty', function (req, res) {
    res.render('addproperty',{msg:""})
    
});


router.get('/register', function (req, res) {
    res.render("registerfile",{msg:""});
});

//Showing Properties 
router.get('/showproperty', function (req, res) {
    var query = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master";

    con.query(query, function (error, records, fields) {
        if (error) throw error;
    
        res.render('showproperties',{data:records});
    });
});

//Showing users
router.get('/showusersfile', function (req, res) {
    var query = "select ownerid,onwername,gender,owneraddress,ownerphone,owneruname,ownerpwd,usertype from usermaster";

    con.query(query, function (error, records, fields) {
        if (error) throw error;
    
        res.render('showusers',{data:records});
    });
});



// urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Open Add Property Page from login 


//Add property Post
router.post('/addproperty', urlencodedParser, function (req, res) {
    var query = "insert into property_master(propertytype,propertydesc,area,propertyrent,phoneno,propertyaddress,neighbourhood,sqfeet,parking,reachable,ownerid) values('" + req.body.propertytype + "','" + req.body.propertydesc + "','" + req.body.propertyarea + "'," + req.body.propertyrent + ",'" + req.body.contact + "','" + req.body.propertyaddress + "','" + req.body.neighbourhood + "'," + req.body.sqfeet + ",'" + req.body.parking + "','" + req.body.reachable + "'," + ownerid +")";
  
    con.query(query, function (error, records, fields) {
        if (error) throw error;
    
        res.render('addproperty',{msg:"New Property Added!!!"});
    });
});

//Upadate property Post
router.post('/updateproperty/:id', urlencodedParser, function (req, res) {
    var query = "update property_master set propertytype='" + req.body.propertytype + "',propertydesc='" + req.body.propertydesc + "',area='" + req.body.propertyarea + "',propertyrent=" + req.body.propertyrent + ",phoneno='" + req.body.contact + "',propertyaddress='" + req.body.propertyaddress + "',neighbourhood='" + req.body.neighbourhood + "',sqfeet=" + req.body.sqfeet + ",parking='" + req.body.parking + "',reachable='" + req.body.reachable + "' where propertyid="+ req.params.id;
    
    con.query(query, function (error, records, fields) {
        if (error) throw error;
    
        var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master ";
        con.query(query1, function (error, records, fields) {
            if (error) throw error;
        
            res.render('ownerdashboard',{data:records});
        });
    });
    
});

//Upload property Image
router.get('/uploadphoto/:id', urlencodedParser, function (req, res) {
    global.pid = req.params.id;
    res.render("uploadphoto")
});

//Upload property Image
router.post('/fileupload', urlencodedParser, function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
      
        var newpath = path.join(__dirname + '/images/' + global.pid+".jpg")
       
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master ";
                con.query(query1, function (error, records, fields) {
            if (error) throw error;
            alert("Photo Uploaded !!!")
            res.render('ownerdashboard',{data:records});
        });
           
            });
        })
    });
});


//Show uploaded Photo
router.get('/showphoto/:id', urlencodedParser, function (req, res) {
    pid=req.params.id;
    res.render("showphoto",{imgid:pid})
});

//Details of property
router.get('/view/:id', urlencodedParser, function (req, res) {
        pid=req.params.id;
        
        var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where propertyid="+pid;
        
        con.query(query1, function (error, records, fields) {
            if (error) throw error;
            
           
            res.render('viewdetails',{data:records});
        });
    });



//delete a property
router.get('/deleteproperty/:id', urlencodedParser, function (req, res) {
    var query = "delete from property_master where propertyid="+ req.params.id;
    
    con.query(query, function (error, records, fields) {
        if (error) throw error;
        var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master ";
        con.query(query1, function (error, records, fields) {
            if (error) throw error;
            res.render('ownerdashboard',{data:records});
        });
    });
});

//update property
router.get('/updatepropertysave', urlencodedParser, function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//searching
router.get('/search', urlencodedParser, function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//logout 
router.get('/logout', urlencodedParser, function (req, res) {
    ownerid = 0;
    res.render("login",{msg:""});
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
    con.query(query, function (error, records, fields) {
        if (error) throw error;
    
        res.render('showproperties',{data:records});
    });
    


});

//new user register
router.post('/register', urlencodedParser, function (req, res) {
	var query = "insert into usermaster(onwername,gender,owneraddress,ownerphone,owneruname,ownerpwd,usertype) values('"+req.body.onwername+"','"+req.body.gender+"','"+req.body.owneraddress+"','"+req.body.ownerphone+"','"+req.body.owneruname+"','"+req.body.ownerpwd+"','"+req.body.usertype+"')";
    
    con.query(query, function (error, records, fields) {
        if (error) throw error;
    
        res.render('registerfile',{msg:"New User Added!!!"});
    });
});

//for giving rating
router.get('/rate/:id', urlencodedParser, function (req, res) {
    pid=req.params.id;
        
        var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where propertyid="+pid;
        
        con.query(query1, function (error, records, fields) {
            if (error) throw error;
            
           
            res.render('rate',{data:records});
        });
});


//save the ratings
router.post('/saverating', urlencodedParser, function (req, res) {
    var query = "update property_master set rating=" + req.body.rating + " where propertyid=" + req.body.pid ;
    
    con.query(query, function (error, records, fields) {
        if (error) throw error;
        var query2 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master ";
        con.query(query2, function (error, records, fields) {
            if (error) throw error;
        
            res.render('coworkerdashboard',{data:records});
        });
    });
  
});



//login 
router.post('/login', urlencodedParser, function (req, res) {
    var uname = req.body.uname;
    var pwd = req.body.pwd;
    
    var query = "select * from usermaster where owneruname='" + uname + "' and ownerpwd='" + pwd + "'";

    con.query(query, function (error, results, fields) {
        if (error) throw error;
        
        if (results.length==0) 
        {
            res.render('loginfile',{msg:"Sorry Invalid User!!!"});
           
            
        }
        else
        {
            
            
            ownerid=results['0'].ownerid;
            if (results['0'].usertype=="Owner")
            {
            var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master where ownerid="+ownerid;
            con.query(query1, function (error, records, fields) {
                if (error) throw error;
            
                res.render('ownerdashboard',{data:records});
            });
        }
        else
        {
            var query1 = "select propertyid,propertytype,propertydesc,area,propertyrent,phoneno,rating,propertyaddress,neighbourhood,sqfeet,parking,reachable from property_master ";
            con.query(query1, function (error, records, fields) {
                if (error) throw error;
            
                res.render('coworkerdashboard',{data:records});
            });
        }
        }
    });
    
});

//add the router
app.use('/', router);

app.listen(process.env.port || 3000);

console.log('Follow the link to open application "http://localhost:3000"');


