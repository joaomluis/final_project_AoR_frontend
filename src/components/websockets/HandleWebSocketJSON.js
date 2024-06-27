import { tsuccess, twarn, tinfo, tdefault } from "../toasts/message-toasts";
import MessageType from "./MessageType";
import { useUserStore } from "../../stores/useUserStore";

function handleWebSocketJSON(json) {
  const userStore = useUserStore.getState();

  let data;
  try {
    data = JSON.parse(json);
  } catch (e) {
    console.error("Erro ao fazer parse do JSON", json);
    return;
  }

  switch (data.type) {
    case MessageType.EMAIL_INVITE_SEND:
      tsuccess("Convite enviado");
      break;
    case MessageType.EMAIL_INVITE_RECEIVER:
      tinfo("Convite recebido");
      break;
    case MessageType.EMAIL_RESPONSE_FROM:
      tinfo("Resposta enviada");
      break;
    case MessageType.EMAIL_RESPONSE_TO:
      // tinfo("Resposta recebida");
      break;
    case MessageType.EMAIL_SEND_TO:
      // tinfo("Email recebido");
      handleReceivedMail(data);
      break;
    case MessageType.EMAIL_SEND_FROM:
      break;
    case MessageType.EMAIL_DELETE:
      tinfo("Email Eliminado");
      break;

    case "error":
      console.error("Erro recebido", data);
      break;
    default:
      console.error("Tipo desconhecido, ou não contem type", data);
  }

  function handleReceivedMail(data) {
    console.log(data);
    userStore.addMail();
  }
}
export { handleWebSocketJSON };
