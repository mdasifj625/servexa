import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function UsersPage() {
  const [dummyUsers] = useState([
    { id: 'usr-1', name: 'Admin User', email: 'admin@servexa.com', roles: ['Admin'] },
    { id: 'usr-2', name: 'Service Advisor', email: 'advisor@servexa.com', roles: ['Service Advisor'] },
    { id: 'usr-3', name: 'Mechanic', email: 'mechanic@servexa.com', roles: ['Mechanic'] },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button><UserPlus className="w-4 h-4 mr-2" /> Add User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>Manage staff and system access roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Roles</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border">
                    <td className="px-6 py-4 font-medium">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      {u.roles.map(r => (
                        <span key={r} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs mr-2">{r}</span>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="outline" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
