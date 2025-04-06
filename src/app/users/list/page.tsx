//A diretiva 'use client' é usada para indicar que este componente é executado no cliente (browser)
//Essa diretiva é específica par Next.js 13+ quando se utiliza a renderização no lado do cliente
'use client'

//Importa os Hooks do React para usar o estado
import { useEffect, useState } from "react";
//Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";
//Importa o componente para criar link
import Link from "next/link";
//Importar o componente Menu
import Menu from "@/components/Menu";
//Importar o componente para apagar o registro
import DeleteButton from "@/components/DeleteButton";

interface User {
  id: number,
  name: string,
  email: string,
}

export default function Users() {
  //Estado para controle de erros
  const [error, setError] = useState<string | null>(null);
  //Estado para controle de sucesso
  const [success, setSuccess] = useState<string | null>(null);
  //Estado para armazenar os usuários
  const [users, setUsers] = useState<User[]>([]);

  //Função para buscar os uusários da API
  const fetchUsers = async () => {
    try {
      //Fazer a requisição à API
      const response = await instance.get('/users')

      setUsers(response.data)

    } catch (error) {
      //Criar mensagem genérica de errro
      setError("Erro ao carregar os usuários")
    }
  }

  //Atualizar a lista de registros apos apagar o registro
  const handleSuccess = () => {
    fetchUsers()
  }
  //Hook para buscar os dados na primeira renderização
  useEffect(() => {
    //Recuperar a mensagem salva no sessionStore
    const message = sessionStorage.getItem('successMessage')
    //Verificar se existe a mensagem
    if (message) {
      setSuccess(message)
      sessionStorage.removeItem('successMessage')
    }
    //Buscar os dados ao carregar a pagina
    fetchUsers()
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Componente Menu */}
      <Menu />
      {/* Conteúdo Principal */}

      <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Usuários</h1>
          <Link href="/users/create" className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 shadow-md">Cadastrar</Link>
        </div>
        {/* Exibe mensagem de erro */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {/* Exibe mensagem de sucesso */}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Id</th>
                <th className="border p-3 text-left">Nome</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border p-3">{user.id}</td>
                  <td className="border p-3">{user.name}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3 grid grid-cols-3">
                    <Link href={`/users/${user.id}`} className="w-22 bg-blue-500 text-center text-white px-2 py-2 rounded-md hover:bg-blue-600">Visualizar</Link>
                    <Link href={`/users/${user.id}/edit`}className="w-22 bg-yellow-500 text-center text-white px-2 py-2 rounded-md hover:bg-yellow-600">
                     Editar</Link>
                    <DeleteButton 
                      id={String(user.id)}
                      route='users'
                      onSuccess={handleSuccess}
                      setError={setError}
                      setSuccess={setSuccess}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
