export type ExpensePrediction = {
    id: string;
    name: string;
    prediction: number;
    actual: number|null;
    userId: string;
}