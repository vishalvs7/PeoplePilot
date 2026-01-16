'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Edit2, Save, Camera, Lock, Globe } from 'lucide-react';

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Alex Johnson',
    employeeId: 'EMP-2023-045',
    email: 'alex.johnson@company.com',
    phone: '+91 98765 43210',
    dob: '1992-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    maritalStatus: 'Single',
  });

  // Work Info
  const [workInfo, setWorkInfo] = useState({
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    reportingManager: 'Sarah Williams',
    dateOfJoining: '2023-06-15',
    workLocation: 'Bangalore Office',
    employeeType: 'Full-time',
    workEmail: 'alex.j@techcorp.com',
  });

  // Address
  const [address, setAddress] = useState({
    current: '123, Tech Park, Koramangala, Bangalore - 560034',
    permanent: '456, Green Valley, Mumbai - 400001',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Father',
      phone: '+91 98765 12340',
    },
  });

  // Bank Details
  const [bankDetails, setBankDetails] = useState({
    accountNumber: 'XXXXXXXX1234',
    bankName: 'HDFC Bank',
    branch: 'Koramangala, Bangalore',
    ifscCode: 'HDFC0001234',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: 'XXXX XXXX 5678',
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handlePhotoUpload = () => {
    alert('Photo upload feature coming soon!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal and professional information</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              AJ
            </div>
            <button
              onClick={handlePhotoUpload}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
            >
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{personalInfo.fullName}</h2>
                <p className="text-gray-600">{workInfo.designation}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {workInfo.department}
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-1" />
                    {personalInfo.email}
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-1" />
                    {personalInfo.phone}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-bold text-gray-900">{personalInfo.employeeId}</p>
                <p className="text-sm text-gray-500 mt-2">Employment Status</p>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Active
                </span>
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
              activeTab === 'personal'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('personal')}
          >
            <User className="h-4 w-4 inline mr-2" />
            Personal Info
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'work'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('work')}
          >
            <Briefcase className="h-4 w-4 inline mr-2" />
            Work Info
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'address'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('address')}
          >
            <MapPin className="h-4 w-4 inline mr-2" />
            Address & Contacts
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bank'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('bank')}
          >
            <Lock className="h-4 w-4 inline mr-2" />
            Bank & Documents
          </button>
        </nav>
      </div>

      {/* Personal Info Tab */}
      {activeTab === 'personal' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              {isEditing ? (
                <Input value={personalInfo.fullName} onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})} />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">{personalInfo.fullName}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              {isEditing ? (
                <Input type="date" value={personalInfo.dob} onChange={(e) => setPersonalInfo({...personalInfo, dob: e.target.value})} />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  {personalInfo.dob}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              {isEditing ? (
                <select 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  value={personalInfo.gender}
                  onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">{personalInfo.gender}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              {isEditing ? (
                <Input value={personalInfo.bloodGroup} onChange={(e) => setPersonalInfo({...personalInfo, bloodGroup: e.target.value})} />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">{personalInfo.bloodGroup}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                {personalInfo.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              {isEditing ? (
                <Input value={personalInfo.phone} onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})} />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  {personalInfo.phone}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
              {isEditing ? (
                <select 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  value={personalInfo.maritalStatus}
                  onChange={(e) => setPersonalInfo({...personalInfo, maritalStatus: e.target.value})}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">{personalInfo.maritalStatus}</div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Work Info Tab */}
      {activeTab === 'work' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Work Information</h2>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                {workInfo.department}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <div className="p-3 bg-gray-50 rounded-lg">{workInfo.designation}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Manager</label>
              <div className="p-3 bg-gray-50 rounded-lg">{workInfo.reportingManager}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Joining</label>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                {workInfo.dateOfJoining}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Location</label>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                {workInfo.workLocation}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Type</label>
              <div className="p-3 bg-gray-50 rounded-lg">{workInfo.employeeType}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Email</label>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                {workInfo.workEmail}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Emergency Contacts Card */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Emergency Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="bg-rose-100 p-3 rounded-lg mr-4">
                <User className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{address.emergencyContact.name}</p>
                <p className="text-sm text-gray-600">{address.emergencyContact.relationship}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              {address.emergencyContact.phone}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">Current Address</h3>
            <p className="text-gray-700 flex items-start">
              <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
              {address.current}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">Permanent Address</h3>
            <p className="text-gray-700 flex items-start">
              <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
              {address.permanent}
            </p>
          </div>
        </div>
      </Card>

      {/* Security Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add extra layer of security</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}