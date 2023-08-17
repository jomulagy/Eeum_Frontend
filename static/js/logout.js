Kakao.init('97a167bfd45fe1d3f9180e159b4a147d');

function onclickLogOut(){
    Kakao.Auth.logout(function() {
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
        alert('로그아웃에 성공했습니다.'); 
        window.location.href = 'index.html';
      }
      );

}
