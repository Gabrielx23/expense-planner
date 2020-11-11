<template>
  <v-container>
    <v-list-item-group
        active-class="deep-purple--text text--accent-4"
        v-if="user"
    >
      <v-list-item>
        <v-list-item-title @click="logout">Logout</v-list-item-title>
      </v-list-item>
    </v-list-item-group>

    <v-list-item-group
        active-class="deep-purple--text text--accent-4"
        v-else
    >
      <v-list-item>
        <v-list-item-title>
          <router-link to="/register" class="v-btn">Register</router-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>
          <router-link to="/login" class="v-btn">Login</router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {$inject} from "@vanroeybe/vue-inversify-plugin/dist/decorator";
import firebase from "firebase";
import User = firebase.User;
import {auth} from "@/plugins/firebase";

@Component
export default class Menu extends Vue {
  @$inject('AuthService') private readonly authService!: AuthService
  private user: User | null = null;

  public async logout(): void {
    await this.authService.logout();
  }

  public async mounted(): void {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }
}
</script>
