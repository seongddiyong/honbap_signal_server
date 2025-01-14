module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const passport = require("passport");

  //client와 통신 부분.

  // 1. 로그인 API
  app.post("/user/login", user.signin);

  // 2. 회원가입 (유저 개인정보) API
  app.post("/user/signup", user.postUsers);

  // 3. 유저 프로필 등록 API
  app.post("/user/signup/plusinfo", user.postUserProfile);

  // 4. 유저 인덱스 조회 API
  app.get("/user/signup/:email", user.getUserIdx);

  // 5. 유저 개인정보 조회 API
  app.get("/user/myinfo", jwtMiddleware, user.getUserInfo);

  // 6. 유저 프로필 조회 (마이페이지) API
  app.get("/user/mypage", jwtMiddleware, user.getUserProfile);

  // 7. 유저 패스워드 수정 API
  app.patch(
    "/user/myinfo/modifypw",
    jwtMiddleware,
    user.patchUserPassword
  );

  // 8. 유저 개인정보 수정 API
  app.patch("/user/myinfo", jwtMiddleware, user.patchUserInfo);

  // 9. 유저 프로필 수정 (마이페이지) API
  app.patch("/user/mypage", jwtMiddleware, user.patchUserProfile);

  // 12. 유저 닉네임 중복 체크
  app.get("/user/:nickName", user.getUserNickName);

  // 13. jwt에서 userIdx 반환
  app.get("/user/getIdx", jwtMiddleware, user.getUserIdxFromJWT);

  // 10. 카카오 로그인 API
  app.get("/auth/kakao", passport.authenticate("kakao"));
  app.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", { failureRedirect: "/", session: false }),
    function (req, res) {
      // console.log(req.user);
      const signInKakaoResponse = req.user;
      return res.send(signInKakaoResponse);
    }
  );

  // 11. 네이버 번호 인증 API

  // 문자인증 - 전송 API
  app.post("/app/send", user.send);
  // 문자인증 - 검증 API
  app.post("/app/verify", user.verify);


  // socket Test 
  app.get('/', function(req, res){
    res.sendFile( __dirname + '/test_socket.html')
  })
};
