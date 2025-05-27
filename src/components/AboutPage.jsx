import React from 'react';

function AboutPage() {
    return (
        <div>
            <h1>About This Project</h1>
            <p>This is a Campaign Management App built with:</p>
            <ul>
                <li><strong>Frontend:</strong> React</li>
                <li><strong>Backend:</strong> ASP.NET Core Web API</li>
                <li><strong>Database:</strong> SQLite with Entity Framework Core</li>
            </ul>

            <p>Key Features:</p>
            <ul>
                <li>You can create, edit, delete, and list Sellers.</li>
                <li>When creating a Seller, you must set their initial emerald balance (bank account).</li>
                <li>Sellers own Products. You can add Products from a Seller's detail page.</li>
                <li>You can create, edit, delete, and list Products.</li>
                <li>Once a Product is created, you can associate Campaigns with it.</li>
                <li>You can create, edit, delete, and list Campaigns.</li>
                <li>Both frontend and backend validate the Campaign creation form.</li>
                <li>Upon creating a Campaign, the specified Fund is deducted from the Seller's emerald balance.</li>
                <li>To increase a Campaign's fund, simply edit it—only the difference is deducted.</li>
                <li>You cannot decrease the fund or pay more than the available emerald balance.</li>
                <li>All Campaign form fields were implemented as specified in the project requirements.</li>
                <li>You can list all Campaigns or only the active ones.</li>
                <li>Each active Campaign has a "Transmit" button that simulates a customer clicking an ad (campaign).</li>
                <li>Clicking "Transmit" deducts the bid amount from the Campaign's fund.</li>
                <li>You can click it multiple times, as long as there's enough fund available.</li>
                <li>If the fund runs out, the Campaign is automatically deactivated by the server.</li>
                <li>Inactive Campaigns cannot be reactivated unless they have sufficient funds to transmit.</li>
                <li>The UI only uses the essential endpoints, but you can explore the full API via <a href="http://localhost:5062/swagger" target="_blank" rel="noopener noreferrer">
                        Swagger UI
                    </a>.
                </li>
            </ul>
        </div>
    );
}

export default AboutPage;
