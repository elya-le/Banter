import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { thunkUpdateServer, thunkFetchServer } from "../../redux/servers";
import { useModal } from "../../context/Modal";
import "./EditServerForm.css";

function EditServerForm() {
  const dispatch = useDispatch();
  const { id } = useParams(); // get the server ID from the URL parameters
  const navigate = useNavigate();
  const server = useSelector((state) => state.servers.servers.find((s) => s.id === parseInt(id)));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [errors, setErrors] = useState({});
  const modalRef = useRef();

  useEffect(() => {
    if (server) {
      setName(server.name);
      setDescription(server.description);
    } else {
      dispatch(thunkFetchServer(id));
    }
  }, [dispatch, id, server]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (avatarFile) formData.append("avatar", avatarFile);
    if (bannerFile) formData.append("banner", bannerFile);

    const result = await dispatch(thunkUpdateServer(id, formData));
    if (result && !result.errors) {
      navigate(`/servers/${id}`);
    } else if (result && result.errors) {
      setErrors(result.errors);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate(`/servers/${id}`);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="modal-overlay">
        <div className="server-profile-form-container" ref={modalRef}>
          <div className="server-profile-form-header">
            <h1>Edit Server Profile</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="server-profile-form-input">
              <div className="input-group">
                <label>
                  <span>
                    SERVER NAME
                    {errors.name && <p className="error">{errors.name}</p>}
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>
                    DESCRIPTION
                    {errors.description && <p className="error">{errors.description}</p>}
                  </span>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <label className="upload-label">
                  <span>AVATAR</span>
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                  />
                </label>
                <label className="upload-label">
                  <span>BANNER</span>
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => setBannerFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <button type="submit" className="update-server-submit">Update Server</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditServerForm;
