import { useState, useEffect } from "react";
import React, { useCallback } from "react";
import "../../assets/css/home.css";
import { apiPostPut } from "../../mservices/contactUs";

import { Modal, Form, Button, Header, TextArea } from "semantic-ui-react";
import { toast } from "react-toastify";

//icons
import {
  MdHelp,
  MdKeyboardArrowLeft,
  MdSentimentSatisfied,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";

function FeedbackForm(props) {
  const [open, setOpen] = useState(false);
  const [count, setcount] = useState(0);
  const [que, setque] = useState([]);
  const [sbtn, setsbtn] = useState(false);

  useEffect(() => {
    setOpen(props.open);
    setcount(0);
    setque([]);
  }, [props.open]);

  useEffect(() => {
    if (count == 10) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [count]);

  const onClose = useCallback(() => {
    props.close();
  });

  const nextQue = (ans, index) => {
    setcount(index + 1);
    let tempque = que;
    tempque[index] = ans;
    setque(tempque);
  };

  const prevQue = () => {
    if (count != 0) setcount(count - 1);
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
    if (result.status == 200) {
      setsbtn(false);
      localStorage.setItem("isFeedBackGiven", true);
      toast.success("Thanks For Your Feedback");
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
          {count == 0 ? (
            <div className="modalDiv">
              <Header>Do You Understand What Does This Website Means</Header>
              <div className="feedBbtn2">
                <Button
                  basic
                  color={que[0] == "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 0);
                  }}
                >
                  <MdThumbUp /> Yeah
                </Button>
                <Button
                  basic
                  color={que[0] == "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 0);
                  }}
                >
                  <MdThumbDown /> Nope
                </Button>
                <Button
                  basic
                  color={que[0] == "no idea" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no idea", 0);
                  }}
                >
                  <MdHelp /> No Idea
                </Button>
              </div>
            </div>
          ) : null}

          {count == 1 ? (
            <div className="modalDiv">
              <Header>Is This Platform Is Useful</Header>
              <div>
                <Button
                  basic
                  color={que[1] == "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 1);
                  }}
                >
                  <MdThumbUp /> Yes
                </Button>
                <Button
                  basic
                  color={que[1] == "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 1);
                  }}
                >
                  <MdThumbDown /> No
                </Button>
                <Button
                  basic
                  color={que[1] == "maybe" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("maybe", 1);
                  }}
                >
                  <MdSentimentSatisfied /> Maybe
                </Button>
                <Button
                  basic
                  color={que[1] == "i don't know" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("i don't know", 1);
                  }}
                >
                  <MdHelp /> I Don't Know
                </Button>
              </div>
            </div>
          ) : null}

          {count == 2 ? (
            <div className="modalDiv">
              <Header>How This Website Looks</Header>
              <div>
                <Button
                  basic
                  color={que[2] == "good" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("good", 2);
                  }}
                >
                  <MdThumbUp /> Looks Good
                </Button>
                <Button
                  basic
                  color={que[2] == "its ok" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("its ok", 2);
                  }}
                >
                  <MdSentimentSatisfied /> It's Ok
                </Button>
                <Button
                  basic
                  color={que[2] == "bad" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("bad", 2);
                  }}
                >
                  <MdThumbDown /> Looks Bad
                </Button>
                <Button
                  basic
                  color={que[2] == "i don't know" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("i don't know", 2);
                  }}
                >
                  <MdHelp /> I Don't Know
                </Button>
              </div>
            </div>
          ) : null}

          {count == 3 ? (
            <div className="modalDiv">
              <Header>Have You Face Any Issue With The Website</Header>
              <div>
                <Button
                  basic
                  color={que[3] == "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 3);
                  }}
                >
                  <MdThumbUp /> No
                </Button>
                <Button
                  basic
                  color={que[3] == "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 3);
                  }}
                >
                  <MdThumbDown /> Yes
                </Button>
              </div>
            </div>
          ) : null}

          {count == 4 ? (
            <div className="modalDiv">
              <Header>
                If You Have Any Other Feedback Please Tell Us Here. We Love To
                Improve Our Service
              </Header>
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

          {count == 10 ? (
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

export { FeedbackForm };
