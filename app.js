const express = require("express")
const formidable = require("formidable")
let fs = require("fs")
let path = require("path")
let {promisify} = require("util")
const converter = require("./utils/converter")

let mkdir = promisify(fs.mkdir)
let rename = promisify(fs.rename)

let port = process.env.port || 4000
let app =  express()

app.use(express.static("./public"))
app.enable("trust proxy")

app.post("/api/upload",(req,res) => {
  let form = formidable.formidable()
  form.parse(req,async(error,fields,files) => {
  	//get reference to where file is uploaded to
  	//naive approach testing for the file type
  	if (!('upload' in files )) {
  		res.json({status:"error"})
  		return

  	}
  	
  	let file = files.upload[0]
		console.log(file)
  	if (file.mimetype !== "application/json")
  		return 
  	else {
  		//rename the file
  		let pathToFile = file.filepath
  		let name = file.originalFilename
  		let newDestionation = path.resolve(__dirname,"public/"+name)
  		await rename(pathToFile,newDestionation)
  		converter(res,newDestionation,name)
  	}
  })
})

app.listen(port,() => console.log("server is running"))
