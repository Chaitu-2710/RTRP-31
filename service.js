// Menu data
const menuData = {
    coffee: [
        { name: 'Espresso', description: 'Strong and pure coffee shot', price: 3.50 },
        { name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 4.50 },
        { name: 'Latte', description: 'Espresso with lots of steamed milk and little foam', price: 4.50 },
        { name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 5.00 }
    ],
    tea: [
        { name: 'Green Tea', description: 'Classic Japanese green tea', price: 3.00 },
        { name: 'Earl Grey', description: 'Black tea with bergamot oil', price: 3.00 },
        { name: 'Chamomile', description: 'Caffeine-free herbal tea', price: 3.00 },
        { name: 'Chai Latte', description: 'Spiced tea with steamed milk', price: 4.50 }
    ],
    pastries: [
        { name: 'Croissant', description: 'Buttery, flaky pastry', price: 3.00 },
        { name: 'Chocolate Muffin', description: 'Rich chocolate muffin', price: 3.50 },
        { name: 'Blueberry Scone', description: 'Fresh baked scone with blueberries', price: 3.50 },
        { name: 'Cinnamon Roll', description: 'Warm, gooey cinnamon roll', price: 4.00 }
    ]
};

// Function to create menu items
function createMenuItem(item) {
    return `
        <div class="menu-item">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">$${item.price.toFixed(2)}</span>
        </div>
    `;
}

// Function to populate menu sections
function populateMenus() {
    // Populate coffee menu
    const coffeeMenu = document.getElementById('coffee-menu');
    coffeeMenu.innerHTML += menuData.coffee.map(createMenuItem).join('');

    // Populate tea menu
    const teaMenu = document.getElementById('tea-menu');
    teaMenu.innerHTML += menuData.tea.map(createMenuItem).join('');

    // Populate pastries menu
    const pastriesMenu = document.getElementById('pastries-menu');
    pastriesMenu.innerHTML += menuData.pastries.map(createMenuItem).join('');
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', populateMenus);
