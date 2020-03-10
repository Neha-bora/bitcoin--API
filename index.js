const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");




const app = express();
 app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req , res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req ,res){
	

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;


  var baseURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';

  var finalURL = baseURL + crypto + fiat;
       
       const options = {
				  url: finalURL,
				  headers: {
				    'x-ba-key': 'MDQxMmY3NmU1NDQzNGU2ZTg2MjFkNzM0MmIzYTcwOGQ'
				  },
          qs: {
             from:crypto,
             to: fiat,
             amount: amount
          }
    
       }; 
 
		function callback(error, response, body) {

           var data = JSON.parse(body);
           var price = data.price;

           var currentDate = data.time;

           res.write("<p>The current date is" + currentDate + "</p>");


           res.write("<h1>" +amount + crypto + " is currently worth " + price + fiat + "</h1>");
		   
		   res.send();
		}
 
      request(options, callback);

   });
 


 
 app.listen(3000, function(){
 	console.log("server is running on port 3000.");
 });






  