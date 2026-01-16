'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock attendance data
const mockAttendance = [
  { id: 1, name: 'Rajesh Kumar', date: '2024-01-15', checkIn: '09:02 AM', checkOut: '06:15 PM', status: 'Present', hours: '8h 13m' },
  { id: 2, name: 'Priya Sharma', date: '2024-01-15', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'Present', hours: '8h 15m' },
  { id: 3, name: 'Amit Patel', date: '2024-01-15', checkIn: '10:30 AM', checkOut: '07:00 PM', status: 'Late', hours: '7h 30m' },
  { id: 4, name: 'Neha Singh', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'On Leave', hours: '0h' },
  { id: 5, name: 'Suresh Reddy', date: '2024-01-15', checkIn: '09:00 AM', checkOut: '05:45 PM', status: 'Present', hours: '7h 45m' },
  { id: 6, name: 'Anjali Mehta', date: '2024-01-15', checkIn: '08:55 AM', checkOut: '06:10 PM', status: 'Present', hours: '8h 15m' },
  { id: 7, name: 'Vikram Joshi', date: '2024-01-15', checkIn: '09:10 AM', checkOut: '06:20 PM', status: 'Present', hours: '8h 10m' },
  { id: 8, name: 'Kavita Nair', date: '2024-01-15', checkIn: '09:05 AM', checkOut: '04:30 PM', status: 'Half Day', hours: '6h 25m' },
];

const monthlyStats = [
  { month: 'Jan', present: 85, absent: 5, late: 10, leave: 8 },
  { month: 'Feb', present: 82, absent: 8, late: 8, leave: 10 },
  { month: 'Mar', present: 88, absent: 3, late: 7, leave: 10 },
];

export default function AttendancePage() {
  const [date, setDate] = useState('2024-01-15');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAttendance = mockAttendance.filter(att => 
    statusFilter === 'all' || att.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600">Track and manage employee attendance</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">📥 Export Report</Button>
          <Button>📅 Mark Attendance</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Present Today</p>
              <p className="text-2xl font-bold text-gray-900">42/47</p>
              <p className="text-xs text-gray-500 mt-1">89% attendance</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">✅</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Late Today</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500 mt-1">6% late arrivals</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600">⏰</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On Leave</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-xs text-gray-500 mt-1">2 sick, 0 casual</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">🏝️</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Hours</p>
              <p className="text-2xl font-bold text-gray-900">7.8h</p>
              <p className="text-xs text-gray-500 mt-1">Daily average</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">⏱️</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="On Leave">On Leave</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary font-medium">{att.name.charAt(0)}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{att.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{att.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{att.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{att.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      att.status === 'Present' ? 'bg-green-100 text-green-800' :
                      att.status === 'Late' ? 'bg-amber-100 text-amber-800' :
                      att.status === 'On Leave' ? 'bg-blue-100 text-blue-800' :
                      att.status === 'Half Day' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {att.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{att.hours}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark">Regularize</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Monthly Trends */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trends</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Arrivals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyStats.map((stat, index) => {
                const total = stat.present + stat.absent + stat.late + stat.leave;
                const percentage = Math.round((stat.present / total) * 100);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.present}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.absent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.late}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.leave}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}