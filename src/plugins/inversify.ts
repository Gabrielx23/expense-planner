import 'reflect-metadata';
import {Container} from 'inversify';
import {AuthService} from "@/services/AuthService";
import {ExpensesPredictionsService} from "@/services/ExpensesPredictionsService";

const container = new Container();

container.bind<AuthService>('AuthService').to(AuthService);
container.bind<ExpensesPredictionsService>('ExpensesPredictionsService').to(ExpensesPredictionsService);

export default container;