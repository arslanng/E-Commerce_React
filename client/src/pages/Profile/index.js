import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { Text, Button } from "@chakra-ui/react";

function Profile() {
  const { user, logout } = useAuth();

  const navigate = useNavigate(); 
  const handleLogout = async () => {
    logout(() => {
      navigate("../");
    });
  };

  return (
    <div>
      <code>
        <Text fontSize={22}>Profile</Text>
        {JSON.stringify(user)}
        <br />
        <br />
        <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
          Logout
        </Button>
      </code>
    </div>
  );
}

export default Profile;
