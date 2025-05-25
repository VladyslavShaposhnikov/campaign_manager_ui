import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SellerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch seller and products
  const fetchProducts = () => {
    fetch(`/api/sellers/${id}/products`)
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetch(`/api/sellers/${id}`)
      .then(res => res.json())
      .then(setSeller);

    fetchProducts();
  }, [id]);

  // Delete seller handler
  const handleDeleteSeller = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this seller?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/sellers/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert('Seller deleted.');
      navigate('/sellers');
    } else {
      alert('Failed to delete seller.');
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${productId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert('Product deleted.');
      fetchProducts(); // Refresh product list
    } else {
      alert('Failed to delete product.');
    }
  };

  if (!seller) return <p>Loading seller info...</p>;

  return (
    <div>
      <h2>{seller.name}</h2>
      <p>ID: {seller.id}</p>

      <h3>Products by {seller.name}:</h3>
      {products.length === 0 ? (
        <p>No products found for this seller.</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id} style={{ marginBottom: '0.5rem' }}>
              <Link to={`/products/${p.id}`}>{p.name}</Link>{' '}
              <button
                onClick={() => handleDeleteProduct(p.id)}
                style={{ marginLeft: '10px' }}>
                Delete Product
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => navigate(`/products/create?sellerId=${id}`)}
          style={{ marginRight: '10px' }}
        >
          Add Product
        </button>

        <button
          onClick={() => navigate(`/sellers/${id}/edit`)}
          style={{ marginRight: '10px' }}
        >
          Edit {seller.name}
        </button>

        <button onClick={handleDeleteSeller}>
          Delete Seller
        </button>
      </div>
    </div>
  );
}

export default SellerDetail;
