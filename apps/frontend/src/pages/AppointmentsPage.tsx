import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/appointments')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setAppointments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Button>Schedule Appointment</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Customer ID</th>
                  <th className="px-6 py-3">Vehicle ID</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((a: any) => (
                    <tr key={a.id} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4">{a.id}</td>
                      <td className="px-6 py-4 font-medium">{new Date(a.appointmentDate).toLocaleString()}</td>
                      <td className="px-6 py-4">{a.customerId}</td>
                      <td className="px-6 py-4">{a.vehicleId}</td>
                      <td className="px-6 py-4">{a.status}</td>
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
