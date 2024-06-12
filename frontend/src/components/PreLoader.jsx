import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
import './PreLoader.css'

function PreLoader() {
  return (
    <>
      <div className="loader">
        <div className="loadingspinner">
          <div id="square1"></div>
          <div id="square2"></div>
          <div id="square3"></div>
          <div id="square4"></div>
          <div id="square5"></div>
        </div>
      </div>
    </>
  );
}

export default PreLoader