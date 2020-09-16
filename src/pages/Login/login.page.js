import React, {useState} from "react";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FlexboxGrid,
  Form,
  FormControl,
  FormGroup,
  Loader,
  Panel,
  Schema,
} from "rsuite";
import {Daxios} from "config/axios.config"; // rutas publicas
import getHistory from "react-router-global-history"; //acceder al historial de navegacion y hacer push a urls
import {setUserSession} from "helpers/auth.helper";

const {StringType, NumberType} = Schema.Types;
const model = Schema.Model({
  password: StringType().isRequired("Este campo es requerido."),
  email: StringType()
    .isEmail("Por favor ingrese un email valido")
    .isRequired("Este campo es requerido"),
});
function TextField(props) {
  const {name, label, accepter, ...rest} = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} accepter={accepter} {...rest} />
    </FormGroup>
  );
}
const LoginPage = ({handleLogin}) => {
  const [dataLogin, setDataLogin] = useState({
    formValue: {
      email: "",
      password: "",
    },
    formError: {},
  });
  const [loading, setLoading] = useState(false);

  //esta variable almacena el estado del formulario para validar errores
  let form;

  //Valida los datos usando un schema que proporciona la libreriua rsuite
  const handleSubmit = () => {
    const {formValue} = dataLogin;
    if (!form.check()) {
      console.error("#dsdds");
      console.log(dataLogin.formError);
      return;
    }
    request({
      user: formValue.email,
      pass: formValue.password,
    });
    console.log(dataLogin, "Form Value");
  };

  //funcion asincrona para enviar la peticion al login usando axios como api http
  const request = async (data) => {
    setLoading(true);
    const response = await Daxios.post("/login", data)
      .then((response) => response)
      .catch((err) => err.response);
    switch (response.status) {
      case 200:
        setLoading(false);
        const {data} = response;
        //creamor variables de session para guardar el token y datos de usuarios
        if (data.success) {
          setUserSession(data.token, {});
          handleLogin(true);
          getHistory().push("/home");
        }

        break;
      default:
        setLoading(false);
        break;
    }
    console.log(response);
  };
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <Panel header={<h3>Login</h3>} bordered>
          <Form
            fluid
            ref={(ref) => (form = ref)}
            onChange={(formValue) => {
              setDataLogin({formValue});
            }}
            formValue={dataLogin.formValue}
            model={model}>
            <TextField name="email" value={dataLogin.formValue.email} label="Email" />
            <TextField
              name="password"
              value={dataLogin.formValue.password}
              label="Password"
              type="password"
            />
            <FormGroup>
              <ButtonToolbar>
                <Button appearance="primary" onClick={handleSubmit}>
                  {loading ? <Loader speed="fast" content="Fast" /> : "Sign in"}
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default LoginPage;
