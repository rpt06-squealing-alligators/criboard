module.exports = {
  DBNAME: process.env.RDS_DB_NAME ||'sa',
  DBUSERNAME: process.env.RDS_USERNAME || 'root',
  DBPASSWORD: process.env.RDS_PASSWORD || '',
  DBHOST: process.env.RDS_HOSTNAME || 'localhost',
  DBPORT: process.env.RDS_PORT || ''
};

// module.exports = {
//   DBNAME: 'sa',
//   DBUSERNAME: 'criboard',
//   DBPASSWORD: 'criboard',
//   DBHOST: 'criboard.c7kotp7qpnbo.us-west-2.rds.amazonaws.com',
//   DBPORT: 3306
// };