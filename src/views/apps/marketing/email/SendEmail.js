/*eslint-disable*/
// ** Custom Components
import React, { useState, useEffect } from "react";
import Sidebar from "@components/sidebar";

// ** Third Party Components
import { Link } from "react-feather";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Badge,
  Button,
  Spinner,
} from "reactstrap";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";
import consoleLog from "@console";
const SendEmail = ({ open, toggleSidebar, emailAddress }) => {
  const [subject, setSubject] = useState("");
  const [massage, setMassage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().post(urls.SEND_EMAIL, {
        subject: subject,
        text: massage,
        to: emailAddress,
      });
      toggleSidebar();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title="Send Email"
      headerClassName="mb-1"
      contentClassName="p-0"
      bodyClassName="pb-sm-0 pb-3"
      toggleSidebar={toggleSidebar}
    >
      <Form>
        <FormGroup>
          <Label for="invoice-subject" className="form-label">
            Subject
          </Label>
          <Input
            id="invoice-subject"
            placeholder="Type subject here"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="invoice-message" className="form-label">
            Message
          </Label>
          <Input
            type="textarea"
            cols="3"
            rows="11"
            id="email-message"
            value={massage}
            onChange={e => setMassage(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="d-flex flex-wrap mt-2">
          <Button className="mr-1" color="primary" onClick={sendEmail}>
            {isLoading && <Spinner color="white" size="sm" />}Send
          </Button>
          <Button color="secondary" outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </FormGroup>
      </Form>
    </Sidebar>
  );
};

export default SendEmail;
