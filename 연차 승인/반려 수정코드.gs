function doGet(e) {
   // var SHEET_FILE_ID = "1AuGWbDMQGl8bdhkm5P8Var_VsYApQcczhRFh6X2F5qc"
   // var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName('_연차신청정보_LOG_');
    var passedInIP = e.parameters;
   // var sheet2 = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName("_CODE_");
   
  /*  var para = [];
    
    for (var i = 0; i <3; i++){
      para.push(passedInIP.split("."));
    
    } */
     
    var params = JSON.stringify(e);
    //Logger.log(params);
    var data = ContentService.createTextOutput(params).setMimeType(ContentService.MimeType.JSON);
   
    //Logger.log("////"+data )
    var para1 = passedInIP.theArg; //상급자(S) 행정부(H)
    var para2 = passedInIP.TimeStamp;
    var para3 = passedInIP.sb; //승인 반려
    var para4 = passedInIP.Uname;
    //Logger.log("para2 = " + para2);
    var SearchData1 = para2; //타임 스탬프
    var SearchData2 = para4; //이름
    
    findInRowForMulti(SearchData1, SearchData2, para1, para3);
  return ContentService.createTextOutput('수정되었습니다.');
    }
    
function findInRowForMulti(SearchData1, SearchData2, para1, para3) {
 var TF = para3; //0은 승인 1은 반려
 var data1 = [];
 
 var dataRange;
 var SH = para1 ;
 var dataRow = 0;
 var SHEET_FILE_ID = "1AuGWbDMQGl8bdhkm5P8Var_VsYApQcczhRFh6X2F5qc";
 var sheet = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName("_연차신청정보_LOG_");
 var sheet2 = SpreadsheetApp.openById(SHEET_FILE_ID).getSheetByName("_CODE_");
 //var rows = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues(); //1st is header row
 var rows = sheet.getRange(2, 1, sheet.getLastRow(), 2).getValues();
 Logger.log(rows.length);
 for (var r=0; r<rows.length; r++) {
      Logger.log("rows[2][0] = " + rows[2][0])
   rows[r][0] = Utilities.formatDate(new Date(rows[r][0]),"GMT+0900 (JST)", "yyyy.MM.dd HH:mm:ss");
   Logger.log("SearchData1 = "+ SearchData1)
   Logger.log("rows[r][0] = " + rows[r][0]);
   Logger.log(Utilities.formatDate(new Date(rows[r][0]),"GMT+0900 (JST)", "yyyy.MM.dd HH:mm:ss"))
   Logger.log("SearchData2 = " +SearchData2)
   Logger.log(rows[2][1])
   /*if ( rows[r][0].indexOf(SearchData1) !== -1 && row[r][1].indexOf(SearchData2) !== -1){
   dataRow = r+1;Logger.log("R = " + r+1);
   }
   else {
   return -1;
   } */
   if(((rows[r][0]) == SearchData1) && ((rows[r][1]) == SearchData2)){
     //Logger.log("R = " + (r+2))
     dataRow = (r+2);
   }
   else{
     Logger.log(r + "잘 안됨"); 
   }
 }
 
    if ( SH == "S"){
   // Logger.log("dataRow = " + dataRow);
      dataRange = sheet.getRange(dataRow ,16,1,1); // 사용자의 상급자 승인
      
      if (TF == 0){
        data1.push("승인");
        
        var name = sheet.getRange(dataRow,2, 1, 1).getValue(); //신청자 이름
        //Logger.log(name);
        var toname = "행정부"; //받는사람 이름
        var messege = "수신 : " + toname + "<br />발신 : " + name   + "<br/><br/>";//글머리
        var tomail = sheet2.getRange(6,6,1,1).getValue(); // 행정부 메일
        // var tocc = ss2.getRange(swc, 1, 1, 1).getValue();
        var emailAddress = tomail;
        // var emailCC = tocc;
        var content = "["+ name + "] 연차 승인 검토 요청합니다.<br/>";//내용
        var href1 = "https://script.google.com/a/totodaud.com/macros/s/AKfycbyhSB7sSHISLtAFi0MV02U1dEru_csp2rTjWZW_8RnymEnYXmml/exec?theArg=H&TimeStamp="+ SearchData1 +"&Uname=" + SearchData2 +"&";
        var href2 = href1 + "sb=0";
        var href3 = href1 + "sb=1";
        var html = "<a href=\""+href2+"\"\">승인</a>....<a href=\""+href3+"\"\">반려</a>";
        //Logger.log(href2 + "," + href3);
   //https://ctrlq.org/code/19871-get-post-requests-google-script
        var subject =" TT - 연차승인 검토 1차";//제목
        //Logger.log(subject);
        //Logger.log(messege);
       // Logger.log("="+html);
        MailApp.sendEmail({
          to: emailAddress,
          // cc: emailCC,
          replyTo : emailAddress,
          name : name,
          subject: subject,
          htmlBody: messege + "<br>"+ content + html , 
          })
      
        }
      else if (TF == 1){
        data1.push("반려");
        
        emailAddress = sheet.getRange(dataRow,3, 1,1).getValue();
        var Uname = sheet.getRange(dataRow,8,1,1).getValue();
        name = sheet.getRange(dataRow,2, 1, 1).getValue();
        var return1 = sheet.getRange(dataRow,17,1,1).getValue();
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
      dataRange.setValue(data1);
      
    }
        
    else if (SH == "H"){

      //dataRow = 0;
      //for (var r=0; r<rows.length; r++) {
        
        //rows[r][0] = Utilities.formatDate(new Date(rows[r][0].valueOf()),"GMT 0900", "yyyy.MM.dd HH:mm:ss");
        
        /* if ( rows[r].join("#").indexOf(SearchData2) !== null && rows[r].join("#").indexOf(SearchData1) !== null) {
        
        } */
        Logger.log(SearchData1)
        Logger.log(rows[2][0])
        //Logger.log(rows[r][0].indexOf(SearchData1))
        /*if ( rows[r][0].indexOf(SearchData1) !== -1 && row[r][1].indexOf(SearchData2) !== -1){
        dataRow = r+1;Logger.log("R = " + r+1);
        }
        else {
        Logger.log("잘 안됨");
        return -1;
        } */
        /* if(((rows[r][0]) == SearchData1) && ((rows[r][1]) == SearchData2)){
          dataRow = (r+2);
          Logger.log("R = " + (r+1))
        }
        else{
          Logger.log("잘 안됨");
          return -1;
        }*/
       
      dataRange = sheet.getRange(dataRow, 17,1,1);
      
      if (TF == 0){
        data1.push("승인");
        
        var name = "행정부";
      Logger.log("dataRow = " + dataRow);
      var toname = sheet.getRange(dataRow,2, 1, 1).getValue();
      var messege = "수신 : " + toname + "<br />발신 : " + name + "<br/><br/>";//글머리
      var tomail = sheet.getRange(dataRow,3, 1, 1).getValue(); // 신청자 메일
      var allmail = sheet2.getRange(6,7,1,1).getValue();
      // var tocc = ss2.getRange(swc, 1, 1, 1).getValue();
      var emailAddress = tomail;
      var startday = sheet.getRange(dataRow,5, 1, 1).getValue();//연차 시작하는 날
      var endday = sheet.getRange(dataRow,6, 1, 1).getValue();//연차 끝나는 날
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
      else if (TF == 1){
        data1.push("반려");
        
        emailAddress = sheet.getRange(dataRow,3, 1,1).getValue();
        var Uname = "행정부";
        name = sheet.getRange(dataRow,2, 1, 1).getValue();
        var return1 = sheet.getRange(dataRow,18,1,1).getValue();
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
    dataRange.setValue(data1);
    }
} 



//https://developers.google.com/apps-script/guides/web


//function doGet(request) {

  //get the data from the request's "somedata" querystring parameter ..../exec?somedata=mydata
//  var data = request.parameters.somedata;

  //update the bound spreadsheet (workaround https://code.google.com/p/google-apps-script-issues/issues/detail?id=5734)
//  SpreadsheetApp.openById('1cm6tK0Io4lnbRZ0OhlvZijhrQoqCt01adyYlUbZgUZY')
//  .getSheetByName('Sheet1')
//  .getRange('B1')
//  .setValue(data);

  //send some data back as a response
//'  var result = {
//'    data: 'Thanks, I received: ' + data,
//'    error: null
//'  };
//'  return ContentService.createTextOutput(JSON.stringify(result))
//'    .setMimeType(ContentService.MimeType.JSON);
//}