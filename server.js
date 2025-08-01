const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const env = {
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "https://api-brainrace.duckdns.org",
    REACT_APP_WS_BASE_URL: process.env.REACT_APP_WS_BASE_URL || "wss://api-brainrace.duckdns.org",
};
const fs = require('fs');
const envFileContent = `window.__ENV__ = ${JSON.stringify(env)};`;
fs.writeFileSync(path.join(__dirname, 'build', 'env.js'), envFileContent);

// 정적 파일 제공 (build 디렉토리)
app.use(express.static(path.join(__dirname, 'build')));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// SPA 라우팅 대응: 나머지 요청은 index.html로
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ React 앱이 http://localhost:${PORT} 에서 서비스 중`);
});
