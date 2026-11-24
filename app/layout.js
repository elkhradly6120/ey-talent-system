import "./globals.css";

export const metadata = {
  title: "مواهب فريق شباب مصر",
  description: "منصة اكتشاف واستقطاب وتطوير المواهب - فريق شباب مصر"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
