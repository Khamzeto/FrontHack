import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';
import Navbar from '../Navbar';
import Universe from '../Universe';

function University({ setAddModal }) {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4007/auth/`, {
          headers: {},
        });

        // Проверяем статус ответа
        if (!response.ok) {
          throw new Error('Failed to fetch data from port 4007');
        }

        // Получаем данные в формате JSON
        const jsonData = await response.json();

        // Обновляем состояние компонента
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
        const response = await fetch(`http://localhost:4007/service/`, {
          headers: {},
        });

        // Проверяем статус ответа
        if (!response.ok) {
          throw new Error('Failed to fetch data from port 4007');
        }

        // Получаем данные в формате JSON
        const jsonData = await response.json();

        // Обновляем состояние компонента
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoggedIn ? <Navbar /> : <NavbarAuth />}
      <div className="h-[100%] my-[6%] w-[100%]   ">
        <div class="w-[100%] h-[68px] pl-[30px] pr-2.5 py-2.5 justify-start items-center flex">
          <input
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Найти других студентов"
            class="w-[40%] h-[68px] pl-[30px] pr-2.5 py-2.5 rounded-[76px] border border-teal-700 justify-start items-center gap-[187px] inline-flex"
          />
          <select
            value={searchType}
            onChange={handleSelectChange}
            className="h-[68px]  px-5 pl-5 w-[20%] border border-teal-700 rounded-[20px] justify-start items-center gap-[187px] inline-flex mx-5"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              paddingRight: '1rem',
              paddingLeft: '1rem',
              cursor: 'pointer',

              backgroundSize: '30px',
            }}
          >
            <option value="name">По названию</option>
            <option value="university">По университету</option>
            <option value="direction">По направлению</option>
          </select>

          <button class="px-[40px] absolute right-[60%] py-4 bg-teal-700 rounded-[29px] justify-start items-start gap-2.5 flex">
            <div class="w-[100%] text-center text-white text-base font-normal font-['Manrope'] leading-none">
              Найти
            </div>
          </button>
        </div>
        <div className="mx-[2%] my-[4%]">
          {data?.students
            ?.filter(item => {
              if (searchType === 'name') {
                return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
              }
              return true;
            })
            .map((item, index) => (
              <article
                style={{
                  display: 'flex',
                }}
                id={item._id}
                className="universe_item my-8"
              >
                <div
                  style={{
                    width: '260px',
                    borderRadius: '12px',

                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                  className="universe_logo"
                >
                  <img className="rounded-[12px]" src={item.avatar} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '600px',
                    marginLeft: '25px',
                  }}
                  className="universe_info"
                >
                  <div className="universe_info_text">
                    <h3
                      style={{
                        margin: '10px 0 0 0',
                        fontWeight: '700',
                        fontSize: '20px',
                      }}
                      className="text-left"
                    >
                      {item.name}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontWeight: '700',
                          fontSize: '20px',
                          margin: '10px 0 0 0 ',
                        }}
                      >
                        4,5
                      </p>
                    </div>
                    <p className="text-left">{item.description}</p>
                  </div>
                  <div className="universe_info_button">
                    <Link to={`/university/${item._id}`}>
                      <button
                        style={{
                          width: '40%',
                          padding: '18px 30px',
                          fontSize: '16px',
                          textAlign: 'center',
                          backgroundColor: '#16826A',
                          border: 'none',
                          borderRadius: '29px',
                          color: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column-reverse',
                        }}
                        className="items-center my-4"
                      >
                        Подробнее
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </>
  );
}

export default University;
