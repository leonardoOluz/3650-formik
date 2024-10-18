import React from "react";
import { Tipografia } from "../../componentes/Tipografia/Tipografia";
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto";
import { ListaSupensa } from "../../componentes/ListaSuspensa/ListaSuspensa";
import { Col, Row } from "react-grid-system";
import { Botao } from "../../componentes/Botao/Botao";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const estadosBrasileiros = [
  { text: "Acre", value: "AC" },
  { text: "Alagoas", value: "AL" },
  { text: "Amapá", value: "AP" },
  { text: "Amazonas", value: "AM" },
  { text: "Bahia", value: "BA" },
  { text: "Ceará", value: "CE" },
  { text: "Distrito Federal", value: "DF" },
  { text: "Espírito Santo", value: "ES" },
  { text: "Goiás", value: "GO" },
  { text: "Maranhão", value: "MA" },
  { text: "Mato Grosso", value: "MT" },
  { text: "Mato Grosso do Sul", value: "MS" },
  { text: "Minas Gerais", value: "MG" },
  { text: "Pará", value: "PA" },
  { text: "Paraíba", value: "PB" },
  { text: "Paraná", value: "PR" },
  { text: "Pernambuco", value: "PE" },
  { text: "Piauí", value: "PI" },
  { text: "Rio de Janeiro", value: "RJ" },
  { text: "Rio Grande do Norte", value: "RN" },
  { text: "Rio Grande do Sul", value: "RS" },
  { text: "Rondônia", value: "RO" },
  { text: "Roraima", value: "RR" },
  { text: "Santa Catarina", value: "SC" },
  { text: "São Paulo", value: "SP" },
  { text: "Sergipe", value: "SE" },
  { text: "Tocantins", value: "TO" },
];

const formatarTelefone = (value) => {
  if (!value) return
  const telefone = value.replace(/\D/g, "")

  return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`
}

const schema = Yup.object().shape({
  nome: Yup.string()
    .required("Campo obrigatório")
    .trim()
    .lowercase()
    .min(3, "Digite seu nome completo"),
  nascimento: Yup.date()
    .required("Campo obrigatório")
    .max(new Date(), "Data inválida"),
  estado: Yup.string()
    .required("Campo obrigatório")
    .max(20, "digite um estado válido"),
  cidade: Yup.string()
    .required("Campo obrigatório")
    .max(20, "Cidade inválida"),
  telefone: Yup.string()
    .required("Campo obrigatório")
    .matches(/^\d{11}/, "Numero de telefone inválido")
    .transform(formatarTelefone),
  email: Yup.string()
    .required("Campo obrigatório")
    .email("Email inválido"),
  senha: Yup.string()
    .required("Campo obrigatório")
    .min(6, "Senha muito curta")
    .max(12, "Senha muito longa")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,12}$/,
      "Senha inválida"
    ),
  confirmarSenha: Yup.string()
    .required("Campo obrigatório")
    .oneOf([Yup.ref("senha"), null], "As senhas não conferem!"),
  termos: Yup.boolean()
    .oneOf([true], "É preciso aceitar os termos"),
});
const DadosPessoais = () => {
  return (
    <Formik
      initialValues={{
        nome: "",
        nascimento: "",
        estado: "",
        cidade: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        termos: false
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log("dados do formulario", values);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <Tipografia variante="h1" componente="h1">
              Crie seu cadastro
            </Tipografia>
            <Tipografia variante="body" componente="body">
              Crie seu perfil gratuitamente para começar a trabalhar com os
              melhores freelancers. Em seguida, você poderá dar mais detalhes
              sobre suas demandas e sobre sua forma de trabalho.
            </Tipografia>
          </div>
          <Row>
            <Col>
              <CampoTexto titulo="Nome completo" type="text" name="nome" />
            </Col>
            <Col>
              <CampoTexto titulo={"Data de nascimento"} type="date" name="nascimento" />
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={4} sm={4}>
              <ListaSupensa titulo="Estado" opcoes={estadosBrasileiros} />
            </Col>
            <Col lg={8} md={8} sm={8}>
              <CampoTexto titulo="Cidade" type="text" name="cidade" />
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <CampoTexto titulo="E-mail" type="email" name="email" />
            </Col>
            <Col lg={6} md={6} sm={6}>
              <CampoTexto titulo="Telefone" type="tel" name="telefone" />
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <CampoTexto titulo="Senha" type="password" name="senha" />
            </Col>
            <Col lg={6} md={6} sm={6}>
              <CampoTexto
                titulo="Confirme sua senha"
                type="password"
                name="confirmarSenha"
              />
            </Col>
          </Row>
          <Row>
            <label style={{ padding: "15px" }}>
              <Field name="termos" type="checkbox" />
              aceito os <Link to="#">termos de uso</Link>
            </label>
          </Row>
          <ErrorMessage name="termos">
            {(msg) => <div style={{ color: "red", marginBottom: "10px" }}>{msg}</div>}
          </ErrorMessage>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <Link to="/cadastro/interesses">
                <Botao variante="secundaria">Anterior</Botao>
              </Link>
            </Col>
            <Col lg={6} md={6} sm={6}>
              <div style={{ textAlign: "right" }}>
                {/* <Link to='/cadastro/concluido'> */}
                <Botao type="submit">Próxima</Botao>
                {/* </Link> */}
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default DadosPessoais;
