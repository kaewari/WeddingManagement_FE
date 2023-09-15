import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../../../configs/Apis";
import MySpinner from "../../../layout/MySpinner";

const WeddingEdit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [q] = useSearchParams();
  const [wedding, setWedding] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [celebrityDate, setCelebrityDate] = useState();
  const weddingId = q.get("id");

  useEffect(() => {
    setLoading(true);
    const getOrderDetails = async () => {
      try {
        const res = await authApi()
          .get(endpoints["wedding-details"](weddingId))
          .catch((res) => {
            if (res.response.status === 404) setError("Not found this wedding");
          })
          .finally(() => {
            setLoading(false);
          });
        setWedding(res.data);
        setIsCompleted(res.data.isCompleted);
        setCelebrityDate(
          new Date().toISOString(res.data.celebrityDate).slice(0, 19)
        );
      } catch (err) {
        setWedding(null);
      }
    };
    getOrderDetails();
  }, [weddingId]);
  if (loading) return <MySpinner />;
  const handleIscomplete = () => {
    setIsCompleted(wedding.isCompleted);
    setIsCompleted(!isCompleted);
  };
  const updateWedding = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi()
        .put(endpoints["wedding-update"](weddingId), {
          isCompleted: isCompleted,
          deposit: wedding.deposit,
          totalLeft: wedding.totalLeft,
          discount: wedding.discount,
          paidVia: wedding.paidVia,
          receiptNo: wedding.receiptNo,
          tableNumber: wedding.tableNumber,
          guestNumber: wedding.guestNumber,
          description: wedding.description,
          celebrityDate: wedding.celebrityDate,
          createdDate: wedding.createdDate,
        })
        .then((res) => {
          if (res.status === 202) setMessage("Update successfully");
        })
        .catch((res) => {
          if (res.response.status === 304)
            setError("Not modified this wedding because it was completed");
          if (res.response.status === 400)
            setError("Not found this wedding" || res.response.data);
        })
        .finally(setLoading(false));
    } catch (err) {
      setError("Error updating wedding from the system");
    }
  };

  return (
    <>
      {wedding != null ? (
        <div>
          <h4 className="text-danger">{error}</h4>
          <h4 className="text-info">{message}</h4>
          <Form onSubmit={updateWedding}>
            <Form.Group>
              <Form.Label>Deposit</Form.Label>
              <Form.Control
                name="deposit"
                id="deposit"
                type="number"
                value={wedding.deposit}
                onChange={(e) => setWedding({ deposit: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total left</Form.Label>
              <Form.Control
                name="totalLeft"
                id="totalLeft"
                type="number"
                value={wedding.totalLeft}
                onChange={(e) => setWedding({ totalLeft: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                name="discount"
                id="discount"
                type="number"
                max={100}
                value={wedding.discount}
                onChange={(e) => setWedding({ discount: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Paid Via</Form.Label>
              <Form.Control
                name="paidVia"
                id="paidVia"
                type="text"
                maxLength={20}
                value={wedding.paidVia}
                onChange={(e) => setWedding({ paidVia: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Receipt Number</Form.Label>
              <Form.Control
                name="receiptNo"
                id="receiptNo"
                type="text"
                maxLength={20}
                value={wedding.receiptNo}
                onChange={(e) => setWedding({ receiptNo: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Table Number</Form.Label>
              <Form.Control
                name="tableNumber"
                id="tableNumber"
                type="number"
                max={100}
                value={wedding.tableNumber}
                onChange={(e) => setWedding({ tableNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Guest Number</Form.Label>
              <Form.Control
                name="guestNumber"
                id="guestNumber"
                type="number"
                maxLength={500}
                value={wedding.guestNumber}
                onChange={(e) => setWedding({ guestNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                id="description"
                type="text"
                max={255}
                value={wedding.description}
                onChange={(e) => setWedding({ description: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Celebrity Date</Form.Label>
              <Form.Control
                name="celebrityDate"
                id="celebrityDate"
                type="datetime-local"
                value={celebrityDate}
                onChange={(e) => setWedding({ celebrityDate: e.target.value })}
                required={true}
                // isInvalid={"Please choose a celebrity date."}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Is Completed:</Form.Label>
              {isCompleted ? (
                <span className="me-2">On</span>
              ) : (
                <span className="me-2">Off</span>
              )}
              <Form.Check
                name="isCompleted"
                id="isCompleted"
                type="switch"
                checked={isCompleted}
                onChange={handleIscomplete}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="danger" className="mt-2" type="submit">
                Update this wedding
              </Button>
            </Form.Group>
          </Form>
          <div></div>
        </div>
      ) : (
        <h4>{error}</h4>
      )}
    </>
  );
};
export default WeddingEdit;
