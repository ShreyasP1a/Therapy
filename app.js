const express = require('express')
var bodyParser = require('body-parser')

const app = express();

const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = require('socket.io')(server);
// Set socket.io listeners.

io.on('connection', (socket) => {
  socket.on('textPerson',function(data){
    console.log(data.textareaval);

    var body = data.textareaval;
    console.log("This is running in the node js server");
    client.messages.create({
      body: body,
      from: '+19045874407',
      to: ''
    }).then(message => {

      io.sockets.emit("textToPerson", { body });
      
    });


  });


  socket.on('disconnect', () => {

    
  });
});

app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 	


const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/static'));

app.get('/', 
(req, res) => res.render('index.html'));

app.post('/sendMessage' , (req,res) => { 
	
	let text = req.body.exampleTextArea;
client.messages.create({
     body: text,
     from: '',
     to: ''
  }).then(message => {
    res.render("SubmitVideo.ejs", {text: text});
   // console.log(message);
    res.end();
 }); });

app.get('/therapist', function (req, res) {
  res.render('therapist.html');
});

app.get('/about', function (req, res) {
  res.render('about.html');
});
app.get('/login', function (req, res) {
  res.render('LogIn.html');
});

 //Message comes in from phone Socket will send to client
app.post('/messageComesIn', (req, res) => {
  let body = req.body.Body;

  io.sockets.emit('textFromPerson', { body });

  res.sendStatus(200);
});












