Kakao.init('97a167bfd45fe1d3f9180e159b4a147d');
var id;
var age;

function onclickLogin() {
  Kakao.Auth.login({
    success: function(res) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(result){
          alert("로그인 성공!");
          id = result.id;
          age = result.kakao_account.age_range;

          $.ajax({
            type: 'POST',
            url: 'http://3.34.3.84/api/account/kakao/callback/',
            dataType: 'json',
            data: {
              'id': id,
              'age': age,
            },
        
            success: function(res){
              alert('로그인을 진짜 성공했습니다.');
              var access = res.access;
              var refresh = res.refresh;

              localStorage.setItem('access', access);
              localStorage.setItem('refresh', refresh);
              window.location.href = 'dictionary/list.html';
            },
        
            // error: function (jqXHR, textStatus, errorThrown) {
            //   alert('로그인에 실패했습니다.');
            //   console.log(jqXHR);
            // }
          })
        }
      })
    },
    
    fail: (err) => {
        console.error('카카오 로그인 실패:', err);
    }
  });
}