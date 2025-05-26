import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SellerEdit() {
  const { id } = useParams(); // get seller id from URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [emeraldBalance, setEmeraldBalance] = useState(0);
const [errorMessages, setErrorMessages] = useState([]);
  useEffect(() => {
    // Load current seller data
    fetch(`/api/sellers/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch seller');
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setEmeraldBalance(data.emeraldBalance);
      })
      .catch(err => {
        console.error(err);
        alert('Could not load seller data');
        navigate('/sellers');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/sellers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(id),
        name,
        emeraldBalance: parseFloat(emeraldBalance)
      })
    });

    if (response.ok) {
      alert('Seller updated.');
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
      //alert('Failed to update seller.');
    }
  };

  return (
    <div>
      <h2>Edit Seller</h2>

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
            placeholder='3-100 characters'
            minLength={3}
            maxLength={100}
          />
        </label>
        <br />
        <label>
          Emerald Balance:
          <input
            type="number"
            value={emeraldBalance}
            onChange={(e) => setEmeraldBalance(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default SellerEdit;
