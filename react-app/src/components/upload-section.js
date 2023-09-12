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
			  <input type="file" style={{display:"none"}}/>
				<span className="drop-label"> Upload Your File Or Drop Them</span>
				<img src={download} alt="download or drop" className="download-image"/>
			</section>
	)

}