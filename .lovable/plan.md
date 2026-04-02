

## Lothus Engenharia - Modernized Mobile-First Website

### Current Site Analysis
The existing site (lothusengenharia.com.br) is a WordPress site for an architecture and engineering firm. It has:
- Navigation: Inicio, Projetos, Quem Somos, Contato
- Hero carousel with project photos
- About section with company philosophy
- Portfolio grid with 8 residential projects
- WhatsApp floating button
- Dark navy/charcoal color scheme with white text

### Design Direction
Modern, elegant mobile-first single-page application with smooth scroll sections, premium typography, and architectural aesthetic. Dark tones with warm accent colors.

### Color System
- Background: Deep charcoal (#1a1a2e → HSL)
- Accent: Warm gold/amber for CTAs
- Text: White and soft gray
- Cards: Semi-transparent dark overlays

### Sections to Build

1. **Navbar** - Sticky, transparent on hero, solid on scroll. Mobile hamburger menu with slide-out drawer. Logo "LOTHUS" text with "ARQUITETURA | ENGENHARIA" subtitle.

2. **Hero** - Full-viewport background image with gradient overlay, headline text, and CTA button. Subtle scroll indicator animation.

3. **About (Quem Somos)** - Split layout: text left, image right on desktop. Stacked on mobile. Company philosophy text from the original site.

4. **Services** - Cards for: Projetos Residenciais, Projetos Comerciais, Engenharia Estrutural, Acompanhamento de Obra. Icons from lucide-react.

5. **Portfolio** - Filterable image grid showcasing the 8 residential projects. Uses placeholder images. Hover effects revealing project name.

6. **Contact** - Contact form (name, email, phone, message) + WhatsApp floating button.

7. **Footer** - Company info, social links, copyright.

### Technical Implementation

**Files to create/modify:**
- `src/index.css` - Update CSS variables for dark architectural theme
- `src/pages/Index.tsx` - Main page composing all sections
- `src/components/Navbar.tsx` - Responsive navbar with mobile drawer
- `src/components/Hero.tsx` - Full-screen hero with background image
- `src/components/About.tsx` - Company story section
- `src/components/Services.tsx` - Services grid
- `src/components/Portfolio.tsx` - Project gallery with filtering
- `src/components/Contact.tsx` - Contact form section
- `src/components/Footer.tsx` - Site footer
- `src/components/WhatsAppButton.tsx` - Floating WhatsApp CTA

All components use Tailwind CSS with mobile-first breakpoints (base → sm → md → lg). Images use placeholder URLs since we cannot host the original assets. Smooth scroll navigation between sections using anchor IDs.

