import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../../components/ScrollToTop";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop/>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;