import { useState, useEffect, useRef } from "react";
import React, { useCallback } from "react";
import "../../assets/css/home.css";

import { Modal, Form, Button, Header, TextArea } from "semantic-ui-react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useStores } from "../stateManagement/index";
//icons
import { MdKeyboardArrowLeft } from "react-icons/md";
import { loadState } from "../../helpers/localStorage";
import { apiPostPut } from "../../api_services/api_calls/api_calls";
import constants from "../../helpers/constants";

function FeedbackForm(props) {
  const { commonStore } = useStores();
  const [open, setOpen] = useState(false);
  const [count, setcount] = useState(0);
  const [sbtn, setsbtn] = useState(false);
  const [answers, setanswers] = useState([]);
  let feedbackBody = useRef();

  useEffect(async () => {
    console.log(
      "feedback questions",
      commonStore.feedbackQuestions?.questions?.length
    );
    setOpen(props.open);
    setcount(0);
  }, [props.open]);

  useEffect(() => {
    if (count === 10) {
      setTimeout(() => {
        onClose();
        setcount(0);
      }, 2000);
    }
  }, [count]);

  const onClose = useCallback(() => {
    props.close();
  });

  const nextQue = (ans, index) => {
    setcount(index + 1);
    let temp = answers;
    temp[index] = ans;
    setanswers(temp);
    console.log(answers);
  };

  const prevQue = () => {
    if (count !== 0) setcount(count - 1);
  };

  const formSubmit = async () => {
    console.log(feedbackBody);
    console.log(feedbackBody?.current?.ref?.current?.value);
    let body = {
      suggestionFor: "feedback",
      subject: "feedback",
      suggestionFrom: "userWeb",
      feedbackQuestionsId: commonStore.feedbackQuestions?._id,
      isFeedbackQuestionsAttempted: true,
      body: feedbackBody?.current?.ref?.current?.value,
      attemptedQuestions: [],
      answers: [],
    };
    answers.forEach((ans, index) => {
      body["attemptedQuestions"].push(index);
      body["answers"].push(ans);
    });
    console.log(body);
    setsbtn(true);

    let result = await apiPostPut(body, constants.api.new_suggestion, "POST");
    if (result != null) {
      setsbtn(false);
      localStorage.setItem("isFeedBackGiven", true);
      toast.info("Thanks For Your Feedback");
      setcount(10);
      setanswers([]);
    } else {
      setsbtn(false);

      localStorage.setItem("isFeedBackGiven", false);
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <Modal
      className="fbModal"
      onClose={onClose}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
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
          {count === 10 ? (
            <div>
              <Header>Thanks For Your Feedback</Header>
            </div>
          ) : null}
          {commonStore.feedbackQuestions?.questions?.map((que, index) => {
            return (
              <>
                {que.isActive ? (
                  <div
                    className="modalDiv"
                    style={{ display: count == index ? "block" : "none" }}
                    key={index}
                  >
                    <Header>{que.question}</Header>

                    <div className="feedBbtn2">
                      {que.options.map((option, key) => (
                        <Button
                          basic
                          color={answers[index] === key ? "blue" : "grey"}
                          key={key}
                          onClick={() => {
                            nextQue(key, index);
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    {que.questionType == "text_area" ? (
                      <div>
                        <Form>
                          <TextArea
                            ref={feedbackBody}
                            placeholder="Tell us more"
                          />
                        </Form>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </>
            );
          })}
        </Modal.Description>
        {/* <Modal.Description>
          {count === 0 ? (
            <div className="modalDiv">
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
             
              </div>
            </div>
          ) : null}

          {count === 3 ? (
            <div className="modalDiv">
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

         
        </Modal.Description> */}
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
