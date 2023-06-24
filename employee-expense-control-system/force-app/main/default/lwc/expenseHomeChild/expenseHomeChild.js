import { LightningElement, api, wire, track} from 'lwc';
import getExpCards from '@salesforce/apex/expenseHandler.getExpCards';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi'
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    {
        label:'DESCRIPTION', 
        fieldName:'Description__c',
        editable : 'true'
    },
    
    {
        label:'AMOUNT',
        fieldName:'Amount__c',
        editable : 'true'
    },

    {
        label:'ACTION',
        type: 'button', 
        typeAttributes: 
        { 
            label: 'Delete', 
            title: 'Action', 
            name: 'actions',
            variant: 'base', 
            iconPosition: 'center'
        }
    },
]

export default class ExpenseHomeChild extends LightningElement {
    @api me;
    dateME;
    total = 0;
    columns = COLUMNS;
    @track dataTableData = [];
    draftValues = [];
    resultData;
    wiredResults;

    @wire(getExpCards, { recordId: '$me.Id' })
    wrExC(result){
        this.wiredResults = result;
        if(result.data){
            this.func1(result.data);
        }
        if(result.error) {
            console.error(result.error)
        }
    }

    func1(result) {
        this.dataTableData = [];
        this.total = 0;
        this.dateME = this.me.Month_Date__c;
        for(const item of result) {
            if(item.MonthlyExpense__c == this.me.Id) {
                this.total += item.Amount__c;
                this.dataTableData.push(item);
            }
        }
    }

    showToatMessage(result) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: result ? 'Success' : 'Error',
                message: result ? 'Record deleted successfully' : 'Record is not removed',
                variant: result ? 'success' : 'error'
            })
        )
    }

    handleOnClickDelete(event){
        deleteRecord(event.detail.row.Id)
        .then(() => {
            this.showToatMessage(true);
            this.total = this.total - event.detail.row.Amount__c;
            this.dataTableData = this.dataTableData.filter(function(obj) {
                return obj.Id != event.detail.row.Id;
            });
            document.location.reload(true);
        })
        .catch((error)=>{
            this.showToatMessage(false);
        });
    } 

    handleSave(event) {
        const recordInputs =  event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
    
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(contacts => {
            this.dispatchEvent(new CustomEvent('refreshamount', {detail: {total: this.total}}));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Expenses Cards updated',
                    variant: 'success'
                })
            );
             this.draftValues = [];
             refreshApex(this.wiredResults);
             this.func1(this.wiredResults);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });  
    }
}
