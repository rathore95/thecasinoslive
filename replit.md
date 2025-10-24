# Overview

TheCasinos.live is an independent online casino review and comparison website designed to help users discover and evaluate online casino platforms. The site features casino reviews, bonus comparisons, and trusted platform recommendations, targeting users seeking gambling entertainment options. The website emphasizes responsible gambling practices (18+ only) and provides comprehensive information to help users make informed decisions.

**Key Features:**
- **Admin Dashboard** - Manage casinos without touching code (add/edit/delete)
- Geo-targeted casino listings based on user location
- Display 10 casinos initially with "See More" functionality
- Automatic location detection via IP geolocation
- Sequential numbering (1, 2, 3...) for filtered results
- Compliance notices (18+, affiliate disclosure, responsible gambling)

# Recent Changes (October 24, 2025)

**Admin Dashboard Implementation:**
- Built full-stack application with Node.js/Express backend
- Created admin dashboard at /admin.html for managing casino brands
- **Added login authentication** - Username/password protection for admin dashboard
- Session-based authentication using express-session
- Credentials stored securely in environment variables (ADMIN_USERNAME, ADMIN_PASSWORD)
- Auto-redirect to login page for unauthorized access attempts
- Moved casino data from HTML to JSON file (casinos.json)
- Implemented RESTful API endpoints: GET /api/casinos, POST /api/casinos, PUT /api/casinos/:id, DELETE /api/casinos/:id
- Main site now loads casino data dynamically from API
- Changes made in admin dashboard instantly reflect on main site

**Previous Features:**
- Implemented geo-targeting: Casinos filtered by user's country automatically
- Added IPinfo.io geolocation API for location detection
- Created compact notice bar for age restriction and affiliate disclosure
- Added "See More Casinos" button to load additional brands (10 at a time)
- Fixed sequential numbering for filtered casino results
- Added comprehensive compliance features for Google advertising policies
- Integrated Google Analytics 4 placeholder
- Added responsible gambling resources and disclaimers

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Architecture

**Node.js/Express Server**
- Technology: Node.js with Express framework
- Port: 5000 (configured for Replit environment)
- Data Storage: JSON file (casinos.json)
- Purpose: RESTful API for casino data management
- Rationale: Enables dynamic content updates without code changes

**API Endpoints:**
- GET /api/casinos - Retrieve all casino brands
- POST /api/casinos - Add new casino brand
- PUT /api/casinos/:id - Update existing casino brand
- DELETE /api/casinos/:id - Remove casino brand

**Middleware:**
- express.json() - Parse JSON request bodies
- cors - Enable cross-origin requests
- body-parser - Handle form data (deprecated, using express.json instead)
- express.static() - Serve static files (HTML, images, etc.)

**Data Structure:**
Each casino object contains: id, name, logo, offer, games, bonus, payments, terms, link, geos (country targeting)

## Frontend Architecture

**Dynamic HTML Website**
- Technology: Pure HTML5 with Bootstrap 5 framework + JavaScript fetch API
- Design Pattern: Client-side rendering with API data fetching
- Styling: Bootstrap 5.3.0 grid system with custom CSS overrides
- Icons: Font Awesome 6.5.0 for visual elements
- Data Source: Fetches casino data from /api/casinos endpoint

**Responsive Design**
- Mobile-first approach using Bootstrap's responsive grid
- Viewport meta tag ensures proper scaling on all devices
- Card-based layout for casino listings with hover effects
- Pros: Wide browser compatibility, dynamic content updates
- Cons: Requires JavaScript enabled for data display

## SEO and Analytics

**Search Engine Optimization**
- Comprehensive meta tags (description, keywords, author, robots)
- Open Graph tags for social media sharing optimization
- Twitter Card integration for enhanced social presence
- Canonical URL specification to prevent duplicate content issues
- Structured Data (JSON-LD) using Schema.org vocabulary for rich search results
- Rationale: Maximizes discoverability and search engine ranking for competitive casino review market

**Analytics Integration**
- Google Analytics 4 (GA4) tracking implementation
- Global site tag (gtag.js) for event and page view tracking
- Placeholder GA_MEASUREMENT_ID requires configuration
- Solution: Provides visitor insights and conversion tracking capabilities

## Content Strategy

**Information Architecture**
- Casino brand cards displaying logos, ratings, and calls-to-action
- Comparison-focused layout emphasizing bonuses and features
- Responsible gambling messaging prominently featured
- Problem: Need to establish trust and authority in competitive niche
- Solution: Independent review positioning with comprehensive SEO metadata

## Design System

**Visual Identity**
- Color Scheme: Black (#000000) header/footer with white (#ffffff) background
- Accent Color: Hot pink (#ff007f) for primary CTAs
- Typography: Inter font family with Arial fallback
- Component Library: Bootstrap 5 components with custom brand styling
- Alternatives Considered: Custom CSS framework vs. Bootstrap
- Chosen Approach: Bootstrap for rapid development and mobile responsiveness

**Interactive Elements**
- Card hover animations (translateY transform)
- Box shadow depth for visual hierarchy
- Smooth transitions (0.2s ease timing)
- Button hover states with color darkening

# External Dependencies

## Frontend Frameworks and Libraries

**Bootstrap 5.3.0**
- Source: jsDelivr CDN
- Purpose: Responsive grid system, pre-built components, and utilities
- Integration: CSS framework loaded via CDN link

**Font Awesome 6.5.0**
- Source: Cloudflare CDN
- Purpose: Icon library for UI elements and visual indicators
- Integration: CSS stylesheet loaded from CDN

## Analytics and Tracking

**Google Analytics 4**
- Service: Google Tag Manager / Google Analytics
- Purpose: Website traffic analysis, user behavior tracking, conversion monitoring
- Configuration Required: Replace placeholder GA_MEASUREMENT_ID with actual tracking ID
- Integration: Asynchronous script loading via gtag.js

## Web Standards and Protocols

**Schema.org Structured Data**
- Format: JSON-LD
- Purpose: Enhanced search engine understanding and rich snippets
- Types Used: WebSite, Organization schemas
- Benefit: Improved SERP appearance and click-through rates

## SEO and Social Media

**Open Graph Protocol**
- Platforms: Facebook, LinkedIn, and other social networks
- Purpose: Control content appearance when shared on social media
- Metadata: Title, description, type, URL, site name

**Twitter Cards**
- Type: Summary with large image
- Purpose: Enhanced Twitter post previews
- Metadata: Card type, title, description

## Content Delivery

**CDN Strategy**
- Bootstrap CSS: jsDelivr CDN
- Font Awesome: Cloudflare CDN
- Rationale: Faster load times, reduced server load, browser caching benefits
- Trade-off: Dependency on third-party service availability