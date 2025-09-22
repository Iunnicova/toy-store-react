import '../../index.scss';
//***** */
const App = () => {
  return (
    <main>
      <h1>Hello React 🚀</h1>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Определения фильтров и градиентов */}
        <defs>
          {/* Глубокая тень */}
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="-3"
              dy="-2"
              stdDeviation="2"
              flood-color="rgba(0,0,0,0.6)"
            />
          </filter>

          {/* Градиенты для объёма */}
          <linearGradient id="vGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="60%" stop-color="#9c88e2" />
            <stop offset="100%" stop-color="#5c4e91" />
          </linearGradient>
          <linearGradient id="uGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="40%" stop-color="#8375b4" />
            <stop offset="100%" stop-color="#483b78" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="10%" stop-color="#f9c449" />
            <stop offset="100%" stop-color="#b38300" />
          </linearGradient>
        </defs>

        {/* === Буква V: задний слой (толщина) === */}
        <path
          d="M20,30 L40,80 L60,20"
          style={{ stroke: '#2a2148', strokeWidth: 10, fill: 'none' }}
          transform="translate(1.5,1.5)"
        />

        {/* Буква V: передний слой с градиентом и тенью */}
        <path
          d="M20,30 L40,80 L60,20"
          style={{
            stroke: 'url(#vGradient)',
            strokeWidth: 8,
            fill: 'none',
            filter: 'url(#shadow)',
          }}
          strokeLinecap="round"
        />

        {/* === Буква U: задний слой (толщина) === */}
        <path
          d="M69,24 L56,60 Q76,80 90,93 Q35,106 19,54 L87,58"
          style={{ stroke: '#2a2148', strokeWidth: 9, fill: 'none' }}
          transform="translate(1.5,1.5)"
        />

        {/* Буква U: передний слой с градиентом и тенью */}
        <path
          d="M69,24 L56,60 Q76,80 90,93 Q35,106 19,54 L87,58"
          style={{
            stroke: 'url(#uGradient)',
            strokeWidth: 7,
            fill: 'none',
            filter: 'url(#shadow)',
          }}
        />

        {/* === Жёлтая диагональ: задний слой (толщина) === */}
        <line
          x1="42"
          y1="91"
          x2="65"
          y2="21.5"
          style={{ stroke: '#7a6400', strokeWidth: 5 }}
          transform="translate(1.5,1.5)"
          strokeLinecap="round"
        />

        {/* Жёлтая диагональ: передний слой с градиентом и тенью */}
        <line
          x1="42"
          y1="91"
          x2="65"
          y2="21.5"
          style={{
            stroke: 'url(#lineGradient)',
            strokeWidth: 3,
            filter: 'url(#shadow)',
          }}
          strokeLinecap="round"
        />
      </svg>
    </main>
  );
};

export default App;
