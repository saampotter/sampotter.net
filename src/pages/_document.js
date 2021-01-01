import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class NextSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="language" content="en" />
          <meta name="author" content="Sam Potter" />
          <meta name="robots" content="follow, all" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:url" content="https://sampotter.me/" />
          <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link
            rel="preload"
            href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta
            property="og:description"
            content="Hey, I'm Sam Potter. I’m a full-stack web developer from Melbourne, currently working part-time at Retail Safari. On my off days, I'm available for freelance web development, design, and consultation, so feel free to get in touch."
          />
          <meta
            name="description"
            content="Hey, I'm Sam Potter. I’m a full-stack web developer from Melbourne, currently working part-time at Retail Safari. On my off days, I'm available for freelance web development, design, and consultation, so feel free to get in touch."
          />
          <meta
            name="keywords"
            content="Sam Potter Web Developer, Melbourne Developer, Website Builder Melbourne, Sam Potter, Sam Potter Melbourne, Sam Potter Developer"
          />
        </Head>
        <body className="bg-white dark:bg-black">
          <Main />
          <NextScript />
          <script async data-api="/_hive" src="/bee.js"></script>
        </body>
      </Html>
    );
  }
}