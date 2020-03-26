# 短網址產生器
短網址產生器, 本網路應用程式讓使用者能將冗長的網址轉成短而好記的網址, 並能將其複製或直接經由程式上連線到原網頁.

## 說明
- 輸入您欲縮短的網址, 按下Shorten URL按鈕, 即產生短網址
- 產生網址後按下copy鍵, 即可複製短網址, 或亦能經由畫面上的連線開啟另一頁連線至原網頁


### 安裝流程
- Clone or download 此專案至本機電腦
- git clone https://github.com/lothecode/URLShortener.git
- 安裝 npm 套件，根據package.json內紀錄之套件進行安裝。
- 待terminal將資料新增至資料庫後啟動專案，並監聽伺服器, npm run start
- 開啟瀏覽器，輸入http://localhost:3000 ，即可使用本應用程式。


### 環境說明環境配置
- Express
- MongoDB
- Robo 3T

### 環境套件
- Nodemon
- express-handlebars
- body-parser
- mongoose
- express-session
- dotenv
- connect-flash
- clipboard
