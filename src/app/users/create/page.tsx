//A diretiva 'use client' é usada para indicar que este componente é executado no cliente (browser)
//Essa diretiva é específica par Next.js 13+ quando se utiliza a renderização no lado do cliente
'use client'

//Importa os Hooks do React para usar o estado
import React, { useState } from "react";
//Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";
//Importa o componente para criar link
import Link from "next/link";
//Importar o componente Menu
import Menu from "@/components/Menu";
//Importar o componente AlertMessage
import AlertMessage from "@/components/AlertMessage";


export default function CreateUser() {
  //Estado para o campo name
  const [name, setName] = useState<string>('');
  //Estado para  o campo email
  const [email, setEmail] = useState<string>('');
  //Estado para controle de Erro
  const [error, setError] = useState<string | null>(null);
  //Estado para controle de sucesso
  const [success, setSuccess] = useState<string | null>(null);

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
      const response = await instance.post('/users', {
        name: name,
        email: email,
      })
      //Se a requisição foi bem sucedida, atualiza o estado de sucesso
      setSuccess(response.data.message)

      //Limpa o formulário
      setName('')
      setEmail('')

    } catch (error: any) {
      //Se houve um erro, atualiza o estado de erro
      setError(error.response?.data?.message || 'Erro ao atualizar o usuário')
    }
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Componente Menu */}
      <Menu />
      {/* Conteúdo Principal */}

      <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Cadastrar Usuário</h1>
          <Link href="/users/list" className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600">Listar</Link>
        </div>
        {/* Exibe mensagem de erro */}
        <AlertMessage type='error' message={error}/>
        {/* Exibe mensagem de sucesso */}
        <AlertMessage type='success' message={success}/>

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
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Cadastrar</button>
        </form>
      </div >
    </div >
  )
}