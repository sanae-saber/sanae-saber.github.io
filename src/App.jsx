import { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Parcours from "./pages/Parcours";
import Contact from "./pages/Contact";

function App() {
  const [currentPage, setCurrentPage] = useState("accueil");

  const renderPage = () => {
    switch (currentPage) {
      case "accueil":
        return <Home />;
      case "parcours":
        return <Parcours />;
      case "contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-grow">{renderPage()}</main>

      <Footer />
    </div>
  );
}

export default App;
