'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, FileText, Download, Eye, Trash2, Folder, File, CheckCircle, Clock, XCircle } from 'lucide-react';

// Mock documents data
const documentCategories = [
  { name: 'Personal Documents', count: 8, icon: Folder, color: 'bg-blue-100 text-blue-600' },
  { name: 'Employment Documents', count: 12, icon: FileText, color: 'bg-green-100 text-green-600' },
  { name: 'Payroll Documents', count: 5, icon: File, color: 'bg-purple-100 text-purple-600' },
  { name: 'Tax Documents', count: 3, icon: FileText, color: 'bg-amber-100 text-amber-600' },
];

const personalDocuments = [
  { id: 1, name: 'PAN Card.pdf', type: 'PAN Card', size: '2.1 MB', uploaded: '2024-01-15', status: 'approved' },
  { id: 2, name: 'Aadhaar Card.pdf', type: 'Aadhaar', size: '3.4 MB', uploaded: '2024-01-10', status: 'approved' },
  { id: 3, name: 'Passport.pdf', type: 'Passport', size: '5.2 MB', uploaded: '2024-01-05', status: 'pending' },
  { id: 4, name: 'Educational Certificates.zip', type: 'Education', size: '12.5 MB', uploaded: '2023-12-20', status: 'approved' },
  { id: 5, name: 'Address Proof.pdf', type: 'Address Proof', size: '1.8 MB', uploaded: '2023-12-15', status: 'rejected' },
];

const employmentDocuments = [
  { id: 1, name: 'Offer Letter.pdf', type: 'Offer Letter', size: '1.2 MB', uploaded: '2023-06-15' },
  { id: 2, name: 'Appointment Letter.pdf', type: 'Appointment', size: '1.5 MB', uploaded: '2023-06-20' },
  { id: 3, name: 'NDA Agreement.pdf', type: 'Legal', size: '2.3 MB', uploaded: '2023-06-22' },
  { id: 4, name: 'Increment Letter.pdf', type: 'Increment', size: '1.1 MB', uploaded: '2024-01-10' },
];

export default function EmployeeDocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('personal');
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      alert('Document uploaded successfully!');
    }, 1500);
  };

  const handleDownload = (fileName: string) => {
    alert(`Downloading ${fileName}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      alert(`Document ${id} deleted`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-600">Upload and manage your personal documents</p>
        </div>
        <Button onClick={handleFileUpload} disabled={uploading}>
          {uploading ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </>
          )}
        </Button>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {documentCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name.toLowerCase().replace(' ', '-'))}
              className={`p-6 rounded-xl border-2 transition-all ${
                activeCategory === category.name.toLowerCase().replace(' ', '-')
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg mr-4 ${category.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.count} documents</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Upload Area */}
      <Card className="p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
          <p className="text-gray-600 mb-4">Drag & drop files here or click to browse</p>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" onClick={handleFileUpload}>
              Browse Files
            </Button>
            <span className="text-sm text-gray-500">Max file size: 25MB</span>
          </div>
          <p className="text-xs text-gray-500 mt-4">Supports: PDF, JPG, PNG, DOC, DOCX</p>
        </div>
      </Card>

      {/* Search and Filter */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Input 
            placeholder="Search documents..." 
            className="w-64" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
            <option>All Types</option>
            <option>Personal</option>
            <option>Employment</option>
            <option>Payroll</option>
            <option>Tax</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">28 documents</span> • 156.4 MB
        </div>
      </div>

      {/* Personal Documents Table */}
      {activeCategory === 'personal' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Documents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {personalDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">Version 1.0</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.uploaded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(doc.status)}
                        <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                          {getStatusText(doc.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleDownload(doc.name)}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      <button
                        onClick={() => alert(`Previewing ${doc.name}`)}
                        className="text-gray-600 hover:text-gray-800 inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-800 inline-flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Employment Documents Table */}
      {activeCategory === 'employment' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Employment Documents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employmentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">Company document</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.uploaded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleDownload(doc.name)}
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      <button
                        onClick={() => alert(`Previewing ${doc.name}`)}
                        className="text-gray-600 hover:text-gray-800 inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Document Status Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Document Status Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Approved Documents</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="bg-amber-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div className="bg-red-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Rejected Documents</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="w-full bg-red-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}