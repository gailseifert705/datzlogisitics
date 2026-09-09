# Datz Logistics

Custom Next.js website for Datz Logistics.

## Stack
- Next.js / React
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Three.js
- Resend contact form
- Vercel-ready
- SEO metadata + sitemap + robots.txt

## Pages
- `/` Home
- `/about` About Us
- `/contact` Contact Us
- `/api/contact` Server-side form email endpoint

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Make the contact form send real email locally

1. Create or use the same Resend account used for DEG.
2. Create a Resend API key.
3. Copy `.env.example` to `.env.local`.
4. Fill in:

```env
RESEND_API_KEY=re_your_real_key
CONTACT_TO_EMAIL=inquiries@datzlogistics.com
CONTACT_FROM_EMAIL=Datz Logistics Website <onboarding@resend.dev>
```

5. Stop the local dev server if it is running.
6. Start it again:

```bash
npm run dev
```

7. Submit the Contact Us form.

### Important local Resend limitation
`onboarding@resend.dev` is mainly for testing. Depending on the Resend account, test mail may only be allowed to the email address associated with that Resend account.

## Production email setup — same pattern as DEG

1. In Resend, add `datzlogistics.com` as a sending domain.
2. Resend will provide DNS records for SPF/DKIM/domain verification.
3. Add those exact records inside GoDaddy DNS.
4. **Do not delete or replace the Google Workspace MX records.**
5. Wait until Resend shows the domain as Verified.
6. In Vercel > Project > Settings > Environment Variables, add:

```env
RESEND_API_KEY=re_your_real_key
CONTACT_TO_EMAIL=inquiries@datzlogistics.com
CONTACT_FROM_EMAIL=Datz Logistics Website <website@datzlogistics.com>
```

7. Redeploy the project.

The sender address `website@datzlogistics.com` does not need to be the user's reply destination. The form uses the visitor's email as `replyTo`, so Gail/client can simply click Reply in Gmail.

## Deploy to Vercel

1. Upload this project to a GitHub repository.
2. In Vercel, choose **Add New > Project**.
3. Import the GitHub repository.
4. Vercel should detect **Next.js** automatically.
5. Add the Resend environment variables before final production testing.
6. Click **Deploy**.
7. Go to **Project Settings > Domains**.
8. Add:
   - `datzlogistics.com`
   - `www.datzlogistics.com`
9. Vercel will show the exact DNS records to add in GoDaddy.
10. In GoDaddy, change only the web-hosting DNS records Vercel requests.
11. Keep Google Workspace MX/TXT records intact.
12. Return to Vercel and wait for domain verification + SSL.

## Before final launch

Update `data/site.js` with:
- confirmed phone
- confirmed service area
- exact courier services Gail/client wants listed

The website intentionally says “15+ years of courier experience,” not “Datz Logistics has been in business for 15+ years.”
