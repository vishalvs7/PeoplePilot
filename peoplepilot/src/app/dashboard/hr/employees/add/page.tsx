'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';
import { generateRandomPassword, generateEmployeeId } from '@/lib/utils/employeeUtils';

export default function AddEmployeePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { company } = useCompany();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Employee form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
    salary: '',
  });

  // Auto-generated credentials
  const [generatedCredentials, setGeneratedCredentials] = useState({
    employeeId: generateEmployeeId(),
    password: generateRandomPassword(),
  });

  // Check if HR admin
  if (user?.role !== 'hr_admin') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="mt-2">Only HR administrators can add employees.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: Implement actual Firestore creation
      // For now, simulate creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success with credentials
      setSuccess(`Employee added successfully!`);
      setGeneratedCredentials({
        employeeId: generateEmployeeId(),
        password: generateRandomPassword(),
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        dateOfJoining: new Date().toISOString().split('T')[0],
        salary: '',
      });

    } catch (err: any) {
      setError(err.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
        <p className="text-gray-600">Add a new employee to {company.name}</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{success}</p>
              <div className="mt-2 space-y-2">
                <p><strong>Employee ID:</strong> {generatedCredentials.employeeId}</p>
                <p><strong>Temporary Password:</strong> {generatedCredentials.password}</p>
                <p className="text-sm text-gray-600">
                  These credentials will be sent to the employee's email.
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigator.clipboard.writeText(
                `Employee ID: ${generatedCredentials.employeeId}\nPassword: ${generatedCredentials.password}`
              )}
            >
              Copy Credentials
            </Button>
          </div>
        </div>
      )}

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                placeholder="John"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                placeholder="Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="john.doe@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <Input
                type="text"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Joining
              </label>
              <Input
                type="date"
                value={formData.dateOfJoining}
                onChange={(e) => handleInputChange('dateOfJoining', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Salary (₹)
              </label>
              <Input
                type="number"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="50000"
                min="0"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Create Employee Account
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Preview of generated credentials */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generated Credentials (Preview)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Employee ID</p>
            <p className="font-mono font-bold text-lg">{generatedCredentials.employeeId}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Temporary Password</p>
            <p className="font-mono font-bold text-lg">{generatedCredentials.password}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Note: A welcome email with login instructions will be sent to the employee.
        </p>
      </Card>
    </div>
  );
}