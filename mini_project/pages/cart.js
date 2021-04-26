import Layout from "../components/layout";
import { useState, useEffect } from "react";
import styles from "../styles/shop.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";
import CheckRouter from "../components/checkrouter";

const Cart = ({ token }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // setLoginName(localStorage.getItem("userid"));
    // console.log(loginName);
    console.log(localStorage.getItem("userid"));
  });
  return (
    <Layout>
      <div>
        <p className={styles.carttitle}>ตะกร้าสินค้า</p>
        <div className="centers">
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tableHeader}>
                <td>ชื่อสินค้า</td>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>แก้ไข</th>
              </tr>
              <tr>
                <td>Jill</td>
                <td>Smith</td>
                <td>50</td>
                <td>50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

// export default CheckRouter(Shop);
export default Cart;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
