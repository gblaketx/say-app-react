require 'test_helper'

class TestDataControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get test_data_index_url
    assert_response :success
  end

end
