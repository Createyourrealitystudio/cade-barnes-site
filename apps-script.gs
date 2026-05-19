/**
 * Cade Barnes — waitlist form backend (Google Apps Script).
 *
 * This script is bound to a Google Sheet and deployed as a Web app.
 * It receives POSTs from the site's waitlist form, appends a row to the
 * sheet, and emails Cade a notification of the new lead.
 *
 * Full setup instructions: docs/form-setup.md
 */

/* ---- CONFIG: edit these two values before deploying ---- */
var NOTIFY_EMAIL = 'REPLACE_WITH_CADE_EMAIL'; // where new-lead alerts are sent
var SHEET_NAME   = 'Waitlist';                // tab the rows are written to
/* -------------------------------------------------------- */

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var first    = String(p.firstName || '').trim();
    var last     = String(p.lastName  || '').trim();
    var email    = String(p.email     || '').trim();
    var interest = String(p.interest  || '').trim();
    var message  = String(p.message   || '').trim();
    var now      = new Date();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'First name', 'Last name', 'Email', 'Interest', 'Message']);
    }
    sheet.appendRow([now, first, last, email, interest, message]);

    // Notify Cade
    if (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf('REPLACE_WITH') !== 0) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New waitlist signup — ' + (first || 'someone') + ' ' + last,
        body: [
          'New signup from the site:',
          '',
          'Name:     ' + first + ' ' + last,
          'Email:    ' + email,
          'Here for: ' + interest,
          'Message:  ' + (message || '(none)'),
          'Time:     ' + now
        ].join('\n')
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Cade Barnes waitlist endpoint is live.');
}
