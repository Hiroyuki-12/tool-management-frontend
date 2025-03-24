'use client';
import { useEffect, useState } from "react";

interface Tool {
  id: number;
  workName: string;
  name: string;
  quantity: number;
  status: string;
  isSelected: boolean;
}

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);

  // データ取得
  useEffect(() => {
    fetch("http://54.172.221.49:8080/api/tools", {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) =>
        setTools(
          data.map((tool: Tool) => ({
            ...tool,
            isSelected: tool.isSelected ?? false,
          }))
        )
      )
      .catch((error) => console.error("データ取得エラー:", error));
  }, []);

  // PATCHリクエストでデータ更新
  const updateTool = async (id: number, updatedData: Partial<Tool>) => {
    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id ? { ...tool, ...updatedData } : tool
      )
    );

    try {
      const response = await fetch(`http://54.172.221.49:8080/api/tools/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: 'include',
      });

      if (!response.ok) {
        console.error("更新に失敗しました");
      }
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  const handleCheckChange = (id: number, checked: boolean) => {
    updateTool(id, { isSelected: checked });
  };

  const deleteTool = async (id: number) => {
    try {
      await fetch(`http://554.172.221.49:8080/api/tools/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });
      setTools((prev) => prev.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  const groupedTools = tools.reduce<{ [key: string]: Tool[] }>((acc, tool) => {
    if (!acc[tool.workName]) acc[tool.workName] = [];
    acc[tool.workName].push(tool);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">道具管理アプリ</h1>
      {Object.entries(groupedTools).map(([workName, tools]) => (
        <div key={workName} className="mb-6">
          <h2 className="text-xl font-bold border-b pb-2">{workName}</h2>
          <table className="w-full border-collapse border mt-2 table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/4">道具</th>
                <th className="border p-2 w-1/6">個数</th>
                <th className="border p-2 w-1/6">チェック</th>
                <th className="border p-2 w-1/6">削除</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.id} className="border">
                  <td className="border p-2 text-center">{tool.name}</td>
                  <td className="border p-2 flex items-center justify-center space-x-2">
                    <button
                      className="px-2 bg-blue-500 text-white rounded"
                      onClick={() => updateTool(tool.id, { quantity: tool.quantity + 1 })}
                    >
                      ＋
                    </button>
                    <span className="w-8 text-center">{tool.quantity}</span>
                    <button
                      className="px-2 bg-gray-500 text-white rounded"
                      onClick={() =>
                        updateTool(tool.id, { quantity: Math.max(0, tool.quantity - 1) })
                      }
                    >
                      －
                    </button>
                  </td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={tool.isSelected ?? false}
                      onChange={(e) => handleCheckChange(tool.id, e.target.checked)}
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => deleteTool(tool.id)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}


