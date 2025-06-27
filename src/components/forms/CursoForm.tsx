
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, BookOpen } from "lucide-react";

interface CursoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editData?: any;
}

const CursoForm = ({ isOpen, onClose, onSubmit, editData }: CursoFormProps) => {
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState(editData?.categoria || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: editData || {
      titulo: "",
      descricao: "",
      categoria: "",
      nivel: "",
      preco: "",
      capa: null
    }
  });

  const onFormSubmit = async (data: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const cursoData = {
        ...data,
        categoria
      };
      console.log("Dados do curso:", cursoData);
      onSubmit(cursoData);
      reset();
      onClose();
      setLoading(false);
    }, 1000);
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log("Capa selecionada:", files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-teal-500" />
            {editData ? "Editar Curso" : "Criar Novo Curso"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título do Curso *</Label>
            <Input
              id="titulo"
              {...register("titulo", { required: "Título é obrigatório" })}
              placeholder="Ex: Curso Completo de React"
            />
            {errors.titulo && (
              <p className="text-sm text-red-600">{errors.titulo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              {...register("descricao", { required: "Descrição é obrigatória" })}
              placeholder="Descreva o que os alunos aprenderão neste curso..."
              rows={4}
            />
            {errors.descricao && (
              <p className="text-sm text-red-600">{errors.descricao.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programacao">Programação</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="business">Negócios</SelectItem>
                  <SelectItem value="idiomas">Idiomas</SelectItem>
                  <SelectItem value="musica">Música</SelectItem>
                  <SelectItem value="fotografia">Fotografia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivel">Nível *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              id="preco"
              type="number"
              step="0.01"
              {...register("preco")}
              placeholder="Ex: 99.90 (deixe vazio para curso gratuito)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capa">Capa do Curso *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <input
                  id="capa"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
                <Label htmlFor="capa" className="cursor-pointer text-blue-600 hover:text-blue-700">
                  Clique para fazer upload da capa
                </Label>
              </div>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG até 5MB (1200x675px recomendado)</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-teal-500 hover:bg-teal-600">
              {loading ? "Salvando..." : (editData ? "Salvar Alterações" : "Criar Curso")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CursoForm;
