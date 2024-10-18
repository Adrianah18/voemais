import * as Yup from 'yup';
 
const AeroportoValidator = Yup.object().shape({
identificador: Yup.string()
    .min(3, 'O mínimo de caracteres é 3')
    .max(50, 'O máximo de caracteres é 10')
    .required('Campo obrigatório'),
  sigla: Yup.string(),
  uf: Yup.string(),
  cidade: Yup.string(),
  pais: Yup.string(),
});
 export default AeroportoValidator