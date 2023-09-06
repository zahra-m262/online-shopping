import { useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../slice/productsApi";
import { addToCart } from "../slice/cartSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img
                  src={`http://localhost:9000/images/${product.image}`}
                  alt={product.image}
                />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="home-btn"
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
