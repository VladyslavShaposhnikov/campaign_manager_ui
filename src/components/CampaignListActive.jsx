import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('/api/campaigns/active')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCampaigns(data);
      })
      .catch(err => console.error(err));
  }, []);  

  const handleTransmit = async (campaignId) => {
  const res = await fetch(`/api/campaigns/transmit/${campaignId}`, {
    method: 'POST',
  });

  if (res.ok) {
    const updatedFund = await res.json();
    setCampaigns(prev =>
      prev.map(c => c.id === campaignId ? { ...c, fund: updatedFund.fund } : c)
    );
    window.location.reload();
    alert("Clicked");
  } else {
    alert("Transmission failed: Insufficient funds or error.");
  }
};

  return (
    <div>
      <h1>Active Campaigns</h1>
      <ul>
        {campaigns.map(c => (
          <li key={c.id}><Link to={`/campaigns/${c.id}`}>{c.name} </Link> - status:{c.status ? 'On' : 'Off'} 
          (for product: {c.productName} id: {c.productId}) - Fund: {c.fund}
            <button onClick={() => handleTransmit(c.id)}>Transmit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignList;
