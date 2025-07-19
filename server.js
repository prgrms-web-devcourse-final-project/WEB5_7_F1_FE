const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 제공 (build 디렉토리)
app.use(express.static(path.join(__dirname, 'build')));

// SPA 라우팅 대응: 나머지 요청은 index.html로
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ React 앱이 http://localhost:${PORT} 에서 서비스 중`);
});
