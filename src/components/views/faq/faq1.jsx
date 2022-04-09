import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdExpandMore } from "react-icons/md";
import { apiGetMethod } from "../../../api_services/api_calls/api_calls";
import constants from "../../../helpers/constants";
import "./faq.scss";
import FullScreenWidget from "../../reusable/helpers";
import FooterBar from "../home/footer_bar/footer_bar";

export default function Faq1() {
  const [expanded, setExpanded] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(async () => {
    let result = await apiGetMethod(constants.get_faq);
    console.log("result", result);
    if (result.status !== null) {
      console.log(result.data);
      let arrayList = [];
      result?.forEach((element) => {
        element?.body.forEach((element2) => {
          arrayList.push(element2);
        });
      });
      console.log(arrayList);
      setFaqList(arrayList);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="faq-parent">
        {loading ? (
          <FullScreenWidget type="loader" show={true} />
        ) : (
          <div className="faq-div">
            {faqList.map((faq, i) => (
              <Accordion
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls={"panel" + i + "1bh-content"}
                  id={"panel" + i + "bh-header"}
                >
                  <Typography
                    sx={{ width: "90%", flexShrink: 0 }}
                    className="faq-question"
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="faq-answer">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}
      </div>
      <FooterBar />
    </>
  );
}
