import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import styles from "../styles/login.module.css";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [remember, setRemember] = useState(false);
    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`, { username, password, remember }, { withCredentials: true });
            console.log("result: ", result);
            console.log("result.data:  ", result.data);
            console.log("token:  ", token);
            setStatus(result.status + ": " + result.data.user.username);
        }
        catch (e) {
            console.log("error: ", JSON.stringify(e.response));
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
        }
    };
    const reMem = async () => {
        setRemember(!remember);
    };

    const loginForm = () => (
        <div className={styles.gridContainer}>
            <div><b>Username</b></div>
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div><b>Password</b></div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
    );

    return (
        <Layout>
            <Head>
                <title>Login Page</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.loginpage}>
                    <h1 className={styles.logintext}>Login</h1>
                    {loginForm()}
                    <div className={styles.btn_login}>
                        <button className={styles.login} onClick={login}>Login</button>
                    </div>
                    <div className={styles.btn_register}>
                        <button className={styles.register} onClick={login}>Register</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
