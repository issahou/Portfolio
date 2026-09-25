# Cahier des Charges – Portfolio Personnel

**Projet :** Portfolio en ligne d'un étudiant ingénieur informatique (5ème année)
**Auteur / Client :** [Votre nom]
**Date :** Septembre 2026
**Version :** 1.0

---

## 1. Présentation du projet

### 1.1 Contexte
Étudiant en 5ème année de cycle ingénieur en informatique, en fin de formation et à la recherche d'un poste (stage de fin d'études, premier emploi, alternance). Le portfolio doit servir de carte de visite numérique pour présenter le profil, les compétences et les réalisations académiques et professionnelles.

### 1.2 Objectifs du projet
- Présenter un profil professionnel clair et attractif aux recruteurs, entreprises et écoles partenaires.
- Mettre en valeur les projets académiques, personnels et professionnels (stages, PFE, hackathons, etc.).
- Centraliser CV, compétences techniques, certifications et contacts en un seul endroit.
- Renforcer la visibilité en ligne (référencement, réseaux sociaux, LinkedIn, GitHub).
- Démontrer des compétences techniques (front-end, back-end, design) à travers le site lui-même.

### 1.3 Public cible
- Recruteurs et responsables RH.
- Entreprises proposant des stages / PFE.
- Encadrants académiques.
- Réseau professionnel (LinkedIn, communauté tech).

---

## 2. Périmètre fonctionnel

### 2.1 Pages / Sections principales

| Section | Contenu attendu |
|---|---|
| **Accueil / À propos** *(page d'atterrissage)* | Nom, titre professionnel, courte accroche, photo/avatar, boutons CTA (Télécharger CV, Me contacter), puis parcours, formation, soft skills, langues parlées, centres d'intérêt |
| **Compétences** | Langages (ex : Python, Java, C++), frameworks (React, Spring, Django...), outils (Git, Docker, Linux...), bases de données, méthodologies (Agile/Scrum) |
| **Projets** | Fiches projets avec : titre, description, technologies utilisées, rôle, lien GitHub, lien démo, captures d'écran |
| **Expériences** | Stages, jobs étudiants, expériences associatives (timeline) |
| **Formation** | Parcours scolaire et universitaire, diplômes, certifications (ex : AWS, Cisco, Coursera) |
| **Contact** | Formulaire de contact, email, téléphone, réseaux sociaux (LinkedIn, GitHub, Twitter/X) |
| **CV téléchargeable** | Bouton de téléchargement du CV au format PDF |

### 2.2 Fonctionnalités techniques attendues
- [ ] Design responsive (mobile, tablette, desktop)
- [ ] Mode sombre / clair (dark mode toggle)
- [ ] Animations légères au scroll (fade-in, transitions)
- [ ] Formulaire de contact fonctionnel (envoi d'email ou intégration type EmailJS)
- [ ] Filtres/catégories pour les projets (par techno, par type)
- [ ] Multilingue (Français / Anglais) *(optionnel)*
- [ ] Bonne vitesse de chargement (optimisation des images, lazy loading)
- [ ] Référencement SEO de base (balises meta, titres, sitemap)
- [ ] Accessibilité (contrastes, navigation clavier, alt text)

---

## 3. Contraintes techniques

### 3.1 Stack technique proposée (à ajuster selon préférence)

| Composant | Choix possibles |
|---|---|
| Front-end | HTML/CSS/JS, React.js, Vue.js, ou Next.js |
| Styling | Tailwind CSS, Bootstrap, ou CSS pur/SASS |
| Back-end *(si formulaire dynamique)* | Node.js/Express, ou service tiers (Formspree, EmailJS) |
| Hébergement | **Vercel (plan gratuit)** – déploiement automatique depuis GitHub |
| Nom de domaine | Sous-domaine gratuit fourni par Vercel (ex : *portfolio-nom.vercel.app*), ou domaine personnalisé *(optionnel, payant)* |
| Gestion de version | Git + GitHub |

### 3.2 Contraintes non-fonctionnelles
- Temps de chargement < 3 secondes.
- Compatible avec les principaux navigateurs (Chrome, Firefox, Safari, Edge).
- Code propre, commenté et versionné sur GitHub (le repo doit lui-même être une vitrine du savoir-faire).
- Design cohérent avec une identité visuelle personnelle (charte graphique, palette de couleurs, typographie).

---

## 4. Arborescence proposée du site

```
Accueil / À propos (page d'atterrissage)
├── Compétences
├── Projets
│   ├── Projet 1
│   ├── Projet 2
│   └── ...
├── Expériences & Formation
└── Contact
```

---

## 5. Livrables attendus

1. Maquette (wireframe/design) validée – Figma ou équivalent *(optionnel mais recommandé)*.
2. Code source complet hébergé sur un dépôt GitHub public.
3. Site déployé gratuitement sur **Vercel** et accessible via une URL publique.
4. CV en version PDF téléchargeable depuis le site.
5. Documentation technique minimale (README avec stack utilisée, instructions d'installation).

---

## 6. Planning prévisionnel indicatif

| Phase | Description | Durée estimée |
|---|---|---|
| 1. Recherche & inspiration | Étude de portfolios existants, choix du style | 2-3 jours |
| 2. Maquettage | Wireframe, choix palette/typographie | 3-4 jours |
| 3. Développement front-end | Intégration des sections principales | 1-2 semaines |
| 4. Contenu | Rédaction des textes, sélection des projets | 3-5 jours |
| 5. Fonctionnalités avancées | Formulaire, animations, dark mode | 3-5 jours |
| 6. Tests & optimisation | Responsive, performance, SEO | 2-3 jours |
| 7. Déploiement | Mise en ligne sur Vercel (connexion au repo GitHub, déploiement automatique) | 1 jour |

---

## 7. Critères de réussite

- Le portfolio reflète fidèlement le profil et les compétences réelles de l'étudiant.
- Navigation fluide et intuitive sur tous les supports.
- Projets présentés de manière claire avec preuves concrètes (code, démo, résultats).
- Site déployé, fonctionnel et sans bug majeur.
- Retour positif d'au moins 2-3 relecteurs externes (encadrant, pairs, professionnel) avant mise en ligne définitive.

---

## 8. Annexes / Éléments à préparer par l'étudiant

- [ ] CV à jour (PDF)
- [ ] Photo de profil professionnelle
- [ ] Liste des projets avec descriptions et liens GitHub
- [ ] Captures d'écran ou démos des projets
- [ ] Liste des compétences techniques classées par niveau de maîtrise
- [ ] Liens réseaux sociaux/professionnels (LinkedIn, GitHub, etc.)
- [ ] Texte de présentation personnelle ("À propos")

---

*Document évolutif – à ajuster selon les retours et l'avancement du projet.*
