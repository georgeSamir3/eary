import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
const UserCard = (user) => {
  const auth = getAuthUser();
  const token = auth.tokens.token;
  const id =user.user.id
  console.log(user);
  
  const deleteUser =()=>{
    axios.delete(`http://localhost:5000/api/users-management/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <Card>
      <Card.Header>{user.user.name}</Card.Header>
      <Card.Body>
        <Card.Title>{user.user.email}</Card.Title>
        <Card.Text>{user.user.status + " " + user.user.phone}</Card.Text>
        <Button
          variant="primary"
          style={{ backgroundColor: "bisque", color: "navy",width:"32%" ,marginRight:"1%" }}
        >
          full details
        </Button>
        <Button
          variant="success"
          style={{backgroundColor: "lightgrey", color: "navy",width:"32%",marginLeft:"1%" }}
        >
          Update User
        </Button>
        <Button
          variant="danger"
          style={{ backgroundColor: "red", color: "navy",width:"32%",marginLeft:"1%" }}
          onClick={deleteUser}
        >
          Delete User
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
