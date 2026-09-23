CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  company TEXT,
  website TEXT,
  source TEXT DEFAULT 'other',
  service TEXT DEFAULT 'not_decided',
  budget TEXT DEFAULT 'not_shared',
  status TEXT DEFAULT 'new',
  audit_domain TEXT,
  audit_score INTEGER,
  audit_issues INTEGER,
  deal_value INTEGER DEFAULT 0,
  next_action TEXT,
  next_action_date TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS visitors (
  visitor_id TEXT PRIMARY KEY,
  first_visit TEXT DEFAULT (datetime('now')),
  last_visit TEXT DEFAULT (datetime('now')),
  total_visits INTEGER DEFAULT 1,
  total_tools INTEGER DEFAULT 0,
  total_guides INTEGER DEFAULT 0,
  engagement_score INTEGER DEFAULT 0,
  is_lead INTEGER DEFAULT 0,
  lead_id TEXT,
  country TEXT DEFAULT 'IN',
  device TEXT DEFAULT 'desktop',
  referrer TEXT
);

CREATE TABLE IF NOT EXISTS tool_uses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool TEXT NOT NULL,
  visitor_id TEXT,
  input TEXT,
  result TEXT,
  duration INTEGER,
  converted INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ctf_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id INTEGER NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page TEXT NOT NULL,
  visitor_id TEXT,
  scroll_depth INTEGER,
  time_on_page INTEGER,
  clicks INTEGER DEFAULT 0,
  tool_clicked TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT,
  score INTEGER,
  total INTEGER DEFAULT 10,
  rank TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_tool_uses_tool ON tool_uses(tool, created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page, created_at);
CREATE INDEX IF NOT EXISTS idx_ctf_visitor ON ctf_submissions(visitor_id);
