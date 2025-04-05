//A diretiva 'use client' é usada para indicar que este componente é executado no cliente (browser)
//Essa diretiva é específica par Next.js 13+ quando se utiliza a renderização no lado do cliente
'use client'

import instance from "@/services/api";
import { useEffect, useState } from "react";

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
    <div>
      <h1>Usuários</h1>
      {/* Exibe mensagem de erro */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
