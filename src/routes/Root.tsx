import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Web3Container } from "../components/Web3Container";

export function Root() {
  return (
    <Web3Container>
      <main className="app_main">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </Web3Container>
  );
}
