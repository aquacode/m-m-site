// Minimal root layout required by Next.js.
// The actual <html> / <body> and all providers live in [locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
