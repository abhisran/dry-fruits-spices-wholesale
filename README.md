# Nature's Bounty - Wholesale Dry Fruits & Spices Template

A modern, responsive, mobile-first static website template designed for wholesale businesses. This template uses a clean, earthy aesthetic and dynamic product loading via vanilla JavaScript.

## 🚀 Features

- **Dynamic Product System**: All products are managed via a single `data/products.json` file.
- **Mobile-First Design**: Fully responsive layout using CSS Flexbox and Grid.
- **Earthy Theme**: Warm brown, beige, and gold color palette for a professional, organic feel.
- **SEO Ready**: Semantic HTML5 with unique meta tags for every page.
- **WhatsApp Integration**: Floating contact button and product-specific inquiry links.
- **Performance Focused**: Minimal vanilla JS, Google Fonts, and native image lazy-loading.

## 📁 Project Structure

```text
dry-fruits-spices-wholesale/
├── css/
│   └── style.css          # Global styles & responsive queries
├── js/
│   ├── main.js            # UI interactions (sticky nav, mobile menu)
│   └── products.js        # Logic for fetching/rendering JSON data
├── data/
│   └── products.json      # Central product database
├── index.html             # Home page (Hero, About, Featured Products)
├── products.html          # Full product catalog
├── product-detail.html    # Dynamic product detail view
├── about.html             # Company history & quality assurance
└── contact.html           # Contact info & inquiry form
```

## ✅ Completed Tasks

- [x] Initial project structure and folder setup.
- [x] Defined design system (colors, typography, spacing) in `style.css`.
- [x] Created `data/products.json` with placeholder wholesale items.
- [x] Implemented global UI logic (Sticky Header & Hamburger Menu).
- [x] Developed dynamic product rendering for Home and Product pages.
- [x] Built a dynamic `product-detail.html` that reads `?id=` URL parameters.
- [x] Completed static content for About and Contact pages.
- [x] Added SEO meta tags to all HTML files.

## 🛠 How to Customize

### 1. Adding/Editing Products
Open `data/products.json` and add an object following this schema:
```json
{
  "id": 7,
  "name": "Product Name",
  "category": "dry-fruits or spices",
  "description": "Full product description...",
  "price": "Wholesale Price Text",
  "image": "path/to/image.jpg",
  "featured": true
}
```

### 2. Changing the Theme
Modify the CSS variables at the top of `css/style.css`:
```css
:root {
  --primary: #5d4037; /* Main Brown */
  --accent: #d4af37;  /* Gold Accent */
  --bg-light: #fdf5e6; /* Page Background */
}
```

### 3. Updating Contact Info
- **WhatsApp Number**: Search for `wa.me/` in all HTML files and `js/products.js` to update the phone number.
- **Email/Address**: Update the `<footer>` in all HTML files and the `contact.html` content.

## 🚢 Deployment
This is a pure static site. You can deploy it by uploading the `dry-fruits-spices-wholesale/` folder to:
- Netlify (Drag & Drop)
- Vercel (CLI or Git)
- GitHub Pages
- Any standard CPanel/FTP host.
