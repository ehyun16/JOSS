const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.get('/detail', (request, response)=>
{
  var study_id=request.query.id;
  global.connection.query('SELECT * FROM study WHERE study_id =?',[study_id],(error,results) =>
	{
		if(error){
      console.log(error);
    }
    else{
      response.json(results[0]);
    }
	});
})

router.get('/mine',(request, response)=>
{
  var token=request.headers.authorization;
  var decoded = jwt.verify(token, 'abc123');
  var userId=decoded.user.userId;

  global.connection.query('SELECT * FROM study WHERE userid =?',[userId],(error,results)=>
{
  if(results.length){
response.json({
  success: true,
  data: results
});
}else
  response.json({
    success: false
  });
});
});

router.post('/',(request,response)=>
{
     var token=request.headers.authorization;
     var decoded = jwt.verify(token, 'abc123');
     var userId=decoded.user.userId;

  	var title=request.body.title;
    var category=request.body.category;
    var region=request.body.region;
    var place=request.body.place;
    var max=request.body.max;
    var text=request.body.text;

    global.connection.query('INSERT INTO study(userid,title,category,region,place,max,text,image,done) VALUES(?,?,?,?,?,?,?,?,?)',[userId,title,category,region,place,max,text,'','0'],()=>
    {
      console.log('Insertion into database was compeleted!');
    });
    response.send('success');
});

module.exports = router
