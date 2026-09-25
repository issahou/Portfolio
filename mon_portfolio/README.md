# Portfolio Personnel - Next.js 14

Portfolio en ligne d'un étudiant ingénieur informatique (5ème année) développé avec Next.js 14, TypeScript, Tailwind CSS et next-intl.

## 🚀 Stack Technique

- **Framework** : Next.js 14 (App Router) avec React Server Components
- **Langage** : TypeScript (strict mode)
- **Styling** : Tailwind CSS v4 avec design tokens
- **i18n** : next-intl (Français / Anglais)
- **Animations** : Framer Motion
- **Formulaires** : React Hook Form + Zod
- **Email** : EmailJS (client) / API Route (server)
- **Contenu** : MDX local + JSON
- **Déploiement** : Vercel (auto-deploy depuis GitHub)

## 📁 Structure du Projet

```
src/
├── app/
│   ├── [locale]/           # Routes internationalisées
│   │   ├── page.tsx        # Accueil (Hero + About + Featured Projects)
│   │   ├── competences/    # Page compétences
│   │   ├── projets/        # Liste projets + filtres
│   │   │   └── [slug]/     # Détail projet (MDX)
│   │   ├── experiences/    # Timeline expériences/formation
│   │   └── contact/        # Formulaire contact
│   ├── api/contact/        # API route formulaire
│   ├── globals.css         # Styles globaux + tokens
│   ├── layout.tsx          # Root layout
│   ├── sitemap.ts          # Sitemap auto-généré
│   └── robots.ts           # Robots.txt
├── components/
│   ├── ui/                 # Composants primitives (Button, Card, Badge, Modal...)
│   ├── layout/             # Header, Footer, MainLayout
│   ├── sections/           # Sections de page (Hero, About, Skills, Projects...)
│   ├── projects/           # Composants projets (ProjectCard, ProjectFilters...)
│   └── providers/          # ThemeProvider, I18nProvider
├── content/
│   ├── projects/           # Fichiers MDX (un par projet)
│   ├── profile.json        # Profil (nom, bio, social, CV)
│   ├── skills.json         # Compétences par catégories
│   └── cv.json             # Expériences, formation, certifications
├── lib/
│   ├── content/            # Repository pattern pour données
│   ├── email/              # Service d'envoi email
│   ├── i18n/               # Configuration next-intl
│   ├── theme/              # Design tokens + provider
│   └── utils/              # Utilitaires (cn, date, validation)
├── hooks/                  # Custom hooks (useTheme, useProjects, useContactForm...)
└── types/                  # Types TypeScript partagés
```

## 🛠️ Installation

```bash
# Cloner le repo
git clone https://github.com/votreprofil/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer en développement
npm run dev
```

## 📝 Configuration

### Variables d'environnement (.env.local)

```env
# EmailJS (Client-side)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Resend (Server-side - optionnel)
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### Contenu

Éditez les fichiers dans `src/content/` :
- `profile.json` - Vos infos personnelles
- `skills.json` - Vos compétences
- `cv.json` - Vos expériences
- `projects/*.mdx` - Vos projets (un fichier par projet)

### Internationalisation

Les traductions sont dans `messages/fr.json` et `messages/en.json`.

## 🎨 Personnalisation

### Thème (couleurs, espacement, typographie)

Modifiez `src/lib/theme/tokens.ts` pour vos design tokens.

### Composants UI

Les composants de base sont dans `src/components/ui/`.

## ✅ Commandes Disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # ESLint
npm run lint:fix     # ESLint + fix auto
npm run typecheck    # TypeScript check
npm run format       # Prettier format
npm run format:check # Prettier check
npm run test         # Tests unitaires (Vitest)
npm run test:e2e     # Tests E2E (Playwright)
```

## 📦 Déploiement sur Vercel

1. Push sur GitHub
2. Importer le repo dans Vercel
3. Configurer les variables d'environnement
4. Deploy automatique à chaque push sur `main`

## 📄 Licence

MIT License - Libre d'utilisation pour votre portfolio personnel.

---

*Construit avec ❤️ en Next.js, TypeScript et Tailwind CSS*