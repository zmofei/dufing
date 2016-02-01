var fs = require('fs');

var key = {};
var newArr = [];
var count = 0;
fs.readFile('./fog.js',function(err,success){
    var data = JSON.parse(success);
    for(var i in data){
        var _key = data[i].road_id + '_' + data[i].start_distance + '_' + data[i].end_distance
        if(!key[_key]){
            key[_key] = true;
            newArr.push(JSON.stringify(data[i]))
        }else{
            //console.log('same', count++, data.length)
        }
    }
    fs.writeFile('./fog.new.js',newArr,function(){})
    console.log(newArr)
})
