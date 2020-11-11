<template>
  <v-card class="p-3">
    <v-card-title>Add prediction</v-card-title>
    <v-card-subtitle>Fill this form to add new expense prediction.</v-card-subtitle>
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
          lazy-validation
      >
        <v-text-field
            v-model="addPredictionForm.name"
            label="Name"
            required
        ></v-text-field>

        <v-text-field
            v-model="addPredictionForm.prediction"
            type="number"
            label="Prediction"
            required
        ></v-text-field>
        <v-btn
            type="submit"
            color="primary"
            class="mr-4 mt-2"
            @click="addPrediction"
        >
          Add
        </v-btn>
        <router-link to="/dashboard" color="secondary" class="v-btn mr-4 mt-2">Back</router-link>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {$inject} from '@vanroeybe/vue-inversify-plugin/dist/decorator';
import {AddPredictionForm} from "@/Interfaces/AddPredictionForm";
import router from "@/router";

@Component
export default class AddPrediction extends Vue {
  @$inject('ExpensesPredictionsService') private readonly expensesPredictionsService!: ExpensesPredictionsService
  private errorMessage: string|null = null;
  private addPredictionForm: AddPredictionForm = {
    actual: 0,
    name: '',
    prediction: 0,
    userId: undefined
  };

  public async addPrediction() {
    this.errorMessage = await this.expensesPredictionsService.addPrediction(this.addPredictionForm);

    if (!this.errorMessage) {
      await router.push('/dashboard');
    }
  }
}
</script>
