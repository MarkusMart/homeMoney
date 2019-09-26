export class AuthService{
    private isAunthenticated = false;

    login(){
        this.isAunthenticated = true;
    }
    logout(){
        this.isAunthenticated = false;
        window.localStorage.clear();
    }
    isLoggedIn(): boolean{
        return this.isAunthenticated;
    }
}