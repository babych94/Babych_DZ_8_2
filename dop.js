var Vec2 = function(x, y) {
    this.x = x;
    this.y = y;
};

Vec2.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
};

module.exports = Vec2;

var world = {
    gravity: new Vec2(0, 1),
    wind: new Vec2(-10, 1)
};

Personazh = function(name, hair, health, powerHit, radFight){
    this.name = name;
    this.hair = hair;
    this.health = health;
    this.powerHit = powerHit;
    this.radFight = radFight;
};


Personazh.prototype.speed = new Vec2(0, 0);
Personazh.prototype.maxSpeed = new Vec2(0, 0);  //це для того щоб швидкість не була безмежною
Personazh.prototype.position = new Vec2(0, 0);

Personazh.prototype.moveTo = function(w, h) {
    this.w = w;
    this.h = h;
    if (this.speed.x > this.maxSpeed.x && this.speed.y > this.maxSpeed.y) {
        this.speed.x = this.maxSpeed.x;
        this.speed.y = this.maxSpeed.y;
    };  //на швидкість впливають чинники гравітація та вітер
    this.speed
        .add(world.gravity)
        .add(world.wind);

    var step = ~~Math.sqrt( (this.speed.x*this.speed.x) + (this.speed.y*this.speed.y) ); // Довжина кроку залежно від швидкості

    var vidsan = ~~Math.sqrt( ((this.position.x - this.w)*(this.position.x - this.w)) + ((this.position.y - this.h)*(this.position.y - this.h)) ); //Відстань до заданої точки

    var kilk = vidsan/step; //Кількість ітерацій

    for(var i=0; i<~~kilk+1; i++) {
        vidsan -= step;
        if(vidsan < 0){
            vidsan = 0;
        };

    };

    console.log(this.name + ' пройшов '+ i + ' krokiv ');
    return this.position = new Vec2(w, h);

};

Personazh.prototype.fight = function(name){
    this.name = name;
    if (this.name.health > 0 ) {
        return this.name.health = this.name.health - this.powerHit;
    } else if(this.name.health <= 0) {
        this.name.health = 0;
        this.name.powerHit = 0;
        console.log(this.name + ' is dead---------'); }
};



vuyko = new Personazh('vuyko', 'black', '500', '100', '50');
vuyko.speed = new Vec2(50, 20);
vuyko.maxSpeed = new Vec2(50, 20);
vuyko.position = new Vec2(0, 0);



//Наслідування класу
var Magyr = function(){
    Personazh.apply(this, arguments);
};

Magyr.prototype = Object.create(Personazh.prototype);
Magyr.prototype.constructor = Magyr;

module.exports = Magyr;

//персонаж 2
pichti = new Magyr('pichti', 'black', '1000', '200', '100');
pichti.speed = new Vec2(100, 40);
pichti.maxSpeed = new Vec2(100, 40);
pichti.position = new Vec2(100, 0);


var rad = function(o1, o2) {
    var vidboy = ~~Math.sqrt( ((o1.position.x - o2.position.x)*(o1.position.x - o2.position.x)) + ((o1.position.y - o2.position.y)*(o1.position.y - o2.position.y)) );

    if( vidboy <= o2.radFight){
        console.log(o2.name + ' вдарив ' + o1.name );
        return o2.fight(o1);
    };

    if( vidboy <= o1.radFight) {
        console.log(o1.name + ' вдарив ' + o2.name );
        return o1.fight(o2);
    };

};

module.exports = Personazh;


console.log(vuyko.moveTo(400, 300));

console.log(pichti.moveTo(400, 300));

rad(vuyko, pichti);

console.log(pichti.health);
console.log(vuyko.health);

console.log(rad(pichti, vuyko));