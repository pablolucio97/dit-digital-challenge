import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes";
import "./styles/globals.css";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

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
