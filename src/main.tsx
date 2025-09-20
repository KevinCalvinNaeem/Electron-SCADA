import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Hide loading screen once React is ready
const hideLoadingScreen = () => {
  const loadingScreen = document.querySelector('.loading-screen') as HTMLElement;
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 300);
  }
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Hide loading screen after a brief delay to ensure smooth transition
setTimeout(hideLoadingScreen, 100);
