# 🔍 Google Search Console Setup Guide for Diamond Host

## Step 1: Go to Google Search Console
1. Open: https://search.google.com/search-console
2. Sign in with your Google account

## Step 2: Add Your Property
1. Click "Add Property"
2. Choose "URL prefix" option
3. Enter: `https://diamondhost.pk`
4. Click "Continue"

## Step 3: Verify Ownership (Choose ONE method)

### Method A: HTML Tag (Recommended - Easiest)
1. Google will give you a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   ```
2. Copy the `content` value (e.g., `abc123xyz...`)
3. Open `app/layout.tsx`
4. Find this line:
   ```typescript
   'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE_HERE',
   ```
5. Replace `YOUR_GOOGLE_VERIFICATION_CODE_HERE` with your actual code
6. Push to GitHub and wait for Vercel to deploy
7. Click "Verify" in Google Search Console

### Method B: DNS Record (If you have domain access)
1. Go to your domain registrar (e.g., Namecheap, GoDaddy)
2. Add a TXT record with the value Google provides
3. Wait 5-10 minutes
4. Click "Verify"

## Step 4: Submit Sitemap
1. After verification, go to "Sitemaps" in left menu
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Your sitemap is at: https://diamondhost.pk/sitemap.xml

## Step 5: Request Indexing
1. Go to "URL Inspection" in left menu
2. Enter your homepage URL: `https://diamondhost.pk`
3. Click "Request Indexing"
4. Repeat for important pages:
   - https://diamondhost.pk/plans
   - https://diamondhost.pk/features
   - https://diamondhost.pk/support

## 📊 SEO Features Already Implemented

### ✅ Meta Tags
- Title with keywords
- Description with keywords
- Keywords meta tag
- Open Graph tags (Facebook/LinkedIn)
- Twitter Card tags
- Canonical URL
- Robots meta

### ✅ Structured Data (JSON-LD)
- Organization schema
- Service schema
- Contact information
- Price range

### ✅ Technical SEO
- Sitemap.xml (auto-generated)
- Robots.txt
- Manifest.json (PWA)
- Mobile responsive
- Fast loading

### ✅ Keywords Targeted
- minecraft server hosting
- minecraft hosting pakistan
- game server hosting
- cheap minecraft hosting
- best minecraft hosting
- minecraft server UAE
- low latency minecraft server
- ddos protected minecraft
- premium minecraft hosting
- diamond host

## 🚀 Tips for Better Ranking

### 1. Get Backlinks
- Submit to gaming directories
- Post on gaming forums
- Create YouTube videos about your service
- Guest post on gaming blogs

### 2. Social Media
- Create Discord server (already done!)
- Post regularly on social media
- Engage with Minecraft community

### 3. Content Marketing
- Add a blog section
- Write guides about Minecraft servers
- Create tutorials

### 4. Reviews
- Ask customers for Google reviews
- Display testimonials on website

### 5. Local SEO (Pakistan)
- Register on Google Business Profile
- Add Pakistan-specific keywords
- Get listed in Pakistani directories

## 📈 Monitor Performance
1. Check Google Search Console weekly
2. Look at:
   - Total clicks
   - Impressions
   - Average position
   - Click-through rate (CTR)

## ⏰ Timeline
- Verification: Instant to 24 hours
- Sitemap processing: 1-3 days
- First indexing: 1-7 days
- Ranking improvements: 2-4 weeks
- Full SEO impact: 2-3 months

## 🆘 Need Help?
Contact support@diamondhost.pk or join Discord: https://discord.gg/tKDRWYNcuE
