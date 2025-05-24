import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function ProductCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sellerId = searchParams.get('sellerId');

  const [form, setForm] = useState({
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form, sellerId: Number(sellerId) };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Product created.');
      navigate(`/sellers/${sellerId}`);
    } else {
      alert('Failed to create product.');
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default ProductCreate;
