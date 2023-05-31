import AllRouter from "./Router/AllRouter";
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <ToastProvider>
     <AllRouter />
    </ToastProvider>
  );
}

export default App;
