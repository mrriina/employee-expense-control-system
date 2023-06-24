public with sharing class expenseAdminHome {

    @AuraEnabled(cacheable=true)
    public static List<Account> getOfficesList() {
        List<Account> offList = [
            SELECT Id, Name, IsPartner
            FROM Account
            WHERE IsPartner = true
            ORDER BY Name
        ];
        return offList;
    }


    
    @AuraEnabled(cacheable=true)
    public static Integer getMonthAmount(Account office, Integer month, Integer year) {

        List<Contact> contList = [
            SELECT Id, AccountId
            FROM Contact
            WHERE AccountId =: office.Id
        ];

        AggregateResult amount = [
            SELECT SUM(SpentAmount__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c in: contList
            AND CALENDAR_MONTH(Month_Date__c) =: month
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];

        Integer amountResult = Integer.valueOf(amount.get('expr0'));
        return amountResult != null ? amountResult : 0;
    }


    @AuraEnabled(cacheable=true)
    public static Integer getTotalMonths(Account office, Integer year) {

        List<Contact> contList = [
            SELECT Id, AccountId
            FROM Contact
            WHERE AccountId =: office.Id
        ];

        AggregateResult amount = [
            SELECT SUM(SpentAmount__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c in: contList
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];

        Integer amountResult = Integer.valueOf(amount.get('expr0'));
        return amountResult != null ? amountResult : 0;
    }


    @AuraEnabled(cacheable=true)
    public static Integer getBalanceNow(Account office, Integer year) {
        List<Contact> contList = [
            SELECT Id, AccountId
            FROM Contact
            WHERE AccountId =: office.Id
        ];
        
        AggregateResult balance = [
            SELECT SUM(Reminder__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c in: contList
            AND CALENDAR_YEAR(Month_Date__c) <=: year
            ];

        Integer balanceResult = Integer.valueOf(balance.get('expr0'));
        return balanceResult != null ? balanceResult : 0;
    }


    @AuraEnabled(cacheable=true)
    public static Decimal getMonthlyAvg(Account office, Integer year) {
        List<Contact> contList = [
            SELECT Id, AccountId
            FROM Contact
            WHERE AccountId =: office.Id
        ];

        List<Monthly_Expense__c> meList = [
            SELECT SpentAmount__c, Month_Date__c
            FROM Monthly_Expense__c
            WHERE Keeper__c in: contList
            AND CALENDAR_YEAR(Month_Date__c) =: year
            AND SpentAmount__c != 0 
        ];

        Decimal sum = 0;
        Integer count = 0;
        for(Integer i=1; i<13; i++) {
            Integer flag = 0;
            for(Monthly_Expense__c m : meList) {
                if(m.Month_Date__c.month() == i) {
                    sum += m.SpentAmount__c;
                    if(flag == 0){
                        count++;
                    }
                    flag = 1;
                }
            }
        }
        if(count == 0){
            return 0;
        }
        Decimal avg = sum/count;
        return avg;
    }






    @AuraEnabled(cacheable=true)
    public static Integer getSummMonthAmount(Integer month, Integer year) {
        List<Account> offices = getOfficesList();
        Integer summMonthAmount = 0;
            List<Contact> contList = [
                SELECT Id, AccountId
                FROM Contact
                WHERE AccountId in: offices
            ];
    
        AggregateResult amount = [
            SELECT SUM(SpentAmount__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c in: contList
            AND CALENDAR_MONTH(Month_Date__c) =: month
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];
        Integer amountResult = Integer.valueOf(amount.get('expr0'));
        if(amountResult != null) {
            summMonthAmount += amountResult;
        }
        return summMonthAmount;
    }


    @AuraEnabled(cacheable=true)
    public static Integer getSummTotalAmount(Integer year) {
        List<Account> offices = getOfficesList();
        Integer summTotalAmount = 0;
            List<Contact> contList = [
                SELECT Id, AccountId
                FROM Contact
                WHERE AccountId in: offices
            ];
    
        AggregateResult amount = [
            SELECT SUM(SpentAmount__c) 
            FROM Monthly_Expense__c 
            WHERE Keeper__c in: contList
            AND CALENDAR_YEAR(Month_Date__c) =: year
            ];
        Integer amountResult = Integer.valueOf(amount.get('expr0'));
        if(amountResult != null) {
            summTotalAmount += amountResult;
        }
        return summTotalAmount;
    }
}