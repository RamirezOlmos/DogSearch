import LikeContextProvider from "@/contexts/LikeContext";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function DogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      <NavBar />
      <LikeContextProvider>{children}</LikeContextProvider>
      <Footer />
    </section>
  );
}
