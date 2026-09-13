# Sanj's Planner

A personal weekly planner — college classes, work shifts, routine, and meals.
Static site, no build step, no dependencies. Data is saved in the browser via
`localStorage`, so it's per-device/browser (clearing browser data clears it).

## Deploy to Vercel

**Option 1 — CLI (fastest)**
```
npm i -g vercel
cd sanjs-planner
vercel --prod
```

**Option 2 — Drag and drop**
Go to https://vercel.com/new, drag this folder onto the page, deploy.

**Option 3 — GitHub**
Push this folder to a new GitHub repo, then "Import Project" at
https://vercel.com/new and point it at the repo. No framework preset needed
("Other" / static works fine).

## After deploying

Bookmark the URL, or on mobile use "Add to Home Screen" for quick access —
it behaves like a small app.
