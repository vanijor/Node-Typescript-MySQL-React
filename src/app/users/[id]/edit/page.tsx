//A diretiva 'use client' é usada para indicar que este componente é executado no cliente (browser)
//Essa diretiva é específica par Next.js 13+ quando se utiliza a renderização no lado do cliente
'use client'

//Importa os Hooks do React para usar o estado
import React, { useEffect, useState } from "react";
//Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";
//Importa o componente para criar link
import Link from "next/link";
//Importar o componente Menu
import Menu from "@/components/Menu";
//useParms - acessar os parametros da URL de uma pagina que usa rotas dinamicas
import { useParams } from "next/navigation";
import AlertMessage from "@/components/AlertMessage";


export default function editUser() {
  //Usando o useParams para acessar os parametros 'id' da URL
  const { id } = useParams();
  //Estado para o campo name
  const [name, setName] = useState<string>('');
  //Estado para  o campo email
  const [email, setEmail] = useState<string>('');
  //Estado para controle de Erro
  const [error, setError] = useState<string | null>(null);
  //Estado para controle de sucesso
  const [success, setSuccess] = useState<string | null>(null);

  const fetchUserDetail = async () => {
    try {
      //Fazendo requisição para a API para buscar o usuário pelo ID
      const response = await instance.get(`/users/${id}`);

      //Preencher os campos com os dados existentes
      setName(response.data.user.name)
      setEmail(response.data.user.email)

    } catch (error: any) {
      //Se ocorrer algum erro, armazena a mensagem de erro no estado 'error'
      setError(error.response?.data?.message || 'Erro ao carregar o usuário');
    }
  }

  //Função para enviar os dados para a API
  const handleSubmit = async (event: React.FormEvent) => {
    //Evita o carregamento da página ao enviar o formulário
    event.preventDefault();

    //limpa o erro anterior
    setError(null)
    //Limpa o sucesso anterior
    setSuccess(null)

    try {
      //Fazer a requisição à API e enviar os dados
      const response = await instance.put(`/users/${id}`, {
        name: name,
        email: email,
      })
      //Se a requisição foi bem sucedida, atualiza o estado de sucesso
      setSuccess(response.data.message)

    } catch (error: any) {
      //Se houve um erro, atualiza o estado de erro
      setError(error.response?.data?.message || 'Erro ao atualizar o usuário')
    }
  }
  //Hook para buscar os dados quando o id estiver disponicel
  useEffect(() => {
    //Verifica se o id está disponível
    if (id) {

      //Busca os dados da situação se o id estiver disponível
      fetchUserDetail()
    }
  }, [id])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Componente Menu */}
      <Menu />
      {/* Conteúdo Principal */}

      <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Editar Usuário</h1>
          <div>
            <Link href="/users/list" className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600">Listar</Link>
            <Link href={`/users/${id}`} className="bg-blue-500 text-white px-4 m-1 py-2 rounded-md hover:bg-blue-600">Visualizar</Link>
          </div>
        </div>
        {/* Exibe mensagem de erro */}
        <AlertMessage type='error' message={error} />
        {/* Exibe mensagem de sucesso */}
        <AlertMessage type='success' message={success} />

        <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">Nome: </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Salvar</button>
        </form>
      </div >
    </div >
  )
}