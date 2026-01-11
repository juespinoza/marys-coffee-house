# ☕ "Mary’s Coffee House Paraguay - Website Oficial

Sitio web profesional, moderno y optimizado para **"Mary’s Coffee House Paraguay**, desarrollado con **Next.js App Router**, enfocado en performance, SEO, analítica y una experiencia de usuario cuidada tanto en desktop como en mobile.

El proyecto está preparado para **contenido multilenguaje (ES / EN / PT)**, medición de tráfico y eventos con **Google Analytics 4**, y una arquitectura escalable y mantenible.

---

## ✨ Features principales

- ⚡ **Next.js 16 (App Router)** con Server Components
- 🌍 **i18n nativo** (Español, Inglés, Portugués)
- 🎨 **Tailwind CSS** con theming dinámico (light / dark)
- 🧠 **SEO avanzado**
  - Metadata por página
  - Titles y descriptions por idioma
  - Open Graph
- 📊 **Google Analytics 4**
  - Page views
  - Clicks en CTAs
  - Contacto (WhatsApp / Email)
  - Redes sociales
  - Google Maps
- 📱 **UX optimizada**
  - Mobile Menu tipo drawer
  - Accesibilidad (ARIA)
  - Animaciones suaves y performantes
- 🖼️ **Cloudinary** para imágenes optimizadas
- 🚀 Performance-first (sin librerías pesadas innecesarias)

--

## 🗂️ Estructura del proyecto

```text
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx        # Layout principal + SEO + Theme + GA
│       ├── page.tsx          # Home
│       ├── menu/
│       ├── products/
│       ├── about/
│       └── contact/
│
├── components/
│   ├── layout/               # Header, Footer, GoogleAnalytics
│   ├── sections/             # Hero, Features, Gallery, etc.
│   ├── ui/                   # MobileMenu, ThemeToggle, LocaleSwitch
│   └── analytics/            # TrackButton, TrackLink, TrackBox
│
├── lib/
│   ├── analytics.ts          # Helper GA4
│   ├── content.ts            # getCafeContent / getCafeTheme
│   ├── seo.ts                # buildMetadata / helpers SEO
│   ├── i18n.ts               # Locales y helpers
│   └── utils.ts
│
├── locale/
│   ├── es.json
│   ├── en.json
│   └── pt.json
│
├── styles/
│   └── globals.css
│
└── middleware/
    └── proxy.ts              # i18n routing

```

## 🌍 Internacionalización (i18n)

- Rutas por idioma:
  - `/es`
  - `/en`
  - `/pt`
- Contenido gestionado desde:
  - src/locale/es.json
  - src/locale/en.json
  - src/locale/pt.json
- Los textos, títulos SEO y labels se traducen desde JSON.

## 📊 Google Analytics 4

El proyecto incluye medición avanzada de eventos:

### Eventos trackeados

- CTA Home:
- Explora Nuestro Menú
- Cómo llegar
- Contacto:
- Enviar por WhatsApp
- Enviar por Email
- Enviar formulario
- Redes sociales:
- Instagram
- Facebook
- Google Maps:
- Click en iframe
- Abrir en Google Maps
- Footer:
- Redes sociales
- Link “Desarrollado por Julia Espinoza”

Los eventos se disparan **solo desde Client Components**, respetando App Router y evitando errores de build.

## 🛠️ Requisitos

- Node.js **18+**
- Yarn (recomendado)

## ▶️ Desarrollo local

```bash
yarn install
yarn dev
```

Abrir:
👉 http://localhost:3000/es

## 🏗️ Build de producción

```bash
yarn build
yarn start
```

## 🔐 Variables de entorno

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
MAKE_WEBHOOK_URL=https://hook.us1.make.com/xxxxx
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=folderCode
NEXT_PUBLIC_CAFE_NAME=cafeName
```

## 🚀 Deploy en Vercel (Recomendado)

    •	Build automático
    •	Soporte perfecto para App Router
    •	SEO y performance óptimos

## 👩‍💻 Desarrollo y diseño

Desarrollado por:
Julia Espinoza
Ingeniera Informática · Web Performance · UX · SEO

## 📌 Estado del proyecto

✔ MVP completo
✔ SEO listo
✔ Analytics integrado
✔ Performance optimizada
🔜 Mejoras UX avanzadas (guardadas en roadmap)

## ☕ Mary’s Coffee House Paraguay

Primera casa de café de especialidad ☕️
Café de especialidad en Asunción. Barismo, cursos y consultoría: una experiencia clásica con espíritu armónico.

---
