import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SignatureForm } from "./components/SignatureForm";
import { Web3Container } from "./components/Web3Container";
import "./App.css";

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  return (
    <Web3Container>
      <main>
        <Header />
        <SignatureForm />
        <Footer />
      </main>
    </Web3Container>
  );
}

export default App;
