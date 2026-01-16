'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock documents data
const companyDocuments = [
  { id: 1, name: 'Employee Handbook', type: 'PDF', size: '2.4 MB', uploadedBy: 'HR Admin', date: '2024-01-10', category: 'Policy' },
  { id: 2, name: 'Leave Policy', type: 'PDF', size: '1.8 MB', uploadedBy: 'HR Admin', date: '2024-01-05', category: 'Policy' },
  { id: 3, name: 'Code of Conduct', type: 'DOC', size: '3.2 MB', uploadedBy: 'HR Admin', date: '2023-12-20', category: 'Policy' },
  { id: 4, name: 'Company NDA Template', type: 'DOC', size: '1.5 MB', uploadedBy: 'Legal', date: '2023-12-15', category: 'Legal' },
  { id: 5, name: 'Performance Review Form', type: 'PDF', size: '0.8 MB', uploadedBy: 'HR Admin', date: '2024-01-12', category: 'Forms' },
  { id: 6, name: 'Expense Report Template', type: 'XLS', size: '1.2 MB', uploadedBy: 'Finance', date: '2023-12-28', category: 'Forms' },
];

const employeeDocuments = [
  { id: 7, employee: 'Rajesh Kumar', document: 'Offer Letter', type: 'PDF', size: '1.1 MB', uploadedOn: '2023-03-15', status: 'Verified' },
  { id: 8, employee: 'Priya Sharma', document: 'Experience Certificate', type: 'PDF', size: '0.9 MB', uploadedOn: '2024-01-14', status: 'Pending' },
  { id: 9, employee: 'Amit Patel', document: 'PAN Card', type: 'JPG', size: '0.5 MB', uploadedOn: '2024-01-10', status: 'Verified' },
  { id: 10, employee: 'Neha Singh', document: 'Aadhar Card', type: 'PDF', size: '1.3 MB', uploadedOn: '2024-01-08', status: 'Verified' },
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage company and employee documents</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">📥 Bulk Upload</Button>
          <Button>📄 Upload Document</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-xs text-gray-500 mt-1">Company + Employee</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">📚</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Company Docs</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-xs text-gray-500 mt-1">Policies, forms, etc.</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">🏢</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Employee Docs</p>
              <p className="text-2xl font-bold text-gray-900">114</p>
              <p className="text-xs text-gray-500 mt-1">Personal documents</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">👤</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500 mt-1">Require verification</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600">⏳</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'company'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('company')}
          >
            Company Documents
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'employee'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('employee')}
          >
            Employee Documents
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upload'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            📤 Upload Area
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            📋 Letter Templates
          </button>
        </nav>
      </div>

      {/* Company Documents */}
      {activeTab === 'company' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Company Documents</h2>
            <Input placeholder="Search documents..." className="w-64" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companyDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded flex items-center justify-center mr-3 ${
                          doc.type === 'PDF' ? 'bg-red-100 text-red-600' :
                          doc.type === 'DOC' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {doc.type}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primary-dark">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Download</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Employee Documents */}
      {activeTab === 'employee' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Employee Documents</h2>
            <Input placeholder="Search by employee..." className="w-64" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.document}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadedOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        doc.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primary-dark">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Download</button>
                        <button className="text-green-600 hover:text-green-800">Verify</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Upload Area */}
      {activeTab === 'upload' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl">📤</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h3>
            <p className="text-gray-600 mb-6">Supports PDF, DOC, XLS, JPG, PNG up to 10MB each</p>
            
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button>Browse Files</Button>
            </label>

            {/* Selected files preview */}
            {selectedFiles.length > 0 && (
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-3">Selected Files ({selectedFiles.length})</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                          📄
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setSelectedFiles([])}>
                    Clear All
                  </Button>
                  <Button>Upload Selected Files</Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Document Categories */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Policy Documents</h3>
            <p className="text-2xl font-bold mt-2">24</p>
            <p className="text-sm text-gray-600">Employee handbook, policies</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Legal Documents</h3>
            <p className="text-2xl font-bold mt-2">18</p>
            <p className="text-sm text-gray-600">Contracts, NDAs, agreements</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Employee Records</h3>
            <p className="text-2xl font-bold mt-2">114</p>
            <p className="text-sm text-gray-600">Personal documents, IDs</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Forms & Templates</h3>
            <p className="text-2xl font-bold mt-2">32</p>
            <p className="text-sm text-gray-600">HR forms, templates</p>
          </div>
        </div>
      </Card>
    </div>
  );
}