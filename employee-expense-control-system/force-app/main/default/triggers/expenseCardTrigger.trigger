trigger expenseCardTrigger on ExpenseCard__c (before insert) {
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            expenseCardTriggerHandler.expenseCardMethod(Trigger.new);
        }
    }
}