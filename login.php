<?php
  
  session_start();

?>


<!DOCTYPE html>
  <html lang="en">
<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>SRMS || Login</title>

  <!-- Custom fonts for this template-->
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="/dist/css/main.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form class="user" id="login_form">
                        <div class="form-group">
                          <input type="email" class="form-control form-control-user" required id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address...">
                        </div>
                        <div class="form-group">
                          <input type="password" class="form-control form-control-user" required id="exampleInputPassword" placeholder="Password">
                        </div>
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input type="checkbox" class="custom-control-input" id="customCheck">
                            <label class="custom-control-label" for="customCheck">Remember Me</label>
                          </div>
                        </div>
                        <button name="submit" id="submit" class="btn btn-primary btn-user btn-block">
                          Login 
                        </button>
                  </form>
                  
                  <!-- End Of Login Form -->

                  <hr>
                  <div class="text-center">
                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div class="text-center">
                    <a class="small" href="register.php">Create an Account!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

  <script src="/dist/js/main.min.js"></script>

  <script>
      $(function(){

          $('#login_form').on('submit', function(event){
            event.preventDefault();

            var email = $('#exampleInputEmail').val();
            var password = $('#exampleInputPassword').val();

            if(email === "" && password === ""){
              iziToast.error({
                    title: 'Error',
                    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                    message: "Please Enter all Fields",
                });
            }

            formData = {
              "email_address" : email,
              "password" : password,
            }
            $.ajax({
              "url" : "/auth/login_attempt.php",
              "type" : "POST",
              "data" : formData,
            }).done(function(response){
              
              var s = JSON.parse(response)

              if(s.success === true){
                iziToast.success({
                    title: 'Success',
                    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                    message: s.message,
                    onClosed : function(){
                      document.location = '/index.php';
                    }
                });
               
              }else{
                iziToast.error({
                    title: 'Error',
                    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                    message: s.message,
                });
              }
            });
            
          });

      });     
  </script>
</body>

</html>