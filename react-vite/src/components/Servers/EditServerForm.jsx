import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { thunkFetchServer, thunkUpdateServer, thunkDeleteServer } from "../../redux/servers";
import "./EditServerForm.css";

function EditServerForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const server = useSelector((state) =>
    state.servers.servers.find((s) => s.id === parseInt(id))
  );

  // Initialize state with empty strings to ensure controlled components
  const [name, setName] = useState(server ? server.name : "");
  const [description, setDescription] = useState(server ? server.description : "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [category, setCategory] = useState(server ? server.category : "");

  useEffect(() => {
    if (!server) {
      dispatch(thunkFetchServer(id));
    }
  }, [dispatch, id, server]);

  useEffect(() => {
    if (server) {
      setName(server.name);
      setDescription(server.description);
      setCategory(server.category);
    }
  }, [server]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (avatarFile) formData.append("avatar_url", avatarFile);
    if (bannerFile) formData.append("banner_url", bannerFile);
    formData.append("category", category);

    console.log("Submitting form data:", formData);
    const result = await dispatch(thunkUpdateServer(id, formData));
    if (result && !result.errors) {
      console.log("Update successful, navigating to server details page");
      navigate(`/discover-page`);  // correct this redirection later!!! 
    } else {
      console.log("Update failed, result:", result);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Deleting server with id:", id);
    await dispatch(thunkDeleteServer(id));
    navigate('/discover-page'); // correct this redirection later!!! 
  };

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-server-container">
      <div className="edit-side-nav">
        <h3>{name}</h3>
        <a href="#" onClick={handleDelete} className="delete-server-link">Delete Server</a>
      </div>
      <div className="edit-server-input">
        <h1>{name}&apos;s server details</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              <span>Server Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>Description</span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>Avatar</span>
              <input
                type="file"
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>Banner</span>
              <input
                type="file"
                onChange={(e) => setBannerFile(e.target.files[0])}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>Category</span>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Update Server</button>
        </form>
      </div>
    </div>
  );
}

export default EditServerForm;
