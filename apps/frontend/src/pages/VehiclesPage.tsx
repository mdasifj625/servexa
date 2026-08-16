import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/vehicles')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vehicles</h1>
        <Button>Register Vehicle</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Make & Model</th>
                  <th className="px-6 py-3">Year</th>
                  <th className="px-6 py-3">License Plate</th>
                  <th className="px-6 py-3">Customer ID</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No vehicles found.
                    </td>
                  </tr>
                ) : (
                  vehicles.map((v: any) => (
                    <tr key={v.id} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4">{v.id}</td>
                      <td className="px-6 py-4 font-medium">{v.make} {v.model}</td>
                      <td className="px-6 py-4">{v.year}</td>
                      <td className="px-6 py-4">{v.licensePlate}</td>
                      <td className="px-6 py-4">{v.customerId}</td>
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
