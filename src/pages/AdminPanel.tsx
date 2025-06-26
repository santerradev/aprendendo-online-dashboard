
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, BookOpen, FileText, TrendingUp, Eye, Trash2, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const mockUsers = [
  { id: 1, nome: "João Silva", email: "joao@email.com", tipo: "professor", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop", cursosCount: 5, alunosCount: 120 },
  { id: 2, nome: "Maria Santos", email: "maria@email.com", tipo: "aluno", foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop", cursosCount: 0, alunosCount: 0 },
  { id: 3, nome: "Carlos Lima", email: "carlos@email.com", tipo: "professor", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop", cursosCount: 3, alunosCount: 80 },
];

const mockCourses = [
  { id: 1, titulo: "React Completo", professor: "João Silva", alunos: 45, status: "ativo", categoria: "Programação" },
  { id: 2, titulo: "JavaScript Moderno", professor: "Maria Santos", alunos: 32, status: "ativo", categoria: "Programação" },
  { id: 3, titulo: "Design UX/UI", professor: "Carlos Lima", alunos: 28, status: "pendente", categoria: "Design" },
];

const mockStats = {
  totalUsers: 1250,
  totalCourses: 89,
  totalActivities: 234,
  totalRevenue: 15680
};

interface AdminPanelProps {
  user: any;
  onLogout: () => void;
}

const AdminPanel = ({ user, onLogout }: AdminPanelProps) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-purple-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Painel Administrativo
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">LearnFlow</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button onClick={() => navigate("/")} variant="outline">
                Voltar ao Site
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.foto} />
                  <AvatarFallback>{user?.nome?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">{user?.nome}</p>
                  <p className="text-gray-500 dark:text-gray-400">Administrador</p>
                </div>
                <Button onClick={onLogout} variant="ghost" size="sm" className="text-red-600">
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Cursos</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalCourses}</div>
                  <p className="text-xs text-muted-foreground">+5% desde o mês passado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Atividades</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalActivities}</div>
                  <p className="text-xs text-muted-foreground">+8% desde o mês passado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {mockStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+15% desde o mês passado</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas ações na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Novo curso "Python para Iniciantes" foi criado por Ana Costa</p>
                    <span className="text-xs text-gray-500">2h atrás</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">50 novos alunos se cadastraram hoje</p>
                    <span className="text-xs text-gray-500">4h atrás</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <p className="text-sm">Curso "Design UX/UI" aguarda aprovação</p>
                    <span className="text-xs text-gray-500">1d atrás</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Lista de todos os usuários cadastrados na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={user.foto} />
                          <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.nome}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <Badge variant={user.tipo === 'professor' ? 'default' : 'secondary'}>
                          {user.tipo}
                        </Badge>
                        {user.tipo === 'professor' && (
                          <div className="text-sm text-gray-500">
                            {user.cursosCount} cursos • {user.alunosCount} alunos
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Cursos</CardTitle>
                <CardDescription>Lista de todos os cursos da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{course.titulo}</p>
                          <p className="text-sm text-gray-500">por {course.professor}</p>
                        </div>
                        <Badge variant="secondary">{course.categoria}</Badge>
                        <Badge variant={course.status === 'ativo' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          {course.alunos} alunos
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Plataforma</CardTitle>
                <CardDescription>Configurações gerais do LearnFlow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Aprovação de Cursos</p>
                    <p className="text-sm text-gray-500">Cursos precisam de aprovação antes de serem publicados</p>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações</p>
                    <p className="text-sm text-gray-500">Configurar notificações automáticas</p>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Backup de Dados</p>
                    <p className="text-sm text-gray-500">Backup automático da plataforma</p>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
