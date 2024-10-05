This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Step 3: Set Up Vercel Cron Job
Go to Your Vercel Dashboard:

Navigate to your project.
Access the Settings:

Click on the Settings tab for your project.
Find the Cron Jobs Section:

In the settings sidebar, scroll down to find Cron Jobs.
Create a New Cron Job:

Click on Add Cron Job.
Fill out the form:
Name: Give your cron job a descriptive name (e.g., "Daily Expiration Check").
Schedule: Use the cron syntax to set it to run daily. For example, to run at midnight UTC, use 0 0 * * *.
Request URL: Enter the URL to your API route (e.g., https://your-vercel-app-url/api/checkExpiry).
HTTP Method: Select POST.
Save the Cron Job:

After filling out the details, click Save.
Step 4: Monitor the Cron Job
You can monitor the execution of your cron job from the Cron Jobs section in your Vercel dashboard.
Vercel will provide logs for each run, allowing you to see if the API route was called successfully.
Summary
Ensure your API route for checking expiration dates is correctly set up in your Next.js app.
Deploy your app to Vercel.
Set up a cron job in the Vercel dashboard to call your API route daily.
This setup will ensure that your application checks for expiring documents every day and sends email notifications as needed!