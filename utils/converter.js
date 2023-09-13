let fs = require("fs") 

function converter(res,filePath,name){
	let headers = []
	let body = []
	//read the file then parse it
	fs.readFile(filePath,"utf-8",(error,data) => {
		//inspect the state
		if(error) { 
		 console.log(error)
		 res.json({status:"error"})
		 return
		}
		//read our text here
		let text 
		try{
			text = JSON.parse(data)
		}

		catch(e){
			console.log(e)
			res.json({status:"error"})
			return 
		}

		for (let key in text) {
			//console.log(key)
			headers.push(key)
			let item = text[key]
			//console.log("item here =>",item)
			//check here for object or array
			if (item instanceof Object ) {
				//parse it as json
				item =  `"${JSON.stringify(item)}"`.replaceAll(",",' ')
			}
			else
				item = item.toString()
			body.push(item)

		}

	headers = headers.join(',')
	body = body.reduce((accu,str) => { 
		if (accu !== "")
			accu += ','+ str
		else
			accu = str
		return accu 
	})


	console.log(body,"here I am looking")

	//our final output
	let file = headers + '\n' + body
	let path = filePath.replace(".json",".csv")
	//console.log(headers,body,"what happen to you?")
	//output it as json
	fs.writeFile(path,file,(error) => {
		if (error) {
			res.json({status:'error'})
			return 
		}
	})
	res.json({status:"ok",location:"/"+name.replace(".json",".csv")})

	})
}
module.exports = converter