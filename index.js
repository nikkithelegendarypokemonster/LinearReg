const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

const Users = require('./schema.js')
mongoose.connect('mongodb://localhost:27017/LinearReg', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
class  LinearReg {
  constructor(data) {
    this.data=data
  }
  sum(data){
    var num=0;
     for (var i = 0; i < data.length; i++) {
       num+=data[i]
     }
    return num/data.length
  }
  sum2(data){
    var num=0;
     for (var i = 0; i < data.length; i++) {
       num+=data[i]
     }
    return num
  }
  m_coefficient(x_mean,y_mean){
    var x=this.data.map(a => a.f_amount - x_mean)
    var y=this.data.map(a => a.yield - y_mean)
    var arr1=x.map((a,i) => a * y[i])
    var arr2=x.map((a)=> Math.pow(a,2))
    return this.sum(arr1)/this.sum(arr2)
  }
  constant(x_mean,y_mean,m){
    return ((m*x_mean)*-1)+y_mean
  }
  r_square(y_mean,m,c){
    var yp=this.data.map(a=>(m*a.f_amount)+c)
    var y1=this.sum2(this.data.map(a=>Math.pow((a.yield-y_mean),2)))
    var y2=this.sum2(yp.map((a)=>Math.pow((a-y_mean),2)))
    return y2/y1;
  }
  solve(){
    var x_mean=this.sum(this.data.map(a => a.f_amount))
    var y_mean=this.sum(this.data.map(a => a.yield))
    var m=this.m_coefficient(x_mean,y_mean);
    var c=this.constant(x_mean,y_mean,m);
    //solve for r^2
    console.log(c);
    console.log("The Model is Fitted at an Estimation of: "+ this.r_square(y_mean,m,c));
  }

}
Users.find({}, (e, data) => {
  //calculate
  /*
  y=mx+c
  m=(x-x')(y-y')/(x-x')^2

  */
  //calculate the m-coefficient
  var Sample=new LinearReg(data)
  Sample.solve();
})
app.get('/', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
