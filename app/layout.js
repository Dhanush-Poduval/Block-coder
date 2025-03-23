
import StarsCanvas from "@/components/main/Stars";
import "./globals.css";



export const metadata = {
  title: "Block Coder",
  description: "Landing Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        
        {children}
      </body>
    </html>
  );
}
