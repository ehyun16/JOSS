var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',(request,response)=>
{
  var token=request.headers.authorization;
  var decoded = jwt.verify(token, 'abc123');
  //console.log(decoded);
  if(decoded){
    var userId=decoded.user.userId;
	global.connection.query('SELECT * FROM user WHERE userid=?',[userId],(error, result)=>
        {
          if(error)
              console.log(error);
            else
              response.send(result[0]);
        });
      }
});
module.exports = router
