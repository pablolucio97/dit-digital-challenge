import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "react-modal";
import { Toaster } from "./components/ui/toaster";
import AppRouter from "./routes";
import "./styles/globals.css";

const queryClient = new QueryClient();

Modal.setAppElement("#root");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-full bg-gray-100">
        <AppRouter />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
