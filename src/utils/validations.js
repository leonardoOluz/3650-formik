export function validations(values) {
  const errors = {};

  if (!values.nome) {
    errors.nome = "Campo nome é obrigatório";
  }

  if (!values.estado) {
    errors.estado = "Campo estado é obrigatório";
  }

  if (!values.cidade) {
    errors.cidade = "Campo cidade é obrigatório";
  } 

  if (!values.senha) {
    errors.senha = "Campo senha é obrigatoire";
  }

  if (!values.confirmarSenha) {
    errors.confirmarSenha = "Campo confirmar senha é obrigatório";
  } else if (values.senha !== values.confirmarSenha) {
    errors.confirmarSenha = "As senhas não conferem!";
  }

  if (!values.telefone) {
    errors.telefone = "Telefone obrigatório";
  } else if (!/^\d{11}$/i.test(values.telefone)) {
    errors.telefone = "Telefone inválido";    
  }

  if (!values.email) {
    errors.email = "Email obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }

  return errors;
}
