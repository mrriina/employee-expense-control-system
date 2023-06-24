import { LightningElement, api } from 'lwc';
import getTotalMonths from '@salesforce/apex/expenseAdminHome.getTotalMonths';

export default class ExpenseAdminHomeOfficeTotalMonths extends LightningElement {
    @api office;
    @api year = 2022;
    totalMonths = 0;

    @api connectedCallback() {
        getTotalMonths({office:this.office, year:this.year})
        .then((result) => {
            this.totalMonths = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
}