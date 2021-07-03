import { useState, useEffect } from "react";
import React, { useCallback } from "react";
import "../../assets/css/home.css";
import { apiPostPut, apiGetMethod } from "../../mservices/contactUs";

import { Modal, Form, Button, Header, TextArea } from "semantic-ui-react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

//icons
import {
  MdHelp,
  MdKeyboardArrowLeft,
  MdSentimentSatisfied,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
import { loadState } from "../../helpers/localStorage";

function FeedbackForm(props) {
  const [open, setOpen] = useState(false);
  const [count, setcount] = useState(0);
  const [que, setque] = useState([]);
  const [sbtn, setsbtn] = useState(false);
  const [fQuestions, setfQuestions] = useState([]);

  useEffect(async () => {
    if (fQuestions.length < 1) {
      if (props.feedBackQuestions.length < 1) {
        console.log("feedback questions from api");
        let res = await apiGetMethod("/feed", "/feedBack");
        console.log(res);
        setfQuestions(res.questions);
        props.updateFeedBackQuestions(res.questions);
      } else {
        console.log("load question from local");
        setfQuestions(props.feedBackQuestions);
      }
    }

    setOpen(props.open);
    setcount(0);
    setque([]);
  }, [props.open]);

  useEffect(() => {
    if (count === 10) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [count]);

  const onClose = useCallback(() => {
    console.log(fQuestions);
    props.close();
  });

  const nextQue = (ans, index) => {
    setcount(index + 1);
    let tempque = que;
    tempque[index] = ans;
    setque(tempque);
  };

  const prevQue = () => {
    if (count !== 0) setcount(count - 1);
  };

  const textArea = (e, index) => {
    // console.log(e);
    let ans = e.target.value;
    let tempque = que;
    tempque[index] = ans;
    setque(tempque);
  };

  const formSubmit = async () => {
    setsbtn(true);
    console.log(que);
    var obj = {
      q0: que[0] ?? "",
      q1: que[1] ?? "",
      q2: que[2] ?? "",
      q3: que[3] ?? "",
      q4: que[4] ?? "",
      submitedAt: new Date().valueOf(),
    };
    console.log(obj);
    console.log(JSON.stringify(obj));
    let strobj = {};
    strobj["body"] = JSON.stringify(obj);
    let result = await apiPostPut(strobj, "feedBack");
    if (result.status === 200) {
      setsbtn(false);
      localStorage.setItem("isFeedBackGiven", true);
      toast.info("Thanks For Your Feedback");
      setcount(10);
    } else {
      setsbtn(false);

      localStorage.setItem("isFeedBackGiven", false);
      toast.error("Something went wrong please try again");
      // onClose();
    }
  };

  return (
    <Modal
      className="fbModal"
      onClose={onClose}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Feedback Here</Modal.Header>
      <Modal.Content className="modalContent">
        {count > 0 ? (
          <p className="modalBack" onClick={prevQue}>
            <MdKeyboardArrowLeft size="2rem" />
            <span style={{ marginTop: "4px", fontWeight: "800" }}> Back </span>
          </p>
        ) : (
          <p className="modalBack"></p>
        )}
        <Modal.Description>
          {count === 0 ? (
            <div className="modalDiv">
              {/* <Header>Do You Understand What Does This Website Means</Header> */}
              <Header>{fQuestions[0]}</Header>

              <div className="feedBbtn2">
                <Button
                  basic
                  color={que[0] === "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 0);
                  }}
                >
                  <MdThumbUp /> Yeah
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[0] === "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 0);
                  }}
                >
                  <MdThumbDown /> Nope
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[0] === "no idea" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no idea", 0);
                  }}
                >
                  <MdHelp /> No Idea
                </Button>
              </div>
            </div>
          ) : null}

          {count === 1 ? (
            <div className="modalDiv">
              {/* <Header>How much often Do you think you will use this app?</Header> */}
              <Header>{fQuestions[1]}</Header>

              <div>
                <Button
                  basic
                  color={que[1] === "Whenever I need" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("Whenever I need", 1);
                  }}
                >
                  <MdThumbUp /> Whenever I need
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[1] === "Never" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("Never", 1);
                  }}
                >
                  <MdThumbDown /> Never
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[1] === "Quite Often" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("Quite Often", 1);
                  }}
                >
                  <MdSentimentSatisfied /> Quite Often
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[1] === "i don't know" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("i don't know", 1);
                  }}
                >
                  <MdHelp /> I Don't Know
                </Button>
              </div>
            </div>
          ) : null}

          {count === 2 ? (
            <div className="modalDiv">
              {/* <Header>Did you face any issue while browsing this site?</Header> */}
              <Header>{fQuestions[2]}</Header>

              <div>
                <Button
                  basic
                  color={que[2] === "Yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("Yes", 2);
                  }}
                >
                  <MdThumbUp /> Yes
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[2] === "No" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("No", 2);
                  }}
                >
                  <MdThumbDown /> No
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[2] === "Sometimes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("Sometimes", 2);
                  }}
                >
                  <MdSentimentSatisfied /> Sometimes
                </Button>
                {/* <Button
                  basic
                  color={que[2] === "i don't know" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("i don't know", 2);
                  }}
                >
                  <MdHelp /> I Don't Know
                </Button> */}
              </div>
            </div>
          ) : null}

          {count === 3 ? (
            <div className="modalDiv">
              {/* <Header>Expecting any other service from us? (If yes, please mention it in message below).</Header> */}
              <Header>{fQuestions[3]}</Header>

              <div>
                <Button
                  basic
                  color={que[3] === "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 3);
                  }}
                >
                  <MdThumbUp /> yes
                </Button>
                <Button
                  basic
                  style={{ marginLeft: "6px", marginTop: "4px" }}
                  color={que[3] === "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 3);
                  }}
                >
                  <MdThumbDown /> No
                </Button>
              </div>
            </div>
          ) : null}

          {count === 4 ? (
            <div className="modalDiv">
              {/* <Header>
                If you want to tell us something please let us know here. We love to
                improve our Service.
              </Header> */}
              <Header>{fQuestions[4]}</Header>

              <div>
                <Form>
                  <TextArea
                    onChange={(e) => {
                      textArea(e, 4);
                    }}
                    placeholder="Tell us more"
                    value={que[4]}
                  />
                </Form>
              </div>
            </div>
          ) : null}

          {count === 10 ? (
            <div>
              <Header>Thanks For Your Feedback</Header>
            </div>
          ) : null}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className="modalAction">
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        {count > 3 ? (
          sbtn ? (
            <Button
              loading
              content="Submit"
              labelPosition="right"
              icon="checkmark"
              positive
            />
          ) : (
            <Button
              content="Submit"
              labelPosition="right"
              icon="checkmark"
              onClick={formSubmit}
              positive
            />
          )
        ) : null}
      </Modal.Actions>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    feedBackQuestions:
      state.feedbackQuestion.length !== 0
        ? state.userDetails
        : loadState("feedbackQuestion") ?? [],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateFeedBackQuestions: (data) => {
      dispatch({ type: "UPDATE_FEEDBACK_QUESTIONS", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);
