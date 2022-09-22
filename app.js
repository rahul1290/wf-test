const express = require('express')
const async = require('async');

const app = express()
const port = 3000

const fun1 = (callback) =>{
    console.log("fun1 called");
    const x = 12;
    return callback(null,x)
}

const fun2 = (payload,callback) =>{
    console.log("fun2 called");
    return callback(payload)
}

const fun3 = (payload,callback) =>{
    console.log("fun3 called");
    return payload
}

const fun4 = (payload,callback) =>{
    console.log("fun4 called");
    console.log(payload);
    return null
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const cond = 3;

async.waterfall([
    async.apply(fun1),
    function(payload,callback){
        if (cond == 2) {
            async.waterfall([
                async.apply(fun3,payload,callback),
                fun4
            ],callback)
        } else{
            async.waterfall([
                async.apply(fun2,payload,callback),
            ],callback)
        }
    },
],(error) => {
    console.log('error:',error)
})