import { LightningElement, api } from 'lwc';
import getMonthAmount from '@salesforce/apex/expenseAdminHome.getMonthAmount';

export default class ExpenseAdminHomeOfficeTable extends LightningElement {
    @api month;
    @api office;
    @api year;
    amount = 0;

    @api connectedCallback() {
        getMonthAmount({office:this.office, month:this.month, year:this.year})
        .then((result) => {
            if(result != null) {
                this.amount = result;
            }
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        }); 
    }
}