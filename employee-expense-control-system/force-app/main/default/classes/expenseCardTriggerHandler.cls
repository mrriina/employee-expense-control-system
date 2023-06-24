public with sharing class expenseCardTriggerHandler {
    public static void expenseCardMethod (List<ExpenseCard__c> incomingList) {
        Set<Id> contIdRecords = new Set<Id>();
        for(ExpenseCard__c exCard : incomingList){
            contIdRecords.add(exCard.CardKeeper__c);
        }

        List<Monthly_Expense__c> monthExList = [SELECT Month_Date__c, Keeper__c, Balance__c FROM Monthly_Expense__c WHERE Keeper__c in:contIdRecords];

        List<ExpenseCard__c> exCardListForExistingME = new List<ExpenseCard__c>();
        List<ExpenseCard__c> exCardListForCreatedME = new List<ExpenseCard__c>();

        for(Monthly_Expense__c me : monthExList) {
            for(ExpenseCard__c exCard : incomingList) {
                if((exCard.CardKeeper__c == me.Keeper__c) && (exCard.CardDate__c == me.Month_Date__c)) {
                    exCard.MonthlyExpense__c = me.Id;
                    exCardListForExistingME.add(exCard);
                }
            }
        }

        for(ExpenseCard__c exCard : incomingList) {
            if(!exCardListForExistingME.contains(exCard)) {
                exCardListForCreatedME.add(exCard);
            }
        }

        for(ExpenseCard__c exCard : exCardListForCreatedME) {
            Monthly_Expense__c me = new Monthly_Expense__c();
            me.Keeper__c = exCard.CardKeeper__c;
            me.Month_Date__c = exCard.CardDate__c;
            insert me;
            exCard.MonthlyExpense__c = me.Id;
        }
    }
}
