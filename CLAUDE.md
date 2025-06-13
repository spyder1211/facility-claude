# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML mockup of a sports facility booking system for municipal governments. It's designed for UI/UX validation and contains no backend functionality - all interactions are simulated with JavaScript.

## Architecture

### Frontend Structure
- **Pure HTML/CSS/JavaScript** - No build tools or frameworks
- **Mobile-first responsive design** with CSS Grid and Flexbox
- **Single-page app simulation** using JavaScript for navigation and state management
- **Component-based CSS** with utility classes and CSS custom properties

### Data Flow
- Mock data stored in JSON files (`data/facilities.json`, `data/users.json`)
- Application state managed by `FacilityBookingApp` class in `main.js`
- User authentication simulated with localStorage
- Booking flow uses URL parameters and localStorage for state persistence

### Key Files
- `assets/js/main.js` - Central application logic and event handlers
- `assets/css/style.css` - Main stylesheet with CSS custom properties
- `assets/css/responsive.css` - Breakpoint-specific styles
- `data/facilities.json` - Facility data including pricing, availability, equipment

## Development Commands

Since this is a static mockup, development is straightforward:

```bash
# Serve files locally (any HTTP server)
python -m http.server 8000
# or
npx serve .

# Open in browser
open http://localhost:8000
```

## Page Flow Architecture

The booking flow follows this sequence:
1. `index.html` → `facilities.html` (facility selection)
2. `facilities.html` → `facility-detail.html?id=X` (facility details + calendar)
3. `facility-detail.html` → `booking.html?facilityId=X&date=Y` (booking form)
4. `booking.html` → `booking-confirm.html` (confirmation)
5. `booking-confirm.html` → `booking-complete.html` (completion)

Authentication flow:
- `login.html` handles both login and registration
- Successful auth redirects to `facilities.html`
- `mypage.html` requires authentication simulation

## CSS Architecture

Uses CSS custom properties for consistent theming:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    --neutral-color: #6b7280;
}
```

Responsive breakpoints:
- Mobile: ~575px
- Tablet: 576px-767px  
- Desktop: 768px+

## JavaScript Structure

`FacilityBookingApp` class handles:
- Data loading from JSON files
- Event listeners for UI interactions
- State management via localStorage
- Page-specific initialization based on URL

Key methods:
- `loadData()` - Fetches mock data
- `filterFacilities()` - Search/filter logic
- `displayCalendar()` - Calendar rendering
- `updateBookingCalculation()` - Price calculations

## Mock Data Schema

Facilities include:
- Basic info (name, address, phone, capacity)
- Pricing (basePrice + time-based multipliers)
- Equipment arrays for rental options
- Availability by month/day arrays
- Rules arrays for display

## Image Handling

Images use fallback to base64 SVG placeholders when files don't exist:
```javascript
onerror="this.src='data:image/svg+xml;base64,PHN2Zy...'"
```

## Styling Conventions

- Use semantic HTML elements
- Component-based CSS classes (`.card`, `.btn`, `.form-input`)
- Utility classes for spacing (`.mb-2`, `.p-3`, `.text-center`)
- BEM-like naming for complex components
- Consistent 8px spacing units throughout