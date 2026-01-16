'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Download, FileText, Eye, Calendar, DollarSign, TrendingUp, Percent, CreditCard } from 'lucide-react';

// Mock salary data
const salaryStructure = [
  { component: 'Basic Salary', amount: 40000, percentage: 58 },
  { component: 'House Rent Allowance', amount: 16000, percentage: 23 },
  { component: 'Conveyance Allowance', amount: 8000, percentage: 12 },
  { component: 'Medical Allowance', amount: 3000, percentage: 4 },
  { component: 'Special Allowance', amount: 1500, percentage: 2 },
];

const payslipHistory = [
  { id: 1, month: 'January 2024', basic: 40000, deductions: 4500, net: 68500, status: 'paid', date: 'Jan 31, 2024' },
  { id: 2, month: 'December 2023', basic: 40000, deductions: 4500, net: 68500, status: 'paid', date: 'Dec 31, 2023' },
  { id: 3, month: 'November 2023', basic: 40000, deductions: 4500, net: 68500, status: 'paid', date: 'Nov 30, 2023' },
  { id: 4, month: 'October 2023', basic: 40000, deductions: 4200, net: 68200, status: 'paid', date: 'Oct 31, 2023' },
  { id: 5, month: 'September 2023', basic: 38000, deductions: 4000, net: 64800, status: 'paid', date: 'Sep 30, 2023' },
];

const deductions = [
  { name: 'Professional Tax', amount: 200 },
  { name: 'Provident Fund', amount: 1800 },
  { name: 'Income Tax', amount: 2500 },
];

export default function EmployeeSalaryPage() {
  const [selectedMonth, setSelectedMonth] = useState('January 2024');
  const [activeTab, setActiveTab] = useState('current');

  const handleDownloadPayslip = (month: string) => {
    alert(`Downloading payslip for ${month}`);
  };

  const handleViewPayslip = (month: string) => {
    alert(`Opening payslip for ${month}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Salary & Payslips</h1>
          <p className="text-gray-600">View your salary structure and download payslips</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Account Number</p>
            <p className="font-semibold">XXXX-XXXX-1234</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Current Month Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">January 2024 Salary Summary</h2>
            <p className="text-sm text-gray-600">Salary credited on Jan 31, 2024</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Net Salary</p>
              <p className="text-3xl font-bold text-green-600">₹68,500</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Payslip
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Earnings */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₹73,000</p>
              </div>
            </div>
            <div className="space-y-3">
              {salaryStructure.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{item.component}</span>
                  <span className="font-medium text-gray-900">₹{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-rose-100 p-3 rounded-lg mr-4">
                <Percent className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Deductions</p>
                <p className="text-2xl font-bold text-gray-900">₹4,500</p>
              </div>
            </div>
            <div className="space-y-3">
              {deductions.map((deduction, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{deduction.name}</span>
                  <span className="font-medium text-gray-900">₹{deduction.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-rose-200">
                <div className="flex justify-between items-center font-medium">
                  <span className="text-gray-900">Total Deductions</span>
                  <span className="text-gray-900">₹4,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Salary</p>
                <p className="text-2xl font-bold text-gray-900">₹68,500</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Bank Account</span>
                <span className="font-medium text-gray-900">HDFC Bank</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Account Number</span>
                <span className="font-medium text-gray-900">**** **** 1234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Payment Date</span>
                <span className="font-medium text-gray-900">Jan 31, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Payment Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'current'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('current')}
          >
            Current Salary
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Payslip History
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tax'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('tax')}
          >
            Tax Documents
          </button>
        </nav>
      </div>

      {/* Payslip History */}
      {activeTab === 'history' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Payslip History</h2>
            <div className="flex space-x-4">
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                <option>All Months</option>
                <option>Last 3 Months</option>
                <option>2024</option>
                <option>2023</option>
              </select>
              <Input placeholder="Search payslips..." className="w-48" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payslipHistory.map((payslip) => (
                  <tr key={payslip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900">{payslip.month}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">₹{payslip.basic.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-rose-600 font-medium">-₹{payslip.deductions.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-green-600 font-bold">₹{payslip.net.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        payslip.status === 'paid' ? 'bg-green-100 text-green-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {payslip.status.charAt(0).toUpperCase() + payslip.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payslip.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleViewPayslip(payslip.month)}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownloadPayslip(payslip.month)}
                        className="text-gray-600 hover:text-gray-800 inline-flex items-center"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tax Documents */}
      {activeTab === 'tax' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Tax Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Form 16 (AY 2023-24)</h3>
                  <p className="text-sm text-gray-600">Annual tax statement</p>
                </div>
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">Your annual tax statement for financial year 2023-24</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Investment Proofs</h3>
                  <p className="text-sm text-gray-600">Submitted documents</p>
                </div>
                <FileText className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">Your submitted investment declarations for tax saving</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Salary Growth */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Salary Growth Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Starting Salary</p>
            <p className="text-xl font-bold text-gray-900">₹55,000</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Current Salary</p>
            <p className="text-xl font-bold text-green-600">₹68,500</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Growth Amount</p>
            <p className="text-xl font-bold text-blue-600">₹13,500</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Growth Percentage</p>
            <p className="text-xl font-bold text-purple-600">24.5%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}