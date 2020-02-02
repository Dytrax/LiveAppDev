import CONFIG from '../../config/config'

const URL_GET_ARTIST = `${CONFIG.URL_BASE}/artists/search?`
import { showMessage, hideMessage } from "react-native-flash-message";
class alertApi {
     postMessage(message, title, type) {
        showMessage({
            message: title,
            description: message,
            type: type,
            backgroundColor: "#FFAD18",
          });
    }
}

export default new alertApi()