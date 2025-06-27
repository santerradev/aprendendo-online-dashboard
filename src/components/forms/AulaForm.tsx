
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Upload, Video, FileText } from "lucide-react";

interface AulaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editData?: any;
}

const AulaForm = ({ isOpen, onClose, onSubmit, editData }: AulaFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: editData || {
      titulo: "",
      descricao: "",
      duracao: "",
      ordem: 1,
      capaAula: null,
      video: null,
      materiais: []
    }
  });

  const onFormSubmit = async (data: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Dados da aula:", data);
      onSubmit(data);
      reset();
      onClose();
      setLoading(false);
    }, 1000);
  };

  const handleFileChange = (fieldName: string, files: FileList | null) => {
    if (files && files.length > 0) {
      console.log(`${fieldName} selecionado:`, files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editData ? "Editar Aula" : "Criar Nova Aula"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Aula *</Label>
              <Input
                id="titulo"
                {...register("titulo", { required: "Título é obrigatório" })}
                placeholder="Ex: Introdução ao React"
              />
              {errors.titulo && (
                <p className="text-sm text-red-600">{errors.titulo.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracao">Duração (minutos) *</Label>
              <Input
                id="duracao"
                type="number"
                {...register("duracao", { required: "Duração é obrigatória" })}
                placeholder="Ex: 30"
              />
              {errors.duracao && (
                <p className="text-sm text-red-600">{errors.duracao.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              {...register("descricao", { required: "Descrição é obrigatória" })}
              placeholder="Descreva o conteúdo da aula..."
              rows={4}
            />
            {errors.descricao && (
              <p className="text-sm text-red-600">{errors.descricao.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ordem">Ordem da Aula *</Label>
            <Input
              id="ordem"
              type="number"
              {...register("ordem", { required: "Ordem é obrigatória" })}
              placeholder="Ex: 1"
              min="1"
            />
            {errors.ordem && (
              <p className="text-sm text-red-600">{errors.ordem.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="capaAula">Capa da Aula</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <input
                    id="capaAula"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange('capaAula', e.target.files)}
                  />
                  <Label htmlFor="capaAula" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Clique para fazer upload da imagem
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG até 5MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video">Vídeo da Aula *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Video className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <input
                    id="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleFileChange('video', e.target.files)}
                  />
                  <Label htmlFor="video" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Clique para fazer upload do vídeo
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-2">MP4, AVI até 500MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materiais">Materiais de Apoio</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <input
                    id="materiais"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    className="hidden"
                    onChange={(e) => handleFileChange('materiais', e.target.files)}
                  />
                  <Label htmlFor="materiais" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Clique para fazer upload dos materiais
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-2">PDF, DOC, PPT até 10MB cada</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-teal-500 hover:bg-teal-600">
              {loading ? "Salvando..." : (editData ? "Salvar Alterações" : "Criar Aula")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AulaForm;
