function MonthConfilm() {
  var ss2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_연차신청정보_LOG_");
  var ss3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_CODE_");
  var lists = [];
  var Senior = [];
  var rows = ss2.getRange(1, 1, ss2.getLastRow(), 1).getValues();
  Logger.log(ss2.getDataRange().getValues().length);
  var tc = ss3.getRange(2,12,1,1).getValue(); //상급자 수
  Senior = ss3.getRange(2,13,tc,2).getValues(); //상급자 목록 필요함
  Logger.log(tc)
  //var startDay ;
  //var startDay2 ; 
  //var userList = [];
  //var rows = [];
  //rows = ss2.getRange(2, 1, ss2.getLastRow(), 16).getValues(); //목록들 범위
  Logger.log("Senior = "+Senior);
  for(var h = 0; h < Senior.length; h++){
    for(var i = 2; i < rows.length; i++){
    
        //Senior[h][0]
        var name = Senior[h][0];
      if (name == ss2.getRange(i,7,1,1).getValue()){
        
        var userName = ss2.getRange(i,2,1,1).getValue();
        var startTime = ss2.getRange(i,5,1,1).getValue();
        startTime = Utilities.formatDate(new Date(startTime),"GMT+0900 (JST)", "yyyy.MM.dd HH:mm:ss");
        var endTime = ss2.getRange(i,6,1,1).getValue();
        endTime = Utilities.formatDate(new Date(endTime),"GMT+0900 (JST)", "yyyy.MM.dd HH:mm:ss");
        var element = userName + " 기간 : " + startTime + " ~ " + endTime + "<br/>"
        lists[i].push([element]) 
      }  Logger.log("lists = " + lists)
      
    }
    var emailAddress =  Senior[h][1];Logger.log(emailAddress) //받는 상급자
    var email = "ml.dev.spt1@totodaud.com"; //보내는 사람
    var name1 = "종합";
    var subject = lists;
    var messege = "수신 : " + name + "<br />발신 : " + name1 + " 신청" + "<br/><br/>";
    var html2 = "확인/미확인 <a href="+"https://sites.google.com/a/mitlab.kr/ne_hrd/sang"+">처리 화면으로 이동</a>";
    if(emailAddress == undefined){
      return 0; 
    }
    else{
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
 }

//매달 1일에 전송함
//이전달이 연차 시작인 사람들 리스트 가지고 오기
//상급자 별로 분류해서 상급자한테 메일 보내기

