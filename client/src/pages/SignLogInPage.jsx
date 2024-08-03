import { userLogin } from "../axios/axios";
import { PropTypes } from "prop-types";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignLogInPage = ({ setTokenHaving }) => {
  const [loginPassword, setLoginPassword] = useState(["", ""]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await userLogin(loginPassword[0], loginPassword[1]);
    if (response.status === 200) {
      localStorage.setItem("token", response.token);
      setTokenHaving(true);
      navigate("/");
    }

    console.log(response);
  };

  return (
    <div className="sign_log_in">
      <form className="sign_log_in_form">
        <label className="sign_log_in_form_label">Вход в учетную запись</label>
        <input
          type="text"
          placeholder="Логин"
          className="sign_log_in_form_input"
          onChange={(event) =>
            setLoginPassword([event.target.value, loginPassword[1]])
          }
        />
        <input
          type="password"
          placeholder="Пароль"
          className="sign_log_in_form_input"
          onChange={(event) =>
            setLoginPassword([loginPassword[0], event.target.value])
          }
        />
        <button
          type="submit"
          className="sign_log_in_button"
          onClick={handleSubmit}
        >
          Войти
        </button>
        <p>
          <a>Забыли пароль?</a>
        </p>
        <p>
          <a>Зарегистрироваться</a>
        </p>
      </form>
    </div>
  );
};

export default SignLogInPage;
