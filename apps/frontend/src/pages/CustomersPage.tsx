import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Mock fetch for now, to be connected to the API layer via React Query
    fetch('http://localhost:3000/customers')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button>Add New Customer</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">First Name</th>
                  <th className="px-6 py-3">Last Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  customers.map((c: any) => (
                    <tr key={c.id} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4">{c.id}</td>
                      <td className="px-6 py-4 font-medium">{c.firstName}</td>
                      <td className="px-6 py-4">{c.lastName}</td>
                      <td className="px-6 py-4">{c.email || 'N/A'}</td>
                      <td className="px-6 py-4">{c.phone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
