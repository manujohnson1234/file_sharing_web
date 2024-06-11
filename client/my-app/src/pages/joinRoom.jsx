import React, { useState, useEffect } from 'react';
import { Navigation2 } from '../components/navigation2';
import { useSocket } from '../context/socketContext';

export const JoinRoom = () => {

    const socket = useSocket();
    const [UserName, setUserName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChangeUsername = (event) => {
        setUserName(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted value:', UserName);

        if (UserName.trim() && selectedFile) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const arrayBuffer = event.target.result;

           
                socket.emit('send-file', {
                    username: UserName,
                    file: arrayBuffer,
                    fileName: selectedFile.name
                });

                setUserName('');
                setSelectedFile(null);
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    };

    useEffect(() => {
        if (socket == null) return;

        socket.on('receive-message-error', (msg) => {
            alert(msg);
        });

        return () => socket.off('receive-message-error');
    }, [socket]);

    return (
        <div>
            <Navigation2 />
            <div className="container" style={{ marginTop: 200 }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">UserName:</label>
                        <input
                            required
                            type="text"
                            id="username"
                            value={UserName}
                            onChange={handleChangeUsername}
                        />
                    </div>
                    <div>
                        <label htmlFor="file">Upload File:</label>
                        <input
                            required
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
