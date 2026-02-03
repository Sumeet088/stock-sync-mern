import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AuthModal from "./components/Auth/AuthModal";
import StockSearch from "./components/Stock/StockSearch";
import ChatWindow from "./components/Chat/ChatWindow";

function App() {
  return (
    <>
      <AuthModal />
      <Header />

      <main className="max-w-6xl mx-auto p-4 space-y-8">
        <StockSearch />
        <ChatWindow />
      </main>

      <Footer />
    </>
  );
}

export default App;
