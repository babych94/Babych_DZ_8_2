/**
 * Created by Василь on 28.04.2015.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var Vec2 = require('./dop');
var Personazh = require('./dop');
var Magyr = require('./dop');

var vuyko = new Personazh('vuyko', 'black', '500', '100', '50');
vuyko.speed = new Vec2(50, 20);
vuyko.maxSpeed = new Vec2(50, 20);
vuyko.position = new Vec2(0, 0);


var pichti = new Magyr('pichti', 'black', '1000', '200', '100');
pichti.speed = new Vec2(100, 40);
pichti.maxSpeed = new Vec2(100, 40);
pichti.position = new Vec2(100, 0);


app.get('/vuyko', function(req, res, next){
    res.send(vuyko)
});

app.get('/pichti', function(req, res, next){
    res.send(pichti)
});


app.use(function(req, res, next){
    if(req.url == '/hello') {
        res.end('Hello World :))');
    } else {
        next();
    }
});

app.use(function(req, res){
    res.send(404, 'Page not found');
})

app.use(bodyParser.urlencoded({extended: true}));



var  server = app.listen(3003, function(){
    console.log('Listening on port 3003');
});