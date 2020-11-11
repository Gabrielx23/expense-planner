<template>
  <v-container>
    <router-link to="/predictions/add" color="primary" class="v-btn mr-4 mt-2 mb-3">Add prediction</router-link>

    <v-data-table
        :headers="headers"
        :items="expensesPredictions"
        :items-per-page="5"
        class="elevation-1"
    >
      <template v-slot:item.balance="{ item }">
        <v-chip
            :color="calculateBalance(item) > 0 ? 'success' : 'red'"
            dark
        >
          {{ calculateBalance(item) }}
        </v-chip>
      </template>

      <template v-slot:item.actual="{ item }">
        <v-text-field type="number" placeholder="Enter actual value..." v-model="item.actual"
                      @change="updateActual(item)"></v-text-field>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn color="secondary" @click="deletePrediction(item.id)">Delete</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {$inject} from "@vanroeybe/vue-inversify-plugin/dist/decorator";
import {ExpensePrediction} from "@/Types/ExpensePrediction";

@Component
export default class Dashboard extends Vue {
  @$inject('AuthService') private readonly authService!: AuthService
  @$inject('ExpensesPredictionsService') private readonly expensesPredictionsService!: ExpensesPredictionsService
  private expensesPredictions = [];
  private headers = [
    {text: 'Name', value: 'name'},
    {text: 'Prediction (zl)', value: 'prediction'},
    {text: 'Actual (zl)', value: 'actual'},
    {text: 'Balance (zl)', value: 'balance'},
    {text: 'Action', value: 'action'},
  ];

  public async deletePrediction(id: string): Promise<void> {
    await this.expensesPredictionsService.deletePrediction(id);
  }

  public async updateActual(item: ExpensePrediction): Promise<void> {
    await this.expensesPredictionsService.updatePrediction(item);
  }

  public calculateBalance(prediction: ExpensePrediction): number {
    return this.expensesPredictionsService.calculateBalance(prediction);
  }

  public async created(): Promise<void> {
    this.expensesPredictions = await this.expensesPredictionsService.getUserPredictions();

    this.expensesPredictionsService.getCollectionReference()
        .onSnapshot(async (snapshot) => {
          this.expensesPredictions = await this.expensesPredictionsService.getUserPredictions(snapshot);
        });
  }
}
</script>
