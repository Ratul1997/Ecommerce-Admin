/* eslint-disable */
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SweetAlert = (item, onDelete) => e => {
  return MySwal.fire({
    title: item.title,
    text: item.text,
    icon: item.icon,
    showCancelButton: item.showCancelButton,
    confirmButtonText: item.confirmButtonText,
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ml-1"
    },
    buttonsStyling: false
  }).then(function(result) {
    if (result.value) {
      onDelete()
      MySwal.fire({
        icon: item.confirmIcon,
        title: item.confirmTitle,
        text: item.confirmText,
        customClass: {
          confirmButton: "btn btn-success"
        }
      });
    }
  });
};

export default SweetAlert;
