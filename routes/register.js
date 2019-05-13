const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const router = express.Router();
const myHash = function myHash(key)    // 비밀번호를 암호화 하는 해시함수
{
	var hash = crypto.createHash('sha1');
	hash.update(key);
	return hash.digest('hex');
}

router.use(bodyParser.urlencoded({extended:false}));
router.get('/checkid',(request,response)=>    // 아이디 중복 확인
{
	var uid=request.query.id;
	console.log(uid);
	global.connection.query('SELECT * FROM user WHERE userid =?',[uid],(error,results) =>            //사용자 테이블에 아이디가 존재하는지 검색
	{
		if(results.length)    //존재하면
		{
			console.log('중복');
			response.send('true');   //true를 전송
		}
		else      //존재하지 않으면
		{
			console.log('중복 아님');
			response.send('false');    //false를 전송
		}
	});
});

router.post('/',(request,response)=>
{
	var uid=request.body.uid;
	var pass1=request.body.pass1;
	var pass2=request.body.pass2;
	var nickname=request.body.nickname;
	var email=request.body.email;
	var university=request.body.university;
	global.connection.query('SELECT * FROM user WHERE userid =?',[uid],(error,results)=>
{
	if(!results.length)//아이디 중복이 없으면
	{
				global.connection.query('INSERT INTO user(userid,passwd,type,image,name,email,confirm,intro,university) VALUES(?,?,?,?,?,?,?,?,?)',[uid,myHash(pass1),'0','',nickname,email,'0','',university],()=>
				{
					console.log('Insertion into database was compeleted!');
				});
				response.send('success');
			}
			else{
				response.send('fail');
			}
});
});
module.exports = router
