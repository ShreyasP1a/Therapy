
 var socket = io();

   

$("#form").submit(function (e) {

  console.log("Please prevent default"); 
  e.preventDefault();
  let body = document.getElementById("exampleTextarea").textContent;
  socket.emit("textPerson", { body });

});

function testing(){

  console.log("Please prevent default");
  
  //let body = document.getElementById("exampleTextarea").textContent;
  var textareaval = document.getElementById('exampleTextarea').value

  document.getElementById('exampleTextarea').value = "";

 let body = "test";
  socket.emit("textPerson", { textareaval });
  

}

    socket.on('textFromPerson', function(call){

      console.log("I am herer in text from person");

        var div = document.createElement("div");
        var p = document.createElement("div");
        p.textContent = call.body;
        div.appendChild(p);
      div.classList.add('container', 'darker');
        document.getElementById('cont').appendChild(div);
    });


socket.on('textToPerson', function (call) {

  console.log("I am herer in text from person");

  var div = document.createElement("div");
  var p = document.createElement("div");
  p.textContent = call.body;
  div.appendChild(p);
  div.classList.add('container');
  document.getElementById('cont').appendChild(div);
});



