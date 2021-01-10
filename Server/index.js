import express from 'express';
import http from 'http';
import config from './config';
import router from "./routes/router";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import mongoose from 'mongoose';
import { Sequence } from './models/sequence';


//import * as SearchCourse from "./controllers/search-course";
import * as AuthorCourse from "./controllers/author-course";
//import * as LectureCourse from "./controllers/lecture-course";
//import * as UserCourse from "./controllers/user-course";
//import * as CommentCourse from "./controllers/comment-course";

const app = express();

// connect to database
mongoose.Promise = require('bluebird');

mongoose.connect(config.database, {
	useUnifiedTopology: true,
	 useCreateIndex: true,
	useNewUrlParser: true
}).then(() => {
	console.log("Connected to the database!");
	
	if (process.env.INITDB === "TRUE") {
      mongoose.connection.dropDatabase().then(function () {
        Sequence().then(function () {
          AuthorCourse.buildAuthor();
  //        SearchCourse.buildCourse();
    //      LectureCourse.buildLecture();
      //    UserCourse.buildUser();
        //  CommentCourse.buildComment();
        });
      });
    }

    AuthorCourse.populate();
    //SearchCourse.populate();
    //LectureCourse.populate();
    //UserCourse.populate();
    //CommentCourse.populate();
	
	
}).catch((err) => {
	if(err) 
		console.log(err);
		return handleError(err);
})

app.use("/public", express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/public/img"));

app.use("/video", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/video", express.static(__dirname + "/public/mp4"));



app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set the routes
router(app);


// config the server and port
const port = process.env.PORT || config.port;
const server = http.createServer(app);


// run sever
if (server) {
    server.listen(port, (err) => {
        if (err) {
            console.log(err);
            throw e;
        }
        console.log(`Server is running on port: ${port}`);
    })
}