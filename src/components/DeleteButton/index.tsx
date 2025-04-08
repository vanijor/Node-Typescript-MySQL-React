//A diretiva 'use client' é usada para indicar que este componente é executado no cliente (browser)
//Essa diretiva é específica par Next.js 13+ quando se utiliza a renderização no lado do cliente
'use client'

//SweetAlert2 para apresentar o alerta de confirmação
import Swal from 'sweetalert2'

//Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

interface DeleteButtonProps {
  id: string
  route: string
  onSuccess?: () => void
  setError: (message: string | null) => void
  setSuccess: (message: string | null) => void
}

const DeleteButton = ({ id, route, onSuccess, setError, setSuccess }: DeleteButtonProps) => {


  const handleDelete = async () => {
    //Exibir alerta de confirmação
    const confirmDelete = await Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, Excluir!",
      cancelButtonText: "Cancelar",
    })
    
    if (!confirmDelete.isConfirmed) return
    //Limpa o erro anterior
    setError(null)
    //Limpar o sucesso anterior
    setSuccess(null)


    try {
      //Fazer uma requisição a API
      const response = await instance.delete(`${route}/${id}`)
      //Exibir mensagem de sucesso
      setSuccess(response.data.message || 'Registro apagado com sucesso')
      //Chama a função de sucesso, se estiver definida
      if (onSuccess) {
        onSuccess()
      }

    } catch (error: any) {
      //Se houve um erro, atualiza o estado de erro
      setError(error.response?.data?.message || 'Erro ao apagar o usuário')
    }
  }
  return (
    <div>
      <button className="w-22 bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600" onClick={handleDelete}>Apagar</button>
    </div>
  )
}

export default DeleteButton
