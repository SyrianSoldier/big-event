$(function () {
  $('#link_login').on('click', function () {
    $('.register-form').show()
    $('.login-form').hide()
  })

  $('#link_register').on('click', function () {
    $('.register-form').hide()
    $('.login-form').show()
  })

  // validation
  layui.form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6-12位,且不能有空格'],
    confirm(value) {
      let password = $('.register-form [name="password"]').val()
      if (password !== value) {
        return '两次密码输入不一致!'
      }
    }
  })

  //注册
  $('#register_form').on('submit', function (e) {
    e.preventDefault()

    let data = {
      username: $('#register_form [name="username"]').val(),
      password: $('#register_form [name="password"]').val()
    }
    $.post(
      'http://api-breakingnews-web.itheima.net/api/reguser',
      data,
      function (res) {
        if (res.status !== 0) return layui.layer.msg(res.message)
        layui.layer.msg('注册成功')
        $('#link_register').click()
      }
    )
  })

  //登录
  $('#login_form').on('submit', function (e) {
    window.event.returnValue = false

    let data = $(this).serialize()
    console.log(data)
    $.ajax({
      method: 'POST',
      url: 'http://api-breakingnews-web.itheima.net/api/login',
      data,
      success(res) {
        if (res.status !== 0) return layui.layer.msg(res.message)
        localStorage.setItem('token', res.token)
        layui.layer.msg('登录成功')
        location.href = '/index.html'
      }
    })
  })
})
