import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { thunkFetchServer, thunkUpdateServer, thunkDeleteServer } from "../../redux/servers";
import { FaTrash, FaTimes  } from "react-icons/fa";
import "./EditServerForm.css";

function EditServerForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const server = useSelector((state) =>
    state.servers.servers.find((s) => s.id === parseInt(id))
  );

  // initialize state with empty strings to ensure controlled components
  const [name, setName] = useState(server ? server.name : "");
  const [description, setDescription] = useState(server ? server.description : "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [category, setCategory] = useState(server ? server.category : "");

  // track initial values to reset to if needed
  const [initialName, setInitialName] = useState(server ? server.name : "");
  const [initialDescription, setInitialDescription] = useState(server ? server.description : "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
      setInitialName(server.name);
      setInitialDescription(server.description);
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
      navigate(`/servers/${id}`); // correct this redirection later!!! 
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

  const handleReset = () => {
    setName(initialName);
    setDescription(initialDescription);
    setHasUnsavedChanges(false);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasUnsavedChanges(true);
  };

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-server-container">
      <div className="edit-side-nav">
        <h3>{name}</h3>
        <a href="#" onClick={handleDelete} className="delete-server-link">
          Delete Server
          <FaTrash className="delete-icon" />
        </a>
      </div>
      <div className="edit-server-input">
        <div className="edit-header">
          <h1>{name}&apos;s server details</h1>
          <Link to={`/servers/${id}`} className="close-link">
            <FaTimes className="close-icon" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              <span>Server Name</span>
              <input
                type="text"
                value={name}
                onChange={handleInputChange(setName)}
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
                onChange={handleInputChange(setDescription)}
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
                onChange={handleInputChange(setCategory)}
              />
            </label>
          </div>
        </form>
        {hasUnsavedChanges && (
          <div className="unsaved-changes-popup">
            <span>Careful — you have unsaved changes!</span>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSubmit}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditServerForm;