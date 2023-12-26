import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [productData, setProductData] = useState([]);

  async function getProductData() {
    const result = await axios.get("http://localhost:4001/products");
    setProductData(result.data.data);
  }
  useEffect(() => {
    getProductData();
  }, [productData]);

  async function deleteProductData(id) {
    console.log(id);
    await axios.delete(`http://localhost:4001/products/${id}`);
  }
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productData.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name:{item.name}</h1>
                <h2>Product price:{item.price} Baht</h2>
                <p>Product description:{item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProductData(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
