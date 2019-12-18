var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "legolas12",
    database: "top_songsDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    addEmployee();
});

function addEmployee() {
    console.log("Adding a new Employee...\n");
    var query = connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: "James",
            last_name: "Brown",
            role_id: 2,
            manager_id: 0
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee added!\n");
            updateEmployee();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function updateEmployee() {
    console.log("Updating employee...\n");
    var query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
            {
                role_id: 1
            },
            {
                last_name: "Brown"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee updated!\n");

            removeEmployee();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function removeEmployee() {
    console.log("Removing employee from database...");
    connection.query(
        "DELETE FROM database WHERE ?",
        {
            id: 2
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee removed!\n");

            readEmployee();
        }
    );
}

function readEmployee() {
    console.log("Selecting all employees in database...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}