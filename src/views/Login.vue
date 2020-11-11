<template>
  <v-card class="p-3">
    <v-card-title>Sing in</v-card-title>
    <v-card-subtitle>You have to sign in to use system functionalities.</v-card-subtitle>
    <v-card-text>
      <v-alert
          dense
          outlined
          type="error"
          v-if="errorMessage"
      >
        {{errorMessage}}
      </v-alert>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            v-model="loginForm.email"
            type="email"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            v-model="loginForm.password"
            type="password"
            label="Password"
            required
        ></v-text-field>
        <v-btn
            type="submit"
            color="primary"
            class="mr-4 mt-2"
            @click="processLogin"
        >
          Sign in
        </v-btn>

        <router-link to="/register" color="secondary" class="v-btn mr-4 mt-2">Sign up</router-link>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {LoginForm} from "@/Interfaces/LoginForm";
import {$inject} from '@vanroeybe/vue-inversify-plugin/dist/decorator';

@Component
export default class Login extends Vue {
  @$inject('AuthService') private readonly authService!: AuthService
  private loginForm: LoginForm = {email: '', password: ''};
  private valid = true;
  private errorMessage: string|null = null;

  public async processLogin(): void {
    this.errorMessage = await this.authService.login(this.loginForm);
  }
}
</script>
