'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock payroll data
const payrollRuns = [
  { id: 1, month: 'December 2023', status: 'Completed', totalAmount: '₹12,45,800', employees: 47, processedOn: '2024-01-05' },
  { id: 2, month: 'November 2023', status: 'Completed', totalAmount: '₹12,30,500', employees: 46, processedOn: '2023-12-05' },
  { id: 3, month: 'October 2023', status: 'Completed', totalAmount: '₹12,15,200', employees: 45, processedOn: '2023-11-05' },
  { id: 4, month: 'January 2024', status: 'Pending', totalAmount: '₹12,60,000', employees: 47, processedOn: 'Upcoming' },
];

const salaryComponents = [
  { component: 'Basic Salary', percentage: '50%', description: 'Fixed basic pay' },
  { component: 'HRA', percentage: '20%', description: 'House Rent Allowance' },
  { component: 'Special Allowance', percentage: '15%', description: 'Performance linked' },
  { component: 'PF Contribution', percentage: '12%', description: 'Employer PF' },
  { component: 'Bonus', percentage: '8%', description: 'Annual bonus' },
  { component: 'Other Allowances', percentage: '5%', description: 'Travel, medical, etc.' },
];

export default function PayrollPage() {
  const [selectedMonth, setSelectedMonth] = useState('January 2024');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600">Process and manage employee salaries</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">📥 Export Reports</Button>
          <Button>💰 Run Payroll</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Payroll</p>
              <p className="text-2xl font-bold text-gray-900">₹12.6L</p>
              <p className="text-xs text-gray-500 mt-1">For Jan 2024</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">💰</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Salary</p>
              <p className="text-2xl font-bold text-gray-900">₹26,800</p>
              <p className="text-xs text-gray-500 mt-1">Per employee</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">📊</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tax Deduction</p>
              <p className="text-2xl font-bold text-gray-900">₹2.1L</p>
              <p className="text-xs text-gray-500 mt-1">Monthly TDS</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600">📉</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Next Payday</p>
              <p className="text-2xl font-bold text-gray-900">25 Jan</p>
              <p className="text-xs text-gray-500 mt-1">In 10 days</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">📅</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Payroll Runs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Payroll History</h2>
          <div className="flex space-x-2">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option>January 2024</option>
              <option>December 2023</option>
              <option>November 2023</option>
              <option>October 2023</option>
            </select>
            <Button variant="outline">View All</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollRuns.map((run) => (
                <tr key={run.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{run.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      run.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {run.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{run.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{run.employees}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{run.processedOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary hover:text-primary-dark">View</button>
                      <button className="text-blue-600 hover:text-blue-800">Download</button>
                      {run.status === 'Pending' && (
                        <button className="text-green-600 hover:text-green-800">Process</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Salary Structure */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Structure Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salary Components */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Salary Components</h3>
            <div className="space-y-3">
              {salaryComponents.map((component, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{component.component}</p>
                    <p className="text-sm text-gray-500">{component.description}</p>
                  </div>
                  <span className="font-bold text-gray-900">{component.percentage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie Chart Visualization */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Salary Distribution</h3>
            <div className="flex items-center justify-center h-64">
              {/* Simple pie chart visualization */}
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#3B82F6 0% 50%, #10B981 50% 70%, #8B5CF6 70% 85%, #F59E0B 85% 93%, #EF4444 93% 100%)' }}></div>
                <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold">100%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm">Basic (50%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-sm">HRA (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                <span className="text-sm">Allowance (15%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm">Bonus (8%)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-green-600 text-xl">💰</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-2">Run Payroll</h3>
          <p className="text-sm text-gray-600">Process salaries for selected month</p>
        </Card>
        <Card className="p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-blue-600 text-xl">📊</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-2">Generate Reports</h3>
          <p className="text-sm text-gray-600">Salary slips, tax reports, etc.</p>
        </Card>
        <Card className="p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-purple-600 text-xl">⚙️</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-2">Configure</h3>
          <p className="text-sm text-gray-600">Salary structure, deductions, etc.</p>
        </Card>
      </div>
    </div>
  );
}