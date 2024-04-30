import { FinancialData } from "./FinancialData";

export interface User {
    id: string;
    password: string;
    fullName: string;
    financialData: FinancialData[];
}