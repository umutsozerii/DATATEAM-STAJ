
var express= require('express'); //I requested the Express in my file.
var app = express(); //Using Express functions and modules in my file
var mongojs = require('mongojs'); //I requested the mongojs module to my project 
var db = mongojs('studentlist',['studentlist']); //It tells us which MongoDB database and collection we will use.
var bodyParser = require('body-parser'); //I requested the Body-Parser module. (We can capture the post data sent with the body-parser as an object. A module responsible for sending us the data sent by the user.)
app.use(express.static(__dirname + '/public')); //Static means telling the server to look for static files whic are HTML, css, js files. __dirname + '/public' tells server Where to look for these files. 
app.use(bodyParser.json()); //Server can parse the body of the input that it receives. Kısaca bodParser ı kullanmasını sağlıyorum.

app.get('/studentlist', function(req,res){ //I set the route to my index file.
    console.log("I recieved a GET request") //I showed that I got a GET request
    db.studentlist.find(function(err,docs){ //docs indicates that it will respond with documents (studens) in the database.
      //Thus, I have called my student data in the database with GET request.
        console.log(docs); //To test whether we get data from the database or not.
        res.json(docs) //res (for response) data in json format.
        //It responds to get request in json format by sending back studentlist data.
    })
})

app.post('/studentlist', function(req,res){ //Listening to post requests from the controller
    console.log(req.body); //It prints the data from the controller.
    db.studentlist.insert(req.body, function(err, doc){ //Here we say that it will answer with the documents (students) in the database. We request data from the body of req.body -> input data. and we insert that data into the database.
        res.json(doc); //This doc is sent back to the controllers in json format.
    })
})
app.delete('/studentlist/:id',function(req,res){//It gets the id of the URL from controller.js.
    var id = req.params.id; //Basically get the value of the ID from the URL
    console.log(id); //    It shows the id on console.log.
    db.studentlist.remove({_id: mongojs.ObjectID(id)},function(err,doc){//{_id: mongojs.ObjectID(id)} identifying the student. This id refers to var id.So this will choose which contact we want to delete.
        res.json(doc);//i am sending back the item that we're removing to the controller.js .
    })
})

app.get('/studentlist/:id', function (req, res) {//It gets the id of the URL from controller.js.
    
    var id = req.params.id;//Basically get the value of the ID from the URL
    console.log(id);
    db.studentlist.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {//This is going to be the code to find one specific student from the database
      res.json(doc);//Sending back doc (student) to the controller.js.
    });
  });

  app.put('/studentlist/:id', function (req, res) {//It gets the id of the URL from controller.js.
    var id = req.params.id; //Basically get the value of the ID from the URL
    db.studentlist.findAndModify({
      query: {_id: mongojs.ObjectId(id)}, // This selects the student that i want to modify,
      update: {$set: {name: req.body.name, surname: req.body.surname, email: req.body.email, studentno: req.body.studentno}}, //this will be the updates that we want to set for this contact that we selected.
      new: true}, function (err, doc) {
        res.json(doc); //this is the updated doc (student). i am sending back the updated doc to the controller.js.
      }
    );
    //Simply select the specific student in the database with put request. We call all data one by one from the database and update them with the data in the input boxes.
    //This was the part I had the most difficulty understanding. With the help of my internship supervisor and looking at similar examples on the internet, I understood how it works.
  });

app.listen(8080); //the server port as 8080
console.log("Server running on port 8080"); //Message to the console to test that the server is running