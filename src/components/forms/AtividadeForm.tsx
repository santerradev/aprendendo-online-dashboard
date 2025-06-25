
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { X, Plus, Trash2 } from "lucide-react";

interface Pergunta {
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
}

interface AtividadeFormData {
  titulo: string;
  materia: string;
  descricao: string;
  autor: string;
  dataPublicacao: string;
  perguntas: Pergunta[];
}

interface AtividadeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AtividadeFormData) => void;
  editData?: Partial<AtividadeFormData>;
  isEditing?: boolean;
}

const AtividadeForm = ({ isOpen, onClose, onSubmit, editData, isEditing = false }: AtividadeFormProps) => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>(
    editData?.perguntas || [
      {
        pergunta: "",
        opcoes: ["", "", "", ""],
        respostaCorreta: 0
      }
    ]
  );

  const form = useForm<AtividadeFormData>({
    defaultValues: {
      titulo: editData?.titulo || "",
      materia: editData?.materia || "",
      descricao: editData?.descricao || "",
      autor: editData?.autor || "",
      dataPublicacao: editData?.dataPublicacao || new Date().toISOString().split('T')[0],
      perguntas: perguntas,
    }
  });

  if (!isOpen) return null;

  const adicionarPergunta = () => {
    setPerguntas([...perguntas, {
      pergunta: "",
      opcoes: ["", "", "", ""],
      respostaCorreta: 0
    }]);
  };

  const removerPergunta = (index: number) => {
    if (perguntas.length > 1) {
      setPerguntas(perguntas.filter((_, i) => i !== index));
    }
  };

  const atualizarPergunta = (index: number, campo: keyof Pergunta, valor: any) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[index] = { ...novasPerguntas[index], [campo]: valor };
    setPerguntas(novasPerguntas);
  };

  const atualizarOpcao = (perguntaIndex: number, opcaoIndex: number, valor: string) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[perguntaIndex].opcoes[opcaoIndex] = valor;
    setPerguntas(novasPerguntas);
  };

  const handleSubmit = (data: AtividadeFormData) => {
    onSubmit({ ...data, perguntas });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">
              {isEditing ? "Editar Atividade" : "Criar Nova Atividade"}
            </CardTitle>
            <CardDescription>
              Preencha as informações da atividade e suas perguntas
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Quiz sobre React Hooks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matéria *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Programação" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o objetivo da atividade..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="autor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Autor *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do professor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataPublicacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Publicação</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Perguntas</h3>
                  <Button type="button" onClick={adicionarPergunta} className="bg-teal-500 hover:bg-teal-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Pergunta
                  </Button>
                </div>

                <div className="space-y-6">
                  {perguntas.map((pergunta, perguntaIndex) => (
                    <Card key={perguntaIndex} className="bg-gray-50 dark:bg-gray-700/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-base">Pergunta {perguntaIndex + 1}</CardTitle>
                        {perguntas.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removerPergunta(perguntaIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Pergunta *</label>
                          <Input
                            value={pergunta.pergunta}
                            onChange={(e) => atualizarPergunta(perguntaIndex, 'pergunta', e.target.value)}
                            placeholder="Digite a pergunta..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Opções de Resposta</label>
                          <div className="space-y-2">
                            {pergunta.opcoes.map((opcao, opcaoIndex) => (
                              <div key={opcaoIndex} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={`resposta-${perguntaIndex}`}
                                  checked={pergunta.respostaCorreta === opcaoIndex}
                                  onChange={() => atualizarPergunta(perguntaIndex, 'respostaCorreta', opcaoIndex)}
                                  className="text-teal-500"
                                />
                                <Input
                                  value={opcao}
                                  onChange={(e) => atualizarOpcao(perguntaIndex, opcaoIndex, e.target.value)}
                                  placeholder={`Opção ${opcaoIndex + 1}`}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Selecione a resposta correta marcando o botão de opção
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                  {isEditing ? "Salvar Alterações" : "Criar Atividade"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AtividadeForm;
