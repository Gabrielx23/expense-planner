<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" width="100%" height="100%">
      <v-app-bar
          color="deep-purple accent-4"
          dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        Expense planner
      </v-app-bar>
      <v-system-bar color="deep-purple darken-3"></v-system-bar>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
      >
        <v-list
            nav
            dense
        >
          <Menu></Menu>
        </v-list>
      </v-navigation-drawer>

      <v-card-text>
        <router-view/>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from "@/components/Menu.vue";

export default Vue.extend({
  name: 'App',

  components: {
    Menu
  },

  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
});
</script>
