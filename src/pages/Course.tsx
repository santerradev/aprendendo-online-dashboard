
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Plus, Edit, Trash2, User, Calendar } from "lucide-react";

const mockCourse = {
  id: 1,
  titulo: "absolute cinema",
  materia: "hollywood",
  autor: "prof",
  capa: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=250&fit=crop",
  descricao: "Curso completo sobre cinema absoluto e suas técnicas avançadas"
};

const mockAulas = [
  {
    id: 1,
    numero: 1,
    titulo: "aula 01",
    materia: "ppl",
    autor: "prof",
    dataPublicacao: "14/06/2025",
    capa: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop",
    video: "sample-video.mp4",
    concluida: false
  },
  {
    id: 2,
    numero: 2,
    titulo: "aula 02",
    materia: "cadastro teste1",
    autor: "professor",
    dataPublicacao: "17/06/2025",
    capa: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop",
    video: "sample-video-2.mp4",
    concluida: false
  },
  {
    id: 3,
    numero: 3,
    titulo: "aula 03",
    materia: "cadastro teste1",
    autor: "professor",
    dataPublicacao: "17/06/2025",
    capa: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop",
    video: "sample-video-3.mp4",
    concluida: false
  }
];

const mockAtividades = [
  {
    id: 1,
    numero: 1,
    titulo: "Atividade Prática 1",
    materia: "hollywood",
    autor: "prof",
    dataPublicacao: "15/06/2025"
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

  const isProfessor = user?.tipo === 'professor';

  const handleAcessarAula = (aulaId: number) => {
    navigate(`/aula/${aulaId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 dark:bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
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
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {course.titulo}
          </h1>
          <p className="text-teal-500 text-lg mb-4">{course.materia}</p>
          {course.descricao && (
            <p className="text-gray-600 dark:text-gray-300 mb-4">{course.descricao}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Aulas Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AULA</h2>
                {isProfessor && (
                  <Button className="bg-teal-500 hover:bg-teal-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Aula
                  </Button>
                )}
              </div>

              {/* Table Header */}
              <div className="bg-gray-700 dark:bg-gray-800 text-white p-4 rounded-t-lg">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                  <div className="col-span-2">AULA</div>
                  <div className="col-span-2">MATÉRIA</div>
                  <div className="col-span-2">AUTOR</div>
                  <div className="col-span-2">PUBLICADO EM</div>
                  <div className="col-span-4">AÇÕES</div>
                </div>
              </div>

              {/* Aulas List */}
              <div className="bg-white dark:bg-gray-800 rounded-b-lg divide-y divide-gray-200 dark:divide-gray-700">
                {aulas.map((aula) => (
                  <div key={aula.id} className="p-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 flex items-center space-x-3">
                        <img
                          src={aula.capa}
                          alt={aula.titulo}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <span className="text-gray-900 dark:text-white font-medium">
                          {aula.titulo}
                        </span>
                      </div>
                      <div className="col-span-2 text-gray-600 dark:text-gray-300">
                        {aula.materia}
                      </div>
                      <div className="col-span-2 text-gray-600 dark:text-gray-300">
                        {aula.autor}
                      </div>
                      <div className="col-span-2 text-gray-600 dark:text-gray-300">
                        {aula.dataPublicacao}
                      </div>
                      <div className="col-span-4 flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-teal-500 hover:bg-teal-600 text-white"
                          onClick={() => handleAcessarAula(aula.id)}
                        >
                          Acessar
                        </Button>
                        {isProfessor && (
                          <>
                            <Button size="sm" variant="outline" className="text-yellow-600">
                              Editar
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              Apagar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Atividades Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ATIVIDADES</h2>
                {isProfessor && (
                  <Button className="bg-teal-500 hover:bg-teal-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Atividade
                  </Button>
                )}
              </div>

              {/* Activities List */}
              <div className="bg-white dark:bg-gray-800 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {atividades.map((atividade) => (
                  <div key={atividade.id} className="p-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-gray-900 dark:text-white font-bold text-lg">
                        {atividade.numero}
                      </div>
                      <div className="col-span-3 text-gray-900 dark:text-white font-medium">
                        {atividade.titulo}
                      </div>
                      <div className="col-span-2 text-gray-600 dark:text-gray-300">
                        {atividade.materia}
                      </div>
                      <div className="col-span-2 text-gray-600 dark:text-gray-300">
                        {atividade.autor}
                      </div>
                      <div className="col-span-2 text-gray-600 dark:text-gray-300">
                        {atividade.dataPublicacao}
                      </div>
                      <div className="col-span-2 flex space-x-2">
                        <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                          Acessar
                        </Button>
                        {isProfessor && (
                          <>
                            <Button size="sm" variant="outline" className="text-yellow-600">
                              Editar
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              Apagar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Informações do Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <User className="h-4 w-4" />
                  <span>Instrutor: {course.autor}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>{aulas.length} aulas</span>
                </div>
                {!isProfessor && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Progresso</span>
                      <span className="text-gray-600 dark:text-gray-300">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
