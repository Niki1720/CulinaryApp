module TestHelper
  def auth_as(user)
    Devise::JWT::TestHelpers.auth_headers({}, user)
  end
end