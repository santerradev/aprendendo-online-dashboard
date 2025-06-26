
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Plus, User, GraduationCap, Play } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import CursoForm from "@/components/forms/CursoForm";

const mockCourses = [
  {
    id: 1,
    titulo: "Curso Completo de React",
    materia: "Programação Web",
    autor: "Prof. João Silva",
    capa: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    totalAulas: 15,
    aulasCompletas: 8,
    progresso: 53
  },
  {
    id: 2,
    titulo: "JavaScript Moderno",
    materia: "Programação",
    autor: "Prof. Maria Santos",
    capa: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    totalAulas: 20,
    aulasCompletas: 20,
    progresso: 100
  },
  {
    id: 3,
    titulo: "Design Responsivo com CSS",
    materia: "Web Design",
    autor: "Prof. Carlos Lima",
    capa: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    totalAulas: 12,
    aulasCompletas: 3,
    progresso: 25
  },
  {
    id: 4,
    titulo: "Node.js para Iniciantes",
    materia: "Backend",
    autor: "Prof. Ana Costa",
    capa: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    totalAulas: 18,
    aulasCompletas: 0,
    progresso: 0
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCursoForm, setShowCursoForm] = useState(false);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
    
    // Redirecionar admin para painel administrativo
    if (userData.tipo === 'admin') {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleAccessCourse = (courseId: number) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    navigate(`/curso/${courseId}`);
  };

  const handleCriarCurso = (data: any) => {
    console.log("Criando curso:", data);
  };

  const isProfessor = user?.tipo === 'professor';
  const isAdmin = user?.tipo === 'admin';

  // Redirecionar admin para painel se já estiver logado
  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-teal-500" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  LearnFlow
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {user ? (
                <div className="flex items-center space-x-4">
                  {isProfessor && (
                    <Button 
                      onClick={() => setShowCursoForm(true)}
                      className="bg-teal-500 hover:bg-teal-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Curso
                    </Button>
                  )}
                  
                  <div className="relative group">
                    <img
                      src={user.foto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                      alt="Foto do usuário"
                      className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-teal-500"
                      onClick={() => navigate("/perfil")}
                    />
                    
                    <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.nome}
                      </p>
                      <div className="flex items-center mt-1">
                        {user.tipo === 'professor' ? (
                          <span className="flex items-center text-xs text-teal-600 dark:text-teal-400">
                            <span className="flex w-2 h-2 bg-teal-500 rounded-full mr-1.5"></span>
                            Professor
                          </span>
                        ) : user.tipo === 'admin' ? (
                          <span className="flex items-center text-xs text-purple-600 dark:text-purple-400">
                            <span className="flex w-2 h-2 bg-purple-500 rounded-full mr-1.5"></span>
                            Administrador
                          </span>
                        ) : (
                          <span className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                            <span className="flex w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                            Aluno
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="mt-2 w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowLogin(true)}
                    className="border-teal-500 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => setShowRegister(true)}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    Cadastrar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Aprenda no seu ritmo, <br />
            <span className="text-teal-200">conquiste seus objetivos</span>
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Plataforma completa de cursos online com professores qualificados e 
            conteúdo atualizado para impulsionar sua carreira.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setShowRegister(true)}
                className="bg-white text-teal-600 hover:bg-gray-100 font-semibold"
              >
                Comece Agora Gratuitamente
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setShowLogin(true)}
                className="border-white text-white hover:bg-white/10"
              >
                Já tenho conta
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {user ? (isProfessor ? "Meus Cursos" : "Continue Aprendendo") : "Cursos Disponíveis"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {user 
                ? (isProfessor ? "Gerencie seus cursos e acompanhe o progresso dos alunos" : "Continue de onde parou e explore novos conteúdos")
                : "Descubra nosso catálogo de cursos e comece sua jornada de aprendizado"
              }
            </p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.capa}
                  alt={course.titulo}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {course.materia}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-900 dark:text-white line-clamp-2">
                  {course.titulo}
                </CardTitle>
                <CardDescription className="flex items-center text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  {course.autor}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.totalAulas} aulas
                    </div>
                    {user && !isProfessor && (
                      <span>{course.aulasCompletas}/{course.totalAulas} concluídas</span>
                    )}
                  </div>
                  
                  {user && !isProfessor && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                        <span className="text-gray-600 dark:text-gray-400">{course.progresso}%</span>
                      </div>
                      <Progress value={course.progresso} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                      onClick={() => handleAccessCourse(course.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Acessar
                    </Button>
                    
                    {isProfessor && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700"
                        >
                          Excluir
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for Professor */}
        {isProfessor && mockCourses.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum curso criado ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Comece criando seu primeiro curso e compartilhe seu conhecimento
            </p>
            <Button 
              onClick={() => setShowCursoForm(true)}
              className="bg-teal-500 hover:bg-teal-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Curso
            </Button>
          </div>
        )}
      </main>

      {/* Modals */}
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

      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          onRegister={handleLogin}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showCursoForm && (
        <CursoForm
          isOpen={showCursoForm}
          onClose={() => setShowCursoForm(false)}
          onSubmit={handleCriarCurso}
        />
      )}
    </div>
  );
};

export default Index;
