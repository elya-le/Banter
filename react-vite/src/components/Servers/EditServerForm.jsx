import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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

  // state to track if the popup should be red
  const [popupRed, setPopupRed] = useState(false);

  // fetch server details if not already in state
  useEffect(() => {
    if (!server) {
      dispatch(thunkFetchServer(id));
    }
  }, [dispatch, id, server]);

  // update state when server details are fetched
  useEffect(() => {
    if (server) {
      setName(server.name);
      setDescription(server.description);
      setCategory(server.category);
      setInitialName(server.name);
      setInitialDescription(server.description);
    }
  }, [server]);

  // update the unsaved changes state when inputs change
  useEffect(() => {
    setHasUnsavedChanges(name !== initialName || description !== initialDescription);
  }, [name, description, initialName, initialDescription]);

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (avatarFile) formData.append("avatar", avatarFile); // use 'avatar' key for the file
    if (bannerFile) formData.append("banner", bannerFile); // use 'banner' key for the file
    formData.append("category", category);

    console.log("submitting form data:", formData);
    const result = await dispatch(thunkUpdateServer(id, formData));
    if (result && !result.errors) {
      console.log("update successful, navigating to server details page");
      navigate(`/servers/${id}`);
    } else {
      console.log("update failed, result:", result);
    }
  };

  // handle server deletion
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("deleting server with id:", id);
    await dispatch(thunkDeleteServer(id));
    navigate('/discover-page');
  };

  // handle form reset
  const handleReset = () => {
    setName(initialName);
    setDescription(initialDescription);
    setHasUnsavedChanges(false);
  };

  // handle input change
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasUnsavedChanges(true);
  };

  // handle form close
  const handleClose = (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      setPopupRed(true);
      setTimeout(() => setPopupRed(false), 2000); // turn the popup red for 2 seconds
    } else {
      navigate(`/servers/${id}`);
    }
  };

  if (!server) {
    return <div>loading...</div>;
  }

  return (
    <div className="edit-server-container">
      <div className="edit-side-nav">
        <h3>{name}</h3>
        <a href="#" onClick={handleDelete} className="delete-server-link">
          delete server
          <FaTrash className="delete-icon" />
        </a>
      </div>
      <div className="edit-server-input">
        <div className="edit-header">
          <h1>{name}&apos;s server details</h1>
          <a href="#" onClick={handleClose} className="close-link">
            <FaTimes className="close-icon" />
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              <span>server name</span>
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
              <span>description</span>
              <input
                type="text"
                value={description}
                onChange={handleInputChange(setDescription)}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>avatar</span>
              <input
                type="file"
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>banner</span>
              <input
                type="file"
                onChange={(e) => setBannerFile(e.target.files[0])}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>category</span>
              <input
                type="text"
                value={category}
                onChange={handleInputChange(setCategory)}
              />
            </label>
          </div>
          {hasUnsavedChanges && (
            <div className={`unsaved-changes-popup ${popupRed ? "red-popup" : ""}`}>
              <div className="unsaved-changes-message">
                <span>careful — you have unsaved changes!</span>
              </div>
              <div className="unsaved-changes-link">
                <a href="#" onClick={handleReset} className="popup-link">reset</a>
              </div>
              <div className="unsaved-changes-button">
                <button onClick={handleSubmit} className="save-changes-button">save changes</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditServerForm;
