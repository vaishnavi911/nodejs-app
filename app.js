//define express module to develop web functionality
var EmailService = require('./email/email-service').EmailService;
var express = require("express");
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');
//
app.use(bodyParser.urlencoded({
extended: true
}));
//to read json data from request body 
app.use(express.json()); //express can generate json response
//@RequestMapping(value="/",method=RequestMethod.GET)
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/user-form.htm'));
  //__dirname : It will resolve to your project folder.
});

app.post('/register', function(req, res) {
	var userDetails = JSON.parse(JSON.stringify(req.body));
	console.log(userDetails);
	var  emailService=new EmailService();
	var emailVO={senderEmail:'hietams@gmail.com',toEmail:userDetails.email};
	console.log("Email is being sent , please wait....................................................................");
	emailService.sendEmail(emailVO,function(error,result) {
		  if(error) {
			  console.log(error);
			  console.log("Sorry ! email could not be sent! s%",error);
		  }else{
			  console.log(result);
		  }
	});
	res.json({message:"success"});
});


app.listen(4000);
console.log("Running at Port 4000");
console.log('@@@@@@@@@@@@@Express server listening on port 4000 ');
console.log('@@@@@@@@@@@@@Express server listening on port 4000 ');
console.log('@@@@@@@@@@@@@Express server listening on port 4000 ');

