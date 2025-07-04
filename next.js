const sql = require("msnodesqlv8");

const connectionString = "server=DESKTOP-QHA6UUG\MSSQLSERVER03;Database=railway_reservation_system;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "SELECT * from passengerReg";

sql.query(connectionString, query, (err, rows) => {
    console.log(rows);
});