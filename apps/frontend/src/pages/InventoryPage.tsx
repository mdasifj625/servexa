import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getParts, type Part } from '@/api/parts';

export default function InventoryPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const data = await getParts();
      setParts(data);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch inventory parts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <Button>Add New Part</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parts List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : parts.length === 0 ? (
            <p className="text-muted-foreground">No parts found in inventory.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Part Name</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3 text-right">Price</th>
                    <th className="px-6 py-3 text-right">Stock</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((part) => (
                    <tr key={part.id} className="border-b border-border">
                      <td className="px-6 py-4 font-medium">{part.name}</td>
                      <td className="px-6 py-4">{part.description || '-'}</td>
                      <td className="px-6 py-4 text-right">${part.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">{part.stock}</td>
                      <td className="px-6 py-4 text-center">
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
