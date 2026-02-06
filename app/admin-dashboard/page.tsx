'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LogOut, Download, Filter, Search, Users, Building2, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for demo
const mockRegistrations = {
  school: [
    {
      id: 'REG-001',
      schoolName: 'Lincoln High School',
      contactName: 'John Smith',
      contactEmail: 'john@lincoln.edu',
      students: 25,
      price: 3187.5,
      paymentStatus: 'completed',
      date: '2025-01-20',
    },
    {
      id: 'REG-002',
      schoolName: 'Jefferson Academy',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@jefferson.edu',
      students: 15,
      price: 2250,
      paymentStatus: 'completed',
      date: '2025-01-21',
    },
    {
      id: 'REG-003',
      schoolName: 'Central High School',
      contactName: 'Michael Davis',
      contactEmail: 'michael@central.edu',
      students: 52,
      price: 5460,
      paymentStatus: 'completed',
      date: '2025-01-22',
    },
  ],
  university: [
    {
      id: 'REG-004',
      name: 'Emily Chen',
      universityName: 'Harvard University',
      email: 'emily@harvard.edu',
      degreeLevel: 'Master\'s',
      price: 150,
      paymentStatus: 'completed',
      date: '2025-01-20',
    },
    {
      id: 'REG-005',
      name: 'James Wilson',
      universityName: 'Stanford University',
      email: 'james@stanford.edu',
      degreeLevel: 'PhD',
      price: 150,
      paymentStatus: 'completed',
      date: '2025-01-21',
    },
  ],
  general: [
    {
      id: 'REG-006',
      name: 'Patricia Martin',
      email: 'patricia@example.com',
      profession: 'Principal',
      price: 150,
      paymentStatus: 'completed',
      date: '2025-01-22',
    },
  ],
};

const calculateStats = () => {
  const schools = mockRegistrations.school.length;
  const universities = mockRegistrations.university.length;
  const general = mockRegistrations.general.length;
  const totalStudents = mockRegistrations.school.reduce((sum, s) => sum + s.students, 0);
  const totalRev = [
    ...mockRegistrations.school.map((s) => s.price),
    ...mockRegistrations.university.map((u) => u.price),
    ...mockRegistrations.general.map((g) => g.price),
  ].reduce((sum, p) => sum + p, 0);

  return { schools, universities, general, totalStudents, totalRev };
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const stats = calculateStats();

  const handleLogout = () => {
    router.push('/');
  };

  const handleExport = () => {
    const allData = [
      ...mockRegistrations.school.map((s) => ({
        ...s,
        category: 'School',
      })),
      ...mockRegistrations.university.map((u) => ({
        ...u,
        category: 'University',
      })),
      ...mockRegistrations.general.map((g) => ({
        ...g,
        category: 'General',
      })),
    ];

    const csv = [
      ['ID', 'Category', 'Name/School', 'Email', 'Amount', 'Status', 'Date'],
      ...allData.map((r) => {
        const rr: any = r;
        const nameOrSchool = rr.schoolName ?? rr.name ?? rr.universityName ?? '';
        const emailOrContact = rr.email ?? rr.contactEmail ?? '';

        return [
          rr.id,
          rr.category,
          nameOrSchool,
          emailOrContact,
          rr.price,
          rr.paymentStatus,
          rr.date,
        ];
      }),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-primary">Admin Dashboard</div>
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
            Are you sure you want to log out of the admin dashboard? You'll need to sign in again to access this page.
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.schools + stats.universities + stats.general}</div>
              <p className="text-xs text-muted-foreground">across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents + stats.universities + stats.general}</div>
              <p className="text-xs text-muted-foreground">confirmed registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRev.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">all payments completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg per School
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.schools > 0 ? (mockRegistrations.school.reduce((sum, s) => sum + s.price, 0) / stats.schools).toFixed(0) : 0}
              </div>
              <p className="text-xs text-muted-foreground">average transaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schools" className="gap-2">
                <Building2 className="h-4 w-4" />
                Schools
              </TabsTrigger>
              <TabsTrigger value="universities" className="gap-2">
                <Users className="h-4 w-4" />
                Universities
              </TabsTrigger>
              <TabsTrigger value="general" className="gap-2">
                <Globe className="h-4 w-4" />
                General
              </TabsTrigger>
            </TabsList>
            <Button onClick={handleExport} variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="school">Schools</SelectItem>
                        <SelectItem value="university">Universities</SelectItem>
                        <SelectItem value="general">General Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Registration ID</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Name/School</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          ...mockRegistrations.school.map((s) => ({ ...s, category: 'School' })),
                          ...mockRegistrations.university.map((u) => ({
                            ...u,
                            category: 'University',
                          })),
                          ...mockRegistrations.general.map((g) => ({ ...g, category: 'General' })),
                        ]
                          .filter((row) => {
                            const rr: any = row;
                            const term = searchTerm.toLowerCase();
                            const matchesSearch =
                              (rr.schoolName?.toLowerCase().includes(term)) ||
                              (rr.name?.toLowerCase().includes(term)) ||
                              (rr.email?.toLowerCase().includes(term)) ||
                              (rr.contactEmail?.toLowerCase().includes(term));

                            const matchesCategory =
                              filterCategory === 'all' ||
                              rr.category.toLowerCase() === filterCategory.toLowerCase();

                            return matchesSearch && matchesCategory;
                          })
                          .map((row) => {
                            const rr: any = row;
                            return (
                              <TableRow key={rr.id}>
                                <TableCell className="font-mono text-sm">{rr.id}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{rr.category}</Badge>
                                </TableCell>
                                <TableCell>{rr.schoolName || rr.name}</TableCell>
                                <TableCell className="text-sm">{rr.email || rr.contactEmail}</TableCell>
                                <TableCell className="text-right font-semibold">₦{rr.price}</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                                    {rr.paymentStatus}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">{rr.date}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schools Tab */}
          <TabsContent value="schools">
            <Card>
              <CardHeader>
                <CardTitle>School Registrations</CardTitle>
                <CardDescription>{stats.schools} schools registered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>School Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRegistrations.school.map((school) => (
                        <TableRow key={school.id}>
                          <TableCell className="font-semibold">{school.schoolName}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{school.contactName}</div>
                              <div className="text-muted-foreground">{school.contactEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{school.students}</TableCell>
                          <TableCell className="font-bold">${school.price}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                              {school.paymentStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Universities Tab */}
          <TabsContent value="universities">
            <Card>
              <CardHeader>
                <CardTitle>University Student Registrations</CardTitle>
                <CardDescription>{stats.universities} students registered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>University</TableHead>
                        <TableHead>Degree Level</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRegistrations.university.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-semibold">{student.name}</TableCell>
                          <TableCell>{student.universityName}</TableCell>
                          <TableCell>{student.degreeLevel}</TableCell>
                          <TableCell className="text-sm">{student.email}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                              {student.paymentStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Public Registrations</CardTitle>
                <CardDescription>{stats.general} registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Profession</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRegistrations.general.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell className="font-semibold">{person.name}</TableCell>
                          <TableCell className="text-sm">{person.email}</TableCell>
                          <TableCell>{person.profession || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                              {person.paymentStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
