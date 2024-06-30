import { useEffect, useState } from "react";
import { terror } from "./components/toasts/message-toasts";
import { handleWebSocketJSON } from "./components/websockets/HandleWebSocketJSON";
import { webSocketStore } from "./stores/useWebSocketStore";

function WebSocketProvider({ children, token }) {
  console.log("WebSocketProvider");
  const { setSocket } = webSocketStore();
  const [connected, setConnected] = useState(false);
  console.log("connected", connected);
  useEffect(() => {
    if (!token) {
      return;
    }
    const ws = new WebSocket("wss://localhost:8443/innovationLab/websocket/notifier/" + token);

    ws.onopen = function (e) {
      console.log("Conexão WebSocket aberta");
    };

    ws.onmessage = function (e) {
      handleWebSocketJSON(e.data);
    };

    ws.onerror = function (e) {
      terror("Erro websocket");
    };

    ws.send = function (e) {
      if (this.readyState === WebSocket.OPEN) {
        console.log("Enviando mensagem: " + e);
        WebSocket.prototype.send.call(this, e);
      } else {
        console.error("WebSocket is not open.");
      }
    };

    ws.onclose = function (e) {
      console.log(Date());
      if (e.code !== 1000) {
        let times = 0;
        setTimeout(() => {
          console.log("Tentando reconectar: " + times++ + "'x");
          setConnected(!connected);
        }, 1000); // Tenta reconectar a cada 1 segundos
      }
    };

    setSocket(ws);
    // Limpeza ao desmontar
    return () => ws.close();
  }, [token, setSocket, connected]);

  return children;
}

export default WebSocketProvider;
