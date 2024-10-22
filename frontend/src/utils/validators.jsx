import Cookies from "js-cookie";
export const validateUserAuth = () => {
    
    const token = Cookies.get('token');
    if (!token) {
        return false;
    }else{
        return true;
    }
}