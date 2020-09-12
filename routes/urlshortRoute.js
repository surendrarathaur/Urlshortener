const express =  require('express');
const app = express();
const shortid = require('shortid');
const validUrl = require('valid-url');
const moment = require('moment');
const ServerRouter = express.Router();
const connection = require('../config/mysqldb');

  
/* Get All Records*/
ServerRouter.route('/').get(function (req, res) {
    console.log(req.ipdetail)
    connection.query('SELECT * FROM tbl_short_url', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

ServerRouter.route('/:code').get(function (req, res) {
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    connection.query('SELECT * FROM tbl_short_url Where urlCode = ?', [req.params.code], function (error, results, fields) {
        if (error) throw error;
        if(results != ''){
            let count = results[0].urlClick + 1;
            let id = results[0].id;
            connection.query('UPDATE tbl_short_url SET urlClick = ?, ipaddress = ? WHERE id = ?', [
                [count],
                [ip],
                [id]
            ], function (error, results1, fields) {
                if (error) throw error;
            });
            //console.log(results[0].originalUrl)
            if (validUrl.isUri(results[0].shortUrl)){
                //console.log(results[0])
                let urlCreateAt = results[0].createdAt;
                let month = urlCreateAt.getMonth() + 1; 
                let year = urlCreateAt.getFullYear();
                let monthsDay = new Date(year, month, 0).getDate();
                
                let expiration = moment(urlCreateAt).format('YYYY-MM-DD');
                let current_date = moment().format("YYYY-MM-DD");
                let days = moment(current_date).diff(expiration, 'days');
                //console.log(days)
                if(month == 2 && monthsDay == days){
                    res.send(404);
                }else if(monthsDay == 30 && monthsDay == days){
                    res.send(404);
                }else if(monthsDay == 31 && monthsDay == days){
                    res.send(404);
                }else{
                    res.redirect(results[0].originalUrl); 
                }
            } else {
                res.redirect('/'); 
            }
            
        }
    }); 
});

/* add Record*/
ServerRouter.route('/add').post(function (req, res) {
    //console.log(req.body)
    const createdAt = new Date();
    const shortcode = shortid.generate();
    const shorturl = "http://localhost:4000/" + shortcode;
    connection.query(`INSERT INTO tbl_short_url(originalUrl,shortUrl,urlCode,createdAt) VALUES(?,?,?,?)`, [
        [req.body.originalUrl],[shorturl],[shortcode],[createdAt]
    ], function (error, results, fields) {
        if (error) throw error;
        if(results.protocol41 == true && results.serverStatus == 2){
            res.json(shorturl);
        }
    });
});

/* update Records*/
ServerRouter.route('/edit/:id').post(function (req, res) {
    const id = req.params;
    const shortcode = shortid.generate();
    const shorturl = "http://localhost/" + shortcode;
    //console.log(id);
    connection.query('UPDATE tbl_short_url SET originalUrl = ?, shortUrl = ?, urlCode= ? WHERE id = ?', [
        [req.body.originalUrl],
        [shorturl],
        [shortcode],
        [id]
    ], function (error, results, fields) {
        if (error) throw error;
        if(results.protocol41 == true && results.serverStatus == 2){
            res.json({"shorturl":shorturl});
        }
    });
});

/* delete Records*/
ServerRouter.route('/delete/:id').get(function (req, res) {
    const id = req.params;
    //console.log(id);
    connection.query('DELETE FROM tbl_short_url WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        if(results.protocol41 == true && results.serverStatus == 2){
            res.json(true);
        }
    });
});


module.exports = ServerRouter;
