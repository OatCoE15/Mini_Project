import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import styles from "../styles/contact.module.css";
import axios from "axios";
import config from "../config/config";
import Link from 'next/link'
import { Facebook, MailOutline, Phone} from '@material-ui/icons';

export default function Login({ token }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [remember, setRemember] = useState(false);
    // const login = async (req, res) => {
    //     try {
    //         let result = await axios.post(`${config.URL}/login`, { username, password, remember }, { withCredentials: true });
    //         console.log("result: ", result);
    //         console.log("result.data:  ", result.data);
    //         console.log("token:  ", token);
    //         setStatus(result.status + ": " + result.data.user.username);
    //     }
    //     catch (e) {
    //         console.log("error: ", JSON.stringify(e.response));
    //         setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    //     }
    // };
    const loginForm = () => (
        <div className={styles.grid_container}>
            <span className={styles.contact_data_font} ><Facebook style={{ fontSize: 50, color: '#1877f2'}}/></span>
            <span className={styles.contact_data_back}>Teerapong Nithiporndacha</span>

            <span className={styles.contact_data_font} ><MailOutline style={{ fontSize: 50, color: 'red'}}/></span>
            <span className={styles.contact_data_back}>nithiporndacha@gmail.com</span>

            <span className={styles.contact_data_font} ><Phone style={{ fontSize: 50, color: 'green'}}/></span>
            <span className={styles.contact_data_back}>0848585846</span>
        </div>
    );

    return (
        <Layout>
            <Head>
                <title>Contact Page</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.contact_page}>
                    <h1 className={styles.contact_text}>Contact</h1>
                    <div className={styles.image_contact}><img src='/proflie.jpg' alt='Image Contact' width='300' style={{borderRadius:'20px'}} /></div>
                    {loginForm()}
                </div>
            </div>
        </Layout>
    );
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}