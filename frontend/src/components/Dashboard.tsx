import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, UserPlus, LayoutDashboard } from "lucide-react";

export interface Client {
  id: string;
  name: string;
  cpf: string;
  postalCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  phones: string[];
  emails: string[];
}

const API_BASE = "http://localhost:8080/api/clients";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(API_BASE, {
        credentials: "include",
      });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = JSON.parse(text);
      setClients(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (client: Omit<Client, "id">) => {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(client),
      });
      if (!res.ok) throw new Error("Erro ao adicionar cliente");
      const newClient = await res.json();
      setClients([...clients, newClient]);
    } catch (error) {
      alert("Falha ao adicionar cliente");
      console.error(error);
    }
    console.log("Enviando:", client);
  };

  const handleUpdateClient = async (updatedClient: Client) => {
    try {
      const res = await fetch(`${API_BASE}/${updatedClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedClient),
      });
      if (!res.ok) throw new Error("Erro ao atualizar cliente");
      const updated = await res.json();
      setClients(clients.map((c) => (c.id === updated.id ? updated : c)));
      setEditingClient(null);
    } catch (error) {
      alert("Falha ao atualizar cliente");
      console.error(error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao deletar cliente");
      await fetchClients();
    } catch (error) {
      alert("Falha ao deletar cliente");
      console.error(error);
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Sistema de Gerenciamento de Clientes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.type}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">
                Clientes cadastrados no sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuário Logado
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user?.type}</div>
              <p className="text-xs text-muted-foreground">
                Nível de permissão atual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-muted-foreground">
                Sistema funcionando normalmente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Clientes</CardTitle>
            <CardDescription>
              Cadastre e gerencie os clientes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Lista de Clientes</TabsTrigger>
                <TabsTrigger value="form">
                  {editingClient ? "Editar Cliente" : "Novo Cliente"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-6">
                {loading ? (
                  <p>Carregando clientes...</p>
                ) : error ? (
                  <p className="text-red-600">Erro: {error}</p>
                ) : (
                  <ClientList
                    clients={clients}
                    onEdit={handleEditClient}
                    onDelete={handleDeleteClient}
                  />
                )}
              </TabsContent>

              <TabsContent value="form" className="mt-6">
                <ClientForm
                  onSubmit={
                    editingClient ? handleUpdateClient : handleAddClient
                  }
                  editingClient={editingClient}
                  onCancel={() => setEditingClient(null)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
