import { useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';

function MainPage({ setAddModal }) {
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
      <div className="h-[100%] my-[6%] w-[100%]  flex justify-center items-center  ">
        <div className="relative w-full ">
          <div class="w-[1240px] h-[544px] justify-start items-end gap-[68px] inline-flex">
            <div class="flex-col justify-start items-start gap-[153px] inline-flex">
              <div class="flex-col justify-start items-start gap-[30px] flex">
                <div class="flex-col justify-start items-start gap-[9px] flex">
                  <div class="w-[702px]">
                    <span className="text-neutral-900 text-[70px] font-bold font-['Actay Wide'] leading-[70px]">
                      Сотни{' '}
                    </span>
                    <span className="text-teal-700 text-[70px] font-bold font-['Actay Wide'] leading-[70px]">
                      ВУЗов
                    </span>
                    <span className="text-neutral-900 text-[70px] font-bold font-['Actay Wide'] leading-[70px]">
                      {' '}
                      страны ждут именно тебя!
                    </span>
                  </div>
                  <div class="w-[540px] text-zinc-600 text-xl font-normal font-['Manrope'] leading-snug">
                    Данный сервис может запустить адронный коллайддер, колонизировать Марс
                    и высушить планету
                  </div>
                </div>
              </div>
              <div class="w-[648px] justify-between items-baseline inline-flex">
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="self-stretch text-neutral-900 text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    500 +
                  </div>
                  <div class="self-stretch text-neutral-900 text-xl font-normal font-['Manrope'] leading-[23px]">
                    университетов
                  </div>
                </div>
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="text-neutral-900 text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    45k +
                  </div>
                  <div class="text-neutral-900 text-xl font-normal font-['Manrope'] leading-[23px]">
                    студентов
                  </div>
                </div>
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="text-neutral-900 text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    5k +
                  </div>
                  <div class="text-neutral-900 text-xl font-normal font-['Manrope'] leading-[23px]">
                    препродавателей
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[470px] h-[544px] justify-start items-start gap-2.5 ">
              <img
                src="./chesu.svg"
                class="grow shrink basis-0 self-stretch bg-gradient-to-b  rounded-[20px]"
              />
              <button class="w-[430px] h-[83px] p-[30px] relative top-[-20%] bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                <div class="text-center text-black text-xl font-normal font-['Manrope'] leading-[23px]">
                  Перейти в 3D-панораму{' '}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
