import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import newExpenseCard from '@salesforce/apex/expenseHandler.newExpenseCard';

export default class ExpenseHomeNewExpenseButton extends LightningElement {
    @track newExpense;
    @api contId;
    amountString;
    dateString;
    descriptionString;

    AmountChanged(event) {
        this.amountString = event.target.value;
    }

    DateChanged(event) {
        this.dateString = event.target.value;
    }

    DescriptionChanged(event) {
        this.descriptionString = event.target.value;
    }

    closeModal(){
        this.newExpense = false;
        const selectedEvent = new CustomEvent('closemodal', { detail: {newExpense: this.newExpense} });
        this.dispatchEvent(selectedEvent);
    }

    handlerSaveExpense(){
        if(this.amountString > 0) {
            try{
                newExpenseCard({amountString:this.amountString, dateString:this.dateString, descriptionString:this.descriptionString, contId:this.contId});
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Expense recorded',
                        variant: 'success'
                    })
                );
                this.closeModal();
            }
            catch(error) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Expense are not recorded',
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