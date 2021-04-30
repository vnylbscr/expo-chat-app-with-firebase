import * as yup from 'yup'

export const RegisterSchema = yup.object().shape({
    email: yup.string().required("Bu alan gereklidir").email("Geçerli bir e-mail girin"),
    username: yup.string().required("Bu alan gerekli").min(4, "Minimum 4 karakter gereklidir"),
    password: yup.string().required("Parola boş olmamalıdır").min(6, "Paralo en az 6 karakter olmalıdır").max(20, "Paralo maximum 20 karakter olabilir!"),
    
});

