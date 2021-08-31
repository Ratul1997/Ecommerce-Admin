/* eslint-disable */
import React from "react";
import { Card, Col, Row } from "reactstrap";

export default function TagFile({ tag_descriptions, pdfRef }) {
  
  return (
    <div
      id="tagPdf"
      style={{
        width: "900px",
      }}
      ref={pdfRef}
      //   dangerouslySetInnerHTML={{ __html: tag_descriptions }}
    >
      <Card>
        {Array(5)
          .fill()
          .map(i => {
            
            return (
              <Row className="m-1">
                <Col sm="4">
                  <div
                    dangerouslySetInnerHTML={{ __html: tag_descriptions }}
                  ></div>
                </Col>

                <Col sm="4">
                  <div
                    dangerouslySetInnerHTML={{ __html: tag_descriptions }}
                  ></div>
                </Col>

                <Col sm="4">
                  <div
                    dangerouslySetInnerHTML={{ __html: tag_descriptions }}
                  ></div>
                </Col>
              </Row>
            );
          })}
      </Card>
    </div>
  );
}
