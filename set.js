const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUllM25ieUpwdURETDJaaUZSMG5YRERlWU1FVEpHTUxLb2tGR3VHUkgxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1IyQTk2SkRPSC9IZWpnbVp3ZW1xM01CaDYrbmhGWVI2SXk3eEtOUkJWST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SFpRZkpDNlBBV1lyWXgyWXpjc2ZHUVpuRUkrL0RvWnlnMTZud2FpRm5zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQ2R4SzhpS0tZRE9KcjFJMThyZDRreVEvM2NGZ3BTVm5kNHRubEhxU0RNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndQYW13c3NGaTR6T2pMeGV3emY5amg2OFk2SWhIb0g5dUUrczR5L1ZEWGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndKMnZiUjNDQTlxbi9YSTdTRjR2WFZpREEzd0pZWHB0YWI3L2xWSXRiUUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0U3M2NpQTROTkhNR3NrejFPRzRqN3d5VWVNanhIcExqeUhvVmU1bjNXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekVTemt1eVdaSkQ5UGtNY3lWaUNjVnoyVE5OejJBT3p0QnFLbzYzbDVBQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNqSDlhMEZ4Uy80TnJkaEU4ZVkycm9jR0kwK21kcWJTVVJxWTV6alB1OGpYL0JyRkxHYXMrU0FBMk5iVytnY05DZ2w5WElrL1BFOWFoMFJzT082RERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDIsImFkdlNlY3JldEtleSI6IjQxcDZOOVpNdGNscE9PL1UxSEM5ZDUyTkp5c3VVZTdaY2kybS9QOU5KS1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1Njc0MDI4NDc1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY5NTcxNTlDMEVCMjUxOEI4MkRFMTAwREEwRTlFNzI5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk2NTIyMjl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY3NDAyODQ3NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGQzA5OTE2QzI2RkQ3MzhFRjE2NTYxOTY0QzZFRTMxRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NjUyMjI5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2NzQwMjg0NzVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOUMyOTg3QjE2RTI1NzREQzY1RkE2REVBMjIzMDM2QTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTY1MjIzNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiU0RSN1lTNlYiLCJtZSI6eyJpZCI6IjI1NTY3NDAyODQ3NToxOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJLaGFuIEJhaXlhIiwibGlkIjoiMjUwNDEwMDY1NTEwNDk2OjE4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUw0L01rQkVQV2xwc0lHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZ1NhL2VsNit1YkExYjl4TTE3RVk4TmMwSlVDQXI1K1NLU2RyTkJCOFJ6UT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiT29DOGVDS2lrUXhxZXJ5OHNnNzFkdlpqS3Bod1ZWL2o3M2Qvdk1FYUQ1aUUyZzNMTDZ5TTR3WnhwdlpCTXZ3bHZwQ3ZmM1NoeXBaelkwZ2cxR1lwQVE9PSIsImRldmljZVNpZ25hdHVyZSI6Ii9iY3B4N2lhRHhQR0ovRnhoTUxLRjJFNm9RT1NaMm5XT1lwSnR6UUl6dk9weGpjL0lCM3cwdmxRWWJmTlU1d052NW03VFVWY3J6NnRWTFRyNDBPdERnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njc0MDI4NDc1OjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllFbXYzcGV2cm13TlcvY1ROZXhHUERYTkNWQWdLK2ZraWtuYXpRUWZFYzAifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTY1MjIyNywibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOTVMifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "MOE-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "12136061765",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'MOE-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

