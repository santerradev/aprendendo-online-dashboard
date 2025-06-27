
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Plus, Edit, Trash2, User, Calendar, BookOpen, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import AulaForm from "@/components/forms/AulaForm";
import AtividadeForm from "@/components/forms/AtividadeForm";

const mockCourse = {
  id: 1,
  titulo: "Curso Completo de React",
  materia: "Programação Web",
  autor: "Prof. João Silva",
  capa: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  descricao: "Aprenda React do básico ao avançado, incluindo hooks, context API, e desenvolvimento de aplicações completas.",
  totalAulas: 15,
  duracaoTotal: "8h 30min"
};

const mockAulas = [
  {
    id: 1,
    numero: 1,
    titulo: "Introdução ao React",
    materia: "Programação Web",
    autor: "Prof. João Silva",
    dataPublicacao: "14/06/2025",
    capa: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop",
    video: "sample-video.mp4",
    concluida: true
  },
  {
    id: 2,
    numero: 2,
    titulo: "Componentes e Props",
    materia: "Programação Web",
    autor: "Prof. João Silva",
    dataPublicacao: "17/06/2025",
    capa: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop",
    video: "sample-video-2.mp4",
    concluida: false
  },
  {
    id: 3,
    numero: 3,
    titulo: "Estado e Ciclo de Vida",
    materia: "Programação Web",
    autor: "Prof. João Silva",
    dataPublicacao: "20/06/2025",
    capa: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop",
    video: "sample-video-3.mp4",
    concluida: false
  }
];

const mockAtividades = [
  {
    id: 1,
    numero: 1,
    titulo: "Quiz: Fundamentos do React",
    materia: "Programação Web",
    autor: "Prof. João Silva",
    dataPublicacao: "15/06/2025",
    pontuacao: 85,
    concluida: true
  },
  {
    id: 2,
    numero: 2,
    titulo: "Exercício: Criando Componentes",
    materia: "Programação Web",
    autor: "Prof. João Silva",
    dataPublicacao: "18/06/2025",
    pontuacao: null,
    concluida: false
  }
];

interface CourseProps {
  user?: any;
}

