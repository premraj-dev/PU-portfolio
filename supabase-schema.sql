-- Add new columns to support the new card design
alter table projects add column if not exists status text default 'Completed';
alter table projects add column if not exists category text default 'ML/AI';
alter table projects add column if not exists project_date text;
alter table projects add column if not exists rating numeric default 0;
alter table projects add column if not exists ratings_count integer default 0;
alter table projects add column if not exists gallery text[] default '{}';

-- Insert your 3 projects (safe to run even if some already exist — this uses upsert on title)
insert into projects (title, description, tech_stack, github_url, project_url, status, category, featured)
values
(
  'TrustShield AI',
  'AI-powered identity verification & fraud detection platform. OCR, facial verification, fraud analysis, document validation, audit tracking.',
  array['Python','FastAPI','ML','OCR','Computer Vision','PostgreSQL','JWT'],
  null, null,
  'In Development', 'ML/AI', false
),
(
  'NutriCore AI',
  'ML-powered nutrition engine that predicts personalized daily targets — calories, macros, water intake, and nutrient priorities — using 9 GradientBoostingRegressor models trained on physiologically accurate formulas (Mifflin-St Jeor BMR, ACSM activity multipliers, ISSN protein guidelines).',
  array['Python','Flask','Scikit-Learn','Pandas','NumPy','GradientBoosting'],
  null, null,
  'Completed', 'ML/AI', true
),
(
  'Crypto Price Prediction System',
  'ML-based crypto forecasting using historical market data and predictive analytics.',
  array['Python','Scikit-Learn','Pandas','NumPy','Data Analytics'],
  null, null,
  'Completed', 'ML/AI', false
)
on conflict do nothing;