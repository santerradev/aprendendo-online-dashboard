
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Play, SkipForward, User, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const mockAula = {
  id: 1,
  numero: 1,
  titulo: "Introdução ao React",
  materia: "Programação Web",
  descricao: "Nesta aula você aprenderá os conceitos fundamentais do React, incluindo componentes, JSX e como criar sua primeira aplicação.",
  autor: "Prof. João Silva",
  dataPublicacao: "17/06/2025",
  video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  concluida: false
};

const mockCursoAulas = [
  { id: 1, titulo: "Introdução ao React", materia: "Programação Web", concluida: true, atual: true },
  { id: 2, titulo: "Componentes e Props", materia: "Programação Web", concluida: false, atual: false },
  { id: 3, titulo: "Estado e Ciclo de Vida", materia: "Programação Web", concluida: false, atual: false },
  { id: 4, titulo: "Eventos e Formulários", materia: "Programação Web", concluida: false, atual: false },
  { id: 5, titulo: "Hooks - useState e useEffect", materia: "Programação Web", concluida: false, atual: false }
];

interface AulaProps {
  user?: any;
}

const Aula = ({ user }: AulaProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aula] = useState(mockAula);
  const [aulasLista] = useState(mockCursoAulas);
  const [concluida, setConcluida] = useState(aula.concluida);
  const [videoProgress, setVideoProgress] = useState(0);

  const isProfessor = user?.tipo === 'professor';

  const handleMarcarConcluida = () => {
    if (videoProgress >= 80) { // Só pode concluir se assistiu pelo menos 80% do vídeo
      setConcluida(true);
      // Aqui seria feita a chamada para a API para marcar como concluída
      console.log("Aula marcada como concluída");
    }
  };

  const handleProximaAula = () => {
    const aulaAtualIndex = aulasLista.findIndex(a => a.atual);
    const proximaAula = aulasLista[aulaAtualIndex + 1];
    if (proximaAula && concluida) {
      navigate(`/aula/${proximaAula.id}`);
    }
  };

  const handleVideoProgress = (e: any) => {
    const video = e.target;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(progress);
  };

  const proximaAulaDisponivel = aulasLista.findIndex(a => a.atual) < aulasLista.length - 1;

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
                onClick={() => navigate(-1)}
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden mb-6 shadow-lg">
              <video
                controls
                className="w-full h-64 md:h-96 lg:h-[500px]"
                poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
                onTimeUpdate={handleVideoProgress}
              >
                <source src={aula.video} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>

            {/* Aula Info */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {aula.materia}
                      </span>
                      {concluida && (
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Concluída
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-2xl mb-2">
                      Aula {aula.numero}: {aula.titulo}
                    </CardTitle>
                  </div>
                  
                  <div className="flex space-x-2">
                    {!isProfessor && !concluida && videoProgress >= 80 && (
                      <Button 
                        onClick={handleMarcarConcluida}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Marcar como Concluída
                      </Button>
                    )}
                    
                    {!isProfessor && concluida && proximaAulaDisponivel && (
                      <Button 
                        onClick={handleProximaAula}
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        Próxima Aula
                        <SkipForward className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-3 text-lg">
                    Sobre esta aula
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {aula.descricao}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>Instrutor: </span>
                      <span className="flex items-center ml-1 font-medium">
                        <span className="flex w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                        {aula.autor}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Publicado em {aula.dataPublicacao}</span>
                    </div>
                  </div>

                  {!isProfessor && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Progresso do vídeo</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {Math.round(videoProgress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-teal-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(videoProgress, 100)}%` }}
                        ></div>
                      </div>
                      {videoProgress < 80 && !concluida && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Assista pelo menos 80% do vídeo para poder marcar como concluída
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Lista de Aulas */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <Play className="h-5 w-5 mr-2 text-teal-500" />
                  Aulas do Curso
                </CardTitle>
                <CardDescription>
                  Curso Completo de React
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {aulasLista.map((aulaItem, index) => (
                    <div
                      key={aulaItem.id}
                      className={`p-4 border-l-4 cursor-pointer transition-all duration-200 ${
                        aulaItem.atual
                          ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-500'
                          : aulaItem.concluida
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-500 hover:bg-green-100 dark:hover:bg-green-900/30'
                          : 'bg-gray-50 dark:bg-gray-700/50 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {aulaItem.atual ? (
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                              <Play className="h-4 w-4 text-white fill-current" />
                            </div>
                          ) : aulaItem.concluida ? (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                                {index + 1}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm leading-tight ${
                            aulaItem.atual 
                              ? 'text-teal-700 dark:text-teal-300' 
                              : aulaItem.concluida
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {aulaItem.titulo}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            {aulaItem.materia}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aula;
