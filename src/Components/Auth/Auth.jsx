import React from "react";
import logo from "./helo_logo.png";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../Redux/reducer";
import "./Auth.css";

class Auth extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidMount() {
    axios.get("/api/auth/me").then((res) => {
      if (res.data.id) {
        this.props.history.push("/dashboard");
      }
    });
  }

  changeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  changePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  registerUser = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then((res) => {
        this.props.getUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  loginUser = () => {
    const { username, password } = this.state;

    axios
      .post("/auth/login", { username, password })
      .then((res) => this.props.getUser(res.data))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="auth">
        <div className="auth-box">
          <img className="helo-logo-auth" src={logo} alt="" />
          <p className="title">Helo</p>
          <div className="auth-input">
            <p>Username: </p>
            <input
              onChange={this.changeUsername}
              placeholder="Username"
              defaultValue={this.state.username}
            />
          </div>
          <div className="auth-input">
            <p>Password: </p>
            <input
              onChange={this.changePassword}
              type="password"
              placeholder="Password"
              defaultValue={this.state.password}
            />
          </div>

          <div className="bottom-row-auth">
            <button
              onClick={() => {
                this.loginUser();
                this.setState({
                  username: "",
                  password: "",
                });
                this.props.history.push("/dashboard");
              }}
              className="auth-button"
            >
              Login
            </button>
            <button
              onClick={() => {
                this.registerUser();
                this.setState({
                  username: "",
                  password: "",
                });
                this.props.history.push("/dashboard");
              }}
              className="auth-button"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps, { getUser })(withRouter(Auth));
