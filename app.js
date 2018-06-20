var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

//APP CONFIG 
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default: Date.now()}
});
var Blog =mongoose.model("Blog",blogSchema);



//RESTFUL routes
app.get("/",function(req,res){
   res.redirect("/blogs"); 
});

app.get("/blogs",function(req,res){
  Blog.find({},function(err,blogs){
    if(err)
    {
        console.log("ERRORS");
    }else
    {
        res.render("index",{blogs: blogs});
    }
    
  });
});


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("connected");  
}); 