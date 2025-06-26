
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Mail, Lock, User, Upload } from "lucide-react";

interface RegisterFormProps {
  onClose: () => void;
  onRegister: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onClose, onRegister, onSwitchToLogin }: RegisterFormProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("aluno");
  const [foto, setFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewFoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foto) {
      alert("Por favor, selecione uma foto de perfil.");
      return;
    }
    
    setLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: Date.now(),
        nome,
        email,
        tipo,
        foto: previewFoto || `https://images.unsplash.com/photo-${tipo === 'professor' ? '1472099645785-5658abf4ff4e' : '1494790108755-2616b612b786'}?w=150&h=150&fit=crop&crop=face`
      };
      
      onRegister(mockUser);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
          <CardDescription className="text-center">
            Junte-se à nossa plataforma de aprendizado
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foto">Foto de Perfil *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                {previewFoto ? (
                  <div className="space-y-2">
                    <img
                      src={previewFoto}
                      alt="Preview"
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    <p className="text-sm text-gray-600">Foto selecionada</p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600 mt-2">Clique para selecionar uma foto</p>
                  </>
                )}
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                  required
                />
                <Label htmlFor="foto" className="cursor-pointer text-blue-600 hover:text-blue-700 block mt-2">
                  {previewFoto ? "Trocar foto" : "Selecionar foto"}
                </Label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG até 2MB</p>
            </div>

            <div className="space-y-3">
              <Label>Tipo de Usuário</Label>
              <RadioGroup value={tipo} onValueChange={setTipo}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aluno" id="aluno" />
                  <Label htmlFor="aluno" className="cursor-pointer">
                    <span className="flex items-center">
                      <span className="flex w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Aluno - Quero aprender
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professor" id="professor" />
                  <Label htmlFor="professor" className="cursor-pointer">
                    <span className="flex items-center">
                      <span className="flex w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                      Professor - Quero ensinar
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer">
                    <span className="flex items-center">
                      <span className="flex w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                      Administrador - Gerenciar plataforma
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:underline font-medium"
              >
                Faça login
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
