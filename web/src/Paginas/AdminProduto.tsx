// src/pages/AdminPage.tsx
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import apiClient from "../services/api";

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl?: string;
}

const AdminPage: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isEditing, setIsEditing] = useState<Produto | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
    image: null as File | null,
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await apiClient.get<Produto[]>("/products");
      setProdutos(response.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    if (type === "file") {
      setFormData({ ...formData, [name]: target.files ? target.files[0] : null });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      available: true,
      image: null,
    });
    setIsEditing(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("price", String(formData.price));
    submissionData.append("category", formData.category);
    submissionData.append("available", String(formData.available));
    if (formData.image) {
      submissionData.append("image", formData.image);
    }

    try {
      if (isEditing) {
        await apiClient.put(`/products/${isEditing.id}`, submissionData);
        alert("Produto atualizado com sucesso!");
      } else {
        await apiClient.post("/products", submissionData);
        alert("Produto cadastrado com sucesso!");
      }
      resetForm();
      carregarProdutos();
    } catch (err: any) {
      console.error(`Erro ao ${isEditing ? "atualizar" : "cadastrar"} produto:`, err);
      const errorMsg = err.response?.data?.message || err.message || `Erro ao ${isEditing ? "atualizar" : "cadastrar"} produto.`;
      alert(errorMsg);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await apiClient.delete(`/products/${id}`);
        alert("Produto excluído com sucesso!");
        carregarProdutos();
      } catch (err: any) {
        console.error("Erro ao excluir produto:", err);
        const errorMsg = err.response?.data?.message || err.message || "Erro ao excluir produto.";
        alert(errorMsg);
      }
    }
  };

  const handleEdit = (produto: Produto) => {
    setIsEditing(produto);
    setFormData({
      name: produto.name,
      description: produto.description,
      price: String(produto.price),
      category: produto.category,
      available: produto.available,
      image: null,
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Administração de Produtos</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg grid gap-4 grid-cols-1 sm:grid-cols-2 mb-6">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome" required className="p-2 rounded bg-gray-700 text-white" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Preço" required type="number" step="0.01" className="p-2 rounded bg-gray-700 text-white" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Categoria" required className="p-2 rounded bg-gray-700 text-white" />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="p-2 bg-gray-700 text-white rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descrição" className="p-2 rounded bg-gray-700 text-white sm:col-span-2" />
        <label className="text-sm flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
          Disponível
        </label>
        <div className="sm:col-span-2 flex gap-2">
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex-1">
            {isEditing ? "Atualizar Produto" : "Adicionar Produto"}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      <table className="w-full text-sm border border-gray-700 bg-gray-800 text-center">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Imagem</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-t border-gray-600 hover:bg-gray-750">
              <td className="p-2">
                {produto.imageUrl ? (
                  <img src={produto.imageUrl} alt={produto.name} className="w-12 h-12 object-cover rounded mx-auto" />
                ) : (
                  "-"
                )}
              </td>
              <td>{produto.name}</td>
              <td className={produto.available ? "text-green-400" : "text-red-400"}>
                {produto.available ? "Disponível" : "Indisponível"}
              </td>
              <td>{produto.description}</td>
              <td>R$ {typeof produto.price === "number" ? produto.price.toFixed(2) : "N/A"}</td>
              <td>{produto.category}</td>
              <td className="space-x-2">
                <button onClick={() => handleEdit(produto)} className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white text-xs">
                  Editar
                </button>
                <button onClick={() => handleDelete(produto.id)} className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white text-xs">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
