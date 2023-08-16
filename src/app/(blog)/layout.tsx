import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
