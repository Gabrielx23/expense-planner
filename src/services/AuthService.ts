import {auth} from "@/plugins/firebase";
import firebase from "firebase";
import {injectable} from 'inversify';
import Auth = firebase.auth.Auth;
import {LoginForm} from "@/Interfaces/LoginForm";
import {RegisterForm} from "@/Interfaces/RegisterForm";
import router from "@/router";

@injectable()
export class AuthService {
    private auth: Auth = auth;

    public getLoggedUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    public async logout(): Promise<void> {
        await this.auth.signOut();

        await router.push('/login');
    }

    public async login(form: LoginForm): Promise<void|string> {
        try {
            await this.auth.signInWithEmailAndPassword(form.email, form.password);
        } catch (e) {
            return e.message;
        }

        await router.push('/dashboard');
    }

    public async register(form: RegisterForm): Promise<void|string> {
        try {
            await this.auth.createUserWithEmailAndPassword(form.email, form.password)
        } catch (e) {
            return e.message;
        }

        await router.push('/dashboard');
    }
}