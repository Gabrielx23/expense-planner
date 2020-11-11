import {database, auth} from "@/plugins/firebase";
import firebase from "firebase";
import {injectable} from 'inversify';
import {CollectionsNames} from "@/enums/CollectionsNames";
import CollectionReference = firebase.firestore.CollectionReference;
import {AddPredictionForm} from "@/Interfaces/AddPredictionForm";
import {ExpensePrediction} from "@/Types/ExpensePrediction";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import DocumentData = firebase.firestore.DocumentData;
import Auth = firebase.auth.Auth;

@injectable()
export class ExpensesPredictionsService {
    private collection: CollectionReference = database.collection(CollectionsNames.EXPENSES_PREDICTIONS);
    private auth: Auth = auth;

    public async addPrediction(form: AddPredictionForm): Promise<void> {
        form.userId = this.auth?.currentUser?.uid;
        await this.collection.add(form);
    }

    public async deletePrediction(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }

    public async updatePrediction(prediction: ExpensePrediction): Promise<void> {
        const {id, ...data} = prediction;
        await this.collection.doc(prediction.id).update(data);
    }

    public getCollectionReference(): firebase.firestore.Query<firebase.firestore.DocumentData> {
        return this.collection.where('userId', '==', this.auth?.currentUser?.uid);
    }

    public calculateBalance(prediction: ExpensePrediction): number {
        return prediction.prediction - (prediction?.actual ?? 0);
    }

    public async getUserPredictions(snapshot): Promise<Array<ExpensePrediction>> {
        const predictions: Array<ExpensePrediction> = [];

        if (!snapshot) {
            snapshot = await this.getCollectionReference()
                .get();
        }

        snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();

            predictions.push({
                id: doc.id,
                name: data.name,
                prediction: data.prediction,
                actual: data.actual,
                userId: data.userId,
            })
        });

        return predictions;
    }
}