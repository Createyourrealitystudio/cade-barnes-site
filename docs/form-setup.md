# Waitlist Form Setup

The site's waitlist form sends submissions to a Google Sheet and emails
Cade each new lead. Wiring it up is a one-time job (~5 minutes) and needs
Cade's Google account. Until it's done, the form still works on the site —
it just shows the success message without recording anything.

## 1. Create the Google Sheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **Cade — Waitlist**.
3. Leave it open; the next step happens from inside it.

## 2. Add the script

1. In the spreadsheet menu: **Extensions → Apps Script**.
2. Delete whatever code is in the editor.
3. Open `apps-script.gs` from this repository, copy its entire contents,
   and paste them into the Apps Script editor.
4. Near the top of the script, set `NOTIFY_EMAIL` to the email address that
   should receive new-lead alerts, e.g.:

   ```javascript
   var NOTIFY_EMAIL = 'cade@example.com';
   ```

5. Click the **Save** icon.

## 3. Deploy it as a Web app

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** `Waitlist form`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Google will ask you to authorize the script — approve it (it needs
   permission to edit the sheet and send email from your account).
6. Copy the **Web app URL**. It ends in `/exec`.

## 4. Connect the site to it

1. Open `index.html` in this repository.
2. Find this line inside the `<script>` block:

   ```javascript
   var FORM_ENDPOINT = 'REPLACE_WITH_APPS_SCRIPT_URL';
   ```

3. Replace the placeholder with the Web app URL you copied:

   ```javascript
   var FORM_ENDPOINT = 'https://script.google.com/macros/s/XXXXX/exec';
   ```

4. Save, commit, and redeploy the site to Vercel.

## 5. Test it

1. On the live site, fill in the waitlist form and submit.
2. Confirm a new row appears in the **Waitlist** tab of the spreadsheet.
3. Confirm the notification email arrives at `NOTIFY_EMAIL`.

## Updating the script later

If you change `apps-script.gs`, you must redeploy: **Deploy → Manage
deployments → (edit, the pencil icon) → Version: New version → Deploy**.
The `/exec` URL stays the same, so no site change is needed.

## Notes

- Free Gmail accounts can send roughly 100 emails/day via Apps Script —
  far more than this form will need.
- Submissions are also stored in the sheet even if an email ever fails,
  so no lead is lost.
