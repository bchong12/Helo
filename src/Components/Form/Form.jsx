import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Form.css";

class Form extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    axios.get("/api/auth/me").then((res) => {
      if (!res.data.id) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div className="form">
        <h1>Form</h1>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.user,
  };
};

export default connect(mapStateToProps)(withRouter(Form));
