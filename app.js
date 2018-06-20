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

//INDEX
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

//NEW

app.get("/blogs/new",function(req, res) {
   res.render("new"); 
});

//CREATE

app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,newBlog){
       if(err)
       {
           res.render("new");
       }else{
           res.redirect("/blogs");
       }
    }); 
});


//SHOW

app.get("/blogs/:id",function(req,res){
     Blog.findById(req.params.id,function(err,foundBlog){
         if(err)
         {
             res.redirect("/blogs");
         }
         else{
              res.render("show",{blog: foundBlog});
         }
     }); 
});


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("connected");  
}); 