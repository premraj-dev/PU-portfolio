# Adding an admin-managed Projects feature to your portfolio

This gives you a `/admin` login page and a `/admin/dashboard` page where you add
projects through a form — they show up instantly on your live portfolio, no
redeploy needed.

## 1. Create a Supabase project

1. Go to https://supabase.com → sign up → **New project**
2. Wait for it to finish provisioning (~2 min)
3. In the sidebar, go to **SQL Editor** → **New query**
4. Paste the contents of `supabase-schema.sql` (included here) → **Run**
   This creates your `projects` table with the right security rules.

## 2. Create your admin user

1. In Supabase, go to **Authentication** → **Users** → **Add user**
2. Enter the email/password you want to log in with (this is YOUR login,
   not for public signup)
3. Leave "Auto Confirm User" checked

## 3. Get your API keys

1. In Supabase, go to **Settings** → **API**
2. Copy the **Project URL** and the **anon/public key**

## 4. Install the Supabase package

In your project folder:
```
npm install @supabase/supabase-js react-router-dom
```
(skip `react-router-dom` if you already have routing set up)

## 5. Add environment variables

Create a `.env` file in your project root (same level as `package.json`):
```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
Add `.env` to your `.gitignore` if it isn't already there.

## 6. Copy these files into your project

```
src/lib/supabaseClient.js       -> src/lib/supabaseClient.js
src/lib/useAuth.js              -> src/lib/useAuth.js
src/pages/AdminLogin.jsx        -> src/pages/AdminLogin.jsx
src/pages/AdminDashboard.jsx    -> src/pages/AdminDashboard.jsx
src/components/ProtectedRoute.jsx -> src/components/ProtectedRoute.jsx
src/components/ProjectsSection.jsx -> src/components/ProjectsSection.jsx (or merge into your existing Projects section)
```

## 7. Wire up the routes

In your main `App.jsx` (or router file):

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
// ... your existing imports (Home, ProjectsSection, etc.)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

Then in wherever your portfolio currently renders its projects grid, swap it
for (or merge it with) `<ProjectsSection />`.

## 8. Add the same env vars to Vercel

1. Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the same values
3. Redeploy

## 9. Try it

- Visit `yoursite.com/admin`, log in with the user you created in step 2
- Add a project through the form
- Check your homepage — it should appear immediately

## Notes

- Only you can log in — there's no public sign-up page, so this stays private.
- Row Level Security (set up by the SQL script) means only logged-in users can
  add/edit/delete, but anyone can view — exactly what you want for a portfolio.
- Want image uploads instead of pasting URLs? Supabase also has file **Storage**
  — say the word and I'll add an upload field to the form.
