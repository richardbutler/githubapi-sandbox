var express = require("express")
  , app     = express.createServer()

app.configure(function(){
    app.use(express.methodOverride())
    app.use(express.bodyParser())
    app.use("/app", express.static("app"))
    app.use("/css", express.static("css"))
    app.use(app.router)
});

app.get("*", function(req, res) {
    res.sendfile("index.html")
})

app.listen(3000)

console.log( "Listening on localhost:3000" )
