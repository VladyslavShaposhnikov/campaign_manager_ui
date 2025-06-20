import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h2>Products of all Sellers</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link> (Seller Name: {product.sellerName}, Seller Id: {product.id},)
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProductsList;
