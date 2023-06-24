import { LightningElement, api } from 'lwc';
import getMonthlyAvg from '@salesforce/apex/expenseAdminHome.getMonthlyAvg';

export default class ExpenseAdminHomeOfficeMonthlyAverage extends LightningElement {
    @api office;
    @api year = 2022;
    monthlyAvg = 0;

    @api connectedCallback() {
        getMonthlyAvg({office:this.office, year:this.year})
        .then((result) => {
            this.monthlyAvg = Math.round(result*100)/100;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
}