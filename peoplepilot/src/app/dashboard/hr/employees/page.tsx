'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock employee data
const mockEmployees = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@company.com', department: 'Engineering', position: 'Senior Developer', status: 'Active', joinDate: '2022-03-15' },
  { id: 2, name: 'Priya Sharma', email: 'priya@company.com', department: 'HR', position: 'HR Manager', status: 'Active', joinDate: '2021-08-22' },
  { id: 3, name: 'Amit Patel', email: 'amit@company.com', department: 'Sales', position: 'Sales Executive', status: 'Active', joinDate: '2023-01-10' },
  { id: 4, name: 'Neha Singh', email: 'neha@company.com', department: 'Marketing', position: 'Marketing Specialist', status: 'On Leave', joinDate: '2022-11-05' },
  { id: 5, name: 'Suresh Reddy', email: 'suresh@company.com', department: 'Engineering', position: 'Frontend Developer', status: 'Active', joinDate: '2023-06-18' },
  { id: 6, name: 'Anjali Mehta', email: 'anjali@company.com', department: 'Finance', position: 'Accountant', status: 'Active', joinDate: '2021-12-01' },
  { id: 7, name: 'Vikram Joshi', email: 'vikram@company.com', department: 'Operations', position: 'Operations Manager', status: 'Inactive', joinDate: '2020-09-14' },
  { id: 8, name: 'Kavita Nair', email: 'kavita@company.com', department: 'Customer Support', position: 'Support Lead', status: 'Active', joinDate: '2022-07-30' },
];

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const departments = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'Customer Support'];
  const statuses = ['All', 'Active', 'Inactive', 'On Leave'];

  const filteredEmployees = mockEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                         emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        <Button>
          <span className="mr-2">➕</span> Add Employee
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept.toLowerCase()}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status.toLowerCase().replace(' ', '_')}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">👥</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">✅</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On Leave</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600">🏝️</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">+2</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">🆕</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Employee Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary font-medium">{emp.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                        <div className="text-sm text-gray-500">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      emp.status === 'Active' ? 'bg-green-100 text-green-800' :
                      emp.status === 'On Leave' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary hover:text-primary-dark">View</button>
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Deactivate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
            <span className="font-medium">47</span> employees
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}