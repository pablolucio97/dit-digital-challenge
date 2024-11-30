import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes";
import "./styles/globals.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-full bg-gray-100">
        <AppRouter />
      </div>
    </QueryClientProvider>
  );
}

export default App;
