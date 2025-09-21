import '../../index.scss';
//***** */
const App = () => {
  return (
    <main>
      <h1>Hello React 🚀</h1>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- Буква V --> */}
  <path
    d="M20,30 L40,80 L60,20"
    style={{ stroke: "blue", strokeWidth: 8, fill: "none" }}
    strokeLinecap="round"
  />
  {/* <!-- Буква U --> */}
  <path
    d="M69,24 L56,60 Q76,80 90,93 Q35,106 19,54 L87,58"
    style={{ stroke: "blue", strokeWidth: 7, fill: "none" }}
    // strokeLinecap="round"
  />
  {/* <!-- Жёлтая диагональ между V и U --> */}
  <line
    x1="42"
    y1="91"
    x2="65"
    y2="21.5"
    style={{ stroke: "orange", strokeWidth: 3 }}
    strokeLinecap="round"
  />
</svg>

    </main>
  );
};

export default App;