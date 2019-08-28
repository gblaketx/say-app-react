class AddStatusToDocuments < ActiveRecord::Migration[6.0]
  def change
    add_column :documents, :status, :string, default: Document::STATUS[:under_review]
  end
end
