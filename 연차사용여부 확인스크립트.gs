function MonthConfilm() {
  var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_연차신청정보_LOG_");
  var ss3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_CODE_");
  //var Senior = [];
  Logger.log(getDataRange.length());
  Senior = ss2.getRange(2,8,getDataRange.length(),1).getValues(); //상급자 목록 필요함
  //var startDay ;
  //var startDay2 ; 
  //var userList = [];
  //var rows = [];
  //rows = ss2.getRange(2, 1, ss2.getLastRow(), 16).getValues(); //목록들 범위
  //Logger.log(Senior.length + "//" + rows.length);
  for(var h = 0; h < Senior.length; h++){
    for(var i = 0; i < rows.length; i++){
      Logger.log(rows[i][7] + "//" + Senior[h][0]);
      if (rows[i][7] == Senior[h][0]){ //상급자 목록 중 하나
        
        for (var j = 2; j < rows.length; j++){
          Logger.log(ss2.getRange(j,5,1,1).getValues());
          startDay = ss2.getRange(j,5,1,1).getValues();  Logger.log(startDay);
          startDay2 = new Date(startDay); Logger.log("eeee" + startDay2);
         Logger.log(startDay2.getMonth())
         Logger.log(new Date())
          if(new Date().getMonth()-1 == startDay2.getMonth()){
            if(rows[i][16] == "승인"){
              var name = rows[i][2];
              var dep = rows[i][4]; //부서
              var endDay = Utilities.formatDate(new Date(rows[i][6]),"GMT+0900 (JST)", "yyyy.MM.dd HH:mm:ss");
              
              var href1 = "https://script.google.com/a/totodaud.com/macros/s/AKfycbyhSB7sSHISLtAFi0MV02U1dEru_csp2rTjWZW_8RnymEnYXmml/exec?&Scode=2&Uname="+ name +"&startDay="+startDay+"&endDay="+endDay+"&";
              var href2 = href1 + "sb=2";
              var href3 = href1 + "sb=3";
              var html = "<a href=\""+href2+"\"\">확인됨</a>....<a href=\""+href3+"\"\">확인되지 않음</a>";
              var contents = dep + "소속 " + name + " - 연차기간 " + startDay + " ~ " + endDay + "<br/>"+html;
            userList.push(contents)
            //월이 같으면 순환문 돌리면서 userList에 하나씩 push
            //푸쉬한 목록도 하나씩 순환문 돌리면서 </br>넣음
            //</br>뒤에 html로 링크 두개 넣음
            //얘네 다 메일로 보냄 
            }
          }
        }
      } //h는 상급자 이름, i는 row  
    }
    var emailAddress =  Senior[h+1][0];
    var email = "ml.dev.spt1@totodaud.com"; //보내는 사람은 어떻게 해야 할까?
    var name1 = "종합"
    var subject = userList;
    var messege = "수신 : " + name + "<br />발신 : " + name  + " 신청" + "<br/><br/>";
    var html2 = userList;
    
    MailApp.sendEmail({
    to: emailAddress,
    //cc: emailCC,
    replyTo : email,
    name : name1,
    subject: subject,
    htmlBody: messege + html2,
    });
  }
 }

