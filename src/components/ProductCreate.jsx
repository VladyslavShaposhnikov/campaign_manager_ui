import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function ProductCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSellerId = searchParams.get('sellerId');
  const [errorMessages, setErrorMessages] = useState([]);
  const [form, setForm] = useState({
    name: '',
    sellerId: initialSellerId || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name: form.name, sellerId: Number(form.sellerId) };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Product created.');
      navigate(`/sellers/${form.sellerId}`);
    } else {
      const errorData = await res.json();

      const extractedErrors = [];
      if (typeof errorData.errors === 'object' && !Array.isArray(errorData.errors)) {
        for (const field in errorData.errors) {
          extractedErrors.push(...errorData.errors[field]);
        }
      }
      setErrorMessages(extractedErrors);

      if (errorData.errors && Array.isArray(errorData.errors)) {
        setErrorMessages(errorData.errors);
      }
      alert('Failed to create product.');
    }
  };

  return (
    <div>
      <h2>Create Product</h2>

      {errorMessages.length > 0 && (
        <div style={{ color: 'red' }}>
          <ul>
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required placeholder='3-100 characters' minLength={3} maxLength={100} />
        </label><br />

        {!initialSellerId && (
          <label>
            Seller ID:
            <input
              name="sellerId"
              type="number"
              value={form.sellerId}
              onChange={handleChange}
              required
            />
          </label>
        )}<br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default ProductCreate;
