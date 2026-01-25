import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) return <h2>Please login</h2>;

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Profile</h1>
      </div>

      <img src={user.avatar} style={styles.avatar} />

      <h2>{user.fullname}</h2>
      <p>@{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
}

const styles = {
  avatar: {
    width: "120px",
    borderRadius: "50%",
    marginTop: "20px"
  }
};
