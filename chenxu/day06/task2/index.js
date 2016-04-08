/**
 * Created by cx on 2016/3/15.
 */
// 父类 动物

function  Animal(food,name){
    this.name=name;
    this.food=food;
    this.say=function say(){
        console.log("我的姓名是："+this.name);
    };
}

//call方式
// 子类狗
function Dog(food,name,age,color) {
    Animal.call(this, food, name);
    this.age = age;
    this.color = color;
    this.ages = function ages() {
        console.log('我的年龄是' + this.age)
    }
}
// prototype 方法
Animal.prototype.eat = function(){
    console.log("我喜欢吃"+this.food);
};

// 子类狗的方法

Dog.prototype = new Animal();
Dog.prototype.colors = function(){
    console.log("我的颜色是"+this.color);
};
    var dog = new Dog('狗粮','小花狗',8,"red");//
    dog.say(); // 继承Animal
    dog.eat(); // 继承Animal*//*

    dog.ages(); // 继承Dog 调用自身的方法
    dog.colors(); // 继承Dog 调用自身的方法
    console.log('==========');


var animal = new Animal("食物","animal"); //
animal.say();
//直接继承
function Pig(Gclass,weigiht){
    this.Gclass = Gclass;
    this.weigiht = weigiht;
    this.Gage = function Gade(){
        console.log('我的班级是'+this.Gclass);
    }
}
Pig.prototype = new Animal('猪饲料','小花猪');
Pig.prototype.constructor = Pig; //将constructor指针指回原来的构造函数Pig
Pig.prototype.weigihts = function () {
    console.log('猪体重'+this.weigiht);
};
var pig = new Pig('a-1','100斤');
pig.say();
pig.eat();
pig.Gage();
pig.weigihts();


