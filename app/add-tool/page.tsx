'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddToolPage() {
  const [workName, setWorkName] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddTool = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTool = { workName, name, quantity, status: '', isSelected: false };

    try {
      const response = await fetch('http://54.172.221.49:8080/api/tools', {  // ✅ 修正箇所
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTool),
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/tools');
      } else {
        console.error("道具の追加に失敗しました");
      }
    } catch (error) {
      console.error("追加エラー:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleAddTool} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">道具を追加</h1>
        <input
          type="text"
          value={workName}
          onChange={(e) => setWorkName(e.target.value)}
          placeholder="作業名"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="道具名"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="個数"
          className="w-full border p-2 mb-4 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          追加
        </button>
      </form>
    </div>
  );
}

