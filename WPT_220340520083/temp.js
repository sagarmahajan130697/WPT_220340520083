
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');

app.listen(900,  ()=> {
    console.log("server listening at port 900...");

});
let dbparams={

	host: 'localhost',
	user: 'root',
	passward: 'cdac',
	database: 'WBT',
	port:3306
}
console.log("DB working");

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not
const conn = mysql.createConnection(dbparams);

app.get('/getdetail', (req, res) => {
    
	
	console.log("Entered get");
	
	let bookid = req.query.bookid;
	console.log(bookid);
	let output ={status:false,bookdetail:{bookid:0,bookname:"",price:0}}
	conn.query('select bokkname price from book where bookid =?',[bookid],
	(error,rows)=>{
		if(error){
			console.log("Eror Occurs");
		}
		else{
			if(rows.length>0){
				output.status=true;
				output.bookdetail=rows[0];
			}
			else{
				console.log("Book details not found");
			}
		}
		res.send(output);
	});


	});



