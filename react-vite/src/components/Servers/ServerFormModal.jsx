import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateServer } from "../../redux/servers";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./ServerFormModal.css";

function ServerFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (avatarFile) formData.append("avatar", avatarFile);

    const result = await dispatch(thunkCreateServer(formData));
    if (result && !result.errors) {
      closeModal();
      navigate(`/servers/${result.id}`); // redirect to the newly created server's details page
    } else if (result && result.errors) {
      setErrors(result.errors);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  return (
    <>
      <div className="modal-overlay">
        <div className="server-form-container" ref={modalRef}>
          <div className="server-form-header">
            <h1>Create Your Server</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="server-form-input">
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
                    minLength={1} // enforce min length constraint
                    maxLength={100} // enforce max length constraint
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
                    maxLength={255} // enforce max length constraint
                  />
                </label>
                {/* <label className="upload-label">
                  <span>AVATAR</span>
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                    accept="image/*" // ensure only images can be uploaded
                  />
                </label> */}
              </div>
            </div>
            <button type="submit" className="create-server-submit">Create Server</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ServerFormModal;
