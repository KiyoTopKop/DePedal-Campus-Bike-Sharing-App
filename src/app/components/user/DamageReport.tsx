import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Label, Select, Badge } from '../ui';
import { Camera, CheckCircle2 } from 'lucide-react';

export function DamageReport() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Report Damage</h1>
        <p className="text-sm text-gray-400 mt-0.5">Help us maintain our bikes by reporting any issues promptly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Submit a Report</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-green-900">Report Submitted</h3>
                  <p className="text-sm text-green-700 mt-1">Our team will review this shortly. Thank you!</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Bicycle ID</Label>
                  <Select required>
                    <option value="">Select Bicycle</option>
                    <option value="BK-001">BK-001</option>
                    <option value="BK-002">BK-002</option>
                    <option value="BK-003">BK-003</option>
                    <option value="BK-004">BK-004</option>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Station / Location</Label>
                  <Select required>
                    <option value="">Select Location</option>
                    <option value="JFH Kubo">JFH Kubo</option>
                    <option value="CBAA">CBAA Grounds</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Damage Type</Label>
                  <Select required>
                    <option value="">Select Issue</option>
                    <option value="Flat Tire">Flat Tire</option>
                    <option value="Broken Parts">Broken Parts</option>
                    <option value="Docking Station Malfunction">Docking Station Malfunction</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Photo Evidence</Label>
                  <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-green-400 hover:bg-green-50/30 transition-colors group">
                    <Camera className="h-10 w-10 text-gray-300 group-hover:text-green-500 transition-colors" />
                    <div className="text-center">
                      <span className="text-sm font-semibold text-green-700">Upload a photo</span>
                      <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 10MB · drag & drop supported</p>
                    </div>
                    <input type="file" className="sr-only" accept="image/*" />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <Label>Additional Notes</Label>
                  <textarea
                    className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors placeholder:text-gray-400 resize-none"
                    rows={3}
                    placeholder="Describe the issue in detail..."
                  />
                </div>

                <Button type="submit" className="w-full" size="md">Submit Report</Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Previous reports */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Previous Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'DR-042', bike: 'BK-002', issue: 'Flat Tire', date: 'May 2, 2026', status: 'Resolved', priority: 'High' },
                { id: 'DR-089', bike: 'BK-004', issue: 'Docking Station Malfunction', date: 'Apr 28, 2026', status: 'Pending Review', priority: 'Medium' },
              ].map((report) => (
                <div key={report.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">{report.issue}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Bike: <strong>{report.bike}</strong> · {report.date}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Report ID: {report.id}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <Badge variant={report.status === 'Resolved' ? 'success' : 'warning'}>
                        {report.status}
                      </Badge>
                      <Badge variant={report.priority === 'High' ? 'danger' : 'neutral'}>
                        {report.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
