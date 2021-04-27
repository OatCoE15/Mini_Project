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
  const [productList, setProductList] = useState([]);
  const [confirm, setConfirm] = useState("");
  const [userid, setUserid] = useState("");

  useEffect(async () => {
    setUserid(localStorage.getItem("userid"));
    // console.log("userid", userid);
  });

  const getData = () => {
    axios
      .get(`${config.URL}/cart`, {
        headers: {
          search: userid,
        },
      })
      .then((res) => {
        // console.log(res);
        let resdata = res.data.data[0];
        setProductList(resdata.products);
        // console.log("productList", productList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteProduct = (productname) => {
    axios
      .get(`${config.URL}/deleteProduct`, {
        headers: {
          userid: userid,
          productname: productname,
        },
      })
      .then((res) => {
        // console.log(res);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div>
        <p className={styles.carttitle}>ตะกร้าสินค้า</p>
        <div className="centers">
          <button className={styles.showButton} onClick={() => getData()}>
            แสดงรายการสินค้า
          </button>
        </div>

        <div className="centers">
          {console.log("productList1", productList)}
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <td>ชื่อสินค้า</td>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item) => {
                if (item !== null) {
                  return (
                    <tr key={item.productName}>
                      <td>{item.productName}</td>
                      <th>{item.quantity}</th>
                      <th>{item.price}</th>
                      <th>
                        <button
                          onClick={() => deleteProduct(item.productName)}
                          className={styles.deleteButton}
                        >
                          ลบ
                        </button>
                      </th>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="centers">
          <button
            style={{ marginTop: "5vh" }}
            className={styles.showButton}
            onClick={() => {
              setConfirm("คำสั่งซื้อสำเร็จ");
            }}
          >
            ยืนยันคำสั่งซื้อ
          </button>
        </div>
        <div className="centers">
          <p className="rows">{confirm}</p>
        </div>
      </div>
    </Layout>
  );
};

export default CheckRouter(Cart);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
