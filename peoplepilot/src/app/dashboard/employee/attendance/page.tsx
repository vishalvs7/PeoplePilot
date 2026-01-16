'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock attendance data
const monthlyAttendance = [
  { date: '2024-01-01', day: 'Mon', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: '8h 0m' },
  { date: '2024-01-02', day: 'Tue', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'Present', hours: '8h 15m' },
  { date: '2024-01-03', day: 'Wed', checkIn: '09:05 AM', checkOut: '05:45 PM', status: 'Present', hours: '7h 40m' },
  { date: '2024-01-04', day: 'Thu', checkIn: '10:30 AM', checkOut: '07:00 PM', status: 'Late', hours: '7h 30m' },
  { date: '2024-01-05', day: 'Fri', checkIn: '09:00 AM', checkOut: '06:15 PM', status: 'Present', hours: '8h 15m' },
  { date: '2024-01-08', day: 'Mon', checkIn: '-', checkOut: '-', status: 'On Leave', hours: '0h' },
  { date: '2024-01-09', day: 'Tue', checkIn: '09:10 AM', checkOut: '04:30 PM', status: 'Half Day', hours: '6h 20m' },
  { date: '2024-01-10', day: 'Wed', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: '8h 0m' },
  { date: '2024-01-11', day: 'Thu', checkIn: '08:55 AM', checkOut: '06:10 PM', status: 'Present', hours: '8h 15m' },
  { date: '2024-01-12', day: 'Fri', checkIn: '09:20 AM', checkOut: '06:25 PM', status: 'Late', hours: '7h 5m' },
];

const attendanceStats = {
  present: 18,
  absent: 1,
  late: 2,
  leave: 1,
  halfDay: 1,
  totalWorkingDays: 22,
};

export default function EmployeeAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState('January 2024');
  const [showCheckIn, setShowCheckIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState('09:02 AM');
  const [checkOutTime, setCheckOutTime] = useState('--:--');

  const handleCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    setCheckInTime(time);
    setShowCheckIn(false);
    alert(`Checked in at ${time}`);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    setCheckOutTime(time);
    alert(`Checked out at ${time}`);
  };

  const handleRegularization = (date: string) => {
    alert(`Request regularization for ${date}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600">Track your daily attendance and working hours</p>
        </div>
        <Button variant="outline">📥 Download Report</Button>
      </div>

      {/* Today's Status */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl">⏰</span>
            </div>
            <h3 className="font-medium text-gray-900">Check In</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{checkInTime}</p>
            {showCheckIn && (
              <Button onClick={handleCheckIn} className="mt-4">
                Check In Now
              </Button>
            )}
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✅</span>
            </div>
            <h3 className="font-medium text-gray-900">Current Status</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">Present</p>
            <p className="text-sm text-gray-600 mt-2">You're checked in</p>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl">🚪</span>
            </div>
            <h3 className="font-medium text-gray-900">Check Out</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{checkOutTime}</p>
            {!showCheckIn && checkOutTime === '--:--' && (
              <Button onClick={handleCheckOut} className="mt-4" variant="outline">
                Check Out Now
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Present</p>
          <p className="text-2xl font-bold text-gray-900">{attendanceStats.present}</p>
          <p className="text-xs text-gray-500">days</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Absent</p>
          <p className="text-2xl font-bold text-gray-900">{attendanceStats.absent}</p>
          <p className="text-xs text-gray-500">days</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Late</p>
          <p className="text-2xl font-bold text-gray-900">{attendanceStats.late}</p>
          <p className="text-xs text-gray-500">days</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Leave</p>
          <p className="text-2xl font-bold text-gray-900">{attendanceStats.leave}</p>
          <p className="text-xs text-gray-500">days</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Attendance %</p>
          <p className="text-2xl font-bold text-gray-90 0">
            {Math.round((attendanceStats.present / attendanceStats.totalWorkingDays) * 100)}%
          </p>
          <p className="text-xs text-gray-500">This month</p>
        </Card>
      </div>

      {/* Monthly Attendance */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Attendance - {currentMonth}</h2>
          <div className="flex space-x-2">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
            >
              <option>January 2024</option>
              <option>December 2023</option>
              <option>November 2023</option>
            </select>
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyAttendance.map((att, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{att.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{att.day}</td>
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
                    {att.status === 'Late' || att.status === 'Absent' ? (
                      <button
                        onClick={() => handleRegularization(att.date)}
                        className="text-primary hover:text-primary-dark"
                      >
                        Request Regularization
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Calendar */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Calendar</h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-sm font-medium text-gray-500 py-2">{day}</div>
            ))}
            
            {/* Calendar days - simplified version */}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              let status = '';
              if ([1, 2, 3, 5, 10, 11, 15, 16, 17, 18, 22, 23, 24, 25, 29, 30, 31].includes(day)) status = 'present';
              if ([4, 12].includes(day)) status = 'late';
              if ([8].includes(day)) status = 'leave';
              if ([9].includes(day)) status = 'half-day';
              
              return (
                <div key={day} className={`p-2 rounded-lg ${
                  status === 'present' ? 'bg-green-100 text-green-800' :
                  status === 'late' ? 'bg-amber-100 text-amber-800' :
                  status === 'leave' ? 'bg-blue-100 text-blue-800' :
                  status === 'half-day' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-sm font-medium">{day}</div>
                  <div className="text-xs mt-1">
                    {status === 'present' && '✓'}
                    {status === 'late' && '⌛'}
                    {status === 'leave' && '🏝️'}
                    {status === 'half-day' && '½'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-100 rounded mr-2"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-100 rounded mr-2"></div>
              <span>Late</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-100 rounded mr-2"></div>
              <span>Leave</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-100 rounded mr-2"></div>
              <span>Half Day</span>
            </div>
          </div>
        </Card>

        {/* Working Hours Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Working Hours Summary</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-sm font-medium">38h 45m</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-medium">152h 30m</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Average Daily</span>
                <span className="text-sm font-medium">7h 45m</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Regularization Requests</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Jan 4, 2024</p>
                  <p className="text-sm text-gray-500">Late arrival due to traffic</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Dec 15, 2023</p>
                  <p className="text-sm text-gray-500">Forgot to check out</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Approved
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}