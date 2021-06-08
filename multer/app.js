const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')

// Multer Initialization
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


app.use(express.static(path.join(__dirname,'/public')))
app.use('/uploads', express.static('uploads'));

app.get('/',(req,res)=>{
    try{
        res.sendFile('index.html')
    }
    catch(e){
        console.log('Something went Wrong')
        console.log(e)
    }
})


app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
  })

  app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for(var i=0;i<req.files.length;i++){
        response += `<img src="${req.files[i].path}" /><br>`
    }
    
    return res.send(response)
})





app.listen(3000, ()=>{
    console.log('Starting the server on port 3000')
})