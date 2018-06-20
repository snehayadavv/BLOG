var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

//APP CONFIG 
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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


//EDIT 
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
       if(err)
       {
           res.redirect("/blogs");
       }
       else{
           res.render("edit",{blog: foundBlog});
       }
    });
});


//UPDATE
app.put("/blogs/:id",function(req,res){
    //Blog.findByIdAndUpdate(id,newdata,callback)
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err)
        {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
    
});

//DESTROYYY
app.delete("/blogs/:id",function(req,res){
   Blog.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("connected");  
}); 