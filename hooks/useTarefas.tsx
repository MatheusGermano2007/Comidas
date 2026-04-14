import { useState } from 'react';

export const useTarefas = () => {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      setTarefas([...tarefas, { id: Date.now().toString(), texto: novaTarefa }]);
      setNovaTarefa('');
    }
  };

  const removerTarefa = (id: string) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  const limparLista = () => {
    setTarefas([]);
  };

  return {
    tarefas,
    novaTarefa,
    setNovaTarefa,
    adicionarTarefa,
    removerTarefa,
    limparLista,
  };
};