'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock leave data
const pendingLeaves = [
  { id: 1, employee: 'Rajesh Kumar', type: 'Casual Leave', from: '2024-01-20', to: '2024-01-22', days: 3, reason: 'Family function', appliedOn: '2024-01-10' },
  { id: 2, employee: 'Priya Sharma', type: 'Sick Leave', from: '2024-01-18', to: '2024-01-19', days: 2, reason: 'Medical checkup', appliedOn: '2024-01-12' },
  { id: 3, employee: 'Amit Patel', type: 'Earned Leave', from: '2024-02-01', to: '2024-02-05', days: 5, reason: 'Vacation', appliedOn: '2024-01-14' },
];

const approvedLeaves = [
  { id: 4, employee: 'Neha Singh', type: 'Maternity Leave', from: '2024-01-15', to: '2024-04-15', days: 90, reason: 'Maternity', status: 'Approved' },
  { id: 5, employee: 'Suresh Reddy', type: 'Casual Leave', from: '2024-01-10', to: '2024-01-12', days: 3, reason: 'Wedding', status: 'Approved' },
];

const leaveTypes = [
  { type: 'Casual Leave', total: 12, used: 4, balance: 8 },
  { type: 'Sick Leave', total: 10, used: 2, balance: 8 },
  { type: 'Earned Leave', total: 15, used: 5, balance: 10 },
  { type: 'Maternity Leave', total: 90, used: 0, balance: 90 },
  { type: 'Paternity Leave', total: 15, used: 0, balance: 15 },
];

export default function LeavesPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const handleApprove = (id: number) => {
    alert(`Leave ${id} approved`);
  };

  const handleReject = (id: number) => {
    alert(`Leave ${id} rejected`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600">Approve, reject, and track employee leaves</p>
        </div>
        <Button>➕ Apply Leave (HR)</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500 mt-1">Require action</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600">⏳</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved This Month</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500 mt-1">Total leaves</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">✅</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected This Month</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-xs text-gray-500 mt-1">With reasons</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600">❌</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">1.2 days</p>
              <p className="text-xs text-gray-500 mt-1">For approval</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">⏱️</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Approval ({pendingLeaves.length})
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'approved'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('approved')}
          >
            Approved Leaves
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rejected'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected Leaves
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'calendar'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Leave Calendar
          </button>
        </nav>
      </div>

      {/* Pending Leaves */}
      {activeTab === 'pending' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leaves Pending Approval</h2>
          <div className="space-y-4">
            {pendingLeaves.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{leave.employee}</h4>
                      <p className="text-sm text-gray-500">Applied on: {leave.appliedOn}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      leave.type === 'Casual Leave' ? 'bg-blue-100 text-blue-800' :
                      leave.type === 'Sick Leave' ? 'bg-green-100 text-green-800' :
                      leave.type === 'Earned Leave' ? 'bg-purple-100 text-purple-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {leave.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Dates</p>
                      <p className="font-medium">{leave.from} to {leave.to}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">{leave.days} day(s)</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reason</p>
                      <p className="font-medium">{leave.reason}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-6 flex space-x-2">
                  <Button 
                    onClick={() => handleApprove(leave.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    ✅ Approve
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleReject(leave.id)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    ❌ Reject
                  </Button>
                  <Button variant="ghost">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Approved Leaves */}
      {activeTab === 'approved' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Approved Leaves</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvedLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leave.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.from} to {leave.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.days} days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Leave Balance Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {leaveTypes.map((type, index) => (
            <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{type.type}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{type.balance}</p>
                  <p className="text-xs text-gray-500">Balance</p>
                </div>
                <div className="text-sm">
                  <p>Total: {type.total} | Used: {type.used}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}