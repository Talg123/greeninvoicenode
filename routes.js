const express = require('express');
const app = express();
const { sequelize, Employee, Manager, Department,
    EmployeeManager, ManagerDeprtment } = require('./db.js');

app.post('/employee', async ({ body: { firstName, lastName } }, res) => {
    try {
        if (!firstName || !lastName) {
            return res.status(400).json({
                data: null,
                message: 'Missing either firstName or lastName'
            });
        }
        const employee = await Employee.create({ firstName, lastName });
        res.json({
            data: employee,
            message: 'Employee added successfully!'
        })
    } catch (error) {
        res.status(500).json({
            data: error.message,
            message: 'Internal server error'
        })
    }
});

app.post('/manager', async ({ body: { firstName, lastName } }, res) => {
    try {
        if (!firstName || !lastName) {
            return res.status(400).json({
                data: null,
                message: 'Missing either firstName or lastName'
            });
        }
        const manager = await Manager.create({ firstName, lastName });
        res.json({
            data: manager,
            message: 'Manager added successfully!'
        })
    } catch (error) {
        res.status(500).json({
            data: error.message,
            message: 'Internal server error'
        })
    }
});

app.post('/department', async ({ body: { name } }, res) => {
    try {
        if (!name) {
            return res.status(400).json({
                data: null,
                message: 'Missing name for the department'
            });
        }
        const department = await Department.create({ name });
        res.json({
            data: department,
            message: 'Department added successfully!'
        })
    } catch (error) {
        res.status(500).json({
            data: error.message,
            message: 'Internal server error'
        })
    }
});

app.post('/employee/manager', async ({ body: { employeeID, managerID } }, res) => {
    try {
        if (!employeeID || !managerID) {
            return res.status(400).json({
                data: null,
                message: 'Missing either employeeID or managerID'
            });
        }
        const employeeManager = await EmployeeManager.create({ employeeID, managerID });
        res.json({
            data: employeeManager,
            message: 'Employee added to manager successfully!'
        })
    } catch (error) {
        res.status(500).json({
            data: error.message,
            message: 'Internal server error'
        })
    }
});

app.post('/manager/department', async ({ body: { departmentID, managerID } }, res) => {
    try {
        if (!departmentID || !managerID) {
            return res.status(400).json({
                data: null,
                message: 'Missing either departmentID or managerID'
            });
        }
        const deprtmentManager = await ManagerDeprtment.create({ departmentID, managerID });
        res.json({
            data: deprtmentManager,
            message: 'Manager added to department successfully!'
        })
    } catch (error) {
        res.status(500).json({
            data: error.message,
            message: 'Internal server error'
        })
    }
});

app.get('/department', async (req, res) => {
    try {
        const sum = await sequelize.query(`
        SELECT COUNT(*) as Sum, CONCAT(m.firstName, " ", m.lastName) as Name FROM manager_departments as md
        left join employee_managers as em ON em.managerID = md.managerID
        inner join managers as m ON m.id = em.managerID
        group by md.managerID
        `,  { type: sequelize.QueryTypes.SELECT });

        if (sum.length) {
            const highest = sum.reduce((prev, current) => (prev.sum > current.sum) ? prev : current)
            return res.json({
                data: highest,
                message: 'Found'
            })
        }
        
        res.json({
            data: null,
            message: 'OK'
        })
    } catch (error) {
        res.status(500).json({
            data: error.message,
            message: 'Internal server error'
        })
    }
});

module.exports = app