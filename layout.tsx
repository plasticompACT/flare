
export const metadata = {
  title: "Flare — Microsite",
  description: "Create and run your ritual.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-zinc-900">{children}</body>
    </html>
  );
}
