'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, Download, Lock, Users } from 'lucide-react';

// Mock school data
const mockSchoolData = {
  schoolName: 'Lincoln High School',
  contactEmail: 'john@lincoln.edu',
  registrationId: 'REG-001',
  paymentStatus: 'completed',
  totalStudents: 25,
  basePrice: 150,
  discountPercentage: 15,
  totalAmount: 3187.5,
  paymentDate: '2025-01-20',
  students: [
    { id: 1, name: 'Alice Johnson', status: 'confirmed' },
    { id: 2, name: 'Benjamin Lee', status: 'confirmed' },
    { id: 3, name: 'Catherine Brown', status: 'confirmed' },
    { id: 4, name: 'David Martinez', status: 'confirmed' },
    { id: 5, name: 'Emma Davis', status: 'confirmed' },
    { id: 6, name: 'Frank Wilson', status: 'confirmed' },
    { id: 7, name: 'Grace Anderson', status: 'confirmed' },
    { id: 8, name: 'Henry Taylor', status: 'confirmed' },
    { id: 9, name: 'Iris Thomas', status: 'confirmed' },
    { id: 10, name: 'Jack Moore', status: 'confirmed' },
    { id: 11, name: 'Karen Jackson', status: 'confirmed' },
    { id: 12, name: 'Leo White', status: 'confirmed' },
    { id: 13, name: 'Mia Harris', status: 'confirmed' },
    { id: 14, name: 'Noah Martin', status: 'confirmed' },
    { id: 15, name: 'Olivia Thompson', status: 'confirmed' },
    { id: 16, name: 'Peter Garcia', status: 'confirmed' },
    { id: 17, name: 'Quinn Rodriguez', status: 'confirmed' },
    { id: 18, name: 'Rachel Clark', status: 'confirmed' },
    { id: 19, name: 'Samuel Lewis', status: 'confirmed' },
    { id: 20, name: 'Tina Walker', status: 'confirmed' },
    { id: 21, name: 'Uma Hall', status: 'confirmed' },
    { id: 22, name: 'Victor Young', status: 'confirmed' },
    { id: 23, name: 'Wendy King', status: 'confirmed' },
    { id: 24, name: 'Xavier Scott', status: 'confirmed' },
    { id: 25, name: 'Yara Green', status: 'confirmed' },
  ],
};

export default function SchoolDashboardPage() {
  const router = useRouter();
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const displayedStudents = showAllStudents
    ? mockSchoolData.students
    : mockSchoolData.students.slice(0, 10);

  const handleLogout = () => {
    router.push('/');
  };

  const handleDownloadCertificate = (studentName: string) => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `CERTIFICATE\n\nThis is to certify that ${studentName} from ${mockSchoolData.schoolName} has registered for EduConf 2025.`,
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${studentName}-certificate.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-primary">{mockSchoolData.schoolName}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out of the school dashboard? You'll need to sign in again to access this page.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sign out
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Access Control Notice */}
        <Alert className="mb-8 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900">
          <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            This dashboard is locked after payment. You can view student registrations and payment details, but cannot make changes. Contact us if you need to modify registrations.
          </AlertDescription>
        </Alert>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockSchoolData.totalStudents}</div>
              <p className="text-xs text-muted-foreground">registered and confirmed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Group Discount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockSchoolData.discountPercentage}%</div>
              <p className="text-xs text-muted-foreground">applied to your registration</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${mockSchoolData.totalAmount}</div>
              <p className="text-xs text-muted-foreground">payment completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Registration confirmation and payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Registration ID</p>
                <p className="font-mono text-sm font-semibold mt-1">{mockSchoolData.registrationId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                  {mockSchoolData.paymentStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Date</p>
                <p className="text-sm font-semibold mt-1">{mockSchoolData.paymentDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Email</p>
                <p className="text-sm font-semibold mt-1">{mockSchoolData.contactEmail}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold mb-3">Price Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base price per student</span>
                  <span>${mockSchoolData.basePrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Number of students</span>
                  <span>{mockSchoolData.totalStudents}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${(mockSchoolData.basePrice * mockSchoolData.totalStudents).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-semibold">
                  <span>Group discount ({mockSchoolData.discountPercentage}%)</span>
                  <span>
                    -$
                    {(
                      (mockSchoolData.basePrice * mockSchoolData.totalStudents * mockSchoolData.discountPercentage) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${mockSchoolData.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registered Students</CardTitle>
                <CardDescription>
                  {mockSchoolData.totalStudents} students from {mockSchoolData.schoolName}
                </CardDescription>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleDownloadCertificate(student.name)}
                        >
                          <Download className="h-4 w-4" />
                          Certificate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {mockSchoolData.students.length > 10 && !showAllStudents && (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setShowAllStudents(true)}
              >
                Show all {mockSchoolData.students.length} students
              </Button>
            )}

            {showAllStudents && (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setShowAllStudents(false)}
              >
                Show less
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-900 dark:text-blue-100">
            <p>
              <span className="font-semibold">Locked Registration:</span> Your registration is locked after successful payment. No further changes can be made to student names or registration details.
            </p>
            <p>
              <span className="font-semibold">Conference Date:</span> The conference will take place on June 15-17, 2025. Detailed schedule and logistical information will be sent 30 days before the event.
            </p>
            <p>
              <span className="font-semibold">Refund Policy:</span> Refunds are available within 30 days of registration. After 30 days, refunds will not be processed.
            </p>
            <p>
              <span className="font-semibold">Need Help?</span> Contact us at support@educonf.com for any questions about your registration.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
