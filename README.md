# Diamond Host - Premium Minecraft Hosting

Pakistan's first premium Minecraft hosting service with high-performance UAE servers and 24/7 support.

## Features

- 🚀 **High-Performance UAE Servers** - Enterprise-grade hardware for optimal gaming
- ⚡ **Instant Setup** - Get your server running in under 60 seconds
- 🛡️ **DDoS Protection** - Advanced security measures
- 🌍 **Global Network** - Optimized routing for worldwide players
- 🎧 **24/7 Expert Support** - Dedicated team always ready to help
- ⏰ **99.9% Uptime** - Reliable infrastructure with redundancy

## Hosting Plans

- **Silver Plan** - 2GB RAM, 100% Performance - 240 PKR/month
- **Gold Plan** - 4GB RAM, 150% Performance - 480 PKR/month
- **Diamond Plan** - 8GB RAM, 250% Performance - 960 PKR/month
- **Platinum Plan** - 10GB RAM, 300% Performance - 1200 PKR/month

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase
- **Deployment**: Vercel
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd diamond-host
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## Supabase Setup (Optional)

If you want to use the database features:

1. Create tables in Supabase:

```sql
-- Hosting Plans
CREATE TABLE hosting_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ram TEXT NOT NULL,
  performance TEXT NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT DEFAULT 'PKR',
  features TEXT[] DEFAULT '{}',
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  plan_id UUID REFERENCES hosting_plans(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

2. Insert sample data:

```sql
INSERT INTO hosting_plans (name, ram, performance, location, price, popular) VALUES
('Silver Plan', '2GB RAM', '100% Performance', 'UAE', 240, false),
('Gold Plan', '4GB RAM', '150% Performance', 'UAE', 480, true),
('Diamond Plan', '8GB RAM', '250% Performance', 'UAE', 960, false),
('Platinum Plan', '10GB RAM', '300% Performance', 'UAE', 1200, false);
```

## Support

For support and inquiries, join our Discord: [https://discord.gg/tKDRWYNcuE](https://discord.gg/tKDRWYNcuE)

## License

This project is proprietary software for Diamond Host.