//A diretiva 'use client' é usada para indicar que este componente é executado no cliente (browser)
//Essa diretiva é específica par Next.js 13+ quando se utiliza a renderização no lado do cliente
'use client'

//Importa os Hooks do React para usar o estado "useState" e os efeitos colaterais "useEffect"
import { useEffect, useState } from "react";
//useParms - acessar os parametros da URL de uma pagina que usa rotas dinamicas
import { useParams } from "next/navigation";
//Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";
//Importa o componente para criar link
import Link from "next/link";
//Importar o componente Menu
import Menu from "@/components/Menu";

//Definir tipos para resposta da API
interface User {
  id: number,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: string,
}

export default function UserDetails() {
  //Usando o useParams para acessar os parametros 'id' da URL
  const { id } = useParams();
  //Usando o useState para criar um estado para armazenar o usuário
  const [user, setUser] = useState<User | null>(null);
  //Estado para controle de erros
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetail = async (id: string) => {
    try {
      //Fazendo requisição para a API para buscar o usuário pelo ID
      const response = await instance.get(`/users/${id}`);
      //Armazenando a resposta da API no estado 'user'
      setUser(response.data.user);
    } catch (error: any) {
      //Se ocorrer algum erro, armazena a mensagem de erro no estado 'error'
      setError('Erro ao carregar o usuário');
    }
  }


  //Hook para buscar os dados quando o id estiver disponicel
  useEffect(() => {
    //Verifica se o id está disponível
    if (id) {
      //Garantir que id seja uma string
      const userId = Array.isArray(id) ? id[0] : id;
      //Busca os dados da situação se o id estiver disponível
      fetchUserDetail(userId)
    }
  }, [id])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Componente Menu */}
      <Menu />
      {/* Conteúdo Principal */}
      <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
          <Link href="/users/list" className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600">Listar</Link>
        </div>
        {/* Exibe mensagem de erro */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {user && !error && (
          <div className="bg-white shadow-md rounded-lg p-6 ">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Informações do Usuário</h2>
            <div className="text-gray-700">
              <div className="mb-1">
                <span className="font-bold">Id: </span>
                {user.id}
              </div>
              <div className="mb-1">
                <span className="font-bold">Nome: </span>
                {user.name}
              </div>
              <div className="mb-1">
                <span className="font-bold">Email: </span>
                {user.email}
              </div>
              <div className="mb-1">
                <span className="font-bold">Criado em: </span>
                {new Date(user.createdAt).toLocaleString()}
              </div>
              <div className="mb-1">
                <span className="font-bold">Editado em: </span>
                {new Date(user.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
