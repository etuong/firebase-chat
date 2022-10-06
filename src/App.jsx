import ChatRoom from "./chat/ChatRoom";
import Authentication from "./chat/Authentication";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <>
      <h1>💬 Chat Room</h1>
      {user ? <ChatRoom /> : <Authentication />}
    </>
  );
}

export default App;
