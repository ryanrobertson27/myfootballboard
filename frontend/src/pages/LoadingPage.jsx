import GlobalSpinner from '../components/GlobalSpinner';

const LoadingPage = () => {
  let temp;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        Loading...
        <GlobalSpinner />
      </div>
    </div>
  );
};

export default LoadingPage;
