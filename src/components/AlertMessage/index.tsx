//Importar hook do React
import { useEffect } from 'react'
//SweetAlert para apresentar alert
import Swal from 'sweetalert2'

interface AlertMessageProps {
  type: 'success' | 'error'
  message: string | null
}


export default function AlertMessage ({ type, message }:AlertMessageProps) {
  useEffect(() => {
    if (message) {
      Swal.fire({
        icon: type, 
        title: type === 'success' ? 'Sucesso!' : 'Erro!',
        text: message,
        confirmButtonColor: type === 'success' ? '#4CAF50' : '#F44336',
      })
    }
  },[message, type])//Executa quando a 'message' ou 'type' mudar
  return null //Remover o retorno já que o SweetAlert exibe a mensagem
}
