public with sharing class expenseHandler {
    
    @AuraEnabled(cacheable=true)
    public static String getOffice(String contId) {
        Contact cont = [
            SELECT Office__c
            FROM Contact
            WHERE Id =: contId
        ]; 
        return cont.Office__c;
    }

    @AuraEnabled(cacheable=true)
    public static String getContact() {
        Login_User__c lu = [
            SELECT CurrentPartnerContact__c
            FROM Login_User__c
        ]; 
        return lu.CurrentPartnerContact__c;
    }

    @AuraEnabled
    public static Integer getBalance(String contId, Integer year) {
        AggregateResult balance = [
            SELECT SUM(Reminder__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c =: contId
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];

        Integer balanceResult = Integer.valueOf(balance.get('expr0'));
        return balanceResult != null ? balanceResult : 0;
    }

    @AuraEnabled
    public static Integer getTotalAmount(String contId, Integer year) {
        AggregateResult balance = [
            SELECT SUM(SpentAmount__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c =: contId
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];

        Integer balanceResult = Integer.valueOf(balance.get('expr0'));
        return balanceResult != null ? balanceResult : 0;
    }

   

    @AuraEnabled
    public static Integer getTotalIncome(String contId, Integer year) {
        AggregateResult balance = [
            SELECT SUM(Balance__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c =: contId
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];

        Integer balanceResult = Integer.valueOf(balance.get('expr0'));
        return balanceResult != null ? balanceResult : 0;
    }

    @AuraEnabled
    public static Integer getAmount(String contId, Integer month, Integer year) {
        System.debug('start');
        AggregateResult balance = [
            SELECT SUM(SpentAmount__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c =: contId
            AND CALENDAR_MONTH(Month_Date__c) =: month
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];
        System.debug('balance= '+balance);
        Integer balanceResult = Integer.valueOf(balance.get('expr0'));
        return balanceResult;
    }

    @AuraEnabled
    public static Integer getIncome(String contId, Integer month, Integer year) {
        AggregateResult balance = [
            SELECT SUM(Balance__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c =: contId
            AND CALENDAR_MONTH(Month_Date__c) =: month
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];

        Integer balanceResult = Integer.valueOf(balance.get('expr0'));
        return balanceResult;
    }

    @AuraEnabled(cacheable=true)
    public static List<Monthly_Expense__c> getMonthExp(Integer monthNumb, Integer yearNumb, Id cont) {
        List<Monthly_Expense__c> records = new List<Monthly_Expense__c>();
        List<Monthly_Expense__c> MEList = [
            SELECT Month_Date__c, SpentAmount__c
            FROM Monthly_Expense__c
            WHERE Keeper__c =: cont AND SpentAmount__c != 0
            ORDER BY Month_Date__c
        ]; 
        for(Monthly_Expense__c me : MEList){
            if((me.Month_Date__c.month() == monthNumb) && (me.Month_Date__c.year() == yearNumb)){
                records.add(me);
            }
        }

        return records;
    }


    @AuraEnabled(cacheable=true)
    public static List<ExpenseCard__c> getExpCards(Id recordId) {
        Monthly_Expense__c me = [SELECT Keeper__c, Month_Date__c
                                 FROM Monthly_Expense__c
                                 WHERE Id =: recordId];
        
        List<ExpenseCard__c> ECList = [SELECT Description__c, Amount__c, MonthlyExpense__c
                                       FROM ExpenseCard__c
                                       WHERE CardKeeper__c =: me.Keeper__c];
        
        return ECList;
    }


    @AuraEnabled(cacheable=false)
    public static void deleteExpCards(Id recordId) {
        ExpenseCard__c ec = [
            SELECT Id
            FROM ExpenseCard__c
            WHERE Id =: recordId
            LIMIT 1
        ];
        if(ec != null){
            delete ec;
        }
    }

    @AuraEnabled
    public static String checkLogin(String emailString, String passwordString) {
        List<Contact> contList = [
            SELECT Email, Password__c, Admin__c, Account.IsPartner
            FROM Contact
            WHERE Email =: emailString
        ];

        Login_User__c lu = [
            SELECT Name, CurrentPartnerContact__c
            FROM Login_User__c
        ];

        for(Contact cont : contList) {
            if((cont.Password__c == passwordString) && (cont.Account.IsPartner == true)) {
                lu.CurrentPartnerContact__c = cont.Id;
                update lu;
                if(cont.Admin__c == true) {
                    return 'admin';
                }
                else if(cont.Admin__c == false) {
                    return 'employee';
                }
            }
        }
        return null;
    }

    @AuraEnabled
    public static void newExpenseCard(String amountString, String dateString, String descriptionString, String contId) {
        ExpenseCard__c exCard = new ExpenseCard__c();
        exCard.Amount__c = Decimal.valueOf(amountString);
        exCard.CardDate__c = Date.valueOf(dateString);
        exCard.Description__c = descriptionString;
        exCard.CardKeeper__c = contId;
        
        insert exCard;
    }

    @AuraEnabled
    public static void newIncome(String amountString, String dateString, String contId) {
        Monthly_Expense__c me = new Monthly_Expense__c();
        me.Balance__c = Decimal.valueOf(amountString);
        me.Month_Date__c = Date.valueOf(dateString);
        me.Keeper__c = contId;
        
        insert me;
    }
}
