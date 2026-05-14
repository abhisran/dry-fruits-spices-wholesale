/**
 * Product Catalog Engine
 */

async function loadCatalog() {
  const response = await fetch("data/products.json?v=" + new Date().getTime());
  if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
  return normalizeCatalog(await response.json());
}

function normalizeCatalog(data) {
  if (data && Array.isArray(data.categories)) return data;
  if (!Array.isArray(data)) return { categories: [] };

  return {
    categories: [
      {
        id: "products",
        name: "Our Products",
        description: "Explore our premium wholesale selection.",
        products: data.map((product) => ({
          id: String(product.id),
          name: product.name,
          description: product.description,
          image: product.image,
          featured: Boolean(product.featured),
          specs: product.specs || {}
        }))
      }
    ]
  };
}

function flattenProducts(catalog) {
  return catalog.categories.flatMap((category) =>
    category.products.map((product) => ({
      ...product,
      categoryId: category.id,
      categoryName: category.name
    }))
  );
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

function createProductCard(product, index) {
  const id = encodeURIComponent(product.id);
  const name = escapeHtml(product.name);
  const description = escapeHtml(product.description);
  const categoryName = escapeHtml(product.categoryName);
  const image = escapeHtml(product.image);
  
  const loadingAttr = index < 4 ? "" : 'loading="lazy"';

  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${image}" alt="${name}" ${loadingAttr}>
      </div>
      <div class="product-info">
        <p class="eyebrow">${categoryName}</p>
        <h3>${name}</h3>
        <p class="description-preview">${description}</p>
        <a href="product-detail.html?id=${id}" class="btn btn-outline btn-full">View Details</a>
      </div>
    </article>
  `;
}

function renderFeaturedProducts(catalog) {
  const grid = document.getElementById("featured-products-grid");
  if (!grid) return;

  const featuredProducts = flattenProducts(catalog).filter((product) => product.featured).slice(0, 8);
  grid.innerHTML = featuredProducts.map((p, i) => createProductCard(p, i)).join("");
}

function renderCategorySections(catalog) {
  const container = document.getElementById("category-products");
  if (!container) return;

  container.innerHTML = catalog.categories.map((category) => `
    <section class="category-section" id="${escapeHtml(category.id)}">
      <div class="section-heading">
        <p class="eyebrow">Wholesale Category</p>
        <h2>${escapeHtml(category.name)}</h2>
        <p>${escapeHtml(category.description)}</p>
      </div>
      <div class="products-grid">
        ${category.products.map((product, i) => createProductCard({
          ...product,
          categoryId: category.id,
          categoryName: category.name
        }, i)).join("")}
      </div>
    </section>
  `).join("");
}

function injectProductSchema(product) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [new URL(product.image, window.location.href).href],
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": SITE.name
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

function renderProductDetail(catalog) {
  const container = document.getElementById("product-detail-container");
  if (!container) return;

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = flattenProducts(catalog).find((item) => item.id === productId);

  if (!product) {
    container.innerHTML = `
      <div class="container text-center">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <a href="products.html" class="btn btn-primary">Browse Catalog</a>
      </div>
    `;
    return;
  }

  const specsHtml = product.specs ? `
    <div class="spec-list">
      ${Object.entries(product.specs).map(([label, value]) => `
        <div class="spec-item">
          <span class="spec-label">${escapeHtml(label)}</span>
          <span class="spec-value">${escapeHtml(value)}</span>
        </div>
      `).join("")}
    </div>
  ` : "";

  document.title = `${product.name} | ${SITE.name}`;

  // SEO: Dynamic Meta Tags
  const absoluteImage = new URL(product.image, window.location.href).href;
  const setMeta = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      if (property.startsWith('og:')) tag.setAttribute('property', property);
      else tag.setAttribute('name', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setMeta('og:title', `${product.name} | Wholesale`);
  setMeta('og:description', product.description);
  setMeta('description', product.description);
  setMeta('og:image', absoluteImage);
  
  injectProductSchema(product);

  container.innerHTML = `
    <div class="product-detail container">
      <div class="detail-image">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
      </div>
      <div class="detail-info">
        <p class="eyebrow">${escapeHtml(product.categoryName)}</p>
        <h1>${escapeHtml(product.name)}</h1>
        <p class="description">${escapeHtml(product.description)}</p>
        ${specsHtml}
        <div class="actions">
          <a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("I'm interested in " + product.name + " wholesale inquiry")}" class="btn btn-primary" target="_blank" rel="noopener">Inquiry via WhatsApp</a>
          <a href="products.html" class="btn btn-outline">Back to Catalog</a>
        </div>
      </div>
    </div>
  `;
}

function renderCatalogError() {
  const errorMsg = `
    <div class="container text-center">
      <h2>Unable to load products</h2>
      <p>Please refresh the page or contact us if the problem persists.</p>
    </div>
  `;
  ["featured-products-grid", "category-products", "product-detail-container"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = errorMsg;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const catalog = await loadCatalog();
    renderFeaturedProducts(catalog);
    renderCategorySections(catalog);
    renderProductDetail(catalog);
  } catch (error) {
    console.error("Failed to load catalog:", error);
    renderCatalogError();
  }
});
