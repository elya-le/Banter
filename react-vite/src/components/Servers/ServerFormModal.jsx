// src/components/Servers/ServerFormModal.jsx
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateServer } from "../../redux/servers";
import { useNavigate } from "react-router-dom";
import "./ServerFormModal.css";

function ServerFormModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverData = {
      name,
      description,
      avatar_url: avatarUrl,
    };

    const result = await dispatch(thunkCreateServer(serverData));
    if (!result.errors) {
      navigate("/discover-page");
      onClose();
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h1>Customize Your Server</h1>
        <p>Give your new server a personality with a name and an icon. You can always change it later</p>
        <form onSubmit={handleSubmit}>
          <label className="upload-label">
            Upload
            <input
              type="file"
              className="file-input"
              onChange={(e) => setAvatarUrl(URL.createObjectURL(e.target.files[0]))}
            />
          </label>
          <label>
            SERVER NAME
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            DESCRIPTION
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <p>By creating a server, you agree to Discord&apos;s Community Guidelines.</p>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default ServerFormModal;
