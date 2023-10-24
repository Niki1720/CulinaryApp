class DropEstates < ActiveRecord::Migration[6.1]
  def change
    drop_table :estates
  end
end
