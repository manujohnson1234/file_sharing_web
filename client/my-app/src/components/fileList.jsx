import React from "react";


export const FileList = ({ files }) => {
  return (
    <div style={{ marginTop: '100px' }}>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.link}  target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
