import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
import './PreLoader.css'

function PreLoader() {
  return (
    <>
        <ReactLoading className='loader'
          type={"bubbles"}
          color={"#C7D6D5"}
          height={100}
          width={100}
          />
    </>
  );
}

export default PreLoader