const Employee = require('../models/Employee.model');
const Department = require('../models/Department.model');

// Render employee list with pagination, search, and filter
exports.getEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, department, jobTitle } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (department) query.department = department;
        if (jobTitle) query.jobTitle = { $regex: jobTitle, $options: 'i' };

        const employees = await Employee.find(query)
            .populate('department')
            .populate('supervisor')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Employee.countDocuments(query);
        const departments = await Department.find();

        res.render('employees', {
            title: 'Employees',
            employees,
            departments,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            search: search || '',
            selectedDept: department || '',
            jobTitle: jobTitle || ''
        });
    } catch (error) {
        res.status(500).send("Error fetching employees: " + error.message);
    }
};


// Render form to create/edit an employee
exports.getEmployeeForm = async (req, res) => {
    try {
        const departments = await Department.find();
        const employees = await Employee.find().select('firstName lastName'); // For supervisor dropdown
        let employee = {};
        let title = 'Create Employee';

        if (req.params.id) {
            employee = await Employee.findById(req.params.id);
            title = 'Edit Employee';
        }

        res.render('employee_form', {
            title,
            departments,
            supervisors: employees,
            employee
        });
    } catch (error) {
        res.status(500).send("Error fetching data for form: " + error.message);
    }
};

// Handle create/update of an employee
exports.saveEmployee = async (req, res) => {
    const { id } = req.params;
    const employeeData = { ...req.body, supervisor: req.body.supervisor || null };

    try {
        if (id) {
            await Employee.findByIdAndUpdate(id, employeeData);
        } else {
            await Employee.create(employeeData);
        }
        res.redirect('/employees');
    } catch (error) {
        res.status(400).send("Error saving employee: " + error.message);
    }
};

// Handle employee deletion
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.redirect('/employees');
    } catch (error) {
        res.status(500).send("Error deleting employee: " + error.message);
    }
};