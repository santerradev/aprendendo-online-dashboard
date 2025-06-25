
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Calendar, CheckCircle } from "lucide-react";

const mockAula = {
  id: 1,
  numero: 1,
  titulo: "aula 01",
  materia: "CADASTRO TESTE1",
  descricao: "teste",
  autor: "professor",
  dataPublicacao: "17/06/2025",
  video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  concluida: false
};

const mockCursoAulas = [
  { id: 1, titulo: "aula 01", materia: "cadastro teste1", concluida: false, atual: true },
  { id: 2, titulo: "aula 02", materia: "cadastro teste1", concluida: false, atual: false },
  { id: 3, titulo: "aula 03", materia: "cadastro teste1", concluida: false, atual: false }
];

interface AulaProps {
  user?: any;
}

const Aula = ({ user }: AulaProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aula] = useState(mockAula);
  const [aulasLista] = useState(mockCursoAulas);
  const [concluida, setConcluida] = useState(false);

  const isProfessor = user?.tipo === 'professor';

  const handleMarcarConcluida = () => {
    setConcluida(true);
    // Aqui seria feita a chamada para a API para marcar como concluída
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                LearnFlow
              </Button>
            </div>
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
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden mb-6">
              <video
                controls
                className="w-full h-64 md:h-96 lg:h-[500px]"
                poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
              >
                <source src={aula.video} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>

            {/* Aula Info */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-teal-400 uppercase text-sm font-semibold mb-2">
                      {aula.materia}
                    </div>
                    <CardTitle className="text-white text-2xl">
                      {aula.titulo}
                    </CardTitle>
                  </div>
                  {!isProfessor && !concluida && (
                    <Button 
                      onClick={handleMarcarConcluida}
                      className="bg-teal-500 hover:bg-teal-600"
                    >
                      Marcar como Concluída
                    </Button>
                  )}
                  {concluida && (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Concluída
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Sobre esta aula</h3>
                  <p className="text-gray-300 mb-4">{aula.descricao}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <span>Publicado por: </span>
                      <span className="flex items-center ml-1">
                        <span className="flex w-2 h-2 bg-teal-500 rounded-full mr-1"></span>
                        {aula.autor}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {aula.dataPublicacao}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Lista de Aulas */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Aulas do Curso: curso teste
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {aulasLista.map((aulaItem, index) => (
                    <div
                      key={aulaItem.id}
                      className={`p-4 border-l-4 cursor-pointer transition-colors ${
                        aulaItem.atual
                          ? 'bg-teal-900/50 border-teal-500'
                          : 'bg-gray-700/50 border-transparent hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {aulaItem.atual ? (
                            <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                              <span className="text-white text-sm font-bold">▶</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                              <span className="text-gray-300 text-sm">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-sm">
                            {aulaItem.titulo}
                          </div>
                          <div className="text-gray-400 text-xs">
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
