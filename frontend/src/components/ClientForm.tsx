import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Minus, Save, X } from "lucide-react";
import { Client } from "./Dashboard";

interface ClientFormProps {
  onSubmit: (client: Omit<Client, "id"> | Client) => void;
  editingClient?: Client | null;
  onCancel?: () => void;
}

const ClientForm = ({ onSubmit, editingClient, onCancel }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    address: {
      zipCode: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    phones: [""],
    emails: [""],
  });

  useEffect(() => {
    if (editingClient) {
      setFormData({
        name: editingClient.name,
        cpf: editingClient.cpf,
        address: { ...editingClient.address },
        phones: [...editingClient.phones],
        emails: [...editingClient.emails],
      });
    }
  }, [editingClient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = {
      name: formData.name,
      cpf: formData.cpf,
      postalCode: formData.address.zipCode,
      street: formData.address.street,
      neighborhood: formData.address.neighborhood,
      city: formData.address.city,
      state: formData.address.state,
      phones: formData.phones.filter((phone) => phone.trim() !== ""),
      emails: formData.emails.filter((email) => email.trim() !== ""),
    };

    if (editingClient) {
      onSubmit({ ...cleanedData, id: editingClient.id });
    } else {
      onSubmit(cleanedData);
    }

    if (!editingClient) {
      setFormData({
        name: "",
        cpf: "",
        address: {
          zipCode: "",
          street: "",
          neighborhood: "",
          city: "",
          state: "",
        },
        phones: [""],
        emails: [""],
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    array: "phones" | "emails",
    index: number,
    value: string
  ) => {
    const newArray = [...formData[array]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [array]: newArray,
    }));
  };

  const addArrayItem = (array: "phones" | "emails") => {
    setFormData((prev) => ({
      ...prev,
      [array]: [...prev[array], ""],
    }));
  };

  const removeArrayItem = (array: "phones" | "emails", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [array]: prev[array].filter((_, i) => i !== index),
    }));
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  // 🔎 Função de busca do ViaCEP
  const fetchAddressFromZip = async (zipCode: string) => {
    try {
      const cleanZip = zipCode.replace(/\D/g, "");
      if (cleanZip.length !== 8) return;

      const response = await fetch(
        `https://viacep.com.br/ws/${cleanZip}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
        },
      }));
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar endereço pelo CEP.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingClient ? "Editar Cliente" : "Cadastrar Novo Cliente"}
        </CardTitle>
        <CardDescription>
          Preencha os dados do cliente conforme as especificações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nome completo do cliente"
              required
            />
          </div>

          {/* CPF */}
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => {
                const formatted = formatCPF(e.target.value);
                if (formatted.length <= 14) {
                  handleInputChange("cpf", formatted);
                }
              }}
              placeholder="000.000.000-00"
              required
            />
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Endereço</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP *</Label>
                <Input
                  id="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => {
                    const formatted = formatZipCode(e.target.value);
                    if (formatted.length <= 9) {
                      handleAddressChange("zipCode", formatted);

                      if (formatted.replace(/\D/g, "").length === 8) {
                        fetchAddressFromZip(formatted);
                      }
                    }
                  }}
                  placeholder="00000-000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Logradouro *</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) =>
                    handleAddressChange("street", e.target.value)
                  }
                  placeholder="Rua, Avenida, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  value={formData.address.neighborhood}
                  onChange={(e) =>
                    handleAddressChange("neighborhood", e.target.value)
                  }
                  placeholder="Nome do bairro"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="Nome da cidade"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">UF *</Label>
                <Input
                  id="state"
                  value={formData.address.state}
                  onChange={(e) =>
                    handleAddressChange("state", e.target.value.toUpperCase())
                  }
                  placeholder="SP"
                  maxLength={2}
                  required
                />
              </div>
            </div>
          </div>

          {/* Telefones */}
          <div className="space-y-2">
            <Label>Telefones *</Label>
            {formData.phones.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={phone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    if (formatted.replace(/\D/g, "").length <= 11) {
                      handleArrayChange("phones", index, formatted);
                    }
                  }}
                  placeholder="(11) 99999-9999"
                  required={index === 0}
                />
                {formData.phones.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem("phones", index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("phones")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Telefone
            </Button>
          </div>

          {/* Emails */}
          <div className="space-y-2">
            <Label>E-mails *</Label>
            {formData.emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    handleArrayChange("emails", index, e.target.value)
                  }
                  placeholder="email@exemplo.com"
                  required={index === 0}
                />
                {formData.emails.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem("emails", index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("emails")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar E-mail
            </Button>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingClient ? "Atualizar" : "Cadastrar"}
            </Button>

            {editingClient && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClientForm;
