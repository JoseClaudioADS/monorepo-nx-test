import { ChangeEvent, FormEvent, JSX, useEffect, useState } from 'react';

/*useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => console.log(data));
  });*/
// Interface para definir a estrutura de um objeto de Usuário
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// Tipo para os dados do formulário, omitindo o 'id' que não está no form
type UserFormData = Omit<User, 'id'>;

// Dados iniciais para a lista de usuários
const initialUsers: User[] = [
  { id: 1, name: 'Ana Silva', age: 28, email: 'ana.silva@example.com' },
  { id: 2, name: 'Bruno Costa', age: 34, email: 'bruno.costa@example.com' },
];

// Componente principal da página de gerenciamento de usuários
function App(): JSX.Element {
  // --- ESTADO (STATE) ---
  // Estado para armazenar a lista de usuários, tipado com a interface User
  const [users, setUsers] = useState<User[]>(initialUsers);
  // Estado para controlar o próximo ID a ser usado
  const [nextId, setNextId] = useState<number>(3);
  // Estado para os dados do formulário
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    age: 0, // Iniciar com 0 ou string vazia, mas 0 é mais seguro para um tipo 'number'
    email: '',
  });

  // --- MANIPULADORES (HANDLERS) ---
  // Atualiza o estado do formulário conforme o usuário digita
  // O evento é tipado como ChangeEvent de um elemento HTMLInputElement
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value, 10) || 0 : value, // Garante que a idade seja sempre um número
    });
  };

  // Lida com o envio do formulário
  // O evento é tipado como FormEvent de um elemento HTMLFormElement
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Previne o recarregamento da página

    // Validação simples
    if (!formData.name || !formData.age || !formData.email) {
      alert('Por favor, preencha todos os campos. 1');
      return;
    }

    // Cria um novo usuário com os dados do formulário e o próximo ID
    const newUser: User = {
      id: nextId,
      ...formData,
    };

    // Adiciona o novo usuário à lista existente
    setUsers([...users, newUser]);

    // Incrementa o ID para o próximo usuário
    setNextId(nextId + 1);

    // Limpa o formulário
    setFormData({ name: '', age: 0, email: '' });
  };

  // --- RENDERIZAÇÃO (JSX) ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Seção do Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Adicionar Novo Usuário (TypeScript)
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nome */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: João da Silva"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campo Idade */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Idade
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age === 0 ? '' : formData.age} // Mostra campo vazio se a idade for 0
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: 30"
                />
              </div>

              {/* Campo Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: joao.silva@email.com"
                />
              </div>
            </div>

            {/* Botão de Envio */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salvar Usuário
              </button>
            </div>
          </form>
        </div>

        {/* Seção da Listagem */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Lista de Usuários
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Idade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              Nenhum usuário cadastrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
