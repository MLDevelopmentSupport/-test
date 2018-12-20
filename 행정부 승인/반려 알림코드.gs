function SwitchContents(e) {
  //var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_연차통합조회_");
  var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_연차신청정보_LOG_");
  var ss3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_CODE_");
  var swc = e.range;  
  Logger.log(swc.getColumn());
  sandMail(swc);
  //findInRowForMulti(ss2.getRange(swc.getRow(), 1).getValue(), ss2.getRange(swc.getRow(), 2).getValue());
  }

function sandMail(swc){
Logger.log(swc);
  if(swc.getColumn() == 16.0){ //상급자 승인여부
    if(swc.getValue() == "승인"){
      var name = ss2.getRange(swc.getRow(),2, 1, 1).getValue(); //신청자 이름
      Logger.log(name);
      var toname = "행정부"; //받는사람 이름
      var messege = "수신 : " + toname + "<br />발신 : " + name  + " 신청" + "<br/><br/>";//글머리
      var tomail = ss3.getRange(6,6,1,1).getValue(); // 행정부 메일
      // var tocc = ss2.getRange(swc, 1, 1, 1).getValue();
      var emailAddress = tomail;
      // var emailCC = tocc;
      var content = "["+ name + "] 연차 승인 검토 요청합니다.<br/>";//내용
      var href1 = "https://script.google.com/a/totodaud.com/macros/s/AKfycbyhSB7sSHISLtAFi0MV02U1dEru_csp2rTjWZW_8RnymEnYXmml/exec?theArg=H&hRow="+ swc.getRow() +"&";
      var href2 = href1 + "sb=0";
      var href3 = href1 + "sb=1";
      var html = "<a href=\""+href2+"\"\">승인</a>....<a href=\""+href3+"\"\">반려</a>";
      Logger.log(href2 + "," + href3);
 //https://ctrlq.org/code/19871-get-post-requests-google-script
      var subject =" TT - 연차승인 검토 1차";//제목
      Logger.log(subject);
      Logger.log(messege);
      Logger.log("="+html);
      MailApp.sendEmail({
        to: emailAddress,
        // cc: emailCC,
        replyTo : emailAddress,
        name : name,
        subject: subject,
        htmlBody: messege + "<br>"+ content + html , 
      })
    }
    else{
      emailAddress = ss2.getRange(swc.getRow(),3, 1,1).getValue();
      var Uname = ss2.getRange(swc.getRow(),8,1,1).getValue();
      name = ss2.getRange(swc.getRow(),2, 1, 1).getValue();
      var return1 = ss2.getRange(swc.getRow(),17,1,1).getValue();
      subject = "TT - 연차승인 검토 1차";
      messege = "수신 : " + name + "<br />발신 : 상급자<br/><br/>" 
      content = name + " 연차 신청이 반려 되었습니다.<br>반려사유는 " + return1 + " 입니다.";
      MailApp.sendEmail({
        to: emailAddress,
        // cc: emailCC,
        replyTo : emailAddress,
        name : Uname,
        subject: subject,
        htmlBody: messege + "<br>"+ content, 
      })
    }
  }
  
  else if(swc.getColumn() == 17.0){ //행정부 승인여부
    if(swc.getValue() == "승인"){
      var name = "행정부";
      Logger.log(name);
      var toname = ss2.getRange(swc.getRow(),2, 1, 1).getValue();
      var messege = "수신 : " + toname + "<br />발신 : " + name + "<br/><br/>";//글머리
      var tomail = ss2.getRange(swc.getRow(),3, 1, 1).getValue(); // 신청자 메일
      var allmail = ss3.getRange(6,7,1,1).getValue();
      // var tocc = ss2.getRange(swc, 1, 1, 1).getValue();
      var emailAddress = tomail;
      var startday = ss2.getRange(swc.getRow(),5, 1, 1).getValue();//연차 시작하는 날
      var endday = ss2.getRange(swc.getRow(),6, 1, 1).getValue();//연차 끝나는 날
      // var emailCC = tocc;
      var content = "["+ toname + "] " + startday + " ~ " + endday + "기간의 연차가 승인 되었습니다. <br/>업무 인수인계 보고해 주세요.";//내용
      var content1 = "["+ toname + "] " + startday + " ~ " + endday + "기간의 연차를 사용합니다. <br/>이에 서로 업무 인수인계 신경 써 주세요."; //all내용
      var subject =" TT - 연차승인 검토 2차";//제목
      Logger.log(subject);
      Logger.log(messege);
      Logger.log("="+name);
      MailApp.sendEmail({
        to: emailAddress,
        // cc: emailCC,
        replyTo : emailAddress,
        name : name,
        subject: subject + "[ALL]",
        htmlBody: messege + "<br>"+ content, 
      })
      MailApp.sendEmail({
        to: allmail,//all메일
        // cc: emailCC,
        replyTo : emailAddress,
        name : name,
        subject: subject,
        htmlBody: messege + "<br>"+ content1, 
      })
    }
    else{
      emailAddress = ss2.getRange(swc.getRow(),3, 1,1).getValue();
      var Uname = "행정부";
      name = ss2.getRange(swc.getRow(),2, 1, 1).getValue();
      var return1 = ss2.getRange(swc.getRow(),18,1,1).getValue();
      subject = "TT - 연차승인 검토 2차";
      messege = "수신" + name + "<br />발신 : 상급자<br/><br/>" 
      content = name + " 연차 신청이 반려 되었습니다.<br>반려사유는 " + return1 + " 입니다.";
      MailApp.sendEmail({
        to: emailAddress,
        // cc: emailCC,
        replyTo : emailAddress,
        name : Uname,
        subject: subject,
        htmlBody: messege + "<br>"+ content, 
      })
    }
  }
}



function loadYorN(normNr){
Logger.log("승인 여부 " + normNr);
}




