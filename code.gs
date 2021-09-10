function doGet(e) {
  if (!e.parameter.page) {
    var template = HtmlService.createTemplateFromFile('index')
    return  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
  }
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
}
function getUrl() {
  var url = ScriptApp.getService().getUrl()
  return url
}

function uploadFiles(form) {
  try {
    var folderDes = "project"
    var folder, folders = DriveApp.getFoldersByName(folderDes);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderDes);
    }
    var home = "https://script.google.com/a/rmutsvmail.com/macros/s/AKfycbxNHMVfaFwY1_cBBS5aEv6xhjvHW5q009jJRHM2/exec";
        
    var file = folder.createFile(form.myFile);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.COMMENT);
    var url = file.getUrl()
    var lecturer = form.myLecturer
    var leader = form.myleader
    var projectTitle = form.myProjectTitle
    var numGroup = form.myNumGroup
    var email = form.myEmail
    var telephone = form.myTelephone
    
    // ** changeUrl for spreadsheet **
    var ss = SpreadsheetApp.openById("1BBBvSMDGm6g80d9627AH85FS-hQMapsU4FOIvOWzTEo");
    var sh = ss.getSheetByName('sheet1')
    ss.appendRow([new Date(), lecturer, leader, projectTitle, numGroup, email, telephone, url])
    return "ข้อมูลของ.." + leader + " ทำโปรเจ็คเรื่อง " + projectTitle+ " ได้ถูกอัพโหลดเข้าระบบเป็นที่เรียบร้อยแล้ว ขอบคุณครับ  <p><p><a href ='"+url+"' ><button>คลิกดูงานที่ส่ง</button></a> <p><a href ='"+home+"' ><button>กลับหน้าหลัก</button></a>"    
  } catch (error) {
    return error.toString();
  }

}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}
