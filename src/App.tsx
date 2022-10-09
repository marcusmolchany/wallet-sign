import { Web3Container } from "./components/Web3Container";
import { Header } from "./components/Header";
import { SignatureForm } from "./components/SignatureForm";
import "./App.css";

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  return (
    <Web3Container>
      <main>
        <Header />
        <SignatureForm />
      </main>
    </Web3Container>
  );
}

export default App;
