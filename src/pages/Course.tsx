import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Plus, Edit, Trash2, User, Calendar, BookOpen, Activity, Clock, FileText } from "lucide-react";
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
  totalAulas: 3,
  duracaoTotal: "2 horas"
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

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({ 
    id: 1, 
    nome: "João Silva", 
    tipo: "professor", 
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
  });
  const [showAulaForm, setShowAulaForm] = useState(false);
  const [showAtividadeForm, setShowAtividadeForm] = useState(false);
  const [editingAula, setEditingAula] = useState<any>(null);
  const [editingAtividade, setEditingAtividade] = useState<any>(null);

  const isProfessor = user?.tipo === 'professor';
  
  // Calcular progresso
  const totalAulas = mockCourse.totalAulas;
  const aulasCompletas = mockCourse.totalAulas;
  const progressoPercentual = totalAulas > 0 ? (aulasCompletas / totalAulas) * 100 : 0;

  const handleAcessarAula = (aulaId: number) => {
    navigate(`/aula/${aulaId}`);
  };

  const handleCriarAula = (data: any) => {
    console.log("Criando aula:", data);
    setShowAulaForm(false);
  };

  const handleEditAula = (aula: any) => {
    setEditingAula(aula);
    setShowAulaForm(true);
  };

  const handleCriarAtividade = (data: any) => {
    console.log("Criando atividade:", data);
    setShowAtividadeForm(false);
  };

  const handleEditAtividade = (atividade: any) => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

      <main className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={mockCourse.capa}
              alt={mockCourse.titulo}
              className="w-48 h-32 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {mockCourse.titulo}
              </h1>
              <Badge variant="secondary" className="mb-3">
                {mockCourse.materia}
              </Badge>
              {mockCourse.descricao && (
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {mockCourse.descricao}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {mockCourse.autor}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {totalAulas} aulas
                </div>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  {mockCourse.atividades?.length} atividades
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Aulas Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Play className="h-5 w-5 mr-2 text-teal-500" />
                    Aulas do Curso
                  </CardTitle>
                  <CardDescription>
                    {mockCourse.totalAulas} aulas • {mockCourse.duracaoTotal} de conteúdo
                  </CardDescription>
                </div>
                {isProfessor && (
                  <Button 
                    onClick={() => setShowAulaForm(true)}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Aula
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourse.aulas.map((aula, index) => (
                    <div key={aula.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                            <span className="text-teal-600 dark:text-teal-400 font-semibold">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                            {aula.titulo}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {aula.descricao}
                          </p>
                          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {aula.duracao}
                            </span>
                            {aula.materiais && (
                              <span className="flex items-center">
                                <FileText className="h-4 w-4 mr-1" />
                                {aula.materiais.length} materiais
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/aula/${aula.id}`)}
                          className="bg-teal-500 hover:bg-teal-600"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Assistir
                        </Button>
                        {isProfessor && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditAula(aula)}
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
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Atividades Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-purple-500" />
                    Atividades e Exercícios
                  </CardTitle>
                  <CardDescription>
                    {mockCourse.atividades?.length || 0} atividades disponíveis
                  </CardDescription>
                </div>
                {isProfessor && (
                  <Button 
                    onClick={() => setShowAtividadeForm(true)}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Atividade
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourse.atividades?.map((atividade: any) => (
                    <div key={atividade.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {atividade.titulo}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {atividade.descricao}
                          </p>
                          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{atividade.perguntas?.length || 0} perguntas</span>
                            <Badge variant={atividade.status === 'concluida' ? 'default' : 'secondary'}>
                              {atividade.status === 'concluida' ? 'Concluída' : 'Pendente'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Fazer
                        </Button>
                        {isProfessor && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditAtividade(atividade)}
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
                  )) || (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Nenhuma atividade disponível ainda.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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
                  <span>Instrutor: {mockCourse.autor}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <BookOpen className="h-4 w-4" />
                  <span>{totalAulas} aulas • {mockCourse.atividades?.length} atividades</span>
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
                        {mockCourse.atividades?.filter(a => a.concluida).length}/{mockCourse.atividades?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Formulários */}
      {showAulaForm && (
        <AulaForm
          isOpen={showAulaForm}
          onClose={() => {
            setShowAulaForm(false);
            setEditingAula(null);
          }}
          onSubmit={handleCriarAula}
          editData={editingAula}
        />
      )}

      {showAtividadeForm && (
        <AtividadeForm
          isOpen={showAtividadeForm}
          onClose={() => {
            setShowAtividadeForm(false);
            setEditingAtividade(null);
          }}
          onSubmit={handleCriarAtividade}
          editData={editingAtividade}
          isEditing={!!editingAtividade}
        />
      )}
    </div>
  );
};

export default Course;
