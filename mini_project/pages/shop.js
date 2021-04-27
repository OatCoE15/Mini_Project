import Layout from "../components/layout";
import { useState, useEffect } from "react";
import styles from "../styles/shop.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";
import CheckRouter from "../components/checkrouter";

const Shop = ({ token }) => {
  const router = useRouter();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  useEffect(async () => {
    setUserid(localStorage.getItem("userid"));
    // console.log("userid", userid);
  });
  const productList = [
    { id: "1", productName: "Smith&Wesson", price: "350" },
    { id: "2", productName: "Mafia Skull", price: "400" },
    { id: "3", productName: "Last Game", price: "400" },
    { id: "4", productName: "Harley Davidson", price: "500" },
    { id: "5", productName: "The Rolling Stovel", price: "400" },
    { id: "6", productName: "Hawaii Shirt 1", price: "300" },
    { id: "7", productName: "Hawaii Shirt 2", price: "300" },
    { id: "8", productName: "Hawaii Shirt 3", price: "300" },
    { id: "9", productName: "ONE PIECE Hawaii Shirt", price: "350" },
    { id: "10", productName: "Bonus Stage T-Shirt", price: "1,000" },
    { id: "11", productName: "Chun-li & Cammy T-Shirt", price: "1,000" },
    { id: "12", productName: "Doomsday Triple T-Shirt", price: "900" },
    { id: "13", productName: "Ellis Long Sleeve T-Shirt", price: "1,400" },
    { id: "14", productName: "Skidrokyo Pullover Hoodie", price: "1,800" },
    { id: "15", productName: "Skidrokyo Tie-dye Hoodie", price: "2,100" },
    { id: "16", productName: "Pushing Daisies Hoodie", price: "2,200" },
    { id: "17", productName: "Dazy Easy Short", price: "2,000" },
    { id: "18", productName: "Shake Fleece Short", price: "1,700" },
    { id: "19", productName: "BPM Shot", price: "2,000" },
    { id: "20", productName: "Peak Contrast Shot", price: "2,000" },
  ];
  const addtocart = async (item) => {
    console.log(item);
    let productName = item.productName;
    let quantity = 1;
    let price = item.price;
    await axios
      .post(
        `${config.URL}/addtocart`,
        { userid, productName, quantity, price },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout>
      <div>
        <div className={styles.cart}>
          <img
            onClick={() => {
              router.push("/cart");
            }}
            className={styles.cartIcon}
            src={"image/cart.png"}
          ></img>
        </div>
        <div className={styles.productBox}>
          <div className={styles.productList}>
            {productList.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    className={styles.productImage}
                    src={`image/cloths/${item.id}.jpg`}
                  ></img>
                  <div className={styles.productDetial}>
                    <p className={styles.productName}>{item.productName}</p>
                    <p className={styles.productName}>{item.price}฿</p>
                    <button
                      onClick={() => addtocart(item)}
                      className={styles.addCartButton}
                    >
                      เพิ่มลงในตะกร้า
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckRouter(Shop);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
