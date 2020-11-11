<template>
  <v-card class="p-3">
    <v-card-title>Sing up</v-card-title>
    <v-card-subtitle>Fill this form to sign up.</v-card-subtitle>
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
            v-model="registerForm.email"
            type="email"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            v-model="registerForm.firstName"
            label="First name"
            required
        ></v-text-field>

        <v-text-field
            v-model="registerForm.lastName"
            label="First name"
            required
        ></v-text-field>

        <v-text-field
            v-model="registerForm.password"
            type="password"
            label="Password"
            required
        ></v-text-field>
        <v-btn
            type="submit"
            color="primary"
            class="mr-4 mt-2"
            @click="processRegister"
        >
          Sign up
        </v-btn>
        <router-link to="/login" color="secondary" class="v-btn mr-4 mt-2">Sign in</router-link>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {RegisterForm} from "@/Interfaces/RegisterForm";
import {$inject} from '@vanroeybe/vue-inversify-plugin/dist/decorator';

@Component
export default class Register extends Vue {
  @$inject('AuthService') private readonly authService!: AuthService
  private registerForm: RegisterForm = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };
  private valid = true;
  private errorMessage: string|null = null;

  public async processRegister() {
    this.errorMessage = await this.authService.register(this.registerForm);
  }
}
</script>
