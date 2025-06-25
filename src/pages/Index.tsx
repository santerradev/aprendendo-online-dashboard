
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Star, Play, User, LogIn, UserPlus, Edit, Trash2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    titulo: "Introdução ao JavaScript",
    materia: "Programação",
    autor: "Ana Silva",
    capa: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    progresso: 75,
    avaliacao: 4.8,
    totalAulas: 24,
    duracao: "8 horas"
  },
  {
    id: 2,
    titulo: "Design Responsivo com CSS",
    materia: "Web Design",
    autor: "Carlos Pereira",
    capa: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    progresso: 45,
    avaliacao: 4.6,
    totalAulas: 18,
    duracao: "6 horas"
  },
  {
    id: 3,
    titulo: "React para Iniciantes",
    materia: "Programação",
    autor: "Juliana Costa",
    capa: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=250&fit=crop",
    progresso: 0,
    avaliacao: 4.9,
    totalAulas: 32,
    duracao: "12 horas"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleRegister = (userData: any) => {
    setUser(userData);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAcessarCurso = (cursoId: number) => {
    navigate(`/curso/${cursoId}`);
  };

  const handleAcessarPerfil = () => {
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                LearnFlow
              </h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center space-x-4">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    onClick={handleAcessarPerfil}
                  >
                    <img
                      src={user.foto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                      alt="Foto do usuário"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.nome}
                      </span>
                      <span className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-400">
                        <span className={`flex w-2 h-2 rounded-full mr-1 ${
                          user.tipo === 'professor' ? 'bg-teal-500' : 'bg-blue-600'
                        }`}></span>
                        {user.tipo === 'professor' ? 'Professor' : 'Aluno'}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
                    <LogIn className="h-4 w-4 mr-1" />
                    Entrar
                  </Button>
                  <Button size="sm" onClick={() => setShowRegister(true)}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Cadastrar
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Aprenda com os melhores cursos online
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Desenvolva suas habilidades com cursos práticos e atualizados, 
            criados por professores especialistas.
          </p>
          
          {!user && (
            <div className="flex justify-center space-x-4">
              <Button size="lg" onClick={() => setShowRegister(true)}>
                Começar Agora
              </Button>
              <Button variant="outline" size="lg" onClick={() => setShowLogin(true)}>
                Fazer Login
              </Button>
            </div>
          )}
        </section>

        {/* Course Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Cursos Disponíveis
            </h3>
            {user?.tipo === 'professor' && (
              <Button>
                <BookOpen className="h-4 w-4 mr-2" />
                Criar Curso
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((curso) => (
              <Card key={curso.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <div className="relative">
                  <img
                    src={curso.capa}
                    alt={curso.titulo}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {curso.materia}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{curso.titulo}</CardTitle>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-gray-600 dark:text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      {curso.autor}
                    </span>
                    <span className="flex items-center text-gray-600 dark:text-gray-400">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {curso.avaliacao}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{curso.totalAulas} aulas</span>
                      <span>{curso.duracao}</span>
                    </div>
                    
                    {user?.tipo === 'aluno' && curso.progresso > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                          <span className="text-gray-600 dark:text-gray-400">{curso.progresso}%</span>
                        </div>
                        <Progress value={curso.progresso} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handleAcessarCurso(curso.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {user?.tipo === 'aluno' && curso.progresso > 0 ? 'Continuar' : 'Acessar'}
                      </Button>
                      
                      {user?.tipo === 'professor' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {/* Register Modal */}
      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Index;
