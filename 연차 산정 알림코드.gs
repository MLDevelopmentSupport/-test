function myFunction(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_연차통합조회_");
  //var ss2 = SpreadsheetApp.getActiveSpreadsheet().openByUrl('https://docs.google.com/spreadsheets/d/1vE8vm-6cO-BNT84Zn-qucVh0kpqgHZvN_58UGRwipv0/edit#gid=0').getSheetByName("_개인정보_LOG_");
  var ss3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_CODE_");
  
  for(var i = 2; i <= ss3.getRange(2,12,1,1).getValue()+1; i++){
    var name = ss.getRange(i,2,1,1).getValue();
    
    var toname = "행정부";
    var messege = "수신 : " + toname + "<br />발신 : " + name + "<br /><br /><br/>";
    var tomail = ss3.getRange(6,6,1,1).getValue(); // 행정부 메일
    // var tocc = ;
    var emailAddress = tomail;
    // var emailCC = tocc;
    var content = "<br/>연차 산정 종료일은" + ss.getRange(i, 5, 1, 1).getValue() + "입니다. <br/>잔여 일수는 " + ss.getRange(i,26,1,1).getValue();
    var subj = ss3.getRange(2,9,1,1).getValue();
    var subject = " " + subj + " " +name;
    Logger.log(subject);
    Logger.log(messege);
    Logger.log (ss3.getRange(2, 11, i,1).getValue());
    var today = new Date();
    var todaymonth = today.getMonth();//오늘의 월
    var todayday = today.getDay();//오늘의 일
    var monthmonth = ss3.getRange(i, 11, 1,1).getValue().getMonth();//연차산정종료일-4달의 월
    var dayday = ss3.getRange(i, 11, 1,1).getValue().getDay();//연차산정종료일-4달의 일
    if ( todaymonth == monthmonth && todayday == dayday ) {
      MailApp.sendEmail({
        to: emailAddress,
        //cc: emailCC,
        replyTo : emailAddress,
        name : name,
        subject: subject,
        htmlBody: messege + content,
      })
    }
  }
}

