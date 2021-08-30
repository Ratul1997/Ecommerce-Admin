/*eslint-disable*/
import { Fragment, useState } from "react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Alert,
  Form,
} from "reactstrap";

const GeneralTabs = ({ data }) => {
  const { register, errors, handleSubmit, control, setValue, trigger } =
    useForm();

  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : "");

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const onSubmit = data => trigger();

  return (
    <Fragment>
      <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Controller
                defaultValue={data.email}
                control={control}
                as={Input}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                innerRef={register({ required: true })}
                onChange={e => setValue("email", e.target.value)}
                className={classnames({
                  "is-invalid": errors.email,
                })}
              />
            </FormGroup>
          </Col>
          <Col className="mt-2" sm="12">
            <Button.Ripple type="submit" className="mr-1" color="primary">
              Save changes
            </Button.Ripple>
            <Button.Ripple color="secondary" outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default GeneralTabs;
