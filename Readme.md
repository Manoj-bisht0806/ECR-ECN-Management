# ECR & ECN Management

Responsive R&D Engineering Change Request / Engineering Change Notice management application.

## Included files
- `Index.html` - application shell
- `Script.js` - application logic, routing, CRUD, filters, reports, Excel/CSV export
- `Style.css` - responsive UI styling
- `Config.js` - app configuration and demo admin credentials
- `Ecr.json` - seed ECR/ECN data
- `ecrdata.xlsx` - starter Excel workbook
- `references/` - supplied UI reference screenshots used for the layout

## Run locally
Open `Index.html` in a browser. For best results use a small static server (for example VS Code Live Server) because browsers can restrict local-file requests.

## GitHub Pages
Upload all files to a GitHub repository and enable GitHub Pages. The app uses SheetJS from jsDelivr for `.xlsx` export.

## Data persistence
Records entered in the browser are saved to `localStorage`, so refreshes do not lose them on the same browser/device.

The app can export all current records as:
- Excel `.xlsx` with separate ECR and ECN sheets
- Excel-compatible `.csv`

A "Choose Excel file" action is provided for browsers that support the File System Access API. After choosing a workbook, saving a record can update that workbook. Otherwise use the Download XLSX button.

## Authentication
The demo Admin login is client-side only and is NOT secure for production. Default credentials:
- User: `admin`
- Password: `admin123`

For real deployment, replace this with server-side authentication, hashed passwords, sessions/JWT, role checks, and a database/API.

## Main features
- Dashboard with ECR/ECN KPI cards and charts
- Clickable KPI cards
- Latest ECR/ECN and View All
- Clickable ECR/ECN numbers
- ECR and ECN searchable/filterable detail pages
- Edit enabled only for Open records on normal detail pages
- Admin can edit/delete records after login
- ECR/ECN data-entry tabs
- Required-field validation and success message
- Team-wise drill-down
- Date-filtered reports
- XLSX and CSV export
- Responsive layout based on supplied reference screenshots
