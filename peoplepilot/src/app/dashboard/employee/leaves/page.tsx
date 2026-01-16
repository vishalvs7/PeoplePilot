'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock leave data
const leaveBalance = [
  { type: 'Casual Leave', total: 12, used: 4, balance: 8 },
  { type: 'Sick Leave', total: 10, used: 2, balance: 8 },
  { type: 'Earned Leave', total: 15, used: 5, balance: 10 },
  { type: 'Other Leave', total: 5, used: 1, balance: 4 },
];

const myLeaves = [
  { id: 1, type: 'Casual Leave', from: '2024-01-20', to: '2024-01-22', days: 3, reason: 'Family function', status: 'Approved' },
  { id: 2, type: 'Sick Leave', from: '2024-01-08', to: '2024-01-09', days: 2, reason: 'Medical checkup', status: 'Approved' },
  { id: 3, type: 'Earned Leave', from: '2024-02-01', to: '2024-02-05', days: 5, reason: 'Vacation', status: 'Pending' },
  { id: 4, type: 'Casual Leave', from: '2023-12-25', to: '2023-12-26', days: 2, reason: 'Christmas holiday', status: 'Approved' },
];

export default function EmployeeLeavesPage() {
  const [activeTab, setActiveTab] = useState('apply');
  const [leaveType, setLeaveType] = useState('casual');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [totalDays, setTotalDays] = useState(0);

  const calculateDays = () => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays);
    }
  };

  const handleApplyLeave = () => {
    if (!fromDate || !toDate || !reason) {
      alert('Please fill all required fields');
      return;
    }
    alert(`Leave application submitted for ${totalDays} days`);
    // Reset form
    setFromDate('');
    setToDate('');
    setReason('');
    setTotalDays(0);
    setActiveTab('history');
  };

  const handleCancelLeave = (id: number) => {
    if (confirm('Are you sure you want to cancel this leave request?')) {
      alert(`Leave request ${id} cancelled`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Leaves</h1>
          <p className="text-gray-600">Apply for leaves and track your leave balance</p>
        </div>
        <Button onClick={() => setActiveTab('apply')}>🏝️ Apply Leave</Button>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {leaveBalance.map((leave, index) => (
          <Card key={index} className="p-6 text-center">
            <h3 className="font-medium text-gray-900 mb-2">{leave.type}</h3>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-bold text-gray-900">{leave.balance}</p>
              <p className="text-sm text-gray-500 ml-1">/ {leave.total}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">Used: {leave.used} days</p>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(leave.used / leave.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'apply'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('apply')}
          >
            Apply Leave
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Leave History
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

      {/* Apply Leave Form */}
      {activeTab === 'apply' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Apply for Leave</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type *</label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="earned">Earned Leave</option>
                  <option value="other">Other Leave</option>
                </select>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {leaveBalance.find(l => l.type.toLowerCase().includes(leaveType))?.balance || 0} days
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    calculateDays();
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                    calculateDays();
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <span className="text-sm font-medium text-gray-900">{totalDays} day(s)</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  {totalDays > 0 ? 
                    `Your leave will be from ${fromDate} to ${toDate} (${totalDays} days)` :
                    'Select dates to calculate duration'
                  }
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Leave *</label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide details about your leave..."
              />
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => {
                  setFromDate('');
                  setToDate('');
                  setReason('');
                  setTotalDays(0);
                }}>
                  Clear
                </Button>
                <Button onClick={handleApplyLeave}>
                  Submit Leave Application
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Leave History */}
      {activeTab === 'history' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Leave History</h2>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
              <Input placeholder="Search leaves..." className="w-48" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        leave.type === 'Casual Leave' ? 'bg-blue-100 text-blue-800' :
                        leave.type === 'Sick Leave' ? 'bg-green-100 text-green-800' :
                        leave.type === 'Earned Leave' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {leave.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {leave.from} to {leave.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {leave.days} day(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {leave.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        leave.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.type === 'Casual Leave' ? '2024-01-10' : 
                       leave.type === 'Sick Leave' ? '2024-01-05' :
                       leave.type === 'Earned Leave' ? '2024-01-14' : '2023-12-20'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {leave.status === 'Pending' ? (
                        <button
                          onClick={() => handleCancelLeave(leave.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button className="text-primary hover:text-primary-dark">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Upcoming Holidays */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Upcoming Holidays</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Republic Day</h3>
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                National
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Friday, 26 January 2024</p>
            <p className="text-xs text-gray-500">Office closed</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Holi</h3>
              <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                Festival
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Friday, 8 March 2024</p>
            <p className="text-xs text-gray-500">Festival holiday</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Good Friday</h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Observance
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Friday, 29 March 2024</p>
            <p className="text-xs text-gray-500">Office closed</p>
          </div>
        </div>
      </Card>
    </div>
  );
}