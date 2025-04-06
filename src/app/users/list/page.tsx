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
//Importar o heroicons Tailwind
import { PencilSquareIcon, EyeIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface User {
  id: number,
  name: string,
  email: string,
}

export default function Users() {
  //Estado para controle de erros
  const [error, setError] = useState<string | null>(null);
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

  //Hook para buscar os dados na primeira renderização
  useEffect(() => {
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
          <Link href="/users/create" className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 shadow-md">Cadastro</Link>
        </div>
        {/* Exibe mensagem de erro */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
                  <td className="border p-3 flex justify-between">
                  <Link href={`/users/${user.id}`}><EyeIcon className="size-6 text-green-500" /></Link>
                  <Link href="/users/edit">
                    <PencilSquareIcon className="size-6 text-blue-500" /></Link>
                    <Link href="/users/delete">
                    <XCircleIcon className="size-6 text-red-500" /></Link>
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
