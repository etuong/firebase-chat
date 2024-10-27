import ChatRoom from "./chat/ChatRoom";
import Authentication from "./chat/Authentication";
import useAuth from "./hooks/useAuth";
import { useMemo } from "react";

function App() {
  const { user } = useAuth();

  return useMemo(() => {
    return <>{user ? <ChatRoom /> : <Authentication />}</>;
  }, [user]);
}

export default App;
