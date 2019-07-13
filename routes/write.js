const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.get('/write', (request, response)=>
{
  var list_id=request.query.id;
  global.connection.query('SELECT * FROM study WHERE list_id =?',[list_id],(error,results) =>
	{
		if(error){
      console.log(error);
    }
    else{
      response.json(results[0]);
    }
	});
})

router.post('/',(request,response)=>
{
     var token=request.headers.authorization;
     var decoded = jwt.verify(token, 'abc123');
     var userId=decoded.user.userId;

  	var title2=request.body.title2;
    var category=request.body.category;
    var text=request.body.text;

    global.connection.query('INSERT INTO study(title2,category,text,done) VALUES(?,?,?,?)',[title2,category,text,'','0'],()=>
    {
      console.log('Insertion into database was compeleted!');
    });
    response.send('success');
});

module.exports = router
