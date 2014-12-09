var AWS = require('aws-sdk'),
    fs = require('fs'),
    port = process.argv[2] || 8888,
    http = require("http"),
    bucket = 'my-recordings/', // change that
    restify = require('restify');


AWS.config.update({ accessKeyId: 'key', secretAccessKey: 'secret' }); // change that

var server = restify.createServer();
server.use(restify.bodyParser());
server.put('/:accountID/:filename', function(req,res,next){
  var s3 = new AWS.S3();
      s3.putObject({
        Bucket: bucket+req.params.accountID,
        Key: req.params.filename,
        Body:req.body,
        ContentType: "audio/mp3"
        
      },function (err,data) {
          if(err) console.log('Bucket err: ',err);
          if(data) console.log('Bucket data: ',data);
        //console.log('Successfully uploaded recording.');
        
        res.writeHead(200, "OK", {'Content-Type': 'text/html'}); // not sure what's the correct response type. this just works.
        res.end();
  });


});
server.get('/:accountID/:filename',function(req,res,next){
    var options = {
        Bucket : bucket+req.params.accountID,
        Key : req.params.filename
    };
var s3 = new AWS.S3();
    s3.getObject(options, function(err, data) {
        res.setHeader('content-type', data.ContentType);
        res.send(data.Body);
    });
    
    
})
server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
