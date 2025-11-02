# Green Link - Design Guidelines

## Design Approach

**Reference-Based Design**: Direct inspiration from Stargear Solutions (https://stargear-solutions.com/), adapting their e-commerce structure and modern tech aesthetic for Green Link's satellite internet solutions brand.

**Design Principles**:
- Professional tech product showcase with clean, modern aesthetics
- E-commerce focused with emphasis on product imagery and specifications
- Trust-building through detailed product information and professional presentation
- Mobile-first responsive design optimized for Brazilian market

---

## Typography System

**Font Families**:
- Primary: Inter (Google Fonts) - body text, descriptions, navigation
- Secondary: Space Grotesk (Google Fonts) - headings, product titles, CTAs

**Type Scale**:
- Hero Headlines: text-5xl to text-7xl, font-bold (Space Grotesk)
- Section Headers: text-3xl to text-4xl, font-bold (Space Grotesk)
- Product Titles: text-xl to text-2xl, font-semibold (Space Grotesk)
- Body Text: text-base to text-lg, font-normal (Inter)
- Small Text/Labels: text-sm, font-medium (Inter)
- Price Display: text-2xl to text-3xl, font-bold (Space Grotesk)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 8, 12, 16, 20, 24
- Component padding: p-4, p-8
- Section spacing: py-12, py-16, py-20, py-24
- Grid gaps: gap-4, gap-6, gap-8
- Element margins: m-2, m-4, mb-8, mt-12

**Container Strategy**:
- Max width: max-w-7xl for main content
- Full-width hero sliders: w-full
- Product grids: max-w-7xl mx-auto px-4

**Grid Systems**:
- Product grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Collection cards: grid-cols-2 md:grid-cols-3 lg:grid-cols-6
- Feature sections: grid-cols-1 md:grid-cols-2

---

## Component Library

### Navigation
- Fixed header with logo, main navigation, search, cart icon, wishlist
- Mega dropdown menus for product categories
- Mobile: Hamburger menu with slide-out drawer
- Header height: h-16 to h-20
- Sticky on scroll with subtle shadow

### Hero Section
- Full-width image slider (carousel) with 3-5 slides
- Overlay text with bold headlines and CTA buttons
- Height: 70vh to 80vh on desktop, 50vh on mobile
- Auto-rotate every 5 seconds with manual navigation dots
- CTAs with backdrop blur effect when over images

### Product Collections Grid
- 6-column layout (desktop) showcasing product categories
- Image + category title overlay
- Hover effect: subtle scale transform
- Aspect ratio: 3:4 portrait orientation
- Links to collection pages

### Product Cards (Hot Sales Grid)
- Image gallery with hover to show secondary image
- Product title, price (regular + sale), rating stars
- Quick action buttons: Add to Cart, Wishlist, Quick View
- Badge overlays for "Sold Out", "Sale", "New"
- Pricing: Strikethrough regular price, prominent sale price
- Card shadow on hover with subtle lift effect

### Product Detail Pages
- Large image gallery with thumbnails (left/bottom positioned)
- Zoom on image hover
- Product title, SKU, rating/reviews section
- Price display: Large sale price with strikethrough regular
- Variant selector: Dropdown or button groups for options
- Quantity selector with +/- buttons
- "Add to Cart" and "Buy Now" CTAs
- Accordion sections: Description, Specifications, Shipping Info, Reviews
- Related products carousel at bottom

### Information Sections
- "Chip to Ship" style advantage section with large image + text overlay
- Feature callouts with icons, titles, descriptions (3-4 column grid)
- Trust badges: Free shipping, warranty, secure payment
- Newsletter subscription bar in footer

### Footer
- Multi-column layout (4-5 columns): Collections, Support, Company, Contact, Social
- Newsletter signup form
- Payment method icons
- Company info and policies links
- Copyright and language selector

---

## Images Strategy

**Hero Slider Images**:
- 3-5 high-quality lifestyle images showing Starlink products in use
- Scenarios: RV with Starlink on roof, rural farm with connectivity, mobile setup in vehicle, family using internet in remote location
- Product glamour shots with dramatic lighting
- Dimensions: 1920x800px minimum, optimized for web

**Product Images**:
- White background product photography for grid/card views
- Multiple angles: front, side, detail shots, in-use context
- Lifestyle images showing scale and application
- Minimum 1000x1000px, square aspect ratio
- Thumbnail gallery on product pages

**Collection Category Images**:
- Product category hero images: Starlink Mini, Gen 2, Gen 3, Enterprise, Vehicle Accessories, Routers
- Portrait format: 720x1080px
- Mix of product-focused and lifestyle shots

**Trust/Feature Sections**:
- Manufacturing/quality process images
- Team/warehouse photos for authenticity
- Customer installation photos
- Technical diagrams where relevant

---

## Content Sections Structure

**Homepage Layout** (8-9 comprehensive sections):

1. **Announcement Bar**: Free shipping notice, promotional message
2. **Navigation Header**: Logo, menus, search, cart
3. **Hero Slider**: 3-5 rotating hero images with CTAs
4. **Value Proposition**: "Supercharge Your Connectivity" with 2-column text + CTA
5. **Collection Grid**: 6 product category cards
6. **Hot Sales Products**: 8-12 product cards in grid
7. **Brand Story/Advantage**: Image + text section (Chip to Ship style)
8. **Newsletter Signup**: Email capture with benefits
9. **Footer**: Comprehensive site navigation and info

**Collection Pages**:
- Category header with description
- Filter/sort controls (sidebar + top bar)
- Product grid: 12-24 items per page
- Pagination or infinite scroll

**Product Pages**:
- Breadcrumb navigation
- Image gallery + product details (2-column layout)
- Detailed specifications accordion
- Related products
- Reviews section

---

## Interactive Elements

**Buttons**:
- Primary CTA: Large, bold, rounded corners (rounded-lg)
- Secondary: Outlined style
- Icon buttons for wishlist, cart, quick view
- Backdrop blur for buttons over images: backdrop-blur-sm

**Forms**:
- Input fields: Outlined style with focus ring
- Dropdown selectors for product variants
- Search bar with icon and autocomplete
- Newsletter subscription: Inline form in footer

**Carousels**:
- Hero slider: Auto-rotate with manual controls
- Product image gallery: Thumbnail navigation
- Related products: Horizontal scroll with arrows
- Smooth transitions, no aggressive animations

**Hover States**:
- Product cards: Subtle shadow and lift
- Navigation links: Underline or weight change
- Images: Slight scale or overlay fade
- Buttons: Background intensity change

---

## Icons

**Icon Library**: Heroicons (CDN)
- Shopping cart, wishlist/heart, search, user profile
- Menu/hamburger, close (X)
- Star ratings, chevrons for navigation
- Check marks for features, shipping truck
- Social media icons (Instagram, Facebook, WhatsApp)
- Filter/sort icons for collection pages

---

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

**Mobile Adaptations**:
- Hero height: Reduced to 50vh
- Navigation: Hamburger menu
- Product grid: 2 columns maximum
- Footer: Accordion-style collapsed sections
- Sticky bottom bar with cart/menu on mobile

---

## Accessibility

- Semantic HTML structure throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Alt text for all product images
- Focus indicators on interactive elements
- Sufficient color contrast (verified in implementation)
- Form labels properly associated