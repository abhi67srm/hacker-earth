var mkdirp = require('mkdirp');
var cmd = require('node-cmd');
var stdin = process.openStdin();
var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');
var rmdirSync = require('rmdir-sync');
var dirpath = path.join(__dirname, 'rmdir');


console.log('$> <Starting your application...>');
console.log('$>');

stdin.addListener("data", function(d) {
try{
    var userInput = d.toString().split(" ");
    // console.log(userInput[0]);
    var givenCommand = ["pwd","session", "cd", "mkdir", "rm","ls"];
    var proceed = givenCommand.map((command)=>command == userInput[0].toString().trim());
    if(proceed.includes(true)){
    
    //pwd code 
    if(userInput[0].toString().trim() == "pwd"){
        cmd.get(
            'pwd plaground/',
            function(err, data, stderr){
                console.log('PATH : ',data);
                console.log('$>');

            }
        );
    }
    
    // ls code
    if(userInput[0].toString().trim() === "ls"){
         var directory = `./playground/`;
        try{
            fs.statSync(directory);
            cmd.get(
                'ls playground/',
                function(err, data, stderr){
                    console.log('DIRS: \n',data);
                    console.log('$>');
                }
            );

        }catch{
            console.log("Empty folder");
            console.log('$>');
            

        }
        
    }
    
    //mkdir code 
    if(userInput[0].toString().trim() == "mkdir"){
        var len = userInput.length;
    
        for(var i=1;i<len;i++){
            var file = userInput[i].toString().trim();
           
            mkdirp(`./playground/${userInput[i]}`, function (err) {
                if (err) console.error(err);
                else console.log();
            });
        }
        console.log("SUCC: CREATED");
        console.log('$>');
    }
    //session clear

    if(userInput[0].toString().trim() == "session"){
        rimraf('playground/', function () { 
            console.log('SUCC: CLEARED: RESET TO ROOT'); 
            console.log('$>');
        });
        
    }
    
    //remove one folder at a time
    if(userInput[0].toString().trim() == "rm"){
        rmdirSync(`./playground/${userInput[1].toString().trim()}`);
        console.log('SUCC: DELETED');
    }

    //Get into the directory
    if(userInput[0].toString().trim() == "cd"){
       
        function checkDirSync(directory){
        try {
        fs.statSync(directory);
        console.log("SUCC: REACHED");
        console.log('$>');
         }
         catch(e){
         console.log("ERR: INVALID PATH");
         console.log('$>');
        } 
    } 
       
    checkDirSync(`./playground/${userInput[1].toString().trim()}/`) ;       
}


}
else{
    console.log("ERR: CANNOT RECOGNIZE INPUT.");
}

    
}

catch{
    (console.log('ERR: CANNOT RECOGNIZE INPUT.'));
}
});

