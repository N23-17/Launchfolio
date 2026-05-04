function getData() {
  return {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    about: document.getElementById("about").value,
    skills: document.getElementById("skills").value.split(","),
    project1: document.getElementById("project1").value,
    project2: document.getElementById("project2").value,
  };
}

function buildTemplate(d) {
  return `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>${d.name || "Your Name"}</h1>
  <h3>${d.role || "Your Role"}</h3>

  <div class="box">
    <h2>About</h2>
    <p>${d.about || "Write about yourself..."}</p>
  </div>

  <div class="box">
    <h2>Skills</h2>
    ${d.skills.map(s => `<span class="tag">${s.trim()}</span>`).join("")}
  </div>

  <div class="box">
    <h2>Projects</h2>
    <p>• ${d.project1 || "Project one"}</p>
    <p>• ${d.project2 || "Project two"}</p>
  </div>

</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
</html>
`;
}

function buildCSS() {
  return `
body {
  font-family: Arial;
  background: #0b0b0b;
  color: #fff;
  padding: 40px;
}

h1 { color: #c8ff00; }

.box { margin-bottom: 20px; }

.tag {
  display:inline-block;
  padding:5px 10px;
  margin:5px;
  background:#1a1a1a;
}
`;
}

function buildReadme(d) {
  return `
# ${d.name}'s Portfolio

This is a personal portfolio website generated using the Portfolio Launcher Kit.

## 🚀 How to Use

1. Upload this folder to your GitHub account
2. Connect your repo to Netlify
3. Deploy instantly

## ✏️ Customize

Edit index.html to update your content.

## 🌐 Deployment (Netlify)

- Go to Netlify
- Click "Add new site"
- Import your GitHub repo
- Deploy

Done.

---

Built to help junior developers launch fast.
`;
}

function updatePreview() {
  const data = getData();

  let html = buildTemplate(data);

  html = html.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>${buildCSS()}</style>`
  );

  document.getElementById("preview").srcdoc = html;
}

async function download() {
  const data = getData();
  const html = buildTemplate(data);
  const css = buildCSS();

  const zip = new JSZip();

  zip.file("index.html", html);
  zip.file("style.css", css);
  zip.file("README.md", buildReadme(data));

  const content = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(content);
  a.download = "portfolio.zip";
  a.click();
}

window.onload = updatePreview;