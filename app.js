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
    return callback(null,payload)
}

const fun3 = (payload,callback,cb) =>{
    console.log("fun3 called");
    return cb(null,payload)
}

const fun4 = (payload,callback) =>{
    console.log("fun4 called");
    console.log(payload);
    return callback(null,payload)
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const cond = 2;

async.waterfall([
    async.apply(fun1),
    function(payload,callback){
        if (cond == 2) {
            async.waterfall([
                async.apply(fun3,payload,callback),
                fun4
            ])
        } else{
            async.waterfall([
                async.apply(fun2,payload,callback),
            ])
        }
    },
    // fun4,
    // fun2
],(error) => {
    console.log('error--:',error)
})