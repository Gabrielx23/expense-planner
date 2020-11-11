export interface AddPredictionForm {
    name: string;
    prediction: number;
    actual: number|null;
    userId: string|null|undefined;
}