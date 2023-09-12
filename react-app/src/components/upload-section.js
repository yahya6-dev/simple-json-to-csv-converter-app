import React from "react"
import download from "../icons/cloud-download.svg"
//export the component directly
export default function UploadSection({onDrop}) {
	return(
			<section className="drop-section">
				<span className="drop-label"> Upload Your File Or Drop Them</span>
				<img src={download} alt="download or drop" className="download-image"/>
			</section>
	)

}