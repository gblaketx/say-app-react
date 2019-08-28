class AddStatusToArtworks < ActiveRecord::Migration[6.0]
  def change
    add_column :artworks, :status, :string, default: Document::STATUS[:under_review]
  end
end
