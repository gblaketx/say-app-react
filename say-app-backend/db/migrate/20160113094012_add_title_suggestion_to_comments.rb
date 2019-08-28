class AddTitleSuggestionToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :title_suggestion, :boolean
  end
end
