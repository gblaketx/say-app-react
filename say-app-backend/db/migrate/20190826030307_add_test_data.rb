class AddTestData < ActiveRecord::Migration[6.0]
  def change
      create_table :test_data do |t|
        t.string :info

        t.timestamps
      end
  end
end
