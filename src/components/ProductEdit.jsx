import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    sellerId: ''
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name,
          sellerId: data.sellerId
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name: form.name, sellerId: Number(form.sellerId) };

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Product updated.');
      navigate(`/products/${id}`); 
    } else {
      alert('Failed to update product.');
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label><br />

        <input
        name="sellerId"
        type="hidden"
        value={form.sellerId}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProductEdit;
