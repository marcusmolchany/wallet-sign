import { Web3Container } from "./components/Web3Container";
import { Header } from "./components/Header";
import { SignatureForm } from "./components/SignatureForm";
import "./App.css";

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
