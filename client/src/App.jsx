import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.get("http://localhost:4001/products");
      setProducts(response.data.data);
      setStatus("complete");
    } catch (error) {
      console.error("Error fetching products:", error);
      setStatus("failed");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.delete(`http://localhost:4001/products/${productId}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderProducts = () => {
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Fetching Error...</p>;

    return products.map((product) => (
      <div className="product" key={product.id}>
        <div className="product-preview">
          <img
            src={product.image}
            alt={product.name}
            width="350"
            height="350"
          />
        </div>
        <div className="product-detail">
          <h1>Product name: {product.name}</h1>
          <h2>Product price: {product.price} Baht</h2>
          <p>Product description: {product.description}</p>
        </div>
        <button
          className="delete-button"
          onClick={() => handleDelete(product.id)}
        >
          x
        </button>
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">{renderProducts()}</div>
    </div>
  );
}

export default App;
