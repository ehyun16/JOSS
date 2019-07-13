//계정 찾기 아직 구현 안함 
const express = require('express');
const bodyParser = require('body-parser');
//const email=require('emailjs');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.post('/pw', (request, response)=>
{
	var uid=request.body.uid;
  var email=request.body.email;

 global.connection.query('SELECT * FROM user where uid =? and email = ?',[uid, email],(error,results)=>
 {
  if(results.length){
    code=Math.floor((Math.random()*9000)+1000);
  var message={
     text: code,
     from: "JOSS<jeongwon0917@naver.com>",
     to: email,
     subject: "비밀번호 찾기 인증번호입니다."
  };
  emailServer.send(message, function(err, message){
     console.log(err || message);
     response.send('success');
  });
  }else{
    response.send('false');
  }
 });

});

router.post('/id', (request, response)=>
{


});

module.exports = router
