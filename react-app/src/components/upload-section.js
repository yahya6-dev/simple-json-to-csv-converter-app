import React from "react"
import download from "../icons/cloud-download.svg"
//export the component directly
export default function UploadSection({onDrop}) {
	return(
			<section className="drop-section" onDrop={onDrop}
				onClick={
					e => {
						document.querySelector("input[type]").click()
						console.log("document clicked")

					}
				}
			>
			 <form encType="multipart/form-data" id="form-1" style={{display:"none"}}>
			  <input type="file"  name="upload" accept="*" 
			  	onInput={
			  		e => {
			  			console.log(e,"fired")
			  			let name = e.target.files[0].name
			  			console.log(name)
			  			document.querySelector(".drop-label").innerText = "Uploaded "+name
			  		}
			  	}
			  />
			 </form>

				<span className="drop-label"> Upload Your File Or Drop Them</span>
				<img src={download} alt="download or drop" className="download-image"/>
			</section>
	)

}