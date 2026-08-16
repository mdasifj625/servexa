import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/services')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button>Add New Service</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Duration (mins)</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No services found.
                    </td>
                  </tr>
                ) : (
                  services.map((s: any) => (
                    <tr key={s.id} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4">{s.id}</td>
                      <td className="px-6 py-4 font-medium">{s.name}</td>
                      <td className="px-6 py-4">${s.price.toFixed(2)}</td>
                      <td className="px-6 py-4">{s.duration}</td>
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
