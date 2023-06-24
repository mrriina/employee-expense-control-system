import { LightningElement, track, api } from 'lwc';
import newIncome from '@salesforce/apex/expenseHandler.newIncome';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ExpenseHomeIncomeButton extends LightningElement {
    @track income;
    @api contId;
    amountString;
    dateString;

    AmountChanged(event) {
        this.amountString = event.target.value;
    }

    DateChanged(event) {
        this.dateString = event.target.value;
    }

    closeModal(){
        this.income = false;
        const selectedEvent = new CustomEvent('closemodal', { detail: {income: this.income} });
        this.dispatchEvent(selectedEvent);
    }

    handlerSaveExpense(){
        if(this.amountString > 0) {
            try {
                newIncome({amountString:this.amountString, dateString:this.dateString, contId:this.contId});
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Income recorded',
                        variant: 'success'
                    })
                );
                this.closeModal();
            }
            catch(error) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Income are not recorded',
                        variant: 'error'
                    })
                );
            }
            
        }
        else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Amount must be greater than 0',
                    variant: 'error'
                })
            );
        }
    } 
}