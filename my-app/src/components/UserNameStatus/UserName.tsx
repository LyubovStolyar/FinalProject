const user = localStorage.userName;



function UserNameStatus() {


  return (
    <>
      <div>
       
             <div>{ user? 'Welcome, ' + user : " " }</div>
  
      </div>
    </>
  );
}

export default UserNameStatus;
