import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
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
      //alert('Failed to update product.');
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>

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
