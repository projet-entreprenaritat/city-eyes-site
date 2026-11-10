# CITY EYES — Site de Présentation de l'Étude de Marché 2026 (Casablanca, Maroc)

Site web moderne, animé et accessible présentant l'étude de marché de **CITY EYES**, réseau citoyen de détection des anomalies urbaines (nids-de-poule, déchets, éclairage défectueux, fuites d'eau, trottoirs dégradés) pour la métropole de Casablanca.

---

## 📋 Informations du Projet
- **Projet :** CITY EYES
- **Sous-titre :** Réseau citoyen de détection des problèmes urbains
- **Slogan officiel :** *« Vos yeux pour une ville meilleure. »*
- **Badge officiel :** Étude de marché · Maroc – Casablanca · 2026
- **Nature du document :** Document de cadrage — hypothèses à valider sur le terrain
- **Emplacement du projet :** `C:\Users\abdes\Projects\city-eyes-site`

---

## 🗂️ Architecture Multi-fichiers
```text
city-eyes-site/
├── index.html                                # Page principale sémantique HTML5
├── README.md                                 # Documentation & guide de déploiement
├── .gitignore                                # Exclusions Git (fichiers système, logs, etc.)
└── assets/
    ├── css/
    │   ├── variables.css                     # Variables CSS, thèmes clair/sombre & design tokens
    │   └── style.css                         # Mise en page, composants UI, grilles & responsive
    ├── js/
    │   ├── radar.js                          # Toile Canvas du Hero (nœuds reliés et balayage radar)
    │   └── app.js                            # IntersectionObserver, compteurs, timeline & thèmes
    ├── images/
    │   ├── CREDITS.md                        # Registre exhaustif des crédits et licences libres
    │   ├── casablanca-front-de-mer.svg       # Illustration libre : Casablanca & Mosquée Hassan II
    │   ├── voirie-nids-de-poule.svg          # Illustration libre : Voirie & nids-de-poule
    │   ├── proprete-dechets-urbains.svg      # Illustration libre : Propreté & dépôts sauvages
    │   ├── eclairage-public-panne.svg        # Illustration libre : Éclairage & lampadaires
    │   ├── fuite-eau-voirie.svg              # Illustration libre : Eau & fuites de chaussée
    │   └── citoyen-smartphone.svg            # Illustration libre : Usager et application mobile
    └── simulations/
        ├── simulation-signalement.svg        # Maquette écran : Prise de photo & géolocalisation
        ├── simulation-suivi.svg              # Maquette écran : Suivi d'état (Signalé/En cours/Résolu)
        ├── simulation-carte.svg              # Maquette écran : Carte conceptuelle des alertes
        └── simulation-dashboard.svg          # Maquette écran : Console partenaires municipaux
```

---

## 🎨 Charte Graphique & Direction Artistique
- **Palette chromatique :**
  - Bleu marine : `#0b2545` (structure, typographie principale, sérieux institutionnel)
  - Bleu vif : `#2f80ed` (action, boutons primaires, liens, flux actifs)
  - Orange doux : `#f2a33a` (points d'intérêt, balises d'alerte, accents visuels)
  - Fond clair : `#f8fafc` (blanc cassé contemporain pour le confort de lecture)
- **Typographie :** Sans-serif moderne (Inter, fallback `system-ui`).
- **Composants :** Glassmorphism léger (`backdrop-filter: blur`), cartes arrondies (`border-radius: 22px`), ombres portées douces, aération généreuse.
- **Thème clair et sombre :** Bascule automatique selon `prefers-color-scheme` et bouton manuel interactif dans la barre fixe sticky.
- **Accessibilité :**
  - Contrastes validés WCAG AA.
  - Balises sémantiques (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - Attributs `aria-label`, navigation complète au clavier.
  - Respect de `prefers-reduced-motion` pour désactiver les animations si demandé par l'usager.
- **Responsive :** Mobile-first optimisé aux breakpoints 480 px, 768 px et 1024 px.

---

## ⚖️ Règles de Fidélité à l'Étude de Marché
Conformément aux directives de transparence méthodologique :
- **Budget de 27 000 DH :** Désigné comme *« budget initial estimatif / prévisionnel »*. Aucune utilisation des termes « vérifié » ou « devis ».
- **Données d'enquête (75 % / 15 % / 10 %) :** Accompagnées d'un badge visible *« Données à valider »* (provenant de l'infographie préliminaire).
- **Fonctionnalités avancées :** Carte en temps réel, détection collaborative avec vote de confirmation, regroupement automatique des doublons, algorithme de priorisation et tableau de bord partenaires sont présentés comme *« concepts envisagés, à valider »*.
- **Partenaires organisationnels :** Utilisation de la dénomination exacte *« entreprises de maintenance et de propreté »*.
- **Déploiement géographique :** Utilisation de la mention *« extension à d'autres villes »*.
- **Démonstrateur cartographique :** Carte schématique vectorielle étiquetée *« illustration schématique, non cartographique »*.

---

## 🚀 Publication GitHub & GitHub Pages
Pour déployer le site sur GitHub Pages :
1. **Initialisation Git locale :**
   ```powershell
   cd C:\Users\abdes\Projects\city-eyes-site
   git init
   git add .
   git commit -m "feat: initialisation du site complet CITY EYES Casablanca 2026"
   ```
2. **Connexion GitHub :**
   ```powershell
   gh auth login
   ```
   *(Suivre les instructions interactives dans le navigateur)*
3. **Création du dépôt public et déploiement Pages :**
   ```powershell
   gh repo create city-eyes-site --public --source=. --remote=origin --push
   gh api -X POST repos/{owner}/city-eyes-site/pages -f build_type=legacy -f source[branch]=main -f source[path]=/
   ```
4. **URL de consultation :**
   `https://<votre-pseudo>.github.io/city-eyes-site/`
