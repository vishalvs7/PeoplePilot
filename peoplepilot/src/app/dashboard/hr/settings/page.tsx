'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [companyEmail, setCompanyEmail] = useState('hr@acmecorp.com');
  const [companyPhone, setCompanyPhone] = useState('+91 9876543210');
  const [companyAddress, setCompanyAddress] = useState('123 Business Street, Mumbai, India');
  const [workHours, setWorkHours] = useState(8);
  const [casualLeave, setCasualLeave] = useState(12);
  const [sickLeave, setSickLeave] = useState(10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your company settings and preferences</p>
      </div>

      {/* Settings Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1 p-4">
          <nav className="space-y-1">
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                activeTab === 'company' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('company')}
            >
              🏢 Company Info
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                activeTab === 'hr' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('hr')}
            >
              👥 HR Policies
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                activeTab === 'attendance' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('attendance')}
            >
              📅 Attendance
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                activeTab === 'payroll' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('payroll')}
            >
              💰 Payroll
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                activeTab === 'integrations' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('integrations')}
            >
              🔗 Integrations
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                activeTab === 'security' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('security')}
            >
              🔒 Security
            </button>
          </nav>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Company Info */}
          {activeTab === 'company' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Official Email *</label>
                    <Input
                      type="email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      placeholder="company@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option>Information Technology</option>
                      <option>Finance & Banking</option>
                      <option>Healthcare</option>
                      <option>Manufacturing</option>
                      <option>Retail</option>
                      <option>Education</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                  <textarea
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    rows={3}
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="Enter complete address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option>Asia/Kolkata (IST)</option>
                      <option>America/New_York (EST)</option>
                      <option>Europe/London (GMT)</option>
                      <option>Asia/Singapore (SGT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option>INR (Indian Rupee)</option>
                      <option>USD (US Dollar)</option>
                      <option>EUR (Euro)</option>
                      <option>GBP (British Pound)</option>
                    </select>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* HR Policies */}
          {activeTab === 'hr' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">HR Policies</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Leave Policies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Casual Leave (days/year)</label>
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 border border-gray-300 rounded-l-lg"
                          onClick={() => setCasualLeave(Math.max(0, casualLeave - 1))}
                        >
                          -
                        </button>
                        <Input
                          value={casualLeave}
                          onChange={(e) => setCasualLeave(parseInt(e.target.value) || 0)}
                          className="rounded-none border-x-0 text-center"
                        />
                        <button 
                          className="w-8 h-8 border border-gray-300 rounded-r-lg"
                          onClick={() => setCasualLeave(casualLeave + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sick Leave (days/year)</label>
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 border border-gray-300 rounded-l-lg"
                          onClick={() => setSickLeave(Math.max(0, sickLeave - 1))}
                        >
                          -
                        </button>
                        <Input
                          value={sickLeave}
                          onChange={(e) => setSickLeave(parseInt(e.target.value) || 0)}
                          className="rounded-none border-x-0 text-center"
                        />
                        <button 
                          className="w-8 h-8 border border-gray-300 rounded-r-lg"
                          onClick={() => setSickLeave(sickLeave + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Earned Leave (days/year)</label>
                      <Input value="15" readOnly />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Probation Period</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (months)</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                        <option>3 months</option>
                        <option>6 months</option>
                        <option>12 months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period (days)</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                        <option>30 days</option>
                        <option>60 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <Button>Save Policies</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Attendance Settings */}
          {activeTab === 'attendance' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Attendance Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Work Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Daily Working Hours</label>
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 border border-gray-300 rounded-l-lg"
                          onClick={() => setWorkHours(Math.max(1, workHours - 1))}
                        >
                          -
                        </button>
                        <Input
                          value={workHours}
                          onChange={(e) => setWorkHours(parseInt(e.target.value) || 0)}
                          className="rounded-none border-x-0 text-center"
                        />
                        <button 
                          className="w-8 h-8 border border-gray-300 rounded-r-lg"
                          onClick={() => setWorkHours(workHours + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working Days/Week</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                        <option>5 days (Mon-Fri)</option>
                        <option>6 days (Mon-Sat)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Late Arrival Policy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Grace Period</p>
                        <p className="text-sm text-gray-600">Allowed late arrival time</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">15</span>
                        <span className="text-gray-500">minutes</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Half Day Threshold</p>
                        <p className="text-sm text-gray-600">Late arrival beyond this is half day</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">3</span>
                        <span className="text-gray-500">hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Payroll Settings */}
          {activeTab === 'payroll' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payroll Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Payroll Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payroll Month Start Day</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                        <option>1st of every month</option>
                        <option>Last day of previous month</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Salary Payment Day</label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                        <option>5th of next month</option>
                        <option>Last working day</option>
                        <option>25th of same month</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Deductions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">PF Contribution</p>
                        <p className="text-sm text-gray-600">Employer's PF contribution</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">12</span>
                        <span className="text-gray-500">% of basic</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">ESI Contribution</p>
                        <p className="text-sm text-gray-600">Employer's ESI contribution</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">3.25</span>
                        <span className="text-gray-500">% of gross</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">TDS Threshold</p>
                        <p className="text-sm text-gray-600">Annual income above this is taxable</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">₹2,50,000</span>
                        <span className="text-gray-500">per annum</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <Button>Save Payroll Settings</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}