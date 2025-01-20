import io from "socket.io-client";
import { BASE_URL } from "./constants";
import Cookies from "js-cookie";


export const createSocketConnection = () => {
     const token = Cookies.get("token");
     return io(BASE_URL, {
          auth: {
               token: token
             }
     });
}
