import React from "react";
import "./historyFoot.css";
import { Accordion } from "react-bootstrap";
import Accord from "../accordion/accordion";
import data from "../../assets/data.json";
import { MDBFooter } from 'mdb-react-ui-kit';
const HistoryFoot = () => {
  //   console.log(data.user1history);
  const historyData = data.user1history;
  //   console.log(historyData[0].evaluation)
  return (
    <>
    <MDBFooter>
      <div className="row foot justify-content-center align-items-center">
        <h2>User's History Test</h2>
        <Accordion defaultActiveKey="0">
          {historyData ? (
            historyData.map((data, i) => (
              <Accordion.Item
                style={{
                    // display: "flex",
                    // justifyContent: "center",
                  
                }}
                key={i}
                eventKey={i}
              >
                <Accordion.Header>result : {data.evaluation}</Accordion.Header>
                <Accordion.Body>{data.questions[i].questions}</Accordion.Body>
                <Accordion.Body>{data.ansewrs[i].ansewr}</Accordion.Body>
              </Accordion.Item>
            ))
          ) : (
            <h4>nothing to show</h4>
          )}
        </Accordion>
      </div>
      </MDBFooter>
    </>
  );
};
export default HistoryFoot;
