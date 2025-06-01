import "../styles/globals.css";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "EHB Dashboard",
  description: "EHB Technologies Next.js Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-56 min-h-screen">{children}</div>
      </body>
    </html>
  );
} 