import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);

    fetchCampaigns();
  }, [id]);

  const fetchCampaigns = () => {
    fetch(`/api/products/${id}/campaigns`)
      .then(res => res.json())
      .then(setCampaigns);
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
      fetchCampaigns(); // Refresh product list
    } else {
      alert('Failed to delete product.');
    }
  };

  const handleDelete = async (campaignId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/campaigns/${campaignId}`, { method: 'DELETE' });
    if (res.ok) {
      fetchCampaigns();
    } else {
      alert("Failed to delete campaign.");
    }
  };

  if (!product) return <p>Loading product info...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>ID: {product.id}</p>

      <div style={{ marginBottom: '10px' }}>
        <Link to={`/products/edit/${product.id}`}>
          <button>Edit Product</button>
        </Link>
        <button
          onClick={() => handleDeleteProduct(product.id)}
          style={{ marginLeft: '10px' }}>
          Delete Product
        </button>
      </div>

      <h3>Campaigns for this product:</h3>
      <Link to={`/campaign/create?productId=${product.id}`} style={{ marginLeft: '10px' }}>
        <button>Add Campaign</button>
      </Link>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <ul>
          {campaigns.map(c => (
            <li key={c.id}>
              <Link to={`/campaigns/${c.id}`}>{c.name}</Link> - {c.status ? 'On' : 'Off'}
              <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductDetail;
