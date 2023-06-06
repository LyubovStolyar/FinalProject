const user = localStorage.userName;



function UserNameStatus() {


  return (
    <>
      <div>
       
             <span>{ user? 'Welcome, ' + user: ''}</span>
  
      </div>
    </>
  );
}

export default UserNameStatus;
