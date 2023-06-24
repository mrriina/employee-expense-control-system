import { LightningElement, api } from 'lwc';
import getSummMonthAmount from '@salesforce/apex/expenseAdminHome.getSummMonthAmount';

export default class ExpenseAdminHomeSummTable extends LightningElement {
    @api month;
    @api year;
    summAmount = 0;

    @api connectedCallback() {
        getSummMonthAmount({month:this.month, year:this.year})
        .then((result) => {
            if(result != null) {
                this.summAmount = result;
            }
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        }); 
    }
}