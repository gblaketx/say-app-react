class TestDataController < ApplicationController
  def index
    data = TestData.all
    render json: { status: 'SUCCESS', message: 'Loaded test data', data: data}, status: :ok
  end
end
