import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MyUserContext } from "../../../App";
import { authApi, endpoints } from "../../../configs/Apis";

const ViewCustomerFeedback = () => {
  const [user] = useContext(MyUserContext);
  const [feedback, setFeedback] = useState();
  const [params] = useSearchParams();
  const [state, setState] = useState(true);
  const feedbackId = params.get("id");
  const replyState = params.get("reply") == "true";

  useEffect(() => {
    const api = async () => {
      let response = await axios.get(endpoints["feedback-details"](feedbackId));
      setFeedback(response.data);
    };
    api();
  }, [state]);

  const addYourReply = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    var object = {};
    formData.forEach((value, key) => {
      object["message"] = value;
    });
    console.log(object);

    try {
      const replyRequest = await authApi().post(
        endpoints["feedback-reply"](id),
        object
      );
      setState(!state);
    } catch (err) {
      setState(!state);
    }
  };

  return (
    <>
      <h2>Chi tiet feedback</h2>
      {feedback && (
        <>
          <div className="border rounded p-2 m-1">
            <p>Feed back cua {feedback.whatCustomer.name}</p>
            <p>
              ID: <span className="fw-bold">{feedback.id}</span>
            </p>
            <p>
              Feedback Type:{" "}
              <span className="fw-bold">{feedback.feedBackType}</span>
            </p>
            <p>
              Table count: <span className="fw-bold">{feedback.comment}</span>
            </p>
            <p>
              Guest Up to: <span className="fw-bold">{feedback.reply}</span>
            </p>
            <p>
              Created Date:{" "}
              <span className="fw-bold">
                {new Date(feedback.createdDate).toLocaleString("en-GB")}
              </span>
            </p>
          </div>
          {feedback.reply != null && (
            <div className="border rounded p-2 m-1">
              <h3>Reply</h3>
              {feedback.whatUser && (
                <>
                  <h4>Replied boi {feedback.whatUser.name}</h4>
                  <span className="text-decoration-underline">
                    Reply content
                  </span>
                  <br></br>
                  <p className="p-2 m-1 border rounded">{feedback.reply}</p>
                </>
              )}
            </div>
          )}
          {((feedback && replyState == true && feedback.reply == null) ||
            user.role.includes("Admin")) && (
            <>
              {" "}
              {/*reply here*/}
              <form
                onSubmit={(e) => {
                  addYourReply(e, feedback.id);
                }}
              >
                <lable for="reply">Your reply</lable>
                <textarea
                  placeholder="put some keys..."
                  id="reply"
                  name="reply"
                  className="form-control"
                />
                <button className="btn btn-primary my-2">Add your reply</button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ViewCustomerFeedback;
