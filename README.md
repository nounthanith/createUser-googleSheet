function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var result;

  // Determine the type of request
  switch (e.parameter.action) {
    case 'read':
      result = readData(sheet);
      break;
    case 'insert':
      result = insertData(sheet, e);
      break;
    case 'update':
      result = updateData(sheet, e);
      break;
    case 'delete':
      result = deleteData(sheet, e);
      break;
    default:
      result = { status: 'Unknown command' };
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function readData(sheet) {
  var rows = sheet.getDataRange().getValues();
  return { status: 'success', data: rows.slice(1) };  // Exclude header row
}

function insertData(sheet, e) {
  var data = [e.parameter.id, e.parameter.name, e.parameter.email,
  e.parameter.password, e.parameter.role, e.parameter.created_at];
  sheet.appendRow(data);
  return { status: 'success', data: 'Data inserted' };
}

function updateData(sheet, e) {
  var id = e.parameter.id;
  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] == id) {
      sheet.getRange(i + 1, 2, 1, 4).setValues([[e.parameter.id, e.parameter.name, e.parameter.email,
      e.parameter.password, e.parameter.role, e.parameter.created_at]]);
      return { status: 'success', data: 'Data updated' };
    }
  }
  return { status: 'error', data: 'ID not found' };
}

function deleteData(sheet, e) {
  var id = e.parameter.id;
  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] == id) {
      sheet.deleteRow(i + 1);
      return { status: 'success', data: 'Data deleted' };
    }
  } return { status: 'error', data: 'ID not found' };
}
