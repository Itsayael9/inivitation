import type { Metadata } from "next";
import { Amiri, Aref_Ruqaa, Cairo, Great_Vibes, Marhey } from "next/font/google";
import { COUPLE_DISPLAY } from "@/lib/wedding";
import "./globals.css";

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const arefRuqaa = Aref_Ruqaa({
  variable: "--font-ruqaa",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const marhey = Marhey({
  variable: "--font-marhey",
  subsets: ["arabic"],
  weight: ["300", "400"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `دعوة زفاف | ${COUPLE_DISPLAY}`,
  description: "يسعدنا ويشرفنا أن ندعو حضرتكم الكريمة لمشاركتكم فرحة حفل زفافنا",
  openGraph: {
    title: `دعوة زفاف | ${COUPLE_DISPLAY}`,
    description: "يسعدنا ويشرفنا أن ندعو حضرتكم الكريمة لمشاركتكم فرحة حفل زفافنا",
    type: "website",
    locale: "ar_AR",
    siteName: "دعوة زفاف",
    images: [
      {
        url: "/images/couple.png",
        width: 1200,
        height: 1200,
        alt: "Invitation preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `دعوة زفاف | ${COUPLE_DISPLAY}`,
    description: "يسعدنا ويشرفنا أن ندعو حضرتكم الكريمة لمشاركتكم فرحة حفل زفافنا",
    images: ["/images/couple.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${arefRuqaa.variable} ${cairo.variable} ${greatVibes.variable} ${marhey.variable} h-full antialiased`}
    >
      <body className="min-h-full paper-bg text-ink font-body">{children}</body>
    </html>
  );
}
