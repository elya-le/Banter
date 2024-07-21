import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { thunkFetchChannel, thunkUpdateChannel, thunkDeleteChannel } from "../../redux/channels";
import { FaTrash, FaTimes } from "react-icons/fa";
import "./EditChannelForm.css";

function EditChannelForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channel = useSelector((state) =>
    state.channels.channels.find((c) => c.id === parseInt(id))
  );

  // initialize state with empty strings to ensure controlled components
  const [name, setName] = useState(channel ? channel.name : "");
  const [serverId, setServerId] = useState(channel ? channel.server_id : null);

  // track initial values to reset to if needed
  const [initialName, setInitialName] = useState(channel ? channel.name : "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // state to track if the popup should be red
  const [popupRed, setPopupRed] = useState(false);

  useEffect(() => {
    if (!channel) {
      dispatch(thunkFetchChannel(id));
    }
  }, [dispatch, id, channel]);

  useEffect(() => {
    if (channel) {
      setName(channel.name);
      setInitialName(channel.name);
      setServerId(channel.server_id); // set serverId when channel data is available
    }
  }, [channel]);

  // update the unsaved changes state when inputs change
  useEffect(() => {
    setHasUnsavedChanges(name !== initialName);
  }, [name, initialName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, server_id: serverId }; // include server_id in the form data
    const result = await dispatch(thunkUpdateChannel(id, formData));
    if (result && !result.errors) {
      setHasUnsavedChanges(false); // set hasUnsavedChanges to false
    } 
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const serverId = await dispatch(thunkDeleteChannel(id)); // retrieve server_id
    navigate(`/servers/${serverId}`); // navigate to the server page using the returned server_id
  };

  const handleReset = () => {
    setName(initialName);
    setHasUnsavedChanges(false);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleClose = (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      setPopupRed(true);
      setTimeout(() => setPopupRed(false), 2000); // turn the popup red for 2 seconds
    } else {
      navigate(`/servers/${serverId}`);
    }
  };

  if (!channel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-channel-container">
      <div className="edit-side-nav">
        <h3>{name}</h3>
        <a href="#" onClick={handleDelete} className="delete-channel-link">
          Delete Channel
          <FaTrash className="delete-icon" />
        </a>
      </div>
      <div className="edit-channel-input">
        <div className="edit-header">
          <h1>{name}&apos;s channel details</h1>
          <a href="#" onClick={handleClose} className="close-link">
            <FaTimes className="close-icon" />
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              <span>Channel Name</span>
              <input
                type="text"
                value={name}
                onChange={handleInputChange(setName)}
                required
              />
            </label>
          </div>
        </form>
        {hasUnsavedChanges && (
          <div className={`unsaved-changes-popup ${popupRed ? "red-popup" : ""}`}>
            <div className="unsaved-changes-message">
              <span>Careful — you have unsaved changes!</span>
            </div>
            <div className="unsaved-changes-link">
              <a href="#" onClick={handleReset} className="popup-link">Reset</a>
            </div>
            <div className="unsaved-changes-button">
              <button onClick={handleSubmit} className="save-changes-button">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditChannelForm;
