Dashboard layout fix: Latest SIEL ECR and Latest SIEL ECN are now full-width vertical sections, one below the other.

# ECR & ECN Management

GitHub Pages-ready static web application.

## Important GitHub Pages setup
1. Upload the **contents of this folder** to the root of your repository (not the ZIP itself).
2. Make sure the entry file is exactly `index.html` (lowercase).
3. GitHub → Repository → Settings → Pages.
4. Under Build and deployment, select **Deploy from a branch**.
5. Select `main` (or your branch) and folder `/ (root)`, then Save.
6. Wait a few minutes and open the URL shown by GitHub Pages.

GitHub Pages is case-sensitive, so `Index.html` will not work as the entry file.

## Local data
The static version stores working data in browser localStorage. It also supports downloading updated XLSX/CSV reports. The client-side admin credentials are demo credentials only and are not suitable for production security.

## Multi-browser shared data
GitHub Pages alone cannot share `localStorage` between browsers. This version supports a Google Apps Script backend.

1. Create a Google Sheet.
2. Open Extensions -> Apps Script.
3. Paste `Backend.gs` into Code.gs.
4. Deploy it as a Web app, Execute as you, access Anyone.
5. Copy the `/exec` URL into `Config.js` as `apiUrl`.
6. Upload the updated files to GitHub Pages.

The first browser with existing local records will migrate them when the shared sheet is empty. After that, records are saved to the shared backend and loaded by other browsers.

## Requested UI changes in this version
- Settings menu/page removed.
- Dashboard ECR section and Latest ECR are above ECN section and Latest ECN.
- Priority in data entry is a dropdown: A, B, C, D, E.
- Shared backend support added for cross-browser data.
