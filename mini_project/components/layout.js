import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../config/config";
const Layout = (props) => {
  const router = useRouter();
  const topButton = () => {
    return (
      <div className={styles.boxmenu}>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/");
          }}
        >
          หน้าแรก
        </button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/shop");
          }}
        >
          สินค้า
        </button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/login");
          }}
        >
          เข้าสู่ระบบ
        </button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            axios
              .get(`${config.URL}/logout`, { withCredentials: true })
              .then((res) => {
                console.log(res);
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          ออกจากระบบ
        </button>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>OAT's SHOP</title>
      </Head>
      <main className={styles.main}>
        <div className="row-justify-between">
          <div className="rows">
            <img className={styles.logo} src={"image/logo.png"}></img>
            <h1 className={styles.title}>Oat's Shop</h1>
          </div>
          <div>{topButton()}</div>
        </div>
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
