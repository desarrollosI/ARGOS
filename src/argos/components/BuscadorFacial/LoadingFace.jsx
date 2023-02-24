
export const LoadingFace = ({message}) => {
    return (
      <>
        <div className="row ms-2 mt-2">
            <div className={"alert alert-"+message[1]} role="alert">
            <strong>{message[0]}</strong>
            </div>
        </div>
      </>
    );
  }