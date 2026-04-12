async function fetchProducts() {
  try {
    const response = await fetch('./data/products.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description.substring(0, 80)}...</p>
        <a href="product-detail.html?id=${product.id}" class="btn btn-outline">View Details</a>
      </div>
    </div>
  `;
}

async function initProducts() {
  const featuredGrid = document.getElementById('featured-products-grid');
  const allProductsGrid = document.getElementById('all-products-grid');
  const productDetailContainer = document.getElementById('product-detail-container');

  const products = await fetchProducts();

  // Handle Home Page Featured Products
  if (featuredGrid) {
    const featuredProducts = products.filter(p => p.featured);
    featuredGrid.innerHTML = featuredProducts.map(createProductCard).join('');
  }

  // Handle Products Page
  if (allProductsGrid) {
    allProductsGrid.innerHTML = products.map(createProductCard).join('');
  }

  // Handle Product Detail Page
  if (productDetailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
      productDetailContainer.innerHTML = `
        <div class="product-detail container">
          <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="detail-info">
            <h2>${product.name}</h2>
            <p class="category">${product.category.replace('-', ' ').toUpperCase()}</p>
            <p class="price">${product.price}</p>
            <p class="description">${product.description}</p>
            <div class="actions" style="margin-top: 2rem;">
              <a href="https://wa.me/1234567890?text=I'm interested in ${product.name}" class="btn btn-primary">Inquiry via WhatsApp</a>
            </div>
          </div>
        </div>
      `;
      document.title = `${product.name} | Dry Fruits & Spices Wholesale`;
    } else {
      productDetailContainer.innerHTML = '<p class="text-center">Product not found.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', initProducts);
