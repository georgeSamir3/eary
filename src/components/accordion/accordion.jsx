import Accordion from "react-bootstrap/Accordion";

function Accord(props) {
  return (
    <Accordion defaultActiveKey="0">
      {props.userRev?props.userRev.map((user,i)=>
      <Accordion.Item key={i} eventKey={i}>
        <Accordion.Header>{user.username}</Accordion.Header>
        <Accordion.Body>
          {user.userRev}
        </Accordion.Body>
      </Accordion.Item>):<h3>nothing to show</h3>}
      
      
    </Accordion>
  );
}

export default Accord;
