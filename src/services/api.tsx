//Importar o Axios e o tipo AxiosInstance para tipagem da instância
import axios, {AxiosInstance} from "axios"

//Definir o tipo para a instância do Axios
//Criar uma instância personalizada do Axios com configuração padrão
const instance: AxiosInstance = axios.create({
  //Definir a base URL para todas as requisições
  baseURL: "http://localhost:8080",
  //Definir o cabeçalho padrão para envio de dados no formato JSON
  headers: {
    "Content-Type": "application/json",
  }
})

//Exportar a instância do Axios para ser utilizada em outras partes do projeto
export default instance

