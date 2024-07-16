import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateChannel } from "../../redux/channels";
import { useModal } from "../../context/Modal";
import "./ChannelFormModal.css";

function ChannelFormModal({ serverId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const channelData = {
      name,
      server_id: serverId,
    };

    const result = await dispatch(thunkCreateChannel(channelData));
    if (result && !result.errors) {
      closeModal();
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
        <div className="channel-form-container" ref={modalRef}>
          <div className="channel-form-header">
            <h1>Create a New Channel</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="channel-form-input">
              <div className="input-group">
                <label>
                  <span>
                    CHANNEL NAME
                    {errors.name && <p className="error">{errors.name}</p>}
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <button type="submit" className="create-channel-submit">Create Channel</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChannelFormModal;
