import React from 'react';

const Universe = () => {
  return (
    <article
      style={{
        display: 'flex',
      }}
      className="universe_item my-8"
    >
      <div
        style={{
          width: '260px',
          borderRadius: '12px',
          background:
            'url(https://news.wttw.com/sites/default/files/styles/full/public/article/image-non-gallery/UChicagoUpdate_0912.jpg?itok=tp_xkgJ3)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="universe_logo"
      ></div>
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
            МГУ имени М. В. Ломоносова
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
          <p className="text-left">
            один из крупнейших вузов Северного Кавказа, ведущий региональный вуз,
            являющийся основным поставщиком специалистов для большинства сфер
            жизнедеятельности Чеченской Республики
          </p>
        </div>
        <div className="universe_info_button">
          <button
            style={{
              width: '40%',
              padding: '18px 30px',
              fontSize: '16px',
              textAlign: 'center ',
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
        </div>
      </div>
    </article>
  );
};

export default Universe;
