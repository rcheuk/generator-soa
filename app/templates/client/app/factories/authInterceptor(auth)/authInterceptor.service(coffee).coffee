'use strict'
angular
  .module('<%= scriptAppName %>')
  .factory 'authInterceptor', ($rootScope, $q, $storage, $location) ->
    # Add authorization token to headers
    request: (config) ->
      config.headers = config.headers or {}
      config.headers.Authorization = 'Bearer ' + $storage.get 'user_token' if $storage.get 'user_token'
      config

    # Intercept 401s and redirect you to login
    responseError: (response) ->
      if response.status is 401
        $location.path '/login'
        # remove any stale tokens
        $storage.clear 'user_token'

      $q.reject response

