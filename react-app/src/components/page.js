import UploadSection from "./upload-section"
import {useState} from "react"
import downloadIcon from "../icons/cloud-download1.svg"
import emoji from "../icons/emoji-sunglasses.svg"
import errorIcon from "../icons/exclamation-lg.svg"
import server from "../icons/server.svg"
import boxArrow from "../icons/box-arrow.svg"
import CircleLoader from "react-spinners/CircleLoader"

export default function Home() {
	//determine when to render download when there
	//is any or else convert button
	let [download,setDownload] = useState('')
  let [isconverting,setConvertingState] = useState(false)
  //this one for managing error
  let [error,setErrorState] = useState(false)

	return (
     <div className="content">
       <header className="site-header">
         <section className="site-title">Simple JSON To CSV Converter</section>
         <article className="detailed-instruction">Drop your file or click on the <span className="emphasize">Upload Link</span> in the box below, then
         	click on <span className="emphasize">Convert Button</span>, wait for the file to finish converting,
         	then click on the <span className="emphasize">Download Button</span> to get your converted csv file
         &nbsp; <img src={boxArrow} alt="box-arrow"/>.
         </article>
       </header>
       <UploadSection onDrop={
       	(event) => {
       		//implementation of the on drop
       		console.log(event)
       	}

       }

       />
       <section className="buttons-section">
        {
        	download !== ''? 
        		<>
       			<button type="button" className="download-button1">
       				<a href={download} id="download" style={{color:"inherit",textDecoration:"none"}}
                onClick={
                e => {
                  setDownload('')
                }
              }
              > 
              Download</a> 
       				<img src={downloadIcon} alt="file download indicator"/>
       			</button>
       			<button type="button" className="download-button1" style={{backgroundColor:"rgba(255,0,0,0.7)",color:"white"}}
             onClick={
              e => {
                setConvertingState(false)
                setDownload('')
                setErrorState('')
              }
             }
            >
       	 			<span>Cancel</span>
       	 			<img src={errorIcon} alt="cancelling download"/>
       			</button>
       		 </>
       		:
       			<button type="button" className="convert-button"
              onClick = {
                e => {
                  e.preventDefault()
                  let form = document.querySelector('#form-1')
                  if (form){
                    let formData = new FormData(form)
                    //show status
                    setConvertingState(true)
                    fetch("api/upload",{body:formData,method:"POST"})
                     .then(resp => {
                        return resp.json()
                     })
                     .then(resp => {
                      //something here
                      if (resp.status === "error"){
                        setErrorState(true)
                        setConvertingState(false)
                        setDownload('')
                        return
                      }
                      console.log(resp)
                      setConvertingState(false)
                      setDownload(resp.location)
                     })
                     .catch(error => {
                       //something must happen here
                       console.log(error)
                       setConvertingState(false)
                       setDownload('')
                       setErrorState(true)
                     })
                  }
                }
              }
            >
              Convert Your File
            </button>
       		}
       </section>

       <section className="note">
        <span className="emphasize">Note</span> Your file upload will be automatically erased from our <img src={server} alt="server icon"/>server within the next 2 hours.
      	To protect your <span className="emphasize">Privacy</span>, and save space on our server.  
       </section>
       <footer>
       	created by <span className="emphasize">Yahya Said</span> <img src={emoji} alt="author wishing you the best"/>
       </footer>
       {
         error ? 
          <div className="error">
            <span className="error-icon"
              onClick={
              e => {

                e.preventDefault()
                console.log("why this hang")
                setErrorState(state => !state)
              }
             }
            >
            X
            </span>
            <span>
              Error Happened While Converting Your File. Please Try Again!
            </span>
          </div>

          :
            ""

       }
       { isconverting ?
      	 <div className="loading">
        	<div className="loader">
          	<h1>Converting ...</h1>
       			<CircleLoader/>
       		</div>
       	</div>
       	: ""
      }
     </div>


	)



}