import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Vazirmatn } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import enMessages from "../../../messages/en.json";
import frMessages from "../../../messages/fr.json";
import faMessages from "../../../messages/fa.json";

const messagesMap = { en: enMessages, fr: frMessages, fa: faMessages };
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: {
    default: "Maryam & Michael",
    template: "%s | Maryam & Michael",
  },
  description:
    "Adventures in motion, memories in light — a travel journal by Maryam & Michael.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Explicitly set the locale for all nested server components in this request.
  // This is the next-intl v4 way to ensure translations work regardless of
  // whether middleware headers were forwarded (e.g. during RSC navigation).
  setRequestLocale(locale);

  const messages = messagesMap[locale as keyof typeof messagesMap];
  const isRtl = locale === "fa";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${geist.variable} ${cormorant.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
