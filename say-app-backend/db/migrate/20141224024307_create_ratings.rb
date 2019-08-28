class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
		t.integer :rating_val
    end
  end
end