const Course = ({ user }: CourseProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course] = useState(mockCourse);
  const [aulas] = useState(mockAulas);
  const [atividades] = useState(mockAtividades);
  const [showAulaForm, setShowAulaForm] = useState(false);
  const [showAtividadeForm, setShowAtividadeForm] = useState(false);
  const [editingAula, setEditingAula] = useState<any>(null);
  const [editingAtividade, setEditingAtividade] = useState<any>(null);

  const isProfessor = user?.tipo === 'professor';
  
  // Calcular progresso
  const totalAulas = aulas.length;
  const aulasCompletas = aulas.filter(aula => aula.concluida).length;
  const progressoPercentual = totalAulas > 0 ? (aulasCompletas / totalAulas) * 100 : 0;

  const handleAcessarAula = (aulaId: number) => {
    navigate(`/aula/${aulaId}`);
  };

  const handleCriarAula = (data: any) => {
    console.log("Criando aula:", data);
    // Aqui você faria a chamada para a API
  };

  const handleEditarAula = (aula: any) => {
    setEditingAula(aula);
    setShowAulaForm(true);
  };

  const handleCriarAtividade = (data: any) => {
    console.log("Criando atividade:", data);
    // Aqui você faria a chamada para a API
  };

  const handleEditarAtividade = (atividade: any) => {
    setEditingAtividade(atividade);
    setShowAtividadeForm(true);
  };

  const handleApagarAula = (aulaId: number) => {
    if (confirm("Tem certeza que deseja apagar esta aula?")) {
      console.log("Apagando aula:", aulaId);
      // Aqui você faria a chamada para a API
    }
  };

  const handleApagarAtividade = (atividadeId: number) => {
    if (confirm("Tem certeza que deseja apagar esta atividade?")) {
      console.log("Apagando atividade:", atividadeId);
      // Aqui você faria a chamada para a API
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                LearnFlow
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user && (
                <div className="flex items-center space-x-2">
                  <img
                    src={user.foto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                    alt="Foto do usuário"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={course.capa}
              alt={course.titulo}
              className="w-48 h-32 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {course.titulo}
              </h1>
              <Badge variant="secondary" className="mb-3">
                {course.materia}
              </Badge>
              {course.descricao && (
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {course.descricao}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {course.autor}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {totalAulas} aulas
                </div>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  {atividades.length} atividades
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Aulas Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Play className="h-6 w-6 mr-2 text-teal-500" />
                  Aulas
                </h2>
                {isProfessor && (
                  <Button 
                    onClick={() => setShowAulaForm(true)}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Aula
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {aulas.map((aula) => (
                  <Card key={aula.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={aula.capa}
                            alt={aula.titulo}
                            className="w-20 h-14 object-cover rounded-lg"
                          />
                          {aula.concluida && (
                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                              <Play className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {aula.numero}. {aula.titulo}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>{aula.materia}</span>
                                <span>•</span>
                                <span>{aula.autor}</span>
                                <span>•</span>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {aula.dataPublicacao}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-teal-500 hover:bg-teal-600 text-white"
                                onClick={() => handleAcessarAula(aula.id)}
                              >
                                Acessar
                              </Button>
                              {isProfessor && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-blue-600 hover:text-blue-700"
                                    onClick={() => handleEditarAula(aula)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleApagarAula(aula.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Atividades Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Activity className="h-6 w-6 mr-2 text-teal-500" />
                  Atividades
                </h2>
                {isProfessor && (
                  <Button 
                    onClick={() => setShowAtividadeForm(true)}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Atividade
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {atividades.map((atividade) => (
                  <Card key={atividade.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                            <span className="text-teal-600 dark:text-teal-400 font-bold">
                              {atividade.numero}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {atividade.titulo}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{atividade.materia}</span>
                              <span>•</span>
                              <span>{atividade.autor}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {atividade.dataPublicacao}
                              </div>
                              {atividade.concluida && atividade.pontuacao && (
                                <>
                                  <span>•</span>
                                  <Badge variant={atividade.pontuacao >= 70 ? "default" : "destructive"}>
                                    {atividade.pontuacao}/100
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-teal-500 hover:bg-teal-600 text-white"
                          >
                            Acessar
                          </Button>
                          {isProfessor && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-blue-600 hover:text-blue-700"
                                onClick={() => handleEditarAtividade(atividade)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleApagarAtividade(atividade.id)}
                              >
                                <Trash2 className="h-3 w-3" />
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 sticky top-4">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Informações do Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <User className="h-4 w-4" />
                  <span>Instrutor: {course.autor}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <BookOpen className="h-4 w-4" />
                  <span>{totalAulas} aulas • {atividades.length} atividades</span>
                </div>
                
                {!isProfessor && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Progresso do Curso</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {Math.round(progressoPercentual)}%
                      </span>
                    </div>
                    <Progress value={progressoPercentual} className="h-2" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {aulasCompletas} de {totalAulas} aulas concluídas
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Estatísticas
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Aulas concluídas:</span>
                      <span className="font-medium">{aulasCompletas}/{totalAulas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Atividades feitas:</span>
                      <span className="font-medium">
                        {atividades.filter(a => a.concluida).length}/{atividades.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Formulários */}
      <AulaForm
        isOpen={showAulaForm}
        onClose={() => {
          setShowAulaForm(false);
          setEditingAula(null);
        }}
        onSubmit={editingAula ? handleEditarAula : handleCriarAula}
        editData={editingAula}
      />

      <AtividadeForm
        isOpen={showAtividadeForm}
        onClose={() => {
          setShowAtividadeForm(false);
          setEditingAtividade(null);
        }}
        onSubmit={editingAtividade ? handleEditarAtividade : handleCriarAtividade}
        editData={editingAtividade}
      />
    </div>
  );
};

export default Course;
