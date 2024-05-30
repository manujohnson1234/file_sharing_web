import React from "react";
import "./fileList.css";
import img from "../images/pdf.png"

export const FileList = ({ files }) => {
  return (
    <div className="container" style={{ marginTop: '100px'  }}>
      {files.map((file) => (
          
          <div className="box">
             <a 
          href={`${file.link}/${localStorage.getItem("username")}`}  
          target="_blank" 
          rel="noopener noreferrer"
          key={file.name}
        >
            <div className="text">
              <p>{file.name}</p>
            </div>
            <div className="image">
              <img src={img} alt="PDF icon" />
            </div>  
            </a>
          </div>
        
      ))}
    </div>
  );
};
