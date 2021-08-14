import React, { useEffect } from "react";
import { connect } from "react-redux";
import Postnew from "../newpost/newpost2";

function Newpost2(props) {
  const getOrder = async () => {
    let ordId = window.location.pathname;
    ordId = ordId.replace("/mybookings/id/edit/", "");
    let orders = props.orders;
    let order = orders.filter((item) => item.ordId == ordId);
    // console.log(order);
    if (order.length > 0) {
      console.log("edit ord data", order[0]);
      props.editOrder(order[0]);
    } else console.log("unable to load data");
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div>
      <Postnew editDate="true" history={props.history} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editOrder: (data) => {
      dispatch({ type: "EDIT_ORDER_DATA", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Newpost2);
