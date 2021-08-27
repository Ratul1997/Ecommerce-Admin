/*eslint-disable*/
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import html2canvas from "html2canvas";
// ** Third Party Components
import axios from "axios";
import { Row, Col, Alert } from "reactstrap";
import jsPdf from "jspdf";
// ** Invoice Preview Components
import PreviewCard from "./PreviewCard";
import PreviewActions from "./PreviewActions";
import SendInvoiceSidebar from "../shared-sidebar/SidebarSendInvoice";
import AddPaymentSidebar from "../shared-sidebar/SidebarAddPayment";

import $ from "jquery";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
// ** Styles
import "@styles/base/pages/app-invoice.scss";

const InvoicePreview = () => {
  // ** Vars
  const { id } = useParams();
  const pdfRef = useRef();

  // ** States
  const [data, setData] = useState(null);
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);

  // ** Get invoice on mount based on id
  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_INVOICE_BY_ID + id);
      setData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const onDownload = () => {
    console.log("download");
    const height = document.getElementById("generatePdf").offsetHeight;
    const width = document.getElementById("generatePdf").offsetWidth;
    console.log(height);
    // html2canvas($(".generatePdf")[0], { allowTaint: true }).then(function (
    //   canvas
    // ) {
    //   canvas.getContext("2d");

    // });

    var doc = new jsPdf("p", "pt", [width, height]);
    doc.setFontSize(14);
    doc.addFont('ArialMS', 'Arial', 'normal');
    
    doc.html(document.querySelector("#generatePdf"), {
      callback: function (pdf) {
        pdf.save("ratul.pdf");
      },
    });
    // getPDF();
  };
  function getPDF() {
    var HTML_Width = $(".generatePdf").width();
    var HTML_Height = $(".generatePdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + top_left_margin * 2;
    var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".generatePdf")[0], { allowTaint: true }).then(function (
      canvas
    ) {
      canvas.getContext("2d");

      console.log(canvas.height + "  " + canvas.width);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );

      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }
      pdf.save("HTML-Document.pdf");
    });
  }
  return data !== null && data !== undefined ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={9} md={7} sm={12}>
          <div
            ref={pdfRef}
            id="generatePdf"
            style={{
              width: "890px",
            }}
          >
            <PreviewCard data={data} />
          </div>
        </Col>
        <Col xl={3} md={5} sm={12}>
          <PreviewActions
            id={id}
            setSendSidebarOpen={setSendSidebarOpen}
            setAddPaymentOpen={setAddPaymentOpen}
            pdfRef={pdfRef}
            onDownload={onDownload}
          />
        </Col>
      </Row>
      <SendInvoiceSidebar
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen}
      />
      <AddPaymentSidebar
        toggleSidebar={toggleAddSidebar}
        open={addPaymentOpen}
      />
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Invoice not found</h4>
      <div className="alert-body">
        Invoice with id: {id} doesn't exist. Check list of all invoices:{" "}
        <Link to="/apps/invoice/list">Invoice List</Link>
      </div>
    </Alert>
  );
};

export default InvoicePreview;
