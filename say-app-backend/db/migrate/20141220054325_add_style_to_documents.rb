class AddStyleToDocuments < ActiveRecord::Migration[6.0]
  def change
    add_column :documents, :style, :string
  end
end
