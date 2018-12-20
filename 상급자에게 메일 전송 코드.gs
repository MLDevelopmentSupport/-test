function myFunction1(e) {
  var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_연차신청정보_LOG_");
  //var ss3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_CODE_");
  var swc = e.range;  
  Logger.log (swc);
  //사용자에게 메일
  var timeStamp = ss2.getRange(swc.getRow(),1,1,1).getValue();
  var emailAddress = ss2.getRange(swc.getRow(),3, 1, 1).getValue(); // 사용자의 메일
  var name = ss2.getRange(swc.getRow(),2, 1, 1).getValue(); // 사용자의 이름
  var subject = "NE - 연차신청 - " + name + "님이 연차를 신청 완료 하였습니다."
  var toname = ss2.getRange(swc.getRow(),8, 1, 1).getValue(); //상급자 이름
  var message = "수신 : " + name + "<br />발신 : " + name  + " 신청" + "<br/><br/>";
  var startDay = ss2.getRange(swc.getRow(),5, 1, 1).getValue();
  var endDay = ss2.getRange(swc.getRow(),6, 1, 1).getValue();
  var content = "["+ name + "]" + startDay + "부터" + endDay + "까지의 연차를 신청하였습니다.";
  timeStamp = Utilities.formatDate(new Date(timeStamp), "GMT+0900 (JST)", "yyyy.MM.dd HH:mm:ss");Logger.log (timeStamp);
   MailApp.sendEmail({
        to: emailAddress,
        // cc: emailCC,
        replyTo : emailAddress,
        name : name,
        subject: subject,
        htmlBody: message + "<br>"+ content , 
      })
  emailAddress = "ml.dev.spt1@totodaud.com"; // 상급자
  subject = "NE - 연차신청 - " + name + "님이 연차를 신청하였습니다. 승인 또는 반려 바랍니다.";
  message = "수신 : " + toname + "<br />발신 : " + name + "신청<br/><br/>" ;
  content = "["+ name + "]" + startDay +"부터 " + endDay + "까지 연차가 신청되었습니다. </br>" +  "연차 승인 검토 바랍니다.<br /><br />";
  var href1 = "https://script.google.com/a/totodaud.com/macros/s/AKfycbyhSB7sSHISLtAFi0MV02U1dEru_csp2rTjWZW_8RnymEnYXmml/exec?theArg=S&TimeStamp="+ timeStamp +"&Uname=" + name +"&";
  var href2 = href1 + "sb=0";
  var href3 = href1 + "sb=1";
  var html = "<a href=\""+href2+"\"\">승인</a>....<a href=\""+href3+"\"\">반려</a>";
   
   MailApp.sendEmail({
        to: emailAddress,
        // cc: emailCC,
        replyTo : emailAddress,
        name : name,
        subject: subject,
        htmlBody: message + "<br>"+ content + html , 
      })
   
   
}

