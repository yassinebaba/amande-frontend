const fs = require("fs");
const path = require("path");

const FILES_TO_UPDATE = [
  "src/pages/AdminLogin.jsx",
  "src/pages/AdminPage.jsx",
  "src/components/BookingForm.jsx",
  "src/components/BookingModal.jsx",
  "src/utils/api.js",
];

const LOCALHOST = /http:\/\/localhost:5000/g;
const BASE_IMPORT = `import API_BASE_URL from "../utils/api";`;

FILES_TO_UPDATE.forEach((filePath) => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, "utf-8");

  // Replace localhost with API_BASE_URL
  if (LOCALHOST.test(content)) {
    content = content.replace(LOCALHOST, "${API_BASE_URL}");

    // Add import if missing
    if (!content.includes("import API_BASE_URL")) {
      const lines = content.split("\n");
      const importIndex = lines.findIndex((line) => line.startsWith("import"));
      lines.splice(importIndex + 1, 0, BASE_IMPORT);
      content = lines.join("\n");
    }

    // Wrap template literals
    content = content.replace(/\$\{API_BASE_URL\}\/([^\s"'`]+)/g, (_, endpoint) => {
      return `\`\${API_BASE_URL}/${endpoint}\``;
    });

    fs.writeFileSync(fullPath, content, "utf-8");
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`ℹ️ No localhost found in: ${filePath}`);
  }
});
