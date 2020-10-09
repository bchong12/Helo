import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, clearUser } from "../../Redux/reducer";
import "./Nav.css";

class Nav extends React.Component {
  constructor() {
    super();

    this.state = {
      img: "",
      username: "",
    };
  }

  componentDidMount() {
    axios
      .get("/api/auth/me")
      .then((res) => {
        this.props.getUser(res.data);
        this.setState({
          username: res.data.username,
        });
      })
      .catch((err) => console.log(err));
  }

  logout = () => {
    axios.post("/auth/logout");
  };

  render() {
    return (
      <div className="nav">
        {this.props.location.pathname === "/" ? null : (
          <div className="nav-bar">
            <p className="nav-text">
              User: {this.props.userReducer.user.username}
            </p>
            <div>
              <button
                className="nav-buttons"
                onClick={() => {
                  this.props.history.push("/dashboard");
                }}
              >
                Home
              </button>
              <button
                className="nav-buttons"
                onClick={() => {
                  this.props.history.push("/new");
                }}
              >
                New Post
              </button>
              <button
                className="nav-buttons"
                onClick={() => {
                  this.logout();
                  this.props.clearUser();
                  this.props.history.push("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(
  withRouter(Nav)
);
