# 🚀 Setup Guide — Jhon Rey's Portfolio

This is a **standalone project**, completely separate from your TestOps Hub. It has its own repo, its own Netlify site, and its own Supabase project.

Follow these in order. Total time: ~20 minutes.

---

## 0. Run it locally first (2 min)

```bash
cd C:\Users\Asus\Desktop\PROJECTS\portfolio
npm install
npm run dev
```

Open **http://localhost:5180**. The site works fully **without** Supabase — the contact form falls back to opening your email app, and the visitor counter simply hides. Set up Supabase (Step 2) whenever you want the real backend.

---

## 1. GitHub — put the code online

You'll create an empty repo on GitHub, then push this folder to it.

### 1a. Create the repo
1. Go to **https://github.com/new**
2. **Repository name:** `portfolio` (or `jhonrey-portfolio`)
3. Visibility: **Public** (recommended — recruiters can see it) or Private
4. **Do NOT** check "Add a README / .gitignore / license" — this folder already has them
5. Click **Create repository**

### 1b. Push your code
GitHub will show you a URL like `https://github.com/YOUR-USERNAME/portfolio.git`. Copy it, then run:

```bash
cd C:\Users\Asus\Desktop\PROJECTS\portfolio
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

> I've already run `git init` and made your first commit, so these three commands are all you need. If Git asks you to sign in, use the browser popup (GitHub credential manager).

Refresh your GitHub repo page — your code is now there. ✅

---

## 2. Supabase — the contact form + visitor counter

### 2a. Create the project
1. Go to **https://supabase.com** → sign in (GitHub login is easiest)
2. **New project** → name it `portfolio`, pick a strong database password (save it), choose the region closest to you (**Southeast Asia (Singapore)**)
3. Wait ~2 min for it to provision

### 2b. Create the tables
1. In the left sidebar: **SQL Editor** → **New query**
2. Open the file `supabase/schema.sql` from this project, copy **everything**, paste it in
3. Click **Run** (bottom right)
4. You should see "Success. No rows returned." ✅

This creates:
- `contact_messages` — where form submissions land (private; only you can read them in the dashboard)
- `page_views` + a `bump_page_view()` function — the visitor counter

### 2c. Get your keys
1. Sidebar: **Project Settings** (gear) → **API**
2. Copy two values:
   - **Project URL** → e.g. `https://abcdxyz.supabase.co`
   - **Project API keys → `anon` `public`** → a long string starting `eyJ...`

> ⚠️ Only ever use the **anon** key in this project. **Never** the `service_role` key — it's a secret and must never touch the browser.

### 2d. Wire it up locally
Create a file named `.env` in the project root (copy `.env.example`), and fill in:

```
VITE_SUPABASE_URL=https://abcdxyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key
```

Restart `npm run dev`. The contact form now saves to your database, and the visitor counter appears in the footer.

### 2e. Read your messages
Anytime someone messages you: Supabase dashboard → **Table Editor** → `contact_messages`.

---

## 3. Netlify — deploy it live

### 3a. Connect the repo
1. Go to **https://app.netlify.com** → sign in (GitHub login)
2. **Add new site** → **Import an existing project** → **GitHub**
3. Authorize Netlify, then pick your `portfolio` repo
4. Netlify auto-detects the settings from `netlify.toml` (build `npm run build`, publish `dist`). Leave them as-is.
5. **Before clicking Deploy**, open **"Add environment variables"** and add the same two keys:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
6. Click **Deploy**

In ~1 minute you'll get a live URL like `https://portfolio-jhonrey.netlify.app`.

### 3b. (Optional) custom domain
Site settings → **Domain management** → add a domain you own, or rename the free `.netlify.app` subdomain to something clean.

### 3c. Auto-deploy
Every time you `git push`, Netlify rebuilds and redeploys automatically. No extra steps.

---

## 4. Making it yours

All your text lives in **one file**: `src/content/profile.js`. Edit it, save, and the site updates.

| Want to change... | Do this |
|---|---|
| **Your photo** | Drop a `portrait.jpg` into `public/`, then in `src/components/About.jsx` follow the commented `<img>` line |
| **Any wording** | Edit `src/content/profile.js` |
| **Add your GitHub** | Set the `github:` field in `profile.js` — the button appears automatically |
| **Accent colors** | Edit `--violet` / `--cyan` in `src/index.css` (`:root`) |
| **Projects / modules** | Edit the `modules` and `projects` arrays in `profile.js` |

---

## Quick reference

```bash
npm run dev       # local dev at http://localhost:5180
npm run build     # production build into /dist
npm run preview   # preview the production build locally
git push          # deploy (Netlify auto-builds)
```

Questions? Everything is intentionally simple — one content file, one stylesheet of tokens, and small components. 🎯
