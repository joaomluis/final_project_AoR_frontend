import { tsuccess, twarn, tinfo, tdefault } from "../toasts/message-toasts";
import NotificationType from "./NotificationType";
import { useUserStore } from "../../stores/useUserStore";
import useMessageStore from "../../stores/useMessageStore";
function handleWebSocketJSON(json) {
  const userStore = useUserStore.getState();
  const messageStore = useMessageStore.getState();
  let data;
  try {
    data = JSON.parse(json);
  } catch (e) {
    console.error("Erro ao fazer parse do JSON", json);
    return;
  }
  console.log(data);

  switch (data.type) {
    case NotificationType.NOTIFICATION:
      tinfo("new notification!");
      handleNewNotification(data);
      console.log("data", data.notificationType);
      break;
    case NotificationType.MESSAGE:
      messageStore.addMessage(data);
      if (messageStore.activeTab !== "1") {
        useMessageStore.getState().setHasNewItems(true);
      }

      break;

    default:
      console.error("Tipo desconhecido, ou não contem type", data);
  }

  function handleNewNotification(data) {
    switch (data.notificationType) {
      case NotificationType.NEW_MAIL:
        userStore.addNotification(data);
        userStore.updateUnreadNotifications(userStore.unreadNotifications + 1);
        userStore.updateUnreadEmails(userStore.unreadEmails + 1);
        break;

      case NotificationType.INVITE:
        userStore.addNotification(data);
        userStore.updateUnreadEmails(userStore.unreadEmails + 1);
        userStore.updateUnreadNotifications(userStore.unreadNotifications + 1);
        break;

      case NotificationType.LOGOUT:
        userStore.logout();
        tsuccess("logout");
        break;

      case NotificationType.PROJECT_MESSAGE:
        console.log("data", data);
        userStore.addNotification(data);
        userStore.updateUnreadNotifications(userStore.unreadNotifications + 1);
        break;
      default:
        console.error("Tipo de notificação desconhecido", data);
    }
  }
}
export { handleWebSocketJSON };
