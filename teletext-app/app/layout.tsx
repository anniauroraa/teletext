// import "./styles/globals.css";

export const metadata = {
  title: "Teletext favorites",
  description: "Teletext viewer, save your favorites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
