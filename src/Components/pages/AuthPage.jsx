import { useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';

function AuthPage({ setAddModal }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const token = data.token;
      const userId = data.userId;
      navigate('/profile');

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error.message);
    }
  };

  return (
    <>
      <NavbarAuth />
      <div className="h-[100%] w-[100%]  flex justify-center items-center  ">
        <div className="relative w-full ">
          <div className="max-w-[560px] h-[500px] my-[8%] p-[30px] mx-8 rounded-[15px] border border-teal-700 flex-col gap-5 inline-flex flex-shrink">
            <div class="flex-col justify-start items-start gap-5 flex">
              <div class="w-[506px] justify-start items-start gap-5 inline-flex">
                <div class="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div class="self-stretch text-black text-[25px] font-bold font-['Manrope'] leading-7">
                    Войти{' '}
                  </div>
                  <div class="w-[501px]">
                    <span className="text-black text-[15px] font-normal font-['Manrope'] leading-[17.25px]">
                      Нет аккаунта?{' '}
                    </span>

                    <Link
                      to="/reg"
                      className="text-teal-700 text-[15px] font-semibold font-['Manrope'] leading-[17.25px]"
                    >
                      Зарегистрироваться
                    </Link>
                  </div>
                  <div class="self-stretch"></div>
                </div>
              </div>
            </div>
            <div class="flex-col justify-start items-start gap-5 flex">
              <div class="flex-col justify-start items-start gap-5 flex">
                <div class="text-black text-[25px] font-bold font-['Manrope'] leading-7">
                  Email
                </div>
                <input
                  placeholder="Введите email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  class="w-[501px] px-5 py-[15px] bg-gray-50 rounded-[10px] border border-zinc-400 justify-start items-center gap-2.5 inline-flex"
                ></input>
              </div>
              <div class="flex-col justify-start items-start gap-5 flex">
                <div class="text-black text-[25px] font-bold font-['Manrope'] leading-7">
                  Пароль
                </div>
                <input
                  placeholder="Введите пароль"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  class="w-[501px] px-5 py-[15px] bg-gray-50 rounded-[10px] border border-zinc-400 justify-start items-center gap-2.5 inline-flex"
                ></input>
              </div>
            </div>
            <button class="text-teal-700 text-[15px] font-semibold font-['Manrope'] leading-[17.25px]">
              Забыли пароль?
            </button>
            <button
              onClick={handleSubmit}
              class="w-[501px] px-5 py-[15px] bg-teal-700 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
            >
              <div class="text-center text-white text-[15px] font-normal font-['Manrope'] leading-[17.25px]">
                Создать аккаунт
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
