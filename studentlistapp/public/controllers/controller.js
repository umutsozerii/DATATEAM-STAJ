angular.module('AppModule',[]).controller('controller', function ($scope, $http){
    console.log("This is controller"); //I sent a message to the console to check that my controller is properly connected with the html file.
    var totalno = 1; //I have defined the totalno variable for the total number of students.
 
    var bring = function() { //The bring function to automatically refresh the page and request information with a GET request. When called will perfom a new GET request for all of studentlist data in the mongoDB database.
      $http.get('/studentlist').then(function(response){ //With http.get, we show where the studentlist data will go from.
      console.log("studentlist data recieved");//Message to check that we have received data. My internship supervisor told me to write this.
      $scope.studentlist = response.data; //We put the directed data in the spaces in the html file. response.data is what we received from the data.
      $scope.student=null; //To use the spaces in the html file again, we make the student data null.
      $scope.totalnumberofstudents = totalno; //We send totalno to totalnumberofstudents section in index.html file
    })
     }
     bring(); // Calling the function so that it'll get the data right when we load the page.
     
     $scope.addstudent = function(){ // This refers to the addstudent in the index.htm file
        console.log($scope.student); // I check the information in the input boxes by showing them on the console
        $scope.student._id=""; //Provides cleaning input boxes after student adds. So after the addstuden function is called, the input boxes are cleared.
        totalno++; // Since new students are added, I increase the total number of students.
        $http.post('/studentlist',$scope.student.data).then(function(response){ //With post request, it sends the information in the input boxes to the server, student.data input data. Function(response) going to take the response from the server as the argument.
           console.log(response) //it will print the response to the console log. To the terminal
           bring(); //Calling bring function to refresh the page.
        })
     }
    
    $scope.delete =function(id){ //We send the id of the student we want to delete to the function.
      console.log(id); // To see which student's id came from.
      totalno--; // I am decreasing the total number of students because there is less student.
      $http.delete('/studentlist/' + id).then(function(response){// ('/studentlist/' + id) : So i want to send the URL of the id that i want to delete.
         bring(); // After student is deleted, call bring function, the page is refreshed. And the list is getting updated.
      })
    }
    
    $scope.edit = function(id) { // Pass id of the student we want to edit into function 
      console.log(id); //Just to see id of the student we want to edit
      $http.get('/studentlist/' + id).then(function(response) {  //('/studentlist/' + id) : so i want to send the URL of the id that i want to edit.
        $scope.student = response;   // Put the response to the input boxes that have student ng-model:student.data.name, student.data.surname, student.data.email, student.data.studentno.
      })
    }
    $scope.updatestudent = function() {
      console.log($scope.student.data._id); //This will put the data of the student in the input boxes, into console.
      $http.put('/studentlist/' + $scope.student.data._id, $scope.student.data).then(function(response) { //All student data in the URL of the student in the input boxes and input boxes are sent to the server.
        bring();  //The page is refreshed by calling bring function after student updated. And the list is getting updated
      })
    }
 })