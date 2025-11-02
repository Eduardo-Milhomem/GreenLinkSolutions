import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Tag, 
  BarChart3, 
  Users, 
  Settings,
  ShoppingCart,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import AdminProducts from './AdminProducts';
import { CategoryManager } from '@/components/admin/CategoryManager';
import AdminDashboard from './AdminDashboard';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600">Gerencie sua loja online</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="products" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Produtos</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="categories" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Categorias</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="orders" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Pedidos</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="customers" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clientes</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="analytics" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Relatórios</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Gerenciar Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Gestão de Pedidos
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Esta funcionalidade será implementada em breve.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Aqui você poderá visualizar, processar e gerenciar todos os pedidos da loja.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Gerenciar Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Gestão de Clientes
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Esta funcionalidade será implementada em breve.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Aqui você poderá visualizar e gerenciar informações dos clientes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Relatórios e Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Relatórios Avançados
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Esta funcionalidade será implementada em breve.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Aqui você terá acesso a relatórios detalhados de vendas, produtos mais vendidos, 
                    análise de clientes e muito mais.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">Produtos Ativos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600">Pedidos Hoje</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-sm text-gray-600">Clientes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">R$ 0,00</p>
              <p className="text-sm text-gray-600">Vendas do Mês</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}