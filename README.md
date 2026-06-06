# Ahmad Anas P S - Premium Cybersecurity & AI/ML Portfolio Website

A modern, high-performance, dark cybersecurity-themed personal portfolio website built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## 🛠️ Tech Stack
- **Core:** React 18 & TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS (v3)
- **Animations:** Framer Motion
- **Icons:** Lucide React & Custom SVGs (for maximum compatibility)

---

## 📂 Project Structure
```text
AHMAD PORTFOLIO/
├── public/
├── src/
│   ├── assets/
│   │   ├── img/
│   │   │   └── photo.jpg                  # Passport profile photo
│   │   ├── resume/
│   │   │   └── AhmadAnas_Resume.pdf       # Resume PDF for download
│   │   └── certificates/
│   │       ├── internships/               # Internship certificate images
│   │       │   ├── amasqis.jpg
│   │       │   └── cappricio.jpg
│   │       ├── hackathons/                # Hackathon certificate images
│   │       │   ├── smartathon1.jpg
│   │       │   ├── makeathon1.jpg
│   │       │   ├── police-hackathon.jpg
│   │       │   └── smartathon2.jpg
│   │       └── courses/                   # Course certificate images
│   │           ├── ibm-deep-learning.jpg
│   │           ├── ibm-ml-basics.jpg
│   │           ├── nptel-python.jpg
│   │           ├── nptel-dbms.jpg
│   │           ├── diploma-c.jpg
│   │           └── cisco-data-science.jpg
│   ├── components/
│   │   ├── AboutSection.tsx               # About Section & stats
│   │   ├── AchievementsGallery.tsx        # Hackathon trophy cards & certificate grid
│   │   ├── CertificationsGallery.tsx      # Completed & in-progress courses
│   │   ├── ExperienceSection.tsx          # Vertical timeline with lightbox trigger
│   │   ├── Footer.tsx                     # Contact grid & copy email utility
│   │   ├── HeroSection.tsx                # Typewriter heading, photo, & main CTA buttons
│   │   ├── Lightbox.tsx                   # Reusable full-screen certificate viewer
│   │   ├── Navbar.tsx                     # Fixed top navigation & responsive drawer
│   │   ├── ProjectCard.tsx                # Dynamic project card with fallback placeholders
│   │   ├── ProjectsSection.tsx            # Sticky stacked cards on scroll
│   │   └── SocialLinks.tsx                # Social buttons row
│   ├── data/
│   │   └── portfolio.json                 # Single source of truth database
│   ├── hooks/
│   │   └── usePortfolio.ts                # custom hook to load portfolio data
│   ├── types/
│   │   └── portfolio.ts                   # TypeScript interfaces
│   ├── App.tsx                            # Root Layout
│   ├── index.css                          # Custom animations, matrix background grid, glass styles
│   └── main.tsx
├── tailwind.config.js                     # Theme extensions and typography config
├── postcss.config.js
├── index.html
├── package.json
└── tsconfig.json
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Install Dependencies
Run the following command in the project directory to install all dependencies:
```bash
npm install
```

### 3. Run Development Server
Start the local server with hot-reload:
```bash
npm run dev
```
Open your browser and navigate to the address listed in the terminal (usually `http://localhost:5173`).

### 4. Build for Production
To build the application for production, compile TypeScript, and generate the static build bundle:
```bash
npm run build
```
The production bundle will be generated inside the `dist/` directory.

---

## 🎓 Adding Your Certificates

If you obtain additional certificates, or have missing ones ready to upload (e.g. Internshala or Edunet), follow these simple steps to add them to your website:

1. **Prepare Your Image:**
   - Convert your certificate to a `.jpg` or `.png` format.
   - Resize it if needed (recommended width: `800px` to `1200px` for optimal lightbox quality).

2. **Add to the Assets Directory:**
   Drop your certificate image into the corresponding folder inside `src/assets/certificates/`:
   - **Internships:** Place them in `src/assets/certificates/internships/`
   - **Hackathons:** Place them in `src/assets/certificates/hackathons/`
   - **Courses/Certifications:** Place them in `src/assets/certificates/courses/`

3. **Rename the File:**
   Make sure the filename matches **exactly** with the path in `src/data/portfolio.json`. 
   For example, if you place the Internshala certificate as `internshala.jpg` inside `src/assets/certificates/internships/`:
   - Make sure `portfolio.json` has `"/src/assets/certificates/internships/internshala.jpg"` as the certificate value for that entry.

4. **Update Code Import (Optional for Type-safety):**
   - For internships, open `src/components/ExperienceSection.tsx` and `src/components/InternshipGallery.tsx`.
   - Add an import statement at the top: `import internshalaCert from '../assets/certificates/internships/internshala.jpg';`
   - Map it in the `certificateMap` dictionary: `"/src/assets/certificates/internships/internshala.jpg": internshalaCert`
   - Once mapped, the card will automatically swap out the dashed placeholder and display the real certificate thumbnail!
