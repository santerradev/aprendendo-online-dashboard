
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Mail, Home, LogOut } from "lucide-react";

const mockUserProgress = [
  { curso: "HTML/CSS", progresso: 90 },
  { curso: "Vue.js", progresso: 85 },
  { curso: "JavaScript", progresso: 85 },
  { curso: "Laravel", progresso: 85 },
  { curso: "React", progresso: 80 }
];

const mockProgressData = [
  { 
    progresso: "Concluído", 
    pontuacao: "95/100", 
    aula: "Introdução ao JavaScript", 
    materia: "Programação", 
    autor: "Ana Silva", 
    conclusao: "15/05/2024",
    status: "completed"
  },
  { 
    progresso: "Concluído", 
    pontuacao: "55/100", 
    aula: "Flexbox e Grid", 
    materia: "CSS Avançado", 
    autor: "Juliana Costa", 
    conclusao: "18/05/2024",
    status: "completed"
  },
  { 
    progresso: "Concluído", 
    pontuacao: "80/100", 
    aula: "Componentes em React", 
    materia: "Programação", 
    autor: "Carlos Pereira", 
    conclusao: "22/05/2024",
    status: "completed"
  },
  { 
    progresso: "Concluído", 
    pontuacao: "35/100", 
    aula: "SQL Joins", 
    materia: "Banco de Dados", 
    autor: "Marcos Rocha", 
    conclusao: "25/05/2024",
    status: "completed"
  },
  { 
    progresso: "Em Andamento", 
    pontuacao: "-", 
    aula: "State Management com Redux", 
    materia: "Programação", 
    autor: "Carlos Pereira", 
    conclusao: "",
    status: "in-progress"
  }
];

interface ProfileProps {
  user?: any;
  onLogout?: () => void;
}

const Profile = ({ user, onLogout }: ProfileProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockProgressData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = mockProgressData.slice(startIndex, startIndex + itemsPerPage);

  const getScoreColor = (score: string) => {
    if (score === "-") return "text-gray-500";
    const numScore = parseInt(score);
    if (numScore >= 60) return "text-green-600 dark:text-green-500";
    if (numScore >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (status: string) => {
    if (status === "completed") return "text-green-600 dark:text-green-500";
    if (status === "in-progress") return "text-yellow-500";
    return "text-red-500";
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
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden md:flex">
          {/* Left Column - Profile & Contact */}
          <div className="w-full md:w-1/3 p-6 bg-gray-50 dark:bg-gray-700/50 flex flex-col border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-600">
            {/* Profile Section */}
            <div className="text-center">
              <img 
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-md ring-4 ring-white dark:ring-gray-700 mx-auto"
                src={user?.foto || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"}
                alt="Foto do perfil do usuário"
              />
              
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {user?.nome || "Nome do Usuário"}
              </h2>
              <div className="mt-2 mb-6">
                <span className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className={`flex w-2.5 h-2.5 rounded-full me-2 shrink-0 ${
                    user?.tipo === 'professor' ? 'bg-teal-500' : 'bg-blue-600'
                  }`}></span>
                  {user?.tipo === 'professor' ? 'Professor' : 'Aluno'}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full">
                <Button 
                  className="w-full sm:w-auto flex-grow bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
                <Button 
                  variant="destructive"
                  className="w-full sm:w-auto flex-grow"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />

            {/* Contact Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contato</h3>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{user?.email || "email@exemplo.com"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="w-full md:w-2/3 p-6 sm:p-8">
            {user?.tipo === 'aluno' && (
              <>
                {/* Course Progress Section */}
                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Progresso em Cursos
                  </h3>
                  <div className="w-16 h-1 bg-blue-600 mb-4"></div>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    {mockUserProgress.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1 font-medium">
                          <span>{item.curso}</span>
                          <span>{item.progresso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${item.progresso}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* User Score Section */}
                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Pontuação do Usuário
                  </h3>
                  <div className="w-16 h-1 bg-blue-600 mb-4"></div>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>Pontuação total baseada nas atividades concluídas</p>
                  </div>
                </section>

                {/* Progress Table */}
                <section className="mb-8">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                          <th scope="col" className="px-4 py-3">Progresso</th>
                          <th scope="col" className="px-4 py-3">Pontuação</th>
                          <th scope="col" className="px-4 py-3">Aula</th>
                          <th scope="col" className="px-4 py-3">Matéria</th>
                          <th scope="col" className="px-4 py-3">Autor</th>
                          <th scope="col" className="px-4 py-3">Conclusão</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((item, index) => (
                          <tr key={index} className="bg-white dark:bg-gray-800/50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/50">
                            <td className={`px-4 py-4 font-medium ${getProgressColor(item.status)}`}>
                              {item.progresso}
                            </td>
                            <td className={`px-4 py-4 font-medium ${getScoreColor(item.pontuacao)}`}>
                              {item.pontuacao}
                            </td>
                            <td className="px-4 py-4 text-gray-900 dark:text-white">
                              {item.aula}
                            </td>
                            <td className="px-4 py-4">{item.materia}</td>
                            <td className="px-4 py-4">{item.autor}</td>
                            <td className="px-4 py-4">{item.conclusao}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-4 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        ‹
                      </Button>
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        ›
                      </Button>
                    </div>
                  )}
                </section>
              </>
            )}

            {user?.tipo === 'professor' && (
              <section>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Painel do Professor
                </h3>
                <div className="w-16 h-1 bg-blue-600 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cursos Criados</CardTitle>
                      <CardDescription>Total de cursos que você criou</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">12</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Alunos Ativos</CardTitle>
                      <CardDescription>Alunos matriculados em seus cursos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-600">248</div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
