import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./components/theme/theme-provider";
import { TodoList } from "./components/todo/TodoList";
import { Toaster } from "sonner";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { useAppSelector } from "./hooks/useAppSelector";

function AppContent() {
  const theme = useAppSelector((state) => state.theme.theme);
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Todo App
          </h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <TodoList />
      </main>
      <Toaster 
        richColors 
        position="bottom-right" 
        theme={currentTheme}
        closeButton
        expand={false}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
