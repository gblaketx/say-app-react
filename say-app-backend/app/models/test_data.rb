class TestData < ActiveRecord::Base
  validates :info, presence: true
end