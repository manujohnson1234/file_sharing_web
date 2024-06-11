import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation2 } from "../components/navigation2";
import { authorized } from "../services/downloadApi";
import { FileList } from "../components/fileList";

export const Download = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      try {
        const response = await authorized();

        if (!response.success) {
          if (isMounted) {
            localStorage.removeItem("token");
            navigate("/login");
          }
          return;
        }

      console.log(response.files);
      setUsername(response.user);
      setFiles(response.files);
      
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("An unexpected error occurred");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    
      <Navigation2 />
      <FileList files={files}/>
    </div>
  );
};
