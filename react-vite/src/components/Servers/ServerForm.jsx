import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateServer } from "../../redux/servers";
import { useNavigate } from "react-router-dom";
import "./ServerForm.css";

function ServerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverData = {
      name,
      description,
      avatar_url: avatarUrl,
    };

    const result = await dispatch(thunkCreateServer(serverData));
    if (!result.errors) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="server-form">
      <h2>Create a Server</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Avatar URL
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </label>
        <button type="submit">Create Server</button>
      </form>
    </div>
  );
}

export default ServerForm;
