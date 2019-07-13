const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();

const myHash = function myHash(key)                               //비밀번호를 암호화하는 해시함수
{
	var hash = crypto.createHash('sha1');
	hash.update(key);
	return hash.digest('hex');
}
router.use(bodyParser.urlencoded({extended:false}));

router.post('/',(request,response)=>
{
	var uid = request.body.uid;           // 로그인 정보 저장
  var pass = request.body.pass;

   global.connection.query('SELECT * FROM user where userid =? and passwd = ?',[uid, myHash(pass)],(error,results)=>   //일치하는 회원 정보 검색
	{
		if(results.length)    //일치하는 회원 정보가 있으면
		{
      const user = {
         userId: results[0].userid,
         type: results[0].type
       };
		  var token = jwt.sign({user}, 'abc123', {expiresIn: "365 days"});
      response.json({
        success: true,
        token: token
      });
	  }
		else response.json({
      success: false,
      message: 'Invalid login'
    });  //일치하는 회원 정보가 없으면 로그인 실패
	});
});

module.exports = router
