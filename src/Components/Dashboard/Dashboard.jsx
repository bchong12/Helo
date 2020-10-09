import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

class Dashboard extends React.Component {
  componentDidUpdate() {
    axios.get("/api/auth/me").then((res) => {
      if (!res.data.id) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(withRouter(Dashboard));
