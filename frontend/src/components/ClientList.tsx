import React from "react";
import { Client } from "./Dashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientList = ({ clients, onEdit, onDelete }: ClientListProps) => {
  if (clients.length === 0) {
    return (
      <p className="text-gray-500 text-sm">Nenhum cliente cadastrado ainda.</p>
    );
  }

  return (
    <div className="grid gap-4">
      {clients.map((client) => (
        <Card
          key={client.id}
          className="p-4 flex flex-col md:flex-row md:justify-between md:items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{client.name}</h3>
            <p className="text-sm text-gray-500">CPF: {client.cpf}</p>
            <p className="text-sm text-gray-500">
              Endereço: {client.street}, {client.neighborhood}, {client.city} -{" "}
              {client.state}
            </p>
            <p className="text-sm text-gray-500">CEP: {client.postalCode}</p>
            <p className="text-sm text-gray-500">
              Telefones: {client.phones.join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              E-mails: {client.emails.join(", ")}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button onClick={() => onEdit(client)} variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir este cliente?")) {
                  onDelete(client.id);
                }
              }}
              variant="destructive"
              size="sm"
            >
              <Trash className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ClientList;
