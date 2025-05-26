import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SellerCreate() {
  const [name, setName] = useState('');
  const [emeraldBalance, setEmeraldBalance] = useState(0);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sellers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, emeraldBalance: parseFloat(emeraldBalance) })
    });

    if (response.ok) {
      alert('Seller created.');
      navigate('/sellers');
      window.location.reload();
    } else {
      const errorData = await response.json();

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
      //alert('Failed to create seller.');
    }
  };

  return (
    <div>
      <h2>Create New Seller</h2>

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
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
            placeholder='3-100 characters'
          />
        </label>
        <br />
        <label>
          Emerald Balance:
          <input
            type="number"
            onChange={(e) => setEmeraldBalance(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default SellerCreate;
