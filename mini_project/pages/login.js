import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import styles from "../styles/login.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";

export default function Login({ token }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //  console.log("token : ", token);

  const isLogin = () => {
    if (token == "") {
      return (
        <div>
          <p className={styles.title}>เข้าสู่ระบบ</p>
          <div
            style={{ marginBottom: "10px", marginTop: "-30px" }}
            className="rows"
          >
            <p>เป็นสมาชิกแล้วหรือยัง ?</p>
            <button
              onClick={() => {
                router.push("/register");
              }}
              className={styles.registerButton}
            >
              สมัครสมาชิก
            </button>
          </div>
          <div className="column">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Username"
            ></input>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
            ></input>
            <button onClick={() => login()} className={styles.button}>
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="rows">
          <p className={styles.title}>เข้าสู่ระบบเรียบร้อยแล้ว</p>
        </div>
      );
    }
  };
  const login = async () => {
    let result = await axios
      .post(
        `${config.URL}/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("userid", res.data.user.id);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <Layout>{isLogin()}</Layout>;
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
