export const isAdmin = () => {
    if(!!localStorage.getItem('user')){
        let user = JSON.parse(localStorage.getItem('user'))
        if(user.type === "admin") return true
    }
    return false;
}

export const isUser = () => {
    if(!!localStorage.getItem('user')){
        let user = JSON.parse(localStorage.getItem('user'))
        if(user.type === "user") return true
    }
    return false;
}

export function isLogin() {
    return  !!localStorage.getItem('user');
}

export function getRedirectPath() {
    if(!!localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user.type === "user") return '/quiz';
        return '/question';
    }
}