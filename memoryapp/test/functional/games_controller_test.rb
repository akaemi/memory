require 'test_helper'

class GamesControllerTest < ActionController::TestCase
  test "should get memory" do
    get :memory
    assert_response :success
  end

end
