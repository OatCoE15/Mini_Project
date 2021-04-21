import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/register.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div className={styles.gridContainer}>
            <div>
                <b>Name :</b>
            </div>
            <div>
                <input type="text"
                    name="name"
                    placeholder="Please Enter your name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <b>Surnname :</b>
            </div>
            <div>
                <input type="text"
                    name="Surnname"
                    placeholder="Please Enter your surnname"
                    onChange={(e) => setSurnname(e.target.value)}
                />
            </div>

            <div>
                <b>Username :</b>
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <b>Mobile Number :</b>
            </div>
            <div>
                <input type="text"
                    name="mobile_number"
                    placeholder="Please Enter your mobile number"
                    onChange={(e) => setMobile_number(e.target.value)} />
            </div>

            <div>
                <b>Email :</b>
            </div>
            <div>
                <input type="email"
                    name="email"
                    placeholder="Please Enter your email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <b>Password :</b>
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="Please Enter password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register Page</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.registerpage}>
                    <h1 className={styles.registertext}>Register</h1>
                    <div className={styles.content}>
                        {registerForm()}
                    </div>
                    <div className={styles.register}>
                        <button className={styles.btn_register} onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
