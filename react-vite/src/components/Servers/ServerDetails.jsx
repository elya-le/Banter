import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkFetchServers } from "../redux/servers";

const ServerDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers.servers);
  const server = servers.find((server) => server.id === parseInt(id));

  useEffect(() => {
    if (!servers.length) {
      dispatch(thunkFetchServers());
    }
  }, [dispatch, servers]);

  if (!server) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{server.name}</h1>
      <p>{server.description}</p>
    </div>
  );
};

export default ServerDetail;
