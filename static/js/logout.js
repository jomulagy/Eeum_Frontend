function onclickLogOut(){
    Kakao.Auth.logout(function() {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        alert('로그아웃에 성공했습니다.'); 
        location.reload()
      }
      );
}
