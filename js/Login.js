function checkLogin() {
  // احضار اسم المستخدم وكلمة المرور
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // التحقق من صحة اسم المستخدم وكلمة المرور
  if (username === "admin" && password === "admin") {
    // انتقال إلى الصفحة الثانية إذا كان اسم المستخدم وكلمة المرور صحيحين
    window.location.href = "System.html";
  } else {
    // التحقق من صحة اسم المستخدم وكلمة المرور في Local Storage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var isValid = users.some(function(user) {
      return user.username === username && user.password === password;
    });
    
    if (isValid) {
      // انتقال إلى الصفحة الثانية إذا كان اسم المستخدم وكلمة المرور صحيحين
      window.location.href = "System.html";
    } else {
      // عرض رسالة خطأ إذا كان اسم المستخدم أو كلمة المرور خاطئة
      alert("Invalid username or password");
    }
  }
}

function ror() {
  window.location.href = "registration.html";
}

function register() {
  // جمع المعلومات من النموذج
  
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;
  var username = document.getElementById("username").value;

  // التحقق من صحة البيانات
  if (username === "" || password === "" || confirmPassword === "") {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // جلب قائمة المستخدمين من Local Storage
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // التحقق من عدم تكرار اسم المستخدم
  var isDuplicate = users.some(function(user) {
    return user.username === username;
  });

  if (isDuplicate) {
    alert("Username already exists.");
    return;
  }

  // إنشاء كائن المستخدم
  var user = {
    username: username,
    password: password
  };

  // إضافة المستخدم إلى قائمة المستخدمين وحفظها في Local Storage
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // عرض رسالة نجاح
  alert("Registration successful!");

  // إعادة توجيه المستخدم إلى الصفحة الرئيسية
  window.location.href = "index.html";
}