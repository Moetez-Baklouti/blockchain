import "./globals.css";

export const metadata = {
  title: "Blockchain",
  description: "Blockchain app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
