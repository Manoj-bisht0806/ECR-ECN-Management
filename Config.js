// ECR & ECN Management configuration
window.APP_CONFIG = {
  appName: "ECR & ECN Management",
  company: "SIEL",
  admin: {
    // Demo-only client-side admin login. Use a server for real authentication.
    username: "admin",
    password: "admin123"
  },
  storageKey: "siel_ecr_ecn_data_v3",

  // IMPORTANT FOR MULTI-BROWSER SHARING:
  // Put your deployed Google Apps Script Web App /exec URL here.
  // Leave blank only if you want browser-local storage.
  apiUrl: "",

  autoDownloadExcelOnSave: false,
  sheetJsUrl: "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"
};
