import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';
import Navbar from '../Navbar';
import Universe from '../Universe';

function UniversitySolo({ setAddModal }) {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = event => {
    setSearchType(event.target.value);
  };
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена в локальном хранилище
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Устанавливаем значение isLoggedIn в зависимости от наличия токена
  }, []);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4007/service/only/${id}`, {
          headers: {},
        });

        // Проверяем статус ответа
        if (!response.ok) {
          throw new Error('Failed to fetch data from port 4007');
        }

        // Получаем данные в формате JSON
        const jsonData = await response.json();

        // Обновляем состояние компонента
        setData1(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data1);

  return (
    <>
      {isLoggedIn ? <Navbar /> : <NavbarAuth />}
      <div className="h-[100%] my-[6%] w-[100%]   ">
        <div className="w-[100%] ">
          <div className="w-[100%] flex items-center justify-center">
            <img class="w-[80%] h-[424px] rounded-[20px]" src={data1?.student.banner} />
            <div class="w-[50%] absolute top-[50%] text-center text-white text-[40px] font-bold font-['Actay Wide'] leading-10">
              {data1?.student.name}
            </div>
          </div>

          <div className="w-[100%] mx-[10%] my-[6%]">
            <div className="flex justify-center items-center">
              <img
                class="w-[28%] object-fit rounded-[20px]"
                src={data1?.student.avatar}
              />
              <div className="w-[50%] mx-auto">
                <div class="w-[100%] text-left text-neutral-900 text-[40px] font-bold font-['Actay Wide'] leading-10">
                  Об университете
                </div>
                <div class="w-[80%] my-5 text-left h-[149px] text-neutral-900 text-xl font-normal font-['Manrope']">
                  {data1?.student.description}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            <div class="w-[100%] h-[214px] p-[30px] bg-teal-700 flex-col justify-start items-center gap-[25px] inline-flex">
              <div class="w-[80%] text-center text-white text-[40px] font-bold font-['Actay Wide'] leading-10">
                Университет в цифрах
              </div>
              <div class="justify-start items-start gap-20 inline-flex">
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="self-stretch text-white text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    {data1?.student.people}
                  </div>
                  <div class="self-stretch text-white text-xl font-normal font-['Manrope'] leading-[23px]">
                    обучающихся
                  </div>
                </div>
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="self-stretch text-white text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    {data1?.student.teachers}
                  </div>
                  <div class="self-stretch text-white text-xl font-normal font-['Manrope'] leading-[23px]">
                    преподавателей
                  </div>
                </div>
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="self-stretch text-white text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    {data1?.student.doctors}
                  </div>
                  <div class="self-stretch text-white text-xl font-normal font-['Manrope'] leading-[23px]">
                    докторов наук
                  </div>
                </div>
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="self-stretch text-white text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    {data1?.student.candidate}
                  </div>
                  <div class="self-stretch text-white text-xl font-normal font-['Manrope'] leading-[23px]">
                    кандидатов наук
                  </div>
                </div>
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="self-stretch text-white text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    {data1?.student.science}
                  </div>
                  <div class="w-[169px] text-white text-xl font-normal font-['Manrope'] leading-[23px]">
                    научных сотрудников
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex items-left my-[5%]">
            <div class="w-[50%] mx-[10%]  h-[221px] flex-col justify-start items-start gap-[25px] inline-flex">
              <div class="self-stretch title text-left text-neutral-900 text-3xl font-bold font-['Actay Wide'] leading-[30px]">
                Отзывы
              </div>

              <input
                placeholder="Написать отзыв"
                class="self-stretch h-[166px] px-[30px] py-5 rounded-[10px] border border-zinc-600 justify-start items-start gap-2.5 inline-flex"
              />

              <button class="w-[261px] h-[55px] px-[30px] py-5 bg-teal-700 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                <div class="text-white text-[15px] font-normal font-['Manrope'] leading-[15px]">
                  Отправить
                </div>
              </button>
            </div>
            <div>
              <div class="w-[291px] h-[107px] justify-start items-center gap-3 inline-flex">
                <div class="flex-col justify-start items-start gap-2 inline-flex">
                  <div class="text-zinc-600 text-[15px] font-normal font-['Manrope'] leading-[15px]">
                    5 звезд
                  </div>
                  <div class="text-zinc-600 text-[15px] font-normal font-['Manrope'] leading-[15px]">
                    4 звезды
                  </div>
                  <div class="text-zinc-600 text-[15px] font-normal font-['Manrope'] leading-[15px]">
                    3 звезды
                  </div>
                  <div class="text-zinc-600 text-[15px] font-normal font-['Manrope'] leading-[15px]">
                    2 звезды
                  </div>
                  <div class="text-zinc-600 text-[15px] font-normal font-['Manrope'] leading-[15px]">
                    1 звезда
                  </div>
                </div>
                <div class="flex-col justify-start items-start gap-[23px] inline-flex">
                  <div class="flex-col justify-start items-start gap-2.5 flex"></div>
                  <div class="flex-col justify-start items-start gap-2.5 flex"></div>
                  <div class="flex-col justify-start items-start gap-2.5 flex"></div>
                  <div class="flex-col justify-start items-start gap-2.5 flex"></div>
                  <div class="flex-col justify-start items-start gap-2.5 flex"></div>
                </div>
                <div class="flex-col justify-start items-start gap-2 inline-flex">
                  <div class="text-neutral-900 text-[15px] font-semibold font-['Manrope'] leading-[15px]">
                    2536
                  </div>
                  <div class="text-neutral-900 text-[15px] font-semibold font-['Manrope'] leading-[15px]">
                    598
                  </div>
                  <div class="text-neutral-900 text-[15px] font-semibold font-['Manrope'] leading-[15px]">
                    378
                  </div>
                  <div class="text-neutral-900 text-[15px] font-semibold font-['Manrope'] leading-[15px]">
                    87
                  </div>
                  <div class="text-neutral-900 text-[15px] font-semibold font-['Manrope'] leading-[15px]">
                    33
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[100%]">
            <div class="w-[80%] h-[42px] items-left  justify-left items-start gap-3.5 inline-flex">
              <div class="text-neutral-900 title text-xl font-bold font-['Actay Wide'] leading-tight mr-8">
                Ваша оценка
              </div>
              <div class="w-[42px] h-[20px] relative flex items-center">
                <img src="/zvezda.svg" />
              </div>
              <div class="w-[42px] h-[20px] relative flex items-center">
                <img src="/zvezda.svg" />
              </div>
              <div class="w-[42px] h-[20px] relative flex items-center">
                <img src="/zvezda.svg" />
              </div>
              <div class="w-[42px] h-[20px] relative flex items-center">
                <img src="/zvezda.svg" />
              </div>
              <div class="w-[42px] h-[20px] relative flex items-center">
                <img src="/zvezda.svg" />
              </div>
            </div>
          </div>
          <div className="w-[100%] my-5">
            <div class="w-[80%] h-[153px] px-[30px] py-5 rounded-[20px] border border-teal-700 flex-col justify-start items-start gap-[26px] inline-flex">
              <div class="self-stretch justify-start items-center gap-[207px] inline-flex">
                <div class="grow shrink basis-0 h-[60px] justify-start items-center gap-[23px] flex">
                  <img
                    class="w-[60px] h-[60px] rounded-[115px]"
                    src="https://via.placeholder.com/60x60"
                  />
                  <div class="flex-col justify-start items-start gap-[7px] inline-flex">
                    <div class="text-neutral-900 text-xl font-bold font-['Manrope'] leading-tight">
                      Мансур Нурадиев
                    </div>
                    <div class="text-neutral-400 text-[15px] font-medium font-['Manrope'] leading-[15px]">
                      20 апреля 2024
                    </div>
                  </div>
                </div>
                <div class="justify-start items-start gap-[7px] flex">
                  <div class="w-[21px] h-[21px] relative"></div>
                  <div class="w-[21px] h-[21px] relative"></div>
                  <div class="w-[21px] h-[21px] relative"></div>
                  <div class="w-[21px] h-[21px] relative"></div>
                  <div class="w-[21px] h-[21px] relative"></div>
                </div>
              </div>
              <div class="self-stretch text-black text-xl font-normal font-['Manrope']">
                До уровня Гарварда (на крайняк Оксфорда) не дотягивает. Меньше звезд
                поставить не могу, в общем переделывайте
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UniversitySolo;
